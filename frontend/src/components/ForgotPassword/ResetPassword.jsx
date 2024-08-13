import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {useToast} from "@chakra-ui/react";

const ResetPassword = () => {
    const {id,token} = useParams();
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const toast = useToast();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const res = await axios.put(`/api/user/resetpassword/${id}/${token}`,{password});
            if(res.status === 200){
                toast({
                    title: `User password updated`,
                    description:res.data.message,
                    status: 'success',
                    isClosable: true,
                    duration:3000
                });
            }
        } catch (error) {
            toast({
                title:'Error',
                status:'error',
                description : error.message,
                isClosable:true,
                duration:2000
            })
            setError(error);
            console.log(error);
        } finally{
            toast({
                title:'Auto closing tab',
                status:'warning',
                description : 'please go visit sign in page',
                isClosable:false,
                duration:2000
            })
            setTimeout(() => {
                window.close();
            }, 2000);
        }
        
    }
    return (
    <div className='SignUp'>
        <section>
            <div className="form-boxR">
                <div className="form-valueR">
                    <form className='Register' onSubmit={handleSubmit}>
                        <h2>Reset Password</h2>
                        {error && <div className="error">{error}</div>}
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