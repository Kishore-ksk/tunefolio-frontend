import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from '../api/ApiService';


function Home() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("Stored Token:", token);


    if (token) {
      ApiService.getUser()
        .then((res) => setUser(res.data))
        .catch((err) => setError("Error fetching user details."));
    }
  }, []);

  return (
    <div className="flex flex-col bg-gray-900 h-screen justify-center text-white items-center">
      <h1 className="text-3xl mb-5">Welcome to Tunefolio</h1>
      <Link to="/dashboard/uploads" className="bg-blue-500 rounded px-4 py-2">Upload</Link>
      {user ? (
        <p>Hello, {user.name}!</p>
      ) : (
        <>
          <p className="text-gray-400">You are not logged in.</p>
          <Link to="/login" className="text-blue-400 underline">Login here</Link>
        </>
      )}

      {error && <p className="text-red-500">{error}</p>}


    </div>
  );
}

export default Home;
