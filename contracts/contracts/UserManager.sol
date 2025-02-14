// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";

contract UserManager is Ownable {
    mapping(address => bool) public registeredUsers;

    event UserRegistered(address user);

    function registerUser(address _user) public onlyOwner {
        require(!registeredUsers[_user], "User already registered");
        registeredUsers[_user] = true;
        emit UserRegistered(_user);
    }

    function isUserRegistered(address _user) public view returns (bool) {
        return registeredUsers[_user];
    }
}