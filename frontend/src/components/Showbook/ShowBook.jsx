import React from 'react';
import "./Home.css";
import img from "./download.jpg";
import { useContext } from 'react';
import { AuthContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { BookContext } from '../../context/bookContext';

const Showbook = () => {
    const {books} = useContext(BookContext);
    const {user} = useContext(AuthContext);
    const nav= useNavigate();
    const handleClick = async (isbnPre)=>{
        console.log(user);
        if(!user){
            nav(`/login`);
        }
        else{
            nav(`/book/${isbnPre}`);
        }
    }
    return (
    <div className="home">
        <div className="card" >
            {
            books[0]&&<p onClick={() => handleClick(books[0].isbnPre)}><span>
            <img src={books[0].image} height="100px" width="100px" alt={img}/>
            title:{books[0].title}<br/>
            author:{books[0].author}<br/>
            genre:{books[0].genre}
            </span></p>
            }
            {
            books[2]&&<p onClick={() => handleClick(books[2].isbnPre)}><span>
            <img src={books[2].image} height="100px" width="100px" alt={img}/>
            title:{books[2].title}<br/>
            author:{books[2].author}<br/>
            genre:{books[2].genre}
            </span></p>
            }
            {
            books[4]&&<p onClick={() => handleClick(books[4].isbnPre)}><span>
            <img src={books[4].image} height="100px" width="100px" alt={img}/>
            title:{books[4].title}<br/>
            author:{books[4].author}<br/>
            genre:{books[4].genre}
            </span></p>
            }
            {
            books[6] && <p onClick={() => handleClick(books[6].isbnPre)}><span>
            <img src={books[6].image} height="100px" width="100px" alt={img}/>
            title:{books[6].title}<br/>
            author:{books[6].author}<br/>
            genre:{books[6].genre}
            </span></p>
            }
            {
            books[8] && <p onClick={() => handleClick(books[8].isbnPre)}><span>
            <img src={books[8].image} height="100px" width="100px" alt={img}/>
            title:{books[8].title}<br/>
            author:{books[8].author}<br/>
            genre:{books[8].genre}
            </span></p>
            }
        </div>
        <div className="card">
            {
            books[1]&&<p onClick={() => handleClick(books[1].isbnPre)}><span>
            <img src={books[1].image} height="100px" width="100px" alt={img}/>
            title:{books[1].title}<br/>
            author:{books[1].author}<br/>
            genre:{books[1].genre}
            </span></p>
            }
            {
            books[3]&&<p onClick={() => handleClick(books[3].isbnPre)}><span>
            <img src={books[3].image} height="100px" width="100px" alt={img}/>
            title:{books[3].title}<br/>
            author:{books[3].author}<br/>
            genre:{books[3].genre}
            </span></p>
            }
            {
            books[5]&&<p onClick={() => handleClick(books[5].isbnPre)}><span>
            <img src={books[5].image} height="100px" width="100px" alt={img}/>
            title:{books[5].title}<br/>
            author:{books[5].author}<br/>
            genre:{books[5].genre}
            </span></p>
            }
            {
            books[7] && <p onClick={() => handleClick(books[7].isbnPre)}><span>
            <img src={books[7].image} height="100px" width="100px" alt={img}/>
            title:{books[7].title}<br/>
            author:{books[7].author}<br/>
            genre:{books[7].genre}
            </span></p>
            }
            {
            books[9] && <p onClick={() => handleClick(books[9].isbnPre)}><span>
            <img src={books[9].image} height="100px" width="100px" alt={img}/>
            title:{books[9].title}<br/>
            author:{books[9].author}<br/>
            genre:{books[9].genre}
            </span></p>
            }
        </div>
    </div>
    )
}

export default Showbook;