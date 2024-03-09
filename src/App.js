import React, { useEffect, useState } from "react";
import Web3 from "web3";
import "./App.css";
import { contractABI, contractAddress } from "./config";

const App = () => {
  const [account, setAccount] = useState("");
  const [count, setCount] = useState(0);
  const [todoListContract, setTodoListContract] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [transactionHash, setTransactionHash] = useState("");

  useEffect(() => {
    const loadBlockchainData = async () => {
      try {
        const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
        setWeb3(web3);
        const todoListContract = new web3.eth.Contract(
          contractABI,
          contractAddress
        );
        // console.log(todoListContract);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        setTodoListContract(todoListContract);
      } catch (error) {
        console.error("Error loading blockchain data:", error);
      }
    };

    loadBlockchainData();
  }, []);

  const updateCount = async () => {
    if (todoListContract) {
      const taskCount = await todoListContract.methods.taskCount().call();
      setCount(taskCount);
    }
  };

  updateCount();
  const handleTransfer = async () => {
    try {
      if (web3) {
        const weiAmount = web3.utils.toWei("5", "ether");
        const add = process.env.REACT_APP_APP_ACT;
        console.log("add");
        console.log(add);
        const transaction = {
          from: account,
          to: process.env.REACT_APP_APP_ACT,
          value: weiAmount,
        };

        console.log("Step 1");
        const result = await web3.eth.sendTransaction(transaction);
        console.log("Step 2");
        setTransactionHash(result.transactionHash);
      }
    } catch (error) {
      console.error("Error transferring ethers:", error);
    }
  };
  // handleTransfer();
  return (
    <div className="container">
      <h1>Hello, World!</h1>
      <p>Your account: {account}</p>
      <p>Your Count: {count}</p>
      <button onClick={handleTransfer}>transfer</button>
    </div>
  );
};

export default App;
