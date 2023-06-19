// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleStorage {
  uint256 value;
  string public greeter;

  event valueChanged(uint _val);

  function greet() public view returns (string memory) {
    return greeter;
  }

  function setGreet(string memory newValue) public {
    greeter = newValue;
  }

  function read() public view returns (uint256) {
    return value;
  }

  function write(uint256 newValue) public {
    value = newValue;
    emit valueChanged(newValue);
  }
}
