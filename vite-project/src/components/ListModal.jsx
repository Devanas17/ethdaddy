import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { AppContext } from "../context/context";
import {ethers} from "ethers";

const ListModal = () => {
  const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), "ether");
  };
  
  const { ListDomain } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [domainName, setDomainName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!domainName || !price) {
      toast.error("Please fill all the details");
    } else {
      toast.promise(ListDomain(domainName, price), {
        loading: "Listing Item... This can take a few seconds. ⏳",
        success: "Item listed! 🎉",
        error: "Error listing item. 😢",
      });
    }
    setIsLoading(false);
  };
  return (
    <div className="sell-container space-y-3  p-7 m-4 border-2 border-gray-300 rounded-md w-full bg-white">
      {isLoading ? <Loader /> : ""}

      <div className="sell-input-container flex flex-col px-2">
        <span className="sell-input-title text-lg font-semibold px-1">
          Domain Name
        </span>
        <input
          className="sell-input-textbox text-sm font-normal border border-gray-500 p-2 rounded-sm"
          type="text"
          placeholder="jack.eth"
          value={domainName}
          onChange={(event) => setDomainName(event.target.value)}
        />
      </div>
      <div className="sell-input-container flex flex-col px-2">
        <span className="sell-input-title text-lg font-semibold px-1">
          Price
        </span>
        <input
          className="sell-input-textbox text-sm font-normal border border-gray-500 p-2 rounded-sm"
          type="text"
          placeholder="ETH 0.50"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="sell-input-button text-base text-white bg-black font-semibold border-0 ml-2 px-3 py-1 rounded-md"
      >
        List Item
      </button>
    </div>
  );
};

export default ListModal;
