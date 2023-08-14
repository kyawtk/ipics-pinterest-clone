import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
const Nabar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="flex gap-2 md:gap-5 mt-5 pb-7 items-center w-full ">
      <div className="flex py-3 items-center justify-start w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-lg ">
        <IoMdSearch className="  z-50 text-gray-400" size={20}></IoMdSearch>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className=" px-3 outline-none w-full bg-white "
          type="text"
          placeholder="Search"
          onFocus={() => navigate("/search")}
        />
      </div>
      <div className="flex  items-center gap-3 ">
        <Link to="/create-pin">
          <IoMdAdd
            className="text-sm text-gray-200 bg-gray-900 rounded-lg w-10 h-10 md:w-12 md:h-12"
            size={20}
          ></IoMdAdd>
        </Link>
        <Link to={`/user-profile/${user?._id}`} className="hidden md:block">
          <img
            className="w-14 rounded-full"
            src={user.image}
            alt="user image"
          />
        </Link>
      </div>
    </div>
  );
};

export default Nabar;
