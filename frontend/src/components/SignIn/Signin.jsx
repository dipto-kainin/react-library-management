import React,{useState,useContext} from 'react';
import "./Signin.css";
import { Link,useNavigate} from 'react-router-dom';
import axios from "axios";
import { AuthContext } from '../../context/UserContext';
import {useToast} from '@chakra-ui/react'

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {login} = useContext(AuthContext);
    const toast = useToast()
    const handleforgot =async ()=>{
        if(!email){
            setError("Please enter your email");
            return;
        }
        try{
            const  res = await axios.post('/api/user/forgot', {email});
            if(res.status === 400){
                toast({
                    title: "Email Not Found",
                    description: "No account found with this email",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
                return;
            }
            else if(res.status === 500){
                toast({
                    title: "Failed",
                    description: "Failed to send the Email",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
                return;
            }
            toast({
                title: "Password Reset Link Sent",
                description: "Check your email for password reset link",
                status: "success",
                duration: 5000,
                isClosable: true,
            })
            navigate('/login');

        }catch(err){
            setError("Something went wrong")
        }
    }

    const handleClick = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please fill in all the fields");
            return;
        }
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
            };
            const { data } = await axios.post('/api/user/login/', {email,password}, config);
            if(data.email===email){
                login(data);
                navigate('/home/1');
            }
            setError(null);
        } catch (error) {
            setError("Invalid email or password");
        }
    };

    return (
        <div className='SignUp'>
            <section>
                <div className="form-boxS">
                    <div className="form-valueS">
                        <form className='Signin' onSubmit={handleClick}>
                            <h2>Login</h2>
                            {error && <div className="error">{error}</div>}
                            <div className="inputbox">
                                <ion-icon name="mail-outline"></ion-icon>
                                <input type="email" required onChange={(e) => setEmail(e.target.value)} />
                                <label>Email</label>
                            </div>
                            <div className="inputbox">
                                <ion-icon name="lock-closed-outline"></ion-icon>
                                <input type="password" required onChange={e => setPassword(e.target.value)} />
                                <label>Password</label>
                            </div>
                            <div className="forget">
                                <label>
                                    <input type="checkbox" />Remember Me
                                </label>
                            </div>
                            <button className='Btn' type="submit">Log In</button>
                            <h4 style={{ fontSize: '1em' }}>Not registered yet? <Link to="/signup" style={{ color: 'turquoise' }}><b>Sign up</b></Link></h4>
                            <br />
                            <h4 style={{ fontSize: '1em' }}>Forgot password?<text onClick={()=>handleforgot()} style={{ color: 'turquoise',fontWeight:600, cursor:'pointer' }}> Reset Password </text></h4>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Signin;
