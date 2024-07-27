import React, { useEffect, useContext } from 'react';
import Showbook from '../components/Showbook/ShowBook';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BookContext } from '../context/bookContext';
const Home = () => {
    const { pageNo } = useParams();
    const {setBooks} = useContext(BookContext); 
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const page = pageNo || '1';
                const response = await axios.get(`/api/book/fetchBooks/${page}`);
                setBooks(response.data.data);
                console.log(response.data.data)
            } catch (err) {
                console.log(err);
            }
        };
        fetchBooks();
    }, [pageNo,setBooks]);
    return (
        <div className='Home'>
            <Showbook/>
        </div>
    );
};

export default Home;
