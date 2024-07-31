import React, {useContext} from 'react';
import './Pagination.css';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useParams, useNavigate } from 'react-router-dom';
import { BookContext } from '../../context/bookContext';

function Pagination() {

    const navigate=useNavigate();
    const {pageNo}=useParams();

    const {books} = useContext(BookContext);

    const handlePrev=()=>{
        navigate(`/home/${Number(pageNo)-1}`);
    }

    const handleNext=()=>{
        navigate(`/home/${Number(pageNo)+1}`);
    }

    return (
        <div className='pagination'>
            <div className='toControl-overflow'>
                <button
                    onClick={handlePrev}
                    className={`btn ${pageNo !=='1' ? 'enabled' : ''}`}
                    disabled={pageNo === '1'}
                >
                    <IoIosArrowBack />
                </button>
                <button
                    onClick={handleNext}
                    className={`btn ${books.length >= 10 ? 'enabled' : ''}`}
                    disabled={books.length < 10}
                >
                    <IoIosArrowForward />
                </button>
            </div>
        </div>
    );
}

export default Pagination;