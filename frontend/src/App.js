import './App.css';
import { BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import UserNavbar from './components/Navbar/UserNavbar';
import Signin from './components/SignIn/Signin';
import SignUp from './components/SignUp/SignUp';
import UserInfo from './components/User/Userinfoupdate';
import { AuthContext } from './context/UserContext';
import Home from './pages/Home';
import ShowSpecificBook from './components/ShowSpecificBook/ShowSpecificBook';
import { useContext } from 'react';
import Showbook from './components/Showbook/ShowBook';
import UserBorrowed from './components/UserBorrowedBooks/UserBorrowed';
import AdminNavbar from './components/Navbar/AdminNavbar';
import AdminPortal from './pages/AdminPortal';

function App() {
  const {user}=useContext(AuthContext);
  console.log(user);
  return (
    <div className="App">
        {user && user.role==="Admin" ? (
          <BrowserRouter>
            <AdminNavbar/>
            <div className="inside">
            <Routes>
              <Route path={"/"} element={<AdminPortal/>}/>
              <Route path="/home/*" element={<Navigate to="/" />} />
            </Routes>
            </div>
          </BrowserRouter>
          ):(
          <BrowserRouter>
            <UserNavbar />
            <div className="inside">
              <Routes>
                <Route path="/home/:pageNo" element={<Home />} />
                <Route path="/login" element={<Signin />} exact />
                <Route path="/signup" element={<SignUp />} exact />
                <Route path="/search" element={<Showbook />} />
                <Route path="/user/" element={user && <UserInfo />} exact />
                <Route path="/user/MyBorrowed/" element={user && <UserBorrowed />} exact />
                <Route
                  path="/book/:isbnPre"
                  element={<ShowSpecificBook />}
                  exact
                />
                <Route path="/home/" element={<Navigate to="/home/1" />} />
              </Routes>
            </div>
          </BrowserRouter>
          )
        }
    </div>
  );
}

export default App;
