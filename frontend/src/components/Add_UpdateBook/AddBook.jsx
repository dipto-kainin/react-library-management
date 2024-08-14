import React, { useContext, useState } from 'react';
import './Add_UpdateBook.css';
import { AuthContext } from '../../context/UserContext';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Addbook(props) {
  const {user} = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [author, setAuthorname] = useState("");
  const [genre, setGenre] = useState("");
  const [isbnPre, setIsbnpre] = useState("");
  const [description, setDescription] = useState("");
  const [copies, setCopies] = useState(1);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const toast =useToast();
  const nav =useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
          Authorization: `Bearer ${user.token}`,
      },
    };
    const res = await axios.post("/api/book/addBook",{
      title,
      author,
      genre,
      isbnPre,
      description,
      copies,
      image
    },config);
    if(res.data.message === "book added successfully"){
      nav('/view');
      toast({
        title: 'Book Added',
        description: 'Book Added Successfully',
        status: 'success',
      });
    }
    else{
      setError(res.message);
    }
  };

  const handleImageChange =async (e) => {
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
            setImage(data.imageUrl);
        } else {
            setError(data.error || 'Error uploading image');
        }
    } catch (error) {
        setError(error.response?.data?.message || error.message);
    }
  };

  const handleImageClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="book">
      <form className="form_main" onSubmit={handleSubmit} on>
        {error && <div className="error">{error}</div>}
        <p className="heading">Add book details</p>
        <div className="inputContainer">
          <input
            type="text"
            className="inputField"
            id="bookname"
            placeholder="Book name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <input
            type="text"
            className="inputField"
            id="authorname"
            placeholder="Author name"
            value={author}
            onChange={(e) => setAuthorname(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <input
            type="text"
            className="inputField"
            id="typeofbook"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <input
            type="text"
            className="inputField"
            id="isbnpre"
            placeholder="ISBN pre"
            value={isbnPre}
            onChange={(e) => setIsbnpre(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <input
            type="text"
            className="inputField"
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <input
            type="number"
            className="inputField"
            id="copies"
            placeholder="No of copies"
            value={copies}
            onChange={(e) => setCopies(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <form className="file-upload-form">
            <label htmlFor="file" className="file-upload-label">
              <div className="file-upload-design">
                <svg viewBox="0 0 680 512" height="1em">
                  <path
                    d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
                  ></path>
                </svg>
                <p className="Parag">Drag and Drop &nbsp;&nbsp;or</p>
                <span className="browse-button">Browse file</span>
              </div>
              <input
                id="file"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </form>
        </div>
        {image && (
          <button type="button" className="button" onClick={handleImageClick}>
            View Image
          </button>
        )}
        {showPopup && (
          <div className="popup">
            <span className="close" onClick={handleClosePopup}>&times;</span>
            <img src={image} alt="Uploaded" />
          </div>
        )}
        <div className="button-container">
          <button type="submit" className="button">Submit</button>
          <button type="button" className="button" onClick={()=>nav('/home/')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default Addbook;
