import axios from "axios";
import React, { useRef} from "react";
import { useNavigate } from "react-router-dom";

const SendMoney: React.FC = () => {

  

  const navigate = useNavigate()
  const amountRef= useRef<HTMLInputElement>(null);
  const accountRef= useRef<HTMLInputElement>(null);

  const handlePay = async(e: React.FormEvent) => {
    e.preventDefault();

    if (!accountRef.current?.value || !amountRef.current?.value) {
      alert("Please fill in all fields.");
      return;
    }
    const success=await axios.post('https://paytm-backend-2ar9.onrender.com/api/v1/accounts/transfer',{
        amount:amountRef.current.value,
        to:accountRef.current.value
    },{
        headers:{
            authorization:localStorage.getItem("token")
        }
    }
)
    console.log(success)


    alert(`Payment of $${amountRef.current.value} to account ${accountRef.current.value} is ${success.data.msg}`);
    navigate('/dashboard')
    // reset form
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-blue-700 mb-2">Make a Payment</h1>
        <p className="text-gray-500 mb-6">Enter details to proceed</p>

        <form onSubmit={handlePay} className="space-y-4">
          {/* Account Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Number
            </label>
            <input
              type="number"
              ref={accountRef}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter account number"
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              ref={amountRef}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter amount"
              required
            />
          </div>

          {/* Pay Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendMoney;
