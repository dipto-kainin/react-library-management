import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import './borrowBookReqList.css';
import {AuthContext} from "../../context/UserContext"

function BorrowBookReqList() {
    const {user}=useContext(AuthContext);
    const [books, setBooks] = useState([]);

    const handelAccept = async(index)=>{
        try {
        const isbnPre=books[index].isbnPre;
        const email = books[index].borrowReq.email;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            },
        };
        const {data}=await axios.post("api/book/borrowReqAccept",{isbnPre,email},config);
        alert(data.message);
        } catch (error) {
            alert(error.message);
        }
    }

    const handelCancel =async (index)=>{
        try {
            const isbnPre=books[index].isbnPre;
            const email = books[index].borrowReq.email;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                },
            };
            const {data}=await axios.post("api/book/borrowReqAccept",{isbnPre,email},config);
            alert(data.message);
            } catch (error) {
                alert(error.message);
            }
    }

    useEffect(() => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            },
        };
        const getBookBorrowReq = async () => {
            const response = await axios.get(`/api/book/borrowReqList`,config);
            const data = response.data;
            console.log(data);
            setBooks(data);
        }
        getBookBorrowReq();
    });
    return (
        <>
            <div className="appli-list">
                <div className="cards">
                    {
                        books.map((item, index) =>
                            <div className="card red" key={index}>
                                <div>
                                    <p className="tip">{item.title}</p>
                                </div>
                                <div>
                                    <p className="tip">{item.borrowReq.email}</p>
                                </div>
                                <div>
                                    <p className="tip">{item.author}</p>
                                </div>
                                <div>
                                    <p className="tip">{item.isbnPre}</p>
                                </div>
                                <div className='img'>
                                    <img height="50" width="50"
                                        src={item.image} alt="Cloud Chen" />
                                </div>
                                <div className="but-group">
                                    <div><button id="btn-green" onClick={handelAccept()}>Accept</button></div>
                                    <div><button id="btn-red" onClick={()=>handelCancel(index)}>Cancel</button></div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

        </>
    )
}

export default BorrowBookReqList