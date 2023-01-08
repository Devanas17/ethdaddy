import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { AppContext } from "../context/context";
import Loader from "./Loader";

const Domain = ({ name, isOwned, cost, id, ethDaddy, provider }) => {
  const { loadBlockchainData } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false)
  const [owner, setOwner] = useState(null);
  const [hasSold, setHasSold] = useState(false);

  const getOwner = async () => {
    if (isOwned || hasSold) {
      const owner = await ethDaddy.ownerOf(id);
      setOwner(owner);
    }
  };

  const buyHandler = async () => {
    const signer = await provider.getSigner();
    setIsLoading(true)
    const transaction = await ethDaddy
      .connect(signer)
      .mint(id, { value: cost });

    await transaction.wait();
    setHasSold(true);

    getOwner()
    setIsLoading(false)
  };

  useEffect(() => {
    getOwner();
  }, []);
  return (
    <div className="card flex justify-between items-center w-[90%] h-[60px] border border-gray-800 my-6 pl-6 relative transition-all duration-200 ease-in">
      {isLoading ? <Loader /> : ""}
      <div className="card__info flex justify-between items-center text-center flex-grow">
        <h3 className=" font-bold sm:text-xl md:text-2xl">
          {isOwned || owner ? <del>{name}</del> : <>{name}</>}
        </h3>

        <p className=" font-light text-lg mx-6">
          {isOwned || owner ? (
            <>
              <small className="text-sm">
                Owned by:
                <br />
                <span className="font-semibold">
                  {owner && owner.slice(0, 6) + "..." + owner.slice(38, 42)}
                </span>
              </small>
            </>
          ) : (
            <>
              <strong className=" font-semibold text-lg">
                {ethers.utils.formatUnits(cost.toString(), "ether")}
              </strong>
              ETH
            </>
          )}
        </p>
      </div>

      {!isOwned && !owner && (
        <button
          type="button"
          className="card__button justify-end  w-[120px] h-[100%] bg-black text-white border-0 text-base cursor-pointer transition-all duration-200 ease-in hover:bg-gray-800 hover:border-gray-800"
          onClick={() => buyHandler()}
        >
          Buy It
        </button>
      )}
    </div>
  );
};

export default Domain;
