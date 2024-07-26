import React, { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post('/api/user/', {
                name,
                email,
                address,
                password
            }, config);
            if(data.message==="success"){
                navigate('/login');
            };
        } catch (error) {
            setError(error.response && error.response.data.message
                ? error.response.data.message
                : error.message);
        }
    };

    return (
        <div className='SignUp'>
            <section>
                <div className="form-boxR">
                    <div className="form-valueR">
                        <form className='Register' onSubmit={handleSubmit}>
                            <h2>Register</h2>
                            {error && <div className="error">{error}</div>}
                            <div className="inputbox">
                                <ion-icon name="person-outline"></ion-icon>
                                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
                                <label>Name</label>
                            </div>
                            <div className="inputbox">
                                <ion-icon name="mail-outline"></ion-icon>
                                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                <label>Email</label>
                            </div>
                            <div className="inputbox">
                                <ion-icon name="location-outline"></ion-icon>
                                <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} />
                                <label>Address</label>
                            </div>
                            <div className="inputbox">
                                <ion-icon name="lock-closed-outline"></ion-icon>
                                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                                <label>Password</label>
                            </div>
                            <div className="inputbox">
                                <ion-icon name="lock-closed-outline"></ion-icon>
                                <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                <label>Confirm Password</label>
                            </div>
                            <button className='Btn' type="submit">Sign up</button>
                            <h4 style={{ fontSize: '1em' }}>Already registered? <Link to="/login" style={{ color: 'turquoise' }}><b>Login</b></Link></h4>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SignUp;
