import React, {useState, useContext} from 'react';
import './Pagination.css';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useParams, useNavigate } from 'react-router-dom';
import { BookContext } from '../../context/bookContext';

function Pagination() {

    const navigate=useNavigate();
    const {pageNo}=useParams();

    const [activePage, setActivePage]=useState(1);

    const {books} = useContext(BookContext);
    


    const totalPages=5;

    const handlePrev=()=>{
        if(activePage===1)
        {
            setActivePage(1);
            navigate(`/home/1`);
        }
        else
        {
            setActivePage(prev=> prev-1);
            navigate(`/home/${Number(pageNo)-1}`);
        }
    }

    const handleNext=()=>{
        if(activePage===5)
        {
            setActivePage(1);
            navigate(`/home/1`);
        }
        else
        {
            setActivePage(prev=> prev+1);
            navigate(`/home/${Number(pageNo)+1}`);
        }
    }


    const handlePageClick=(pageNumber)=>{
        setActivePage(pageNumber);
        navigate(`/home/${Number(pageNumber)}`);
    }


    return (
        <div className='pagination'>
            <div className='toControl-overflow'>
                <button onClick={handlePrev} className='btn' disabled={books.length === 0}><IoIosArrowBack/></button>
                {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    return (
                        <p 
                            key={pageNumber} 
                            onClick={() => handlePageClick(pageNumber)}
                            className={activePage === pageNumber ? 'active' : ''}
                        >
                            {pageNumber}
                        </p>
                    );
                })}
                <button onClick={handleNext} className='btn' disabled={books.length === 0}><IoIosArrowForward /></button>
            </div>
        </div>
    );
}

export default Pagination;