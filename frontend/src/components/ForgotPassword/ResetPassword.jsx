import React from 'react'
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
    const {id,token} = useParams();
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setError('');
        // Redirect to login page
        window.location.href = '/login';
    }
    return (
    <div className='SignUp'>
        <section>
            <div className="form-boxR">
                <div className="form-valueR">
                    <form className='Register' onSubmit={handleSubmit}>
                        <h2>Reset Password</h2>
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
                        <button className='Btn' type="submit">Reset</button>
                    </form>
                </div>
            </div>
        </section>
    </div>
    )
}

export default ResetPassword