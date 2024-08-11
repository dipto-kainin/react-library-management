import React from 'react'
import './GetStarted.css'
import { FaGithub } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

function GetStarted() {

    const navigate=useNavigate();

    const handleGetStarted=(e)=>{
        e.preventDefault();
        navigate("/home/1");
    }


    const handleGithubButtonClick=()=>{
        window.location.href = 'https://github.com/dipto-kainin/react-library-management';
    }

    return (
        <div className='get-started'>
            <div class="card">
                <div class="card__content">
                    <p className='heading'>Say Hello to your <br/><span id="title">Online Library System!</span></p>
                    <p className='description'>The Library Management System is a comprehensive application designed to streamline the management of a library's operations and improve the user experience for both patrons and administrators. It features two primary portals: the User Portal and the Admin Portal, each catering to the specific needs and functionalities required by library users and staff.</p>
                    <p className='description'>Here, user can send borrow request to the admin. The book will be borrowed if the admin accept the request and same goes for book return. Here both admin and user can view all the books and its details.</p>
                    <div className='btn'>
                        <button class="comic-button" onClick={handleGetStarted}>Get Started</button>
                        <button className="comic-button" onClick={handleGithubButtonClick}>
                            <FaGithub className="icon" />
                            <span className="text"> Github</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GetStarted;