// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

library Roles {
    struct Role {
        mapping (address => bool) registered;
    }
    
    function has(Role storage _role, address acc) internal view returns(bool) {
        require(acc != address(0));
        return _role.registered[acc];
    }

    function add(Role storage _role, address acc) internal {
        require(acc != address(0));
        require(!has(_role, acc), "Address already registered");
        _role.registered[acc] = true;
    }

    function remove(Role storage _role, address acc) internal {
        require(acc != address(0));
        require(has(_role, acc), "Address not registered");
        _role.registered[acc] = false;
    }
}