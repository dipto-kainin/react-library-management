import React, { useState, useContext } from 'react'
import './UserDetailsSearch.css'
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import {AuthContext} from '../../context/UserContext'
import { useToast } from '@chakra-ui/react';

function UserDetailsSearch() {
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);
    const {user}=useContext(AuthContext);
    const toast = useToast()

    const handleSearch = async () => {
        if (search) {
            const encodedSearch = encodeURIComponent(search);
            const config ={
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            }
            axios.get(`api/user/search/${encodedSearch}`, config)
                .then(res => {
                    if (res.data) {
                        setResult(res.data);
                    }
                })
                .catch(err =>
                {
                    toast({
                        title: "Error",
                        status: "error",
                        duration: 2000,
                        isClosable: true,
                    })
                    setResult([]);
                }
                );
        }
        else {
            setResult([]);
            toast({
                title: "Search Results",
                status: "success",
                duration: 2000,
                isClosable: true,
            })
        }
    };

    return (
        <div className="userSearchAdmin">
            <div className="card">
                <div className='searchandbtn'>
                <div className="inputBox_container">
                    <input className="inputBox" id="inputBox" type="text" placeholder="Search Users..." onChange={(e) => { setSearch(e.target.value) }} />
                </div>
                <button onClick={handleSearch} className='searchbtn'><FaSearch /></button>
                </div>
                {
                    result && result.data && (
                        <div className='showData'>
                            <div className='userimg'>
                                <img src={result.data.pic} alt="" width={100}></img>
                            </div>
                            <div className='otherdetails'>
                                <p className='userparagraph'><span>{"Name: "}</span>{result.data.name}</p>
                                <p className='userparagraph'><span>{"Email: "}</span>{result.data.email}</p>
                                <p className='userparagraph'><span>{"Address: "}</span>{result.data.address}</p>
                            </div>
                        </div>
                    )
                }
                {
                    result && result.borrwedBooks && (
                        <div className="appli-list">
                            <div className="cards">
                                <div className="card red">
                                    <div className='img'>
                                        <img height="50" width="50"
                                            src={result.borrwedBooks.image} alt="Cloud Chen" />
                                    </div>
                                    <div>
                                        <p className="tip">{result.borrwedBooks.title}</p>
                                    </div>
                                    <div>
                                        <p className="tip">{result.borrwedBooks.author}</p>
                                    </div>
                                    <div>
                                        <p className="tip">{result.borrwedBooks.isbnPre}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
export default UserDetailsSearch;