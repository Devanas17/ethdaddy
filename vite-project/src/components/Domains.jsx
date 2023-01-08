import React, { useState, useEffect, useContext } from "react";
import Domain from "./Domain";
import { AppContext } from "../context/context";

const Domains = () => {
  const { domains, ethDaddy, provider } = useContext(AppContext);

  return (
    <div className=" max-w-6xl mx-auto my-10 py-10 px-5">
      <h2 className=" text-center font-bold text-2xl sm:text-3xl md:text-4xl my-4">
        Why you need a domain name.
      </h2>
      <p className="text-center mx-10 my-3 ">
        Own your custom username, use it across services, and be able to store
        an avatar and other profile data.
      </p>

      <hr />

      <div className="cards w-[90%] mx-auto">
        {domains.map((domain, index) => (
          <Domain
            key={index}
            name={domain?.name}
            isOwned={domain?.isOwned}
            cost={domain?.cost}
            id={index + 1}
            ethDaddy={ethDaddy}
            provider={provider}
          />
        ))}
      </div>
    </div>
  );
};

export default Domains;
