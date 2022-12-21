import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
// import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
// import Edit from "./components/edit";
import Create from "./components/create";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import useToken from "./components/useToken";

const App = () => {
  const { token, setToken } = useToken();

  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        {/* <Route exact path="/" element={<RecordList />} /> */}
        {/* <Route path="/edit/:id" element={<Edit />} /> */}
        {/* <Route path="/create" element={<Create />} /> */}
        {/* <Route path="login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Signup />} /> */}
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
