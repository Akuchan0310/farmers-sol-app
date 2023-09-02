// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract HelloWorld {
    string none;

    function callFn() public pure returns(string memory hello) {
        hello = 'Hllo world';
    }
}