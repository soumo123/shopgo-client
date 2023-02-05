import React, { useRef, useState, useEffect } from 'react'
import '../../css/authentication.css'
import { Link, useLocation } from 'react-router-dom'
import { login, register, getProclearErrors } from '../../actions/userAction'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import Loader from '../layout/loader/Loader'
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { REGISTER_USER_RESET } from '../../constants/userConstant'
import '../../css/error.css'

const Authentication = () => {
  const dispatch = useDispatch()
  const { error, loading, isAuthenticated, isRegistered } = useSelector((state) => state.user)

  const navigate = useNavigate()
  const loginTab = useRef(null)
  const registerTab = useRef(null)
  const switcherTab = useRef(null)

  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  const [user, setUser] = useState({
    name: "", email: "", password: "", number: ""
  })

  const { name, email, password, number } = user
  const [avatar, setAvatar] = useState()
  const [avatarPreview, setAvatarPreview] = useState("/profile.png")
  const [formerror, setFormerror] = useState({})


  // console.log("avatar",avatar)



  const loginSubmit = (e) => {
    e.preventDefault()
    dispatch(login(loginEmail, loginPassword))
  }


  const validateForm = () => {
    let err = {}
    let flag = false
    if (user.name === "") {
      err.name = "User Name is required"
    }
    if (user.number.length !== 10) {
      err.number = "Number Should be 10 Digit"
    }
    if (user.email == "") {
      err.email = "Email is required"
    }
    if (user.password == "") {
      err.password = "Password not defined"
    }
    // if(user.avatar==""){
    //   err.avatar = "Upload your photo"
    // }

    setFormerror({ ...err, err })
    console.log("err")
    if (Object.keys(err).length == 0) {
      flag = true
    } else {
      flag = false
    }

    return flag


  }





  const registerSubmit = (e) => {
    e.preventDefault();
    let isValid = validateForm()
    console.log("isValid", isValid)
    if (isValid) {
      const myForm = new FormData()
      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("password", password);
      myForm.set("number", number);
      myForm.set("avatar", avatar);
      dispatch(register(myForm));

    } else {
      console.log("isValid - comming here", isValid)
      toast.error("Check the Fields")
    }

  }

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result)
          setAvatar(reader.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
      console.log("reader", reader)
    } else {
      setUser({ ...user, [e.target.name]: e.target.value })
    }
  }


  // const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (!user) {
      toast.error("Invalid Credentials")
      dispatch(getProclearErrors())
    }
    if (isAuthenticated) {
      toast.success("Login Succesfull ");
      setInterval(() => {
        window.location.reload();
      }, 2000);
      navigate('/')
    }
    if (isRegistered) {
      toast.success("Registration Succesfull ");
      navigate('/login')
    }
    if (isRegistered == false) {
      dispatch({ type: REGISTER_USER_RESET })
      toast.error(error);

      // navigate('/login')
    }

  }, [dispatch, toast, isAuthenticated, navigate, user, isRegistered])




  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  }

  return (
    <>
      {
        loading ? (<Loader />) : (

          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <i className="fa fa-envelope-o" aria-hidden="true"></i>
                  <input
                    type="email"
                    placeholder="Email"

                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />

                </div>
                <div className="loginPassword">
                  <i className="fa fa-lock" aria-hidden="true"></i>

                  <input
                    type="password"
                    placeholder="Password"

                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>

                <input type="submit" value="Login" className="loginBtn" />
                <div className="row">
                  <div className="col-lg-12 text-center">
                    {/* <div className="phoneiocn">
                <i class="fa fa-mobile" aria-hidden="true"></i>
                </div> */}
                    <Link to="/otp/verification" className="btn btn-primary btn-sm otpbtn">
                      Login With Number</Link>
                  </div>
                </div>

              </form>


              <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />

              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <i className="fa fa-user" aria-hidden="true"></i>
                  <input
                    type="text"
                    placeholder="Name"

                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                  <span className="error-color">{formerror.name}</span>
                </div>

                <div className="signUpName">
                  <i className="fa fa-user" aria-hidden="true"></i>
                  <input
                    type="number"
                    placeholder="Phone Number"
                    name="number"
                    value={number}
                    onChange={registerDataChange}
                  />
                  <span className="error-color">{formerror.number}</span>

                </div>







                <div className="signUpEmail">
                  <i className="fa fa-envelope-o" aria-hidden="true"></i>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                  <span className="error-color">{formerror.email}</span>

                </div>
                <div className="signUpPassword">
                  <i class="fa fa-unlock-alt" aria-hidden="true"></i>
                  <input
                    type="password"
                    placeholder="Password"

                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                  <span className="error-color">{formerror.password}</span>

                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                  {/* <span className="error-color">{formerror.avatar}</span> */}

                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>



        )}


    </>
  )
}

export default Authentication