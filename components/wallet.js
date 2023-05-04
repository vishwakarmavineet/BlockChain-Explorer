import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

const Home = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [connect, setConnect] = useState(false);
  const [balance, setBalance] = useState("");

  const failMessage = "Please install MetaMask & Connect your wallet";
  const successMessage = "Your account successfully connect";

  let provider;
  if (typeof window !== "undefined" && window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
  } else {
    provider = new ethers.providers.JsonRpcProvider(
      "https://backend-geth-node-url"
    );
  }

  const checkIfWalletConnected = async () => {
    if (!window.ethereum) {
      console.log("MetaMask not detected, using backend geth node");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
      const balance = await provider.getBalance(accounts[0]);
      const showBalance = `${ethers.utils.formatEther(balance)} ETH\n`;
      console.log(showBalance);
      setBalance(showBalance);
    } else {
      console.log("No accounts detected");
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) return console.log(failMessage);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setCurrentAccount(accounts[0]);
    window.location.reload();
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  return (
    <div class="card-container">
      {!currentAccount ? "" : <span class="pro"></span>}
      <h2 className="MetaName">Metamask Connector</h2>

      {!currentAccount ? (
        <div>
          <div class="message">
            <p>{failMessage}</p>
          </div>
          <p> </p>
        </div>
      ) : (
        <div>
          <div className="buttons">
            <button className="primary ghost" onClick={() => {}}>
              Connected
            </button>
          </div>
        </div>
      )}

      {!currentAccount && !connect ? (
        <div className="buttons">
          <button className="primary" onClick={() => connectWallet()}>
            Connect Wallet
          </button>
        </div>
      ) : (
        <div className="skills">
          <pre className="accpoi">
            Your account details
            <ul>
              Account: {currentAccount} <br></br>
              Balance: {balance}
            </ul>
          </pre>
        </div>
      )}
    </div>
  );
};

export default Home;
