// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "forge-std/Test.sol";
import "../contracts/ERC20.sol";

contract TERC20Test is Test {

  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);

  ERC20Token private erc20;

  address internal owner = vm.addr(1);
  address internal userOne = vm.addr(2);
  address internal userTwo = vm.addr(3);
  address internal userThree = vm.addr(4);
  address internal userFour = vm.addr(5);
  
  function setUp() public {
    erc20 = new ERC20Token(
      "Token Name",
      "ERC",
      18,
      0
    );
    vm.startPrank(owner);
    erc20.mint(userOne, 1000);
    erc20.mint(userTwo, 1000);
    vm.stopPrank();
  }

  function testName() public {
    assertEq(erc20.name(), "Token Name");
  }

  function testSymbol() public {
    assertEq(erc20.symbol(), "ERC");
  }

  function testDecimals() public {
    assertEq(erc20.decimals(), 18);
  }

  function testTotalSupply() public {
    assertEq(erc20.totalSupply(), 2000);
  }

  function testBalanceOf() public {
    assertEq(erc20.balanceOf(userOne), 1000);
    assertEq(erc20.balanceOf(userTwo), 1000);
    assertEq(erc20.balanceOf(userThree), 0);
    assertEq(erc20.balanceOf(userFour), 0);
  }

  function testTransferWithSuccess() public {
    vm.prank(userOne);
    vm.expectEmit(true, true, true, true);
    emit Transfer(userOne, userThree, 500);
    erc20.transfer(userThree, 500);
    assertEq(erc20.balanceOf(userOne), 500);
    assertEq(erc20.balanceOf(userThree), 500);
  }

  function testTransferWhenAmmountExceedsBalance() public {
    vm.prank(userOne);
    vm.expectRevert(bytes("ERC20: transfer amount exceeds balance"));
    erc20.transfer(userThree, 999999);
    assertEq(erc20.balanceOf(userOne), 1000);
    assertEq(erc20.balanceOf(userThree), 0);
  }

  function testTransferWhenBalanceIsZero() public {
    vm.prank(userThree);
    vm.expectRevert(bytes("ERC20: transfer amount exceeds balance"));
    erc20.transfer(userFour, 1);
    assertEq(erc20.balanceOf(userThree), 0);
    assertEq(erc20.balanceOf(userFour), 0);
  }

  function testTransferToZeroAddress() public {
    vm.prank(userOne);
    vm.expectRevert(bytes("ERC20: transfer to the zero address"));
    erc20.transfer(address(0), 1);
    assertEq(erc20.balanceOf(userOne), 1000);
    assertEq(erc20.balanceOf(address(0)), 0);
  }

  function testApproveWithSuccess() public {
    vm.prank(userOne);
    vm.expectEmit(true, true, true, true);
    emit Approval(userOne, userThree, 999999);
    erc20.approve(userThree, 999999);
    assertEq(erc20.balanceOf(userOne), 1000);
    assertEq(erc20.allowance(userOne, userThree), 999999);
  }

  function testApproveFromZeroAddress() public {
    vm.prank(address(0));
    vm.expectRevert(bytes("ERC20: approve from the zero address"));
    erc20.approve(userOne, 1000);
    assertEq(erc20.allowance(address(0), userOne), 0);
  }

  function testApproveToZeroAddress() public {
    vm.prank(userOne);
    vm.expectRevert(bytes("ERC20: approve to the zero address"));
    erc20.approve(address(0), 1000);
    assertEq(erc20.allowance(userOne, address(0)), 0);
  }

  function testTransferFromWithSuccess() public {
    vm.prank(userOne);
    vm.expectEmit(true, true, true, true);
    emit Approval(userOne, userThree, 500);
    erc20.approve(userThree, 500);
    assertEq(erc20.allowance(userOne, userThree), 500);
    vm.prank(userThree);
    vm.expectEmit(true, true, true, true);
    emit Transfer(userOne, userFour, 500);
    erc20.transferFrom(userOne, userFour, 500);
    assertEq(erc20.allowance(userOne, userThree), 0);
    assertEq(erc20.balanceOf(userOne), 500);
    assertEq(erc20.balanceOf(userFour), 500);
  }

  function testTransferFromInsufficientAllowance() public {
    vm.prank(userOne);
    vm.expectEmit(true, true, true, true);
    emit Approval(userOne, userThree, 500);
    erc20.approve(userThree, 500);
    assertEq(erc20.allowance(userOne, userThree), 500);
    vm.prank(userThree);
    vm.expectRevert(bytes("ERC20: insufficient allowance"));
    erc20.transferFrom(userOne, userFour, 1000);
    assertEq(erc20.allowance(userOne, userThree), 500);
    assertEq(erc20.balanceOf(userOne), 1000);
    assertEq(erc20.balanceOf(userFour), 0);
  }

  function testTransferFromInsufficientBalance() public {
    vm.prank(userOne);
    vm.expectEmit(true, true, true, true);
    emit Approval(userOne, userThree, 999999);
    erc20.approve(userThree, 999999);
    assertEq(erc20.allowance(userOne, userThree), 999999);
    vm.prank(userThree);
    vm.expectRevert(bytes("ERC20: transfer amount exceeds balance"));
    erc20.transferFrom(userOne, userFour, 999999);
    assertEq(erc20.allowance(userOne, userThree), 999999);
    assertEq(erc20.balanceOf(userOne), 1000);
    assertEq(erc20.balanceOf(userFour), 0);
  }

  function testIncreaseAllowancewWithSuccess() public {
    vm.startPrank(userOne);
    vm.expectEmit(true, true, true, true);
    emit Approval(userOne, userThree, 1000);
    erc20.increaseAllowance(userThree, 1000);
    assertEq(erc20.allowance(userOne, userThree), 1000);
    vm.expectEmit(true, true, true, true);
    emit Approval(userOne, userThree, 2000);
    erc20.increaseAllowance(userThree, 1000);
    assertEq(erc20.allowance(userOne, userThree), 2000);
    vm.stopPrank();
  }

  function testDecreaseAllowancewWithSuccess() public {
    vm.startPrank(userOne);
    vm.expectEmit(true, true, true, true);
    emit Approval(userOne, userThree, 1000);
    erc20.increaseAllowance(userThree, 1000);
    assertEq(erc20.allowance(userOne, userThree), 1000);
    vm.expectEmit(true, true, true, true);
    emit Approval(userOne, userThree, 500);
    erc20.decreaseAllowance(userThree, 500);
    assertEq(erc20.allowance(userOne, userThree), 500);
    vm.stopPrank();
  }

  function testDecreaseAllowancewBellowZero() public {
    vm.startPrank(userOne);
    vm.expectEmit(true, true, true, true);
    emit Approval(userOne, userThree, 1000);
    erc20.increaseAllowance(userThree, 1000);
    assertEq(erc20.allowance(userOne, userThree), 1000);
    vm.expectRevert(bytes("ERC20: decreased allowance below zero"));
    erc20.decreaseAllowance(userThree, 99999);
    assertEq(erc20.allowance(userOne, userThree), 1000);
    vm.stopPrank();
  }

  function testMintWithSuccess() public {
    vm.prank(owner);
    vm.expectEmit(true, true, true, true);
    emit Transfer(address(0), userThree, 1000);
    erc20.mint(userThree, 1000);
    assertEq(erc20.balanceOf(userThree), 1000);
    assertEq(erc20.totalSupply(), 3000);
  }

  function testMintWithNoAuthorization() public {
    vm.prank(userOne);
    vm.expectRevert(bytes("UNAUTHORIZED"));
    erc20.mint(userThree, 1000);
    assertEq(erc20.balanceOf(userThree), 0);
    assertEq(erc20.totalSupply(), 2000);
  }

  function testMintToZeroAddress() public {
    vm.prank(owner);
    vm.expectRevert(bytes("ERC20: mint to the zero address"));
    erc20.mint(address(0), 1000);
    assertEq(erc20.balanceOf(address(0)), 0);
    assertEq(erc20.totalSupply(), 2000);
  }

  function testBurnWithSuccess() public {
    vm.prank(userOne);
    vm.expectEmit(true, true, true, true);
    emit Transfer(userOne, address(0), 1000);
    erc20.burn(1000);
    assertEq(erc20.balanceOf(userOne), 0);
    assertEq(erc20.totalSupply(), 1000);
  }

  function testBurnWithZeroBalance() public {
    vm.prank(userThree);
    vm.expectRevert(bytes("ERC20: burn amount exceeds balance"));
    erc20.burn(1000);
    assertEq(erc20.balanceOf(userThree), 0);
  }

  function testBurnWhenAmmountExceedsBalance() public {
    vm.prank(userOne);
    vm.expectRevert(bytes("ERC20: burn amount exceeds balance"));
    erc20.burn(999999);
    assertEq(erc20.balanceOf(userOne), 1000);
  }

  function testBurnFromWithSuccess() public {
    vm.prank(userOne);
    vm.expectEmit(true, true, true, true);
    emit Approval(userOne, userTwo, 500);
    erc20.approve(userTwo, 500);
    assertEq(erc20.allowance(userOne, userTwo), 500);
    vm.prank(userTwo);
    vm.expectEmit(true, true, true, true);
    emit Transfer(userOne, address(0), 500);
    erc20.burnFrom(userOne, 500);
    assertEq(erc20.allowance(userOne, userTwo), 0);
    assertEq(erc20.balanceOf(userOne), 500);
    assertEq(erc20.totalSupply(), 1500);
  }

  function testBurnFromInsufficientAllowance() public {
    vm.prank(userOne);
    vm.expectEmit(true, true, true, true);
    emit Approval(userOne, userTwo, 500);
    erc20.approve(userTwo, 500);
    assertEq(erc20.allowance(userOne, userTwo), 500);
    vm.prank(userTwo);
    vm.expectRevert(stdError.arithmeticError);
    erc20.burnFrom(userOne, 999999);
    assertEq(erc20.allowance(userOne, userTwo), 500);
    assertEq(erc20.balanceOf(userOne), 1000);
    assertEq(erc20.totalSupply(), 2000);
  }

  function testBurnFromInsufficientBalance() public {
    vm.prank(userOne);
    vm.expectEmit(true, true, true, true);
    emit Approval(userOne, userTwo, 999999);
    erc20.approve(userTwo, 999999);
    assertEq(erc20.allowance(userOne, userTwo), 999999);
    vm.prank(userTwo);
    vm.expectRevert(bytes("ERC20: burn amount exceeds balance"));
    erc20.burnFrom(userOne, 999999);
    assertEq(erc20.allowance(userOne, userTwo), 999999);
    assertEq(erc20.balanceOf(userOne), 1000);
    assertEq(erc20.totalSupply(), 2000);
  }

}