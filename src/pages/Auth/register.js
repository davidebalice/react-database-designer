import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import ReCAPTCHA from "react-google-recaptcha";

export default function Register() {
    const registerHanle = () => {
        Swal.fire("Register success", '', 'success')
    }
    
    function onChange(value) {
        console.log("Captcha value:", value);
    }
    return (
        <>
            <div className="container">
                <div className="row justify-content-center align-items-center jumbotron" style={{ height: '65vh' }}>
                    <div className="col-md-5">
                        <div className="card" style={{ borderTop: "2px solid #4723d9" }}>
                            <div className="card-header border-bottom text-center">
                                <h2>Register</h2>
                            </div>
                            <div className="card-body">
                                <input type="text" placeholder="Enter Your User Name" className="form-control" />
                                <input type="text" placeholder="Enter Your Email" className="form-control mt-3" />
                                <input type="password" placeholder="Enter Your Password" className="form-control my-3" />
                                <ReCAPTCHA
                                   sitekey={process.env.REACT_APP_SITE_KEY}
                                    onChange={onChange}
                                /> 
                                <button type="sumit" onClick={registerHanle} className="btn btn-primary mt-2">Register</button>
                                <Link to="/login"><p>Login</p></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}