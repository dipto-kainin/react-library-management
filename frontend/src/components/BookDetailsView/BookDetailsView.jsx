import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./BookDetailsView.css";

function Bookdetails() {
   const navigate = useNavigate();
   function addBook() {
      navigate('/addbook')
   }
   function vieworUpdate() {
      navigate('/update')
   }
   const list = [
      {
         id: 1,
         bookname: "let us c",
         auther: "abc",
         genre: "programming",
         isbn: "123"
      },

      {
         id: 2,
         bookname: "engineering mathamatics",
         auther: "das&pal",
         genre: "mathamatics",
         isbn: "124"
      },

      {
         id: 3,
         bookname: "AI",
         auther: "abc",
         genre: "artificial intelligence",
         isbn: "125"
      },
      {
         id: 4,
         bookname: "Indian cons.",
         auther: "def",
         genre: "abc",
         isbn: "126"
      },
   ]
   // const [lists,setList] =useState(list);
   return (
      <div className='BookDetailsView'>
         <div className="bookdet">
            <div className="input-wrapper">
               <button className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15px" width="20px">
                     <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#fff" d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"></path>
                     <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#fff" d="M22 22L20 20"></path>
                  </svg>
               </button>
               <input placeholder="search.." className="input" name="text" type="text" />
            </div>

            <div className="card">
               <div className="card__title">Books Details</div>
               <div className="card__data">
                  <div className="card__left">
                     {
                        list.map((current) => (
                           <div class="item">{current.id}</div>
                        ))
                     }
                  </div>
                  <div className="card__left">
                     {
                        list.map((current) => (
                           <div class="item">{current.bookname}</div>
                        ))
                     }
                  </div>
                  <div className="card__left">
                     {
                        list.map((current) => (
                           <div class="item">{current.auther}</div>
                        ))
                     }
                  </div>
                  <div className="card__left">
                     {
                        list.map((current) => (
                           <div class="item">{current.genre}</div>
                        ))
                     }
                  </div>
                  <div className="card__left">
                     {
                        list.map((current) => (
                           <div class="item">{current.isbn}
                           </div>
                        ))
                     }
                  </div>
                  <div className="card__right">
                     {
                        list.map((current) => (
                           <div class="item">
                              <button onClick={vieworUpdate}>
                                 <div className="default-btn">
                                    <svg className="css-i6dzq1" stroke-linejoin="round" stroke-linecap="round" fill="none" stroke-width="2" stroke="#FFF" height="20" width="20" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle r="3" cy="12" cx="12"></circle></svg>

                                 </div>
                                 <div className="hover-btn">
                                    <svg className="css-i6dzq1" stroke-linejoin="round" stroke-linecap="round" fill="none" stroke-width="2" stroke="#ffd300" height="20" width="20" viewBox="0 0 24 24"><circle r="1" cy="21" cx="9"></circle><circle r="1" cy="21" cx="20"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                    <span>Quick View</span>
                                 </div>
                              </button>
                           </div>
                        ))
                     }
                  </div>
                  {/* <div className="card__right">
                  {
               list.map((current)=>(
                  <div className="item">
                     <button class="edit-button">
  <svg class="edit-svgIcon" viewBox="0 0 512 512">
                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                  </svg>
</button>
</div>
               ))
            }
               </div> */}

                  <div className="card__right">
                     {
                        list.map((current) => (
                           <div className="item">
                              <button class="Btn">
                                 <div class="sign">
                                    <svg
                                       viewBox="0 0 16 16"
                                       class="bi bi-trash3-fill"
                                       fill="currentColor"
                                       height="18"
                                       width="18"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"
                                       ></path>
                                    </svg>
                                 </div>

                                 <div class="text">Del </div>
                              </button>

                           </div>
                        ))
                     }
                  </div>

               </div>
            </div>
            <button className="cssbuttons-io-button" onClick={addBook} >
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path></svg>
               <span>Add</span>
            </button>
         </div>
      </div>
   );
}

export default Bookdetails;