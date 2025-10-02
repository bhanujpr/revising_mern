import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const [username,setUsername]=useState("user");
  const [balance,setBalance]=useState(null);
  const [accNumbr,setAccNumber]=useState(null);
  const [users,setUsers]=useState([]);
  useEffect(()=>{
    const token = localStorage.getItem("token")
    console.log(token)
    async function fetchData(){
     const res = await axios.get('http://localhost:3000/api/v1/user/details',{
        headers:{
          authorization:localStorage.getItem("token")
        }
      })
      setBalance(res.data.balance)
      setUsername(res.data.username)
      setAccNumber(res.data.accountNumber)
      setUsers(res.data.allUser)
      console.log(users)
    }
    fetchData();
    // console.log("user" + user)
  },[username])
  

  // Function to get initials from user name
  // const getInitials = (name: string) => {
  //   return name
  //     .split(" ")
  //     .map((n) => n[0])
  //     .join("")
  //     .toUpperCase()
  //     .slice(0, 2);
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">Payments App</h1>
        <div className="flex items-center space-x-3">
          <span className="text-gray-600">
            Hello, <span className="font-semibold">{username}</span>
          </span>
          <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
            U
          </div>
        </div>
      </header>

      {/* Balance Section */}
      <section className="p-6">
        <div className="bg-white shadow-lg rounded-2xl p-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-600">Account Number</h2>
            <p className="text-2xl font-bold text-blue-700">{accNumbr}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-600">Account Balance</h2>
            <p className="text-2xl font-bold text-blue-700">{balance}Rs</p>
          </div>
        </div>
      </section>

      {/* Users Section */}
      <section className="flex-1 p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Users</h2>

        {/* Search bar */}
        <input
          type="text"
          placeholder="Search users..."
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        {/* Users list */}
        <div className="space-y-4">
  {users.map((user) => (
    <div
      key={user.accountNumber} // unique key
      className="bg-white shadow-sm rounded-xl p-4 flex justify-between items-center hover:shadow-md transition"
    >
      <div className="flex items-center space-x-3">
        {/* Avatar with first letter of username */}
        <div className="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center font-bold">
          {user.username.charAt(0).toUpperCase()}
        </div>

        {/* Show username and account number */}
        <div>
          <span className="block font-medium text-gray-700">{user.username}</span>
          <span className="text-sm text-gray-500">Acct: {user.accountNumber}</span>
        </div>
      </div>

      <button 
      onClick={()=>{navigate('/transfer')}}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
        Send Money
      </button>
    </div>
  ))}
</div>

      </section>
    </div>
  );
};

export default Dashboard;
