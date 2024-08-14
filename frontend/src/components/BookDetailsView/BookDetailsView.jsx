import React, { useEffect, useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookDetailsView.css';
import { Box, Container, Image, Table, Tbody, Td, Text, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { AuthContext } from '../../context/UserContext';

function Bookdetails() {
   const {user} = useContext(AuthContext)
   const navigate = useNavigate();
   const [books, setBooks] = useState([]);
   const [error, setError] = useState(null);
   const [hasFetched, setHasFetched] = useState(false);
   const [searchTerm, setSearchTerm] = useState('');
   const toast = useToast();
   const tableRef = useRef(null);

   useEffect(() => {
      const fetchBooks = async () => {
         try {
            const { data } = await axios.get('/api/book/fetchAll');
            if (data.error) {
               setError(data.error);
            } else {
               setBooks(data.data);
            }
         } catch (err) {
            setError(err);
         }
         setHasFetched(true);
      };
      if (!hasFetched) {
         fetchBooks();
      }
   }, [hasFetched]);

   const handleViewBook = (isbnPre) => {
      navigate(`/book/${isbnPre}`);
   };

   const handleSearch = () => {
      const index = books.findIndex(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.isbnPre.includes(searchTerm));
      if (index !== -1 && tableRef.current) {
         tableRef.current.children[index].scrollIntoView({ behavior: 'smooth' });
      }
   };

   const handleClick = async (isbnPre) => {
      try{
         const config = {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${user.token}`
            }
         }
         const response = await axios.delete(`/api/book/deleteBook/${isbnPre}`, config);
         toast({
            title: 'Success',
            description: response.data.message,
            status:'success',
            isClosable:true,
            duration:2000,
         });
         setBooks(books.filter(book => book.isbnPre!== isbnPre));

      }catch(err){
         toast({
            title: 'Error',
            description: err.message,
            status: 'error',
            isClosable:true,
            duration:2000,
         });
      }
   };

   return (
      <div className='BookDetailsView'>
         {error && toast({
            title: 'Error',
            description: error.message,
            status: 'error',
            duration: 2000,
         })}
         <div className="bookdet">
            <div className="input-wrapper">
               <button className="icon" onClick={() => handleSearch()}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15px" width="20px">
                     <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#fff" d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"></path>
                     <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#fff" d="M22 22L20 20"></path>
                  </svg>
               </button>
               <input
                  placeholder="Enter Name or isbnPre"
                  className="input"
                  name="text"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <>
               <Container maxW="container.xl">
                  <Box
                     bg="rgba(0,0,0,0.1)"
                     style={{
                        backdropFilter: "blur(15px) brightness(80%)",
                        maxHeight: '80vh',
                        overflowY: 'auto'
                     }}
                     p={4}
                     borderRadius="2em"
                     display="flex"
                     flexDirection="column"
                  >
                     <Text
                        fontSize="2xl"
                        fontWeight="bold"
                        textAlign="center"
                     >
                        Books Return Request
                     </Text>
                     <Table variant="simple">
                        <Thead>
                           <Tr>
                              <Th textColor="white" fontSize="medium">Title</Th>
                              <Th textColor="white" fontSize="medium">Author</Th>
                              <Th textColor="white" fontSize="medium">isbn</Th>
                              <Th textColor="white" fontSize="medium">Image</Th>
                              <Th textColor="white" fontSize="medium" fontWeight="900" textAlign={'center'}>Decision</Th>
                           </Tr>
                        </Thead>
                        <Tbody ref={tableRef}>
                           {books.map((book, index) => (
                              <Tr key={index}>
                                 <Td>{book.title}</Td>
                                 <Td>{book.author}</Td>
                                 <Td>{book.isbnPre}</Td>
                                 <Td>
                                    <Image src={book.image} alt={book.title} boxSize="50px" />
                                 </Td>
                                 <Td className="tick-cross">
                                    <div className="but-group">
                                       <div>
                                          <button id="btn-green" onClick={() => handleViewBook(book.isbnPre)}>View</button>
                                       </div>
                                       <div>
                                          <button
                                             id="btn-red"
                                             onClick={() => handleClick(book.isbnPre)}
                                          >
                                             Delete
                                          </button>
                                       </div>
                                    </div>
                                 </Td>
                              </Tr>
                           ))}
                        </Tbody>
                     </Table>
                  </Box>
               </Container>
            </>
         </div>
      </div>
   );
}

export default Bookdetails;
