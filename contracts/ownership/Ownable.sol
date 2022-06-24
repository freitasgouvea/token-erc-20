//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Ownable {

  address private _owner;

  event NewOwner(address oldOwner, address newOwner);

  constructor() {
    _owner = msg.sender;
  }

  modifier onlyOwner() {
    require(isOwner(), "Ownable: caller is not the owner");
    _;
  }

  function owner() public view returns (address) {
    return _owner;
  }

  function isOwner() public view returns (bool) {
    return msg.sender == _owner;
  }

  function transferOwnership(address _newOwner) public onlyOwner {
    _owner = _newOwner;
    emit NewOwner(msg.sender, _newOwner);
  } 
}