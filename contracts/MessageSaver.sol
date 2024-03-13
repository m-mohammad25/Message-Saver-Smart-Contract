// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;



import "hardhat/console.sol";

contract MessageSaver {
    string private message;

    constructor(string memory _msg) {
        console.log("Deploying a Greeter with greeting:", _msg);
        message = _msg;
    }

    function readMsg() public view returns (string memory) {
        return message;
    }

    function saveMsg(string memory _msg) public {
        console.log("Changing greeting from '%s' to '%s'", message, _msg);
        message = _msg;
    }


}