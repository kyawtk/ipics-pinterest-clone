import { useRef } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import { Link, Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import UserProfile from "../pages/UserProfile";
import Pins from "../components/Pins";
import client from "../client";
import logo from "../assets/logo.png";

import { userQuery } from "../utils/data";
import { useEffect, useState } from "react";
const Home = () => {
  const [user, setUser] = useState({});
  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();
  useEffect(() => {
    const query = userQuery(userInfo?.sub);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  const [toggleSidebar, setToggleSidebar] = useState(false);
  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  });
  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-in-out">
      <div className="hidden md:flex h-screen bg-white flex-initial ">
        <Sidebar user={user && user} closeSidebar={setToggleSidebar} />
      </div>
      <div className="flex md:hidden w-full  shadow-lg  ">
        <div className="flex justify-between px-3 py-4 w-full items-center h-auto">
          <HiMenu
            fontSize={40}
            className="cursor-pointer "
            onClick={() => setToggleSidebar(true)}
          />{" "}
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          <Link to={`/user-profile/${user?._id}`}>
            <img
              src={user?.image}
              alt="logo"
              className="w-10 border border-l-green-700 border-spacing-2 rounded-full "
            />
          </Link>
          {toggleSidebar && (
            <div className="fixed top-0 left-0 w-full h-screen overflow-y-auto animate-slide-in bg-gray-50">
              <div className="absolute w-full flex justify-end p-3">
                <AiFillCloseCircle
                  fontSize={30}
                  onClick={() => setToggleSidebar(false)}
                  className="text-white cursor-pointer"
                ></AiFillCloseCircle>
              </div>
              <Sidebar user={user && user} closeSidebar={setToggleSidebar} />
            </div>
          )}
        </div>
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
