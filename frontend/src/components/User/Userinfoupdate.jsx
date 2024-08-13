import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/UserContext';
import './useinfo.css';

const UserInfo = () => {
    const { user, login } = useContext(AuthContext);
    const [currUser, setCurrUser] = useState(user);
    const [isUpdated, setIsUpdated] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setCurrUser(user);
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrUser({ ...currUser, [name]: value });
    };

    const handleCheckboxChange = () => {
        setIsUpdated(!isUpdated);
        console.log(currUser);
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.post('/api/user/uploadImg', formData, config);

            if (data.imageUrl) {
                setCurrUser({ ...currUser, pic: data.imageUrl });
                console.log(data.imageUrl);
            } else {
                setError(data.error || 'Error uploading image');
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                },
            };
            console.log(currUser.imageUrl);
            const { data } = await axios.put('/api/user/update', {
                name: currUser.name,
                email: currUser.email,
                address: currUser.address,
                pic: currUser.pic,
                newPassword: currUser.newPassword,
                oldPassword: currUser.oldPassword
            }, config);

            login(data);
            navigate('/home/1');
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        }
    };

    return (
        <div className='UserInfo'>
            <section>
                <div className="form-boxR">
                    <h1>{isUpdated && <>Update</>} {currUser.role} Information</h1>
                    <div className="form-valueR">
                        <form className='Register' onSubmit={handleSubmit}>
                            {error && <div className="error">{error}</div>}
                            <div className='user_Image'>
                                <img src={currUser.pic} alt="User" />
                                <input type="file" onChange={handleImageChange} />
                            </div>
                            <div className="inputbox">
                                <ion-icon name="person-outline"></ion-icon>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={currUser.name}
                                    placeholder='Enter your name'
                                    onChange={handleChange}
                                    disabled={!isUpdated}
                                />
                                {isUpdated && <label>Name</label>}
                            </div>
                            <div className="inputbox">
                                <ion-icon name="mail-outline"></ion-icon>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={currUser.email}
                                    placeholder='Enter your Email'
                                    onChange={handleChange}
                                    disabled={!isUpdated}
                                />
                                {isUpdated && <label>Email</label>}
                            </div>
                            <div className="inputbox">
                                <ion-icon name="location-outline"></ion-icon>
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    placeholder='Enter your address'
                                    value={currUser.address}
                                    onChange={handleChange}
                                    disabled={!isUpdated}
                                />
                                {isUpdated && <label>Address</label>}
                            </div>
                            <div className="CheckBox">
                                <p>Update {currUser.role} Info?</p>
                                <input
                                    type="checkbox"
                                    className="switch"
                                    checked={isUpdated}
                                    onChange={handleCheckboxChange}
                                />
                            </div>
                            {isUpdated && (
                                <>
                                    <div className="inputbox">
                                        <ion-icon name="lock-closed-outline"></ion-icon>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={currUser.newPassword}
                                            onChange={handleChange}
                                            placeholder="New Password"
                                        />
                                        <label>New Password</label>
                                    </div>
                                    <div className="inputbox">
                                        <ion-icon name="lock-closed-outline"></ion-icon>
                                        <input
                                            type="password"
                                            name="oldPassword"
                                            required
                                            value={currUser.oldPassword}
                                            onChange={handleChange}
                                            placeholder="Old Password"
                                        />
                                        <label>Old Password</label>
                                    </div>
                                    <button className='Btn' type="submit">Update</button>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UserInfo;
