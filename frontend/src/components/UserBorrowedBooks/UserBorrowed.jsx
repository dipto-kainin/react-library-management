import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, Table, Tbody, Td, Text, Thead, Th, Tr, Image } from '@chakra-ui/react';
import { AuthContext } from '../../context/UserContext';
import axios from 'axios';
import Loader from '../Loader/Loader';

const UserBorrowed = () => {
    const { user } = useContext(AuthContext);
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasFetched, setHasFetched] = useState(false);

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

                // Ensure the data is an array before setting it
                if (Array.isArray(data)) {
                    setBorrowedBooks(data);
                } else {
                    //alert(data.message);
                    setBorrowedBooks([]);
                }

                setLoading(false);
                setHasFetched(true); // Set flag to true after fetching
            } catch (error) {
                console.error("Error fetching borrowed books:", error);
                setLoading(false);
            }
        }
        getMyBorrowedBook();
    }, [user.token, hasFetched]);


    return (
        <>
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
                                    <Th textColor="white">Genre</Th>
                                    <Th textColor="white">Image</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {borrowedBooks.map((book, index) => (
                                    <Tr key={index}>
                                        <Td>{book.title}</Td>
                                        <Td>{book.author}</Td>
                                        <Td>{book.genre}</Td>
                                        <Td>
                                            <Image src={book.image} alt={book.title} boxSize="50px" />
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
        </>
    );
};

export default UserBorrowed;
