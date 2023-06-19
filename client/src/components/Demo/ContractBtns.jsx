import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ContractBtns({ setValue, setGreetValue }) {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");
  const [inputGreet, setInputGreet] = useState("");

  const handleInputChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }

  };

  const handleInputGreetChange = e => {
    setInputGreet(e.target.value);
  };

  const greet = async () => {
    let greet = await contract.methods.greet().call({ from: accounts[0] });
    setGreetValue(greet);
  };

  const setGreet = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputGreet === "") {
      alert("Please enter a value to set greet.");
      return;
    }

    await contract.methods.setGreet(inputGreet).send({ from: accounts[0] });
  };

  const read = async () => {
    const value = await contract.methods.read().call({ from: accounts[0] });
    setValue(value);
  };

  const write = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = parseInt(inputValue);
    await contract.methods.write(newValue).send({ from: accounts[0] });
  };

  return (
    <div className="btns">

      <button onClick={greet}>
        greet()
      </button>

      <div onClick={setGreet} className="input-btn">
        setGreet(<input
          type="text"
          placeholder="string"
          value={inputGreet}
          onChange={handleInputGreetChange}
      />)
      </div>

      <button onClick={read}>
        read()
      </button>

      <div onClick={write} className="input-btn">
        write(<input
          type="text"
          placeholder="uint"
          value={inputValue}
          onChange={handleInputChange}
        />)
      </div>

    </div>
  );
}

export default ContractBtns;
