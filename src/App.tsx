import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Dasboard from './layouts/Dashboard';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import "../src/assets/scss/paper-dashboard.scss"
import List from './claims/List';
import AddNew from './claims/AddNew';
import AwaitingPayments from './AwaitingPayments/AwaitingPayments';
import ReviewClaims from './reviewClaims/ReviewClaims';
import Login from './accounts/login/Login';


function App() {
  return (
    <div className="App">
        <Router>
        <Routes>
          <Route path="/claims" element={<List />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/claim/add-new" element={<AddNew />} />
          <Route path="/claims/review" element={<ReviewClaims />} />
          <Route path="/claims/review/paymnent" element={<AwaitingPayments />} />
          <Route path="*" element={<Navigate to="/Login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


