import React, { useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import '../../css/otp.css'
import { getOtpFunction, verifyOtpFunction } from '../../actions/userAction';
import { useAlert } from 'react-alert'


const OtpVerification = () => {
    const alert = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [flag, setFlag] = useState("none")
    const [number, setNumber] = useState()
    const [otp, setOtp] = useState()

    const { isAuthenticated, user } = useSelector((state) => state.user)
    const { success } = useSelector((state) => state.verifyOtp.user)

 

    
    console.log("user", user)
    console.log("success",success)


 

    const getOtp = (e) => {
        e.preventDefault();
        const myForm = new FormData()
        myForm.set("number", number)
        dispatch(getOtpFunction(myForm))
        setFlag("block")
        console.log("dataaa")
    }

const verifyOtp = (e)=>{
    e.preventDefault();
    const myForm = new FormData()
    myForm.set("otp", otp)
    dispatch(verifyOtpFunction(myForm))
    
}


useEffect(() => {
  if(success==true) {
    alert.success("Login Successfull")
    // setInterval(() => {
    //   window.location.reload();
    // }, 2000);
    navigate('/')
  }
  if(success==false) {
    alert.error("Wrong Otp")
  }

}, [success,navigate])



    return (
        <>

            <div className="container new-login-area">
                <div className="row">
                    <div className="col-sm-4 offset-sm-4 text-center">
                    <form className="form" onSubmit={getOtp}>
                    <div id='sign-in' className='login-setup-section'>
                        <h3 className="request-otp-header">Please verify your mobile number</h3>

                        <div className="form-group login-label">
                            <label for="inputnumber">mobile number</label>
                            <input type="number" className="form-control input-edit" placeholder='Enter mobile number' name="number" value={number} onChange={(e) => setNumber(e.target.value)} />
                        </div>

                        <button type="submit" className="btn btn-default btn-lg btn-block request-otp">Get OTP</button>

                    </div>
                </form>
                <form onSubmit={verifyOtp}>
                <div className="login-setup-section" style={{ display: `${flag}` }}>
                    {/* <i className="fa fa-chevron-left" aria-hidden="true"></i> */}
                    <h3 className="request-otp-header">Verify OTP</h3>
                    <div className="form-group login-label">
                        <label for="inputnumber">One Time Password</label>
                        <input type="number" className="form-control input-edit" placeholder='Enter OTP' onChange={(e)=>setOtp(e.target.value)}/>
                        <label className="pull-right resend-otp" >Resend otp</label>
                    </div>
                    <button type="submit">Verify</button>
                   
                </div>
                </form>
                    </div>
                </div>
              
            </div>
         
           
        </>
    )
}

export default OtpVerification