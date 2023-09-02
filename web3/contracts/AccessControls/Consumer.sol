// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

import "./Roles.sol";

contract Consumer {
    using Roles for Roles.Role;
    Roles.Role private consumers;

    event ConsumerAdded(address indexed account);
    event ConsumerRemoved(address indexed account);

    modifier onlyConsumer() {
        require(isConsumer(msg.sender), "Access only limited to registered Consumers");
        _;
    }
    
    constructor() {
        _addConsumer(msg.sender);
    }

    function isConsumer(address acc) public view returns(bool) {
        return consumers.has(acc);
    }

    function addConsumer(address acc) public onlyConsumer {
        _addConsumer(acc);
        emit ConsumerAdded(acc);
    }

    function removeConsumer(address acc) public {
        _removeConsumer(acc);
        emit ConsumerRemoved(acc);
    }

    function _addConsumer(address acc) internal {
        consumers.add(acc);
    }

    function _removeConsumer(address acc) internal {
        consumers.remove(acc);
    }
    
}