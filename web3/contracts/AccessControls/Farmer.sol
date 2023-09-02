// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

import "./Roles.sol";

contract Farmer {
    using Roles for Roles.Role;
    Roles.Role private farmers;

    event farmerAdded(address indexed account);
    event farmerRemoved(address indexed account);

    modifier onlyFarmer() {
        require(isFarmer(msg.sender), "Access only limited to registered farmers");
        _;
    }

    constructor() {
        _addFarmer(msg.sender);
    }

    function isFarmer(address acc) public view returns(bool) {
        return farmers.has(acc);
    }

    function addFarmer(address acc) public onlyFarmer {
        _addFarmer(acc);
        emit farmerAdded(acc);
    }

    function removeFarmer(address acc) public {
        _removeFarmer(acc);
        emit farmerRemoved(acc);
    }

    function _addFarmer(address acc) internal {
        farmers.add(acc);
    }

    function _removeFarmer(address acc) internal {
        farmers.remove(acc);
    }
    
}