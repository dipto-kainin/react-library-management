import React, { useContext } from 'react'
import './UserNavbar.css'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
function AdminNavbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    function openForm() {
        document.getElementById("myForm").style.display = "block";
    }

    function closeForm() {
        document.getElementById("myForm").style.display = "none";
    }
    function homeClick() {
        navigate('/home/1')
    }
    const handleUserProfile = () => {
        navigate('/user')
    }
    const handleUserSearch = (e) => {
        e.preventDefault();
        navigate('/search');
    }

    const handleViewBook=(e)=>{
        e.preventDefault();
        navigate('/view');
    }

    const handleLogout = () => {
        logout();
        navigate('/home');
    }

    return (
        <>
            <nav className="nav">
                <div className="nav-element">
                    <div className="home">
                        <button className="button-home" onClick={homeClick}>
                            Home
                            <div className="hoverEffect">
                                <div>
                                </div>
                            </div>
                        </button>
                    </div>
                    <div onClick={homeClick}>
                        Library Management System
                    </div>
                    <div className="detail">
                        <div className="icon">
                            <p href="#" className="circle" onClick={openForm}>
                                <img height="30" width="30"
                                    src={user ? user.pic : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                                    alt="Cloud Chen" />
                            </p>
                        </div>
                        {
                            <div className="userinfo" id="myForm">
                                <div className="card ">
                                    <div className="card__border"></div>
                                    <div className="card_title__container">
                                        <div className='img'>
                                            <img height="80" width="80"
                                                src={user.pic}
                                                alt="Cloud Chen" />
                                        </div>
                                        <div>
                                            <span className="card_title" onClick={handleUserProfile}>{user?.name}</span>
                                        </div>
                                    </div>
                                    <hr className="line" />
                                    <ul className="card__list">
                                        <li className="card__list_item">
                                            <span className="check">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                                    className="check_svg">
                                                    <path fillRule="evenodd"
                                                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                                                        clipRule="evenodd"></path>
                                                </svg>
                                            </span>
                                            <div className="card_title__container">
                                                <span className="card_title" onClick={handleLogout}>Log Out</span>
                                            </div>
                                        </li>
                                        <li className="card__list_item">
                                            <span className="check">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                                    className="check_svg">
                                                    <path fillRule="evenodd"
                                                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                                                        clipRule="evenodd"></path>
                                                </svg>
                                            </span>
                                            <div className="card_title__container">
                                                <span className="card_title" onClick={handleUserSearch}>Search User</span>
                                            </div>
                                        </li>
                                        <li className="card__list_item">
                                            <span className="check">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                                    className="check_svg">
                                                    <path fillRule="evenodd"
                                                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                                                        clipRule="evenodd"></path>
                                                </svg>
                                            </span>
                                            <div className="card_title__container">
                                                <span className="card_title" onClick={handleViewBook}>View Book</span>
                                            </div>
                                        </li>
                                    </ul>
                                    <button className="button" onClick={closeForm}>Close</button>
                                </div>
                            </div>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default AdminNavbar