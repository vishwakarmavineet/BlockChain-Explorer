import { useState, useEffect } from "react";
import Web3 from "web3";

const IndexPage = () => {
  const [blockSearchValue, setBlockSearchValue] = useState("");
  const [transactionSearchValue, setTransactionSearchValue] = useState("");
  const [blockData, setBlockData] = useState(null);
  const [transactionData, setTransactionData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const web3 = new Web3(
      "https://mainnet.infura.io/v3/ea9014a34edd41ad901147a92849946b"
    ); // Replace with the URL of your geth node

    if (blockSearchValue === "" && transactionSearchValue === "") {
      setBlockData(null);
      setTransactionData(null);
      setError(null);
    } else if (isNaN(blockSearchValue) && blockSearchValue !== "") {
      web3.eth
        .getBlock(blockSearchValue)
        .then((block) => {
          setBlockData(block);
          setTransactionData(null);
          setError(null);
        })
        .catch((error) => {
          setBlockData(null);
          setTransactionData(null);
          setError(error.message);
        });
    } else if (transactionSearchValue !== "") {
      web3.eth
        .getTransaction(transactionSearchValue)
        .then((tx) => {
          setTransactionData(tx);
          setBlockData(null);
          setError(null);
        })
        .catch((error) => {
          setTransactionData(null);
          setBlockData(null);
          setError(error.message);
        });
    } else {
      web3.eth
        .getBlock(parseInt(blockSearchValue))
        .then((block) => {
          setBlockData(block);
          setTransactionData(null);
          setError(null);
        })
        .catch((error) => {
          setBlockData(null);
          setTransactionData(null);
          setError(error.message);
        });
    }
  }, [blockSearchValue, transactionSearchValue]);

  const handleBlockSearchValueChange = (event) => {
    setBlockSearchValue(event.target.value);
  };

  const handleTransactionSearchValueChange = (event) => {
    setTransactionSearchValue(event.target.value);
  };

  return (
    <div className="card-container">
      <h1 className="search">Quick Search</h1>
      <label className="LabelStyle">
        Fetch block data using block hash or block number <br></br>
        <input
          type="text"
          value={blockSearchValue}
          onChange={handleBlockSearchValueChange}
        />
      </label>
      <label className="LabelStyle">
        Fetch transaction data using transaction hash <br></br>
        <input
          type="text"
          value={transactionSearchValue}
          onChange={handleTransactionSearchValueChange}
        />
      </label>
      {error && <p>{error}</p>}
      {blockData && (
        <div className="DataQuery">
          <h2>Block Data</h2>
          <pre>{JSON.stringify(blockData, null, 2)}</pre>
        </div>
      )}
      {transactionData && (
        <div className="DataQuery">
          <h2>Transaction Data</h2>
          <pre>{JSON.stringify(transactionData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default IndexPage;
