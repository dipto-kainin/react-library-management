import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BookProvider } from './context/bookContext';
import { AuthProvider } from './context/UserContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BookProvider>
    <ChakraProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
    </ChakraProvider>
    </BookProvider>
  </React.StrictMode>
);
reportWebVitals();
