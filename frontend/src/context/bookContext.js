import React, { createContext, useState} from "react";

const BookContext = createContext();

const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    return (
        <BookContext.Provider value={{ books, setBooks ,selectedBook,setSelectedBook}}>
            {children}
        </BookContext.Provider>
    );
};

export { BookContext, BookProvider };
