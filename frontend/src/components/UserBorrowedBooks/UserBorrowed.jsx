import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, Table, Tbody, Td, Text, Thead, Th, Tr, Image , useToast} from '@chakra-ui/react';
import { AuthContext } from '../../context/UserContext';
import axios from 'axios';
import Loader from '../Loader/Loader';
import "./UserBorrowed.css"

const UserBorrowed = () => {
    const { user } = useContext(AuthContext);
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasFetched, setHasFetched] = useState(false);
    const toast = useToast();

    useEffect(() => {
        async function getMyBorrowedBook() {
            if (hasFetched) return;

            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.token}`
                    },
                };
                const response = await axios.get(`/api/user/borrowed/`, config);
                const data = response.data;
                if (Array.isArray(data)) {
                    setBorrowedBooks(data);
                } else {
                    setBorrowedBooks([]);
                }

                setLoading(false);
                setHasFetched(true);
            } catch (error) {
                console.error("Error fetching borrowed books:", error);
                setLoading(false);
            }
        }
        getMyBorrowedBook();
    }, [user.token, hasFetched]);

    const returnReq = async (isbnid)=>{
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }
        const {data} = await axios.post('/api/book/returnReq/',{isbnid},config);
        console.log(data);
        if(data.message === 'return request updated successfully'){
            toast({
                title: 'Return Request Sent',
                description: 'Your return request has been sent to the library.',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        }
        else{
            toast({
                title: 'Error',
                description: 'Failed to send return request.',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    }


    return (
        <div className='userBorrowed'>
            {!loading ? (
                <Container maxW="container.xl">
                    <Box
                        bg="rgba(0,0,0,0.1)"
                        style={{
                            backdropFilter: "blur(15px) brightness(80%)"
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
                            User Borrowed Books
                        </Text>
                        <Table variant="simple">
                            <Thead>
                                <Tr >
                                    <Th textColor="white">Title</Th>
                                    <Th textColor="white">Author</Th>
                                    <Th textColor="white">Isbn Id</Th>
                                    <Th textColor="white">Genre</Th>
                                    <Th textColor="white">Image</Th>
                                    <Th textColor="white">Decision</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {borrowedBooks.map((book, index) => (
                                    <Tr key={index}>
                                        <Td>{book.title}</Td>
                                        <Td>{book.author}</Td>
                                        <Td>{book.isbnid}</Td>
                                        <Td>{book.genre}</Td>
                                        <Td>
                                            <Image src={book.image} alt={book.title} boxSize="50px"/>
                                        </Td>
                                        <Td class="tick-cross">
                                            <div><button id="btn-blue" onClick={()=>returnReq(book.isbnid)}>Return?</button></div>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                </Container>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default UserBorrowed;
