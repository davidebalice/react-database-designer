import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import ReCAPTCHA from "react-google-recaptcha";

export default function ForgotPassword() {
    const recoverPswHandle=()=>{
        Swal.fire('Password Send', '', 'success')
    }
    function onChange(value) {
        console.log("Captcha value:", value);
    }
    return (
        <>
            <div className="container">
                <div className="row justify-content-center align-items-center jumbotron" style={{ height: '70vh' }}>
                    <div className="col-md-5">
                        <div className="card" style={{borderTop: "2px solid #4723d9"}}>
                            <div className="card-header border-bottom text-center">
                                <h3>Forgot Password</h3>
                            </div>
                            <div className="card-body">
                                <input type="text" placeholder="Enter Your User Name or Email" className="form-control mb-2" />
                                <ReCAPTCHA
                                   sitekey={process.env.REACT_APP_SITE_KEY}
                                    onChange={onChange}
                                /> 
                                <button type="sumit" onClick={recoverPswHandle} className="btn btn-primary mt-2">Request New Password</button>
                                <Link  to="/login"><p>Login</p></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}