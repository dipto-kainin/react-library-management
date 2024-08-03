import React, { useContext, useState } from 'react'
import './UserNavbar.css';
import {Avatar} from "@chakra-ui/react"
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
import { BookContext } from '../../context/bookContext';
import axios from 'axios';
function UserNavbar() {
    const {user,logout}= useContext(AuthContext);
    const {setBooks} = useContext(BookContext);
    const [search,setSearch]=useState();
    const navigate=useNavigate();
    function openForm() {
        document.getElementById("myForm").style.display = "block";
    }

    function closeForm() {
        document.getElementById("myForm").style.display = "none";
    }
    function homeClick() {
        navigate('/home/1')
    }
    const handleSearch = async () =>{
        if(search){
            const {data} = await axios.get(`/api/book/fetchBook/${search}`);
            setBooks(data.data);
            navigate(`/search/`);
            document.getElementById("searchInput").value="";
        }
        else{
            alert("Please enter a valid search term");
        }
    }
    const handleBorrowed =()=>{
        navigate('/user/MyBorrowed');
    }
    const handleUserProfile = ()=>{
        navigate('/user')
    }
    const handleLogout=()=>{
        logout();
        navigate('/home/1');
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
                <div className="sarch">
                    <div>
                        <input placeholder="Type something here...." id='searchInput' className="input-sarch" name="text" type="text" onChange={(e)=>setSearch(e.target.value)}/>
                    </div>
                    <div>
                        <button className="button-sarch" onClick={handleSearch}>Search</button>
                    </div>
                </div>
                <div className="icon">
                    <Avatar name={user?user.name:"user"} src={user?user.pic:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} onClick={openForm}/>
                </div>
                {user?
                (<div className="userinfo" id="myForm" onMouseLeave={closeForm}>
                    <div className="card ">
                        <div className="card__border"></div>
                        <div className="card_title__container">
                            <div className='img'>
                                <img height="200" width="200"
                                    src={user.pic}
                                    alt="Cloud Chen"/>
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
                                    <span className="card_title" onClick={handleBorrowed}>View Borrowed Book</span>
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
                                    <span className="card_title" onClick={handleLogout}>Log Out</span>
                                </div>
                            </li>
                        </ul>
                        <button className="button" onClick={closeForm}>Close</button>
                    </div>
                </div> ):
                (<div className="userinfo" id="myForm" onMouseLeave={closeForm}>
                    <div className="card ">
                        <div className="card__border"></div>
                        <div className="card_title__container">
                            <div className='img'>
                                <img height="80" width="80"
                                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                    alt="Cloud Chen"/>
                            </div>
                            <div>
                                <span className="card_title">No User</span>
                            </div>
                        </div>
                        <hr className="line" />
                        <ul className="card__list">
                            <li className="card__list_item">
                                <span className="check">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="check_svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </span>
                                <div className="card_title__container">
                                    <Link to='/login' className="card_title">Sign in </Link>
                                </div>
                            </li>
                            <li className="card__list_item">
                                <span className="check">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="check_svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </span>
                                <div className="card_title__container">
                                    <Link to='/signup' className="card_title">register</Link>
                                </div>
                            </li>
                        </ul>
                        <button className="button" onClick={closeForm}>Close</button>
                    </div>
                </div>)}
            </div>
        </div>
    </nav>
    </>
    )
}

export default UserNavbar