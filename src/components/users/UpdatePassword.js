import React, { useRef, useState, useEffect } from 'react'
import '../../css/authentication.css'
import { Link } from 'react-router-dom'
import { updatePassword, getProclearErrors } from '../../actions/userAction'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import Loader from '../layout/loader/Loader'
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstant'





const UpdatePassword = () => {


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()

    const { error, isUpdated, loading } = useSelector((state) => state.profile)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [formerror, setFormerror] = useState({})
	let match = ""


    const validateForm = () => {
        let err = {}
        let flag = false
        if (newPassword.length === 0 && confirmPassword.length === 0) {
            err.newPassword = "New Password is missing"
            err.confirmPassword = "Confirm Password is missing"
        }
				if (newPassword.length ===0) {
					err.newPassword = "New Password is missing"
			}
			if (confirmPassword.length ===0) {
				err.confirmPassword = "Confirm Password is missing"
		}	if(newPassword !== confirmPassword){
			err.match = "Passwords not match"
		}
		
        setFormerror({ ...err, err })
        console.log("err")
        if (Object.keys(err).length == 0) {
            flag = true
        } else {
            flag = false
        }

        return flag

    }


    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        let isValid = validateForm()
        console.log("flag", isValid)

        if (isValid) {
				
            const myForm = new FormData()
            myForm.set("oldPassword", oldPassword);
            myForm.set("newPassword", newPassword);
            myForm.set("confirmPassword", confirmPassword);
            dispatch(updatePassword(myForm));
					}
    }


    useEffect(() => {
        if (isUpdated) {
            toast.success("Update Succesfull")
            navigate('/account')
            dispatch({ type: UPDATE_PASSWORD_RESET })
        }
    }, [dispatch, alert, isUpdated, navigate])




    return (
        <>
            {
                loading ? (<Loader />) :
                    // <div className="LoginSignUpContainer">
                    //     <div className="LoginSignUpBox">
                    //         <h2>Password Reset</h2>


                    //         <form
                    //             encType="multipart/form-data"
                    //             onSubmit={updatePasswordSubmit}
                    //         >
                    //             <div className="loginPassword">

                    //                 <i className="fa fa-lock" aria-hidden="true"></i>

                    //                 <input
                    //                     type="password"
                    //                     placeholder="Old Password"
                    //                     required
                    //                     value={oldPassword}
                    //                     onChange={(e) => setOldPassword(e.target.value)}
                    //                 />
                    //             </div>
                    //             <div className="loginPassword">

                    //                 <i className="fa fa-lock" aria-hidden="true"></i>

                    //                 <input
                    //                     type="password"
                    //                     placeholder="New Password"
                    //                     required
                    //                     value={newPassword}
                    //                     onChange={(e) => setNewPassword(e.target.value)}
                    //                 />
                    //             </div>

                    //             <div className="loginPassword">

                    //                 <i className="fa fa-lock" aria-hidden="true"></i>

                    //                 <input
                    //                     type="password"
                    //                     placeholder="Confirm Password"
                    //                     required
                    //                     value={confirmPassword}
                    //                     onChange={(e) => setConfirmPassword(e.target.value)}
                    //                 />
                    //             </div>



                    //             <input type="submit" value="Change"className="signUpBtn" />
                    //         </form>
                    //         <ToastContainer />

                    //     </div>
                    // </div>
                    <div class="container h-100">
                        <div class="row h-100">
                            <div class="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                                <div class="d-table-cell align-middle">

                                    <div class="text-center mt-4">
                                        <h1 class="h2">Reset password</h1>

                                    </div>

                                    <div class="card">
																		<span className="error-color">{formerror.match}</span>
                                        <div class="card-body">
                                            <div class="m-sm-4">
                                                <form onSubmit={updatePasswordSubmit}>
                                                    <div class="form-group">
                                                        <label style={{ fontSize: "20px" }}>Old Password</label>
                                                        <input
                                                            className='form-control form-control-lg'
                                                            type="password"
                                                            placeholder="Old Password"

                                                            value={oldPassword}
                                                            onChange={(e) => setOldPassword(e.target.value)}
                                                        />
                                                    </div>
                                                    <div class="form-group">
                                                        <label style={{ fontSize: "20px" }}>New Password</label>
                                                        <input
                                                            className='form-control form-control-lg'
                                                            type="password"
                                                            placeholder="New Password"
                                                            value={newPassword}
                                                            onChange={(e) => setNewPassword(e.target.value)}
                                                        />
																												<span className="error-color">{formerror.newPassword}</span>
                                                    </div>
                                                    <div class="form-group">
                                                        <label style={{ fontSize: "20px" }}>Confirm Password</label>
                                                        <input
                                                            className='form-control form-control-lg'
                                                            type="password"
                                                            placeholder="Confirm Password"
                                                            value={confirmPassword}
                                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                                        />
																												<span className="error-color">{formerror.confirmPassword}</span>
                                                    </div>
                                                    <div class="text-center mt-3">

                                                        <button type="submit" class="btn btn-lg btn-primary">Reset password</button>
                                                    </div>
                                                </form>
                                                <ToastContainer />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
            }




        </>
    )
}

export default UpdatePassword