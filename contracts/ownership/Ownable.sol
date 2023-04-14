//SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.0;

/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract Ownable {

  address private owner;

  event NewOwner(address oldOwner, address newOwner);

  /**
   * @dev Sets the original owner of the contract to the sender account.
   */
  constructor() {
    owner = msg.sender;
  }

  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(isOwner(), "Ownable: caller is not the owner");
    _;
  }

  /**
   * @dev Gets the current owner of the contract.
   * @return An address representing the current owner of the contract.
   */
  function contractOwner() external view returns (address) {
    return owner;
  }

  /**
   * @dev Checks if the caller is the owner of the contract.
   * @return A bool indicating whether the caller is the owner or not.
   */
  function isOwner() public view returns (bool) {
    return msg.sender == owner;
  }

  /**
   * @dev Transfers ownership of the contract to a new account (`_newOwner`).
   * @param _newOwner The address to transfer ownership to.
   */
  function transferOwnership(address _newOwner) external onlyOwner {
    require(_newOwner != address(0), 'Ownable: address is not valid');
    owner = _newOwner;
    emit NewOwner(msg.sender, _newOwner);
  } 
}