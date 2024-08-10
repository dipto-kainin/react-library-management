import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import './borrowBookReqList.css';
import {AuthContext} from "../../context/UserContext";
import {useToast} from "@chakra-ui/react"

function BorrowBookReqList() {
    const {user}=useContext(AuthContext);
    const [books, setBooks] = useState([]);
    const toast = useToast();
    const [hasFetched, setHasFetched] = useState(false);

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
        toast({
            title: data.message,
            status: "success",
            isClosable: true,
        });
        setBooks(books.filter((_, i) => i!==index));
        } catch (error) {
            toast({
                title: error,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
    }

    const handelCancel =async (index)=>{
        try {
            const isbnPre=books[index].isbnPre;
            const userid = books[index].borrowReq.userId;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                },
            };
            const {data}=await axios.post("api/book/borrowReqCancel",{isbnPre,userid},config);
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
            if(data.message === "No books with borrow requests found" )
            {
                setBooks([]);
                toast({
                    title: data.message,
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
            }
            else
                setBooks(data);
            setHasFetched(true)
        }
        if(!hasFetched)
            getBookBorrowReq();
    });
    return (
        <>
            <div className="appli-list">
                <div className="cards">
                    {books &&
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
                                    <div><button id="btn-green" onClick={()=>handelAccept(index)}>Accept</button></div>
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