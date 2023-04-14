//SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.4;

import './interfaces/IERC20.sol';
import "./ownership/Ownable.sol";
import "./lifecycle/Pausable.sol";

/**
 * @title ERC20 Token
 * @dev Implementation of the basic ERC-20 standard token with burn and mint functions.
 */
contract ERC20 is IERC20, Ownable, Pausable {

    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;

    mapping (address => uint256) internal _balances;
    mapping (address => mapping (address => uint256)) internal _allowed;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    /**
     * @dev Constructor that gives msg.sender all of existing tokens.
     * @param _name The name of the token.
     * @param _symbol The symbol of the token.
     * @param _decimals The number of decimals of the token.
     * @param _totalSupply The total supply of the token.
     */
    constructor (
        string memory _name, 
        string memory _symbol, 
        uint8 _decimals, 
        uint256 _totalSupply
    ) {
        symbol = _symbol;
        name = _name;
        decimals = _decimals;
        totalSupply = _totalSupply;
        _balances[msg.sender] = _totalSupply;
    }

    /**
     * @dev Transfer token for a specified address.
     * @param _to The address to transfer to.
     * @param _value The amount to be transferred.
     * @return A boolean that indicates if the operation was successful.
     */
    function transfer(
        address _to, 
        uint256 _value
    ) external override whenNotPaused returns (bool) {
        require(_to != address(0), 'ERC20: to address is not valid');
        require(_value <= _balances[msg.sender], 'ERC20: insufficient balance');

        _balances[msg.sender] = _balances[msg.sender] - _value;
        _balances[_to] = _balances[_to] + _value;
        
        emit Transfer(msg.sender, _to, _value);
        
        return true;
    }

    /**
    * @dev Gets the balance of the specified address.
    * @param _owner The address to query the balance of.
    * @return balance An uint256 representing the balance
    */
   function balanceOf(
       address _owner
    ) external override view returns (uint256 balance) {
        return _balances[_owner];
    }

    /**
     * @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.
     * @param _spender The address which will spend the funds.
     * @param _value The amount of tokens to be spent.
     * @return A boolean that indicates if the operation was successful.
     */
    function approve(
       address _spender, 
       uint256 _value
    ) external override whenNotPaused returns (bool) {
        _allowed[msg.sender][_spender] = _value;
        
        emit Approval(msg.sender, _spender, _value);
        
        return true;
   }

      /**
    * @dev Transfer tokens from one address to another.
    * @param _from The address which you want to send tokens from.
    * @param _to The address which you want to transfer to.
    * @param _value The amount of tokens to be transferred.
    * @return A boolean that indicates if the operation was successful
    */
   function transferFrom(
        address _from, 
        address _to, 
        uint256 _value
    ) external override whenNotPaused returns (bool) {
        require(_from != address(0), 'ERC20: from address is not valid');
        require(_to != address(0), 'ERC20: to address is not valid');
        require(_value <= _balances[_from], 'ERC20: insufficient balance');
        require(_value <= _allowed[_from][msg.sender], 'ERC20: transfer from value not allowed');

        _allowed[_from][msg.sender] = _allowed[_from][msg.sender] - _value;
        _balances[_from] = _balances[_from] - _value;
        _balances[_to] = _balances[_to] + _value;
        
        emit Transfer(_from, _to, _value);
        
        return true;
   }

    /**
     * @dev Returns the amount of tokens approved by the owner that can be transferred to the spender's account.
     * @param _owner The address of the owner of the tokens.
     * @param _spender The address of the spender.
     * @return The number of tokens approved.
     */
    function allowance(
        address _owner, 
        address _spender
    ) external override view whenNotPaused returns (uint256) {
        return _allowed[_owner][_spender];
    }

    /**
     * @dev Increases the amount of tokens that an owner has allowed to a spender.
     * @param _spender The address of the spender.
     * @param _addedValue The amount of tokens to increase the allowance by.
     * @return A boolean value indicating whether the operation succeeded.
     */
    function increaseApproval(
        address _spender, 
        uint256 _addedValue
    ) external whenNotPaused returns (bool) {
        _allowed[msg.sender][_spender] = _allowed[msg.sender][_spender] + _addedValue;

        emit Approval(msg.sender, _spender, _allowed[msg.sender][_spender]);
        
        return true;
    }

    /**
     * @dev Decreases the amount of tokens that an owner has allowed to a spender.
     * @param _spender The address of the spender.
     * @param _subtractedValue The amount of tokens to decrease the allowance by.
     * @return A boolean value indicating whether the operation succeeded.
     */
    function decreaseApproval(
        address _spender, 
        uint256 _subtractedValue
    ) external whenNotPaused returns (bool) {
        uint256 oldValue = _allowed[msg.sender][_spender];
        
        if (_subtractedValue > oldValue) {
            _allowed[msg.sender][_spender] = 0;
        } else {
            _allowed[msg.sender][_spender] = oldValue - _subtractedValue;
        }
        
        emit Approval(msg.sender, _spender, _allowed[msg.sender][_spender]);
        
        return true;
   }

    /**
     * @dev Creates new tokens and assigns them to an address.
     * @param _to The address to which the tokens will be minted.
     * @param _amount The amount of tokens to be minted.
     * @return A boolean value indicating whether the operation succeeded.
     */
    function mintTo(
        address _to,
        uint256 _amount
    ) external whenNotPaused onlyOwner returns (bool) {
        require(_to != address(0), 'ERC20: to address is not valid');

        _balances[_to] = _balances[_to] + _amount;
        totalSupply = totalSupply + _amount;

        emit Transfer(address(0), _to, _amount);

        return true;
    }

    /**
     * @dev Burn tokens from the sender's account.
     * @param _amount The amount of tokens to burn.
     * @return A boolean indicating whether the operation succeeded.
     */
    function burn(
        uint256 _amount
    ) external whenNotPaused returns (bool) {
        require(_balances[msg.sender] >= _amount, 'ERC20: insufficient balance');

        _balances[msg.sender] = _balances[msg.sender] - _amount;
        totalSupply = totalSupply - _amount;

        emit Transfer(msg.sender, address(0), _amount);

        return true;
    }

    /**
     * @dev Burn tokens from a specified account, subject to allowance.
     * @param _from The address whose tokens will be burned.
     * @param _amount The amount of tokens to burn.
     * @return A boolean indicating whether the operation succeeded.
     */
    function burnFrom(
        address _from,
        uint256 _amount
    ) external whenNotPaused returns (bool) {
        require(_from != address(0), 'ERC20: from address is not valid');
        require(_balances[_from] >= _amount, 'ERC20: insufficient balance');
        require(_amount <= _allowed[_from][msg.sender], 'ERC20: burn from value not allowed');
        
        _allowed[_from][msg.sender] = _allowed[_from][msg.sender] - _amount;
        _balances[_from] = _balances[_from] - _amount;
        totalSupply = totalSupply - _amount;

        emit Transfer(_from, address(0), _amount);

        return true;
    }

}