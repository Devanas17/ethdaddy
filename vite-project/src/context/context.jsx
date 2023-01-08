import { useState, useEffect, createContext } from "react";
import { contractABI, contractAddress } from "../utils/constant";
import { ethers } from "ethers";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [provider, setProvider] = useState(null);
  const [ethDaddy, setETHDaddy] = useState(null);
  const [domains, setDomains] = useState([]);

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have MetaMask!");
        return;
      } else {
        const accounts = await ethereum.request({ method: "eth_accounts" });

        if (accounts.length !== 0) {
          const account = accounts[0];
          setCurrentAccount(account);
        } else {
          console.log("No authorized account found");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Make sure you have Metamask");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum object found!");
    }
  };

  const loadBlockchainData = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
      const ethDaddy = new ethers.Contract(
        contractABI,
        contractAddress,
        provider
      );
      setETHDaddy(ethDaddy);
      const maxSupply = await ethDaddy.maxSupply();
      const domains = [];

      for (var i = 1; i <= maxSupply; i++) {
        const domain = await ethDaddy.getDomain(i);
        domains.push(domain);
      }
      setDomains(domains);
      console.log(domains);
      window.ethereum.on("accountsChanged", async () => {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = ethers.utils.getAddress(accounts[0]);
        setCurrentAccount(account);
      });
      console.log("Max supply", maxSupply.toString());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentAccount,
        connectWallet,
        domains,
        ethDaddy,
        provider,
        loadBlockchainData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
