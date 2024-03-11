import React, { useEffect, useState } from 'react'
import './login.css';
import logo from '../../assets/Logo.png'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { RingLoader } from 'react-spinners';

function Login({ user }) {

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [user])

    const history = useNavigate()

    const [isSignIn, setIsSignIn] = useState(true);
    const toggle = () => {
        setIsSignIn(!isSignIn);
    };

    const handleSignIn = (e) => {
        e.preventDefault();

        const lemail = e.target.lemail.value;
        const lpass = e.target.lpass.value;

        signInWithEmailAndPassword(auth, lemail, lpass)
            .then(data => {
                // console.log(data, "authData");

                history('/FACIO-admin/admin')
            })
            .catch(error => {
                alert("Invalid username or password");
            });
    };

    document.title = "Sign In - FACIO Admin";

    if (user){
        return <Navigate to='/FACIO-admin/admin'></Navigate>
    }
    return (
        <>
            {loading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} > <RingLoader
                color="#000"
                loading={loading}
                size={200}
                speedMultiplier={2.1}
            /></div > :

                <div id="container" className={`container ${isSignIn ? 'sign-in' : 'sign-up'}`}>
                    <div className="row">
                        <div className="col align-items-center flex-col sign-up">
                            <div className="form-wrapper align-items-center">

                                <form onSubmit={(e) => handleSignUp(e)}>
                                    <div className="form sign-up">
                                        <div className="input-group">
                                            <i className='bx bx-mail-send'></i>
                                            <input required id="email" name='email' type="email" placeholder="Email"
                                            />
                                        </div>
                                        <div className="input-group">
                                            <i className='bx bxs-lock-alt'></i>
                                            <input required id="passw" name='password' type="password" placeholder="Password"
                                            />
                                        </div>
                                        <div className="input-group">
                                            <i className='bx bxs-lock-alt'></i>
                                            <input required id="cpass" name='cpassword' type="password" placeholder="Confirm password" />
                                        </div>
                                        <input className="btn" type="submit" value="Signup" />
                                        <p>
                                            <span>Already have an account?</span>
                                            <b onClick={toggle} className="pointer text-dec-line">Sign in here</b>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col align-items-center flex-col sign-in">
                            <div className="form-wrapper align-items-center">

                                <form onSubmit={(e) => handleSignIn(e)}>
                                    <div className="form sign-in">
                                        <h1>Admin</h1>
                                        <div className="input-group">
                                            <i className='bx bxs-user'></i>
                                            <input required id="lemail" name='lemail' type="email" placeholder="Email" />
                                        </div>
                                        <div className="input-group">
                                            <i className='bx bxs-lock-alt'></i>
                                            <input required id="lpass" name='lpass' type="password" placeholder="Password" />
                                        </div>
                                        <input className="btn" type="submit" value="Login" />
                                    </div>
                                </form>

                            </div>
                            <div className="form-wrapper"></div>
                        </div>
                    </div>
                    <div className="row content-row">
                        <div className="col align-items-center flex-col">
                            <div className="text sign-in">
                                <h2>Welcome,</h2>
                            </div>
                            <div className="img sign-in">
                                <img className='logo' src={logo} alt="" />
                            </div>
                        </div>
                        
                    </div>
                </div>
            }
        </>
    );
}

export default Login;
