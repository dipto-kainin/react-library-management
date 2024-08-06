import React, { useEffect, useContext } from 'react';
import Showbook from '../components/Showbook/ShowBook';
import { useParams , useNavigate} from 'react-router-dom';
import axios from 'axios';
import { BookContext } from '../context/bookContext';
import Pagination from '../components/Pagination/Pagination';
import { useToast } from '@chakra-ui/react';
const Home = () => {
    const { pageNo } = useParams();
    const {setBooks} = useContext(BookContext);
    const toast = useToast();
    const nav = useNavigate();
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const page = pageNo || '1';
                const response = await axios.get(`/api/book/fetchBooks/${page}`);
                if(response.data.error)
                {
                    setBooks([]);
                    toast({
                        title: 'there are no books in this page',
                        description: 'redirecting to home page',
                        status: 'error',
                        duration: 2000,
                        isClosable:true
                    });
                    nav('/home/1');
                }
                else
                {
                    setBooks(response.data.data);
                }
                console.log(response.data.data)
            } catch (err) {
                console.log(err);
            }
        };
        fetchBooks();
    }, [pageNo,setBooks,nav,toast]);
    return (
        <div className='Home'>
            <Showbook/>
            <Pagination/>
        </div>
    );
};

export default Home;
