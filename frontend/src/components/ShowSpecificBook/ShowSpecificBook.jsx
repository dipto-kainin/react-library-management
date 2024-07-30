import React, { useContext, useEffect, useState } from 'react';
import "./showspecificbook.css";
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
import axios from 'axios';


function ShowSpecificBook() {
    const [Book, setBook] = useState({});
    const {user}=useContext(AuthContext);
    const { isbnPre } = useParams();

    useEffect(()=>{
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`/api/book/fetchBook/${isbnPre}`);
                setBook(response.data.data[0]);
            } catch (err) {
                console.log(err);
            }
        };
        fetchBooks();
    },[isbnPre]);

    const handleBorrowReq = ()=>{
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            },
        }
        axios.post(`/api/book/borrowReq`,{isbnPre},config)
        .then(res=>{
            console.log(res);
            //alert(res.data.message);
        });
    }

    return (
        <>
            <div className='outercard'>
                <div className="card-1">
                    <div className='leftdiv'>
                        <div className='image'>
                            <img src={Book.image} alt="book"/>
                        </div>
                        <div className='title-author'>
                            <p className="heading">
                                {Book.title}
                            </p>
                            <p className='author'>
                                {Book.author}
                            </p>
                        </div>
                    </div>
                    <div className='buttons'>
                        <button className="btn-1" onClick={handleBorrowReq}> Borrow </button>
                    </div>
                    <p className='description'>
                        {Book.description}
                    </p>
                </div>
            </div>
        </>
    );
}

export default ShowSpecificBook;