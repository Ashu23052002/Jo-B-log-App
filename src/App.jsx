import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import conf from "./conf/conf.js";
import authService from "./appwrite/auth.js";
import { login, logout } from "./store/authSlice.js";
import { Header, Footer } from "./components/index.js";
import { Outlet } from "react-router-dom";
import LogoutBtn from "./components/Header/LogoutBtn.jsx";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        dispatch(logout());
        console.log("Error in app.jsx in useEffect getting userData: ", error);
      } finally {
        setLoading(false);
      }
    };
    console.log("match");
    fetchUserData();
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          {/* TODO:  */}
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
