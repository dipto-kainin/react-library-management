import React, { useContext, useEffect, useState } from 'react'
import './Add_UpdateBook.css'
import { Container, Textarea, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { AuthContext } from '../../context/UserContext';
import { useParams, useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import GetStarted from '../GetStarted/GetStarted';

function Update() {
    const { user } = useContext(AuthContext);
    const {isbnPre} = useParams()
    const [currBook, setCurrBook] = useState();
    const [error, setError] = useState(null);
    const toast = useToast();
    const navigate=useNavigate();
    const [hasFetched,setHasFetched] = useState(false);

    useEffect(()=>{
        async function bookdata (){
            try{
                const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
                }
                const {data} = await axios.get(`/api/book/adminFetchBook/${isbnPre}`,config);
                if(data.error){
                    toast({
                        title: 'Error',
                        description: data.error,
                        status: 'error',
                        duration: 2000,
                        isClosable:true
                    });
                }
                else{
                    setCurrBook(data.data[0]);
                }
                setHasFetched(true);
            }catch(err){
                console.log(err);
            }
        }
        if(!hasFetched)
            bookdata();
    })


    const handleBack=(e)=>{
        e.preventDefault();
        navigate('/allBooks');
    }

    const handleDelete=async(id, isbnPre, index)=>{
        try{
            const config = {
                headers: {
                   'Content-Type': 'application/json',
                   Authorization: `Bearer ${user.token}`
                }
             }
            
            const response=await axios.post("/api/book/deleteSpecificCopy",{isbnPre, id}, config);
            console.log(response);
            
            //console.log(currBook);
            //currBook.isbn.splice(index, 1);
            
            
            if(response.data.message==="Successfully deleted copy")
            {
                toast({
                    title: `This copy is deleted successfully with id ${id}`,
                    description:response.message,
                    status: 'success',
                    isClosable: true,
                    duration:3000
                });
                window.location.reload();
                //navigate(`/book/${isbnPre}`);
            }
        }
        catch(error)
        {
            console.log(error); 
        }
    }

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('image', file);

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.post('/api/book/uploadImg', formData, config);

            if (data.imageUrl) {
                setCurrBook({ ...currBook, image: data.imageUrl });
                console.log(data.imageUrl);
            } else {
                setError(data.error || 'Error uploading image');
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        }
    };

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.post(`/api/book/updateBook`, currBook, config);
            if(data.message==="Book details updated successfully")
                toast({
                    title: 'Book updated successfully',
                    description:data.message,
                    status: 'success',
                    isClosable: true,
                    duration:2000
                });
            else{
                toast({
                    title: "can not update",
                    description:data.message,
                    status: 'error',
                    isClosable: true,
                    duration:2000
                });
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        }
    };

    return (
        <>{hasFetched && <div className="book" style={{ marginBottom: "2em" }}>
            <form className="form_main" onSubmit={handleSubmit}>
                {error && toast({
                    title: error.message,
                    description: error.message,
                    status: 'error',
                    isClosable: true
                })}
                <div className='book_Image' style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
                    <img src={currBook.image} alt="book" width="400px" />
                    <input type="file" onChange={handleImageChange} />
                </div>
                <div className="inputContainer">
                    <input
                        name="title"
                        value={currBook.title}
                        onChange={handleChange}
                        type="text"
                        className="inputField"
                        id="bookname"
                        placeholder="Book name"
                    />
                </div>
                <div className="inputContainer">
                    <input
                        name="author"
                        value={currBook.author}
                        onChange={handleChange}
                        type="text"
                        className="inputField"
                        id="authername"
                        placeholder="Author name"
                    />
                </div>
                <div className="inputContainer">
                    <input
                        name="genre"
                        value={currBook.genre}
                        onChange={handleChange}
                        type="text"
                        className="inputField"
                        id="typeofbook"
                        placeholder="Genre"
                    />
                </div>
                <div className="inputContainer">
                    <input
                        name="isbnPre"
                        value={currBook.isbnPre}
                        onChange={handleChange}
                        type="text"
                        className="inputField"
                        id="isbnpre"
                        placeholder="ISBN Pre"
                        contentEditable="false"
                    />
                </div>
                <div className="inputContainer">
                    <input
                        name="newIsbnPre"
                        onChange={handleChange}
                        type="text"
                        className="inputField"
                        id="isbnpre"
                        placeholder="new Isbn Pre"
                    />
                </div>
                <div className="inputContainer">
                    <Textarea
                        name="description"
                        value={currBook.description}
                        onChange={handleChange}
                        placeholder="Description"
                    />
                </div>
                <div className="button-container">
                    <button type="button" className="button" onClick={(e)=>handleBack(e)}>Back</button>
                    <button type="submit" className="button">Update</button>
                </div>
            </form>
            <Container
                maxW="lg"
                centerContent
            >
                <div className="appli-list">
                    <div className="cards">
                        {currBook &&
                            currBook.isbn.map((item, index) =>
                                <div className="card red" key={index}>
                                    <div>
                                        <p className="tip">{item.id}</p>
                                    </div>
                                    <div>
                                        <p className="tip">{item.borrowedBy?.email || "Not Borrowed"}{item.borrowedBy?.email || <MdDelete onClick={()=>handleDelete(item.id, currBook.isbnPre, index)}/>}</p>
                                    </div>
                                    <div>
                                        <p className="tip">{item.borrowedAt || "Not Borrowed yet"}</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </Container>
        </div>}</>
    );
}

export default Update;