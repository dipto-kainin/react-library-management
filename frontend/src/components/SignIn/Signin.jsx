import React,{useState,useContext} from 'react';
import "./Signin.css";
import { Link,useNavigate} from 'react-router-dom';
import axios from "axios";
import { AuthContext } from '../../context/UserContext';

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {login} = useContext(AuthContext);

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
            console.log(email,password);
            const { data } = await axios.post('/api/user/login/', {email,password}, config);
            if(data.email===email){
                login(data);
                console.log(data);
                navigate('/home');
            }
            setError(null);
        } catch (error) {
            setError("Invalid email or password");
            console.log(error);
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
                            <h4 style={{ fontSize: '1em' }}>Forgot password? <Link to="/forgot" style={{ color: 'turquoise' }}><b>Login</b></Link></h4>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Signin;
