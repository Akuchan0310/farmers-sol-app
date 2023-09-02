// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

import "./Roles.sol";

contract Retailer {
    using Roles for Roles.Role;
    Roles.Role private retailers;

    event RetailerAdded(address indexed account);
    event RetailerRemoved(address indexed account);

    modifier onlyRetailer() {
        require(isRetailer(msg.sender), "Access only limited to registered Retailers");
        _;
    }
    
    constructor() {
        _addRetailer(msg.sender);
    }

    function isRetailer(address acc) public view returns(bool) {
        return retailers.has(acc);
    }

    function addRetailer(address acc) public onlyRetailer {
        _addRetailer(acc);
        emit RetailerAdded(acc);
    }

    function removeRetailer(address acc) public {
        _removeRetailer(acc);
        emit RetailerRemoved(acc);
    }

    function _addRetailer(address acc) internal {
        retailers.add(acc);
    }

    function _removeRetailer(address acc) internal {
        retailers.remove(acc);
    }
    
}