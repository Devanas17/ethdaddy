import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import { AppContext } from "../context/context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {modalStyles} from "../utils/constant"
import {Link, useNavigate, useLocation} from "react-router-dom"

import ListModal from "./ListModal";
import Modal from "react-modal"

// Modal.setAppElement('#yourAppElement');

const Navbar = () => {
  const { currentAccount, connectWallet } = useContext(AppContext);
  const navigate = useNavigate()
  const { search } = useLocation();
  const [routerQuery, setRouterQuery] = useState({});


  useEffect(() => {
    const searchParams = new URLSearchParams(search);
    setRouterQuery({
      domain: searchParams.get('domain')
    });
  }, [search]);

  return (
    <nav className=" flex items-center justify-between px-3 md:px-0 py-4 border-b max-w-7xl mx-auto ">
      <div className="flex items-center ">
        <ToastContainer />
        <img src={logo} className="object-contain h-8 w-8" alt="Logo" />
        <h1 className="font-bold text-2xl">ETH Daddy</h1>

        <ul className=" ml-8 hidden lg:flex items-center space-x-4">
          <li className="font-medium text-sm text-gray-500">
            <a href="/">Domain Names</a>
          </li>
          <li className="font-medium text-sm text-gray-500">
            <a href="/">Websites & Hosting</a>
          </li>
          <li className="font-medium text-sm text-gray-500">
            <a href="/">Commerce</a>
          </li>
          <li className="font-medium text-sm text-gray-500">
            <a href="/">Email & Marketing</a>
          </li>
        </ul>
      </div>

      <div className="flex items-center justify-end  space-x-4">

        <Link to={`/?domain=1`}>
        <button className="bg-black text-white flex items-center justify-center w-32 h-10 hover:opacity-80 ">List</button>
        </Link>

        {currentAccount ? (
          <button type="button" className="bg-black text-white px-5 py-2">
            {currentAccount.slice(0, 6) + "..." + currentAccount.slice(-5)}
          </button>
        ) : (
          <button
            type="button"
            className="bg-black text-white px-5 py-2"
            onClick={() => connectWallet()}
          >
            Connect
          </button>
        )}
      </div>

        <Modal
          isOpen={!!routerQuery.domain}
          onRequestClose={() => navigate("/")}
          style={modalStyles}
        >
          <ListModal />
        </Modal>
    </nav>
  );
};

export default Navbar;
