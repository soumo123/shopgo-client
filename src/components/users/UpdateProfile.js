
import React, { useRef, useState, useEffect } from 'react'
import '../../css/authentication.css'
import { Link } from 'react-router-dom'
import { updateProfile, getProclearErrors, loadUser } from '../../actions/userAction'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import Loader from '../layout/loader/Loader'
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstant'





const UpdateProfile = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()
  const { user } = useSelector((state) => state.user)
  const { error, isUpdated, loading } = useSelector((state) => state.profile)
  console.log("updated profile", user)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [avatar, setAvatar] = useState("")
  const [avatarPreview, setAvatarPreview] = useState("/profile.png")


  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData()
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));

  }

  const updateProfileDataChange = (e) => {

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result)
        setAvatar(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])

  }




  useEffect(() => {

    if (user) {
      setName(user?.name)
      setEmail(user?.email)
      setAvatarPreview(user?.avatar.url)
    }


    if (error) {
      alert.error(error);
      toast.error("Invalid Credentials")
      dispatch(getProclearErrors())
    }
    if (isUpdated) {
      toast.success("Update Succesfull")
      dispatch(loadUser())
      navigate('/account')
      dispatch({ type: UPDATE_PROFILE_RESET })
      // setInterval(() => {
      //   window.location.reload();
      // }, 6000);


    }
  }, [dispatch, error, alert, user, isUpdated, navigate])





  return (
    <>
      {
        loading ? (<Loader />) :
          <div class="container h-100">
            <div class="row h-100">
              <div class="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                <div class="d-table-cell align-middle">
                  <div class="text-center mt-4">
                    <h1 class="h2">Update Profile</h1>
                  </div>
                  <div class="card">
                    <div class="card-body">
                      <div class="m-sm-4">

                        <form
                          encType="multipart/form-data"
                          onSubmit={updateProfileSubmit}
                        >
                          <div id="registerImage">
                            <div className="profile-image">
                            <img  className="img-fluid" src={avatarPreview} alt="Avatar Preview" />
                            </div>
                            <div className='input-check'>
                            <input
                              type="file"
                              name="avatar"
                              accept="image/*"
                              onChange={updateProfileDataChange}
                            />
                            </div>
                           
                          </div>
                          <div className="signUpName mt-5">
                           
                            <input
                              type="text"
                              className='form-control form-control-lg'
                              placeholder="Name"
                              name="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <div className="signUpEmail mt-3">
                       
                            <input
                              type="email"
                              placeholder="Email"
                              className='form-control form-control-lg'
                              name="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              readOnly
                            />
                          </div>
                          <div className="update">
                          <input type="submit" className="btn btn-primary mt-2" />
                          </div>
                         
                        </form>
                        <div className="update">
                          <Link to="/account">Back</Link>
                          </div>

                      </div>
                    </div>
                  </div>


                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
      }




    </>
  )
}

export default UpdateProfile