import React, { useState, useEffect } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import Company from './component/admin/route/Company';
import Home from './component/admin/route/Home';
import Particular from './component/admin/route/Particular';
import Register from './component/login/Register';
import SignIn from './component/login/SignIn';
import Profile from './component/user/common/Profile';
import EditEvent from './component/user/company/components/EditEvent';
import NewEvent from './component/user/company/components/NewEvent';
import ViewEvents from './component/user/company/components/ViewEvents';
import Events from './component/user/particular/components/Events';
import Tickets from './component/user/particular/components/Tickets';
import Validate from './component/user/particular/components/Validate';
import { user } from './service/UserService';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkTokenValidity = async () => {
    try {
      const response = await user.currentUser();
      if (response.data) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkTokenValidity();
  }, []);

  const isUserLoggedIn = () => {
    return isLoggedIn;
  };

  if (loading) {
    return (
      <div className='text-center' id='loading'>
        <BeatLoader color='#000' size={15} />
      </div>
    );
  }

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route index element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={isUserLoggedIn() ? <Home /> : <Navigate to="/" replace />}
          />
          <Route
            path="/particular"
            element={isUserLoggedIn() ? <Particular /> : <Navigate to="/" replace />}
          />
          <Route
            path="/company"
            element={isUserLoggedIn() ? <Company /> : <Navigate to="/" replace />}
          />
          <Route
            path="/newEvent"
            element={isUserLoggedIn() ? <NewEvent /> : <Navigate to="/" replace />}
          />
          <Route
            path="/editEvent"
            element={isUserLoggedIn() ? <EditEvent /> : <Navigate to="/" replace />}
          />
          <Route
            path="/viewEvents"
            element={isUserLoggedIn() ? <ViewEvents /> : <Navigate to="/" replace />}
          />

          <Route
            path="/events"
            element={isUserLoggedIn() ? <Events /> : <Navigate to="/" replace />}
          />

          <Route
            path="/profile"
            element={isUserLoggedIn()? <Profile /> : <Navigate to="/" replace />}
          />

          <Route
            path="/myTickets"
            element={isUserLoggedIn() ? <Tickets /> : <Navigate to="/" replace />}
          />

          <Route
            path="/validate"
            element={<Validate />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
