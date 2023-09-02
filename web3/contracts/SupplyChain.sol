// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./AccessControls/Farmer.sol";
import "./AccessControls/Retailer.sol";
import "./AccessControls/Consumer.sol";

contract SupplyChain is Ownable, Farmer, Retailer, Consumer {
    address _owner;

    enum State {
        Harvested,
        ForSale,
        SoldToRetailer,
        Processed,
        ReadyToBuy,
        Purchased
    }

    State constant defaultState = State.Harvested;

    event Harvested(uint256 batchId);
    event ForSale(uint256 batchId);
    event SoldToRetailer(uint256 batchId);
    event Processed(uint256 batchId);
    event ReadyToBuy(uint256 batchId);
    event Purchased(uint256 batchId);

    string batchId; // unique batch id to identify the produce
    uint256 uid;

    struct Product {
        string batchId;
        uint256 uid;
        address ownerId; // address of the current owner of the product in the supply chain
        uint256 mrp; // price at current state
        State currentState;

        // keeping track of owners throughout the supply chain
        address farmerId;
        // farmer details;
        string farmerName;
        string farmLatitude;
        string farmLongitude;
        address storageUnit;
        address retailerId;
        address consumerId;

        // product details
        string mangoBreed;
        uint256 timestamp;
    }

    mapping (uint256 => Product) items;

    modifier _onlyOwner() {
        require(msg.sender == _owner, "Method accessible only to the owner");
        _;
    }

    modifier verifyCaller(address addr) {
        require(msg.sender == addr);
        _;
    }

    modifier paidEnough(uint _price) { 
        require(msg.value >= _price, "More money is required, this is not enough to handle the transaction!");
        _;
    }
    
    // to check the price and refunds the remaining balance
    modifier checkValue(uint _uid) {
        _;
        uint _price = items[_uid].mrp;
        uint amountToReturn = msg.value - _price;
        
        address payable consumerAddressPayable = payable(items[_uid].consumerId);
        
        consumerAddressPayable.transfer(amountToReturn);
    }

    // modifiers to check state of the mango batch
    modifier harvested(uint _id) {
        require(items[_id].currentState == State.Harvested, "This mango batch is not Harvested yet!");
        _;
    }
    
    modifier forSale(uint _id) {
        require(items[_id].currentState == State.ForSale, "This mango batch is not ForSale yet!");
        _;
    }
    
    modifier soldToRetailer(uint _id) {
        require(items[_id].currentState == State.SoldToRetailer, "This mango batch is not SoldToRetailer yet!");
        _;
    }

    modifier processed(uint _id) {
        require(items[_id].currentState == State.Processed, "This mango batch is not Processed yet!");
        _;
    }
    
    modifier readyToBuy(uint _id) {
        require(items[_id].currentState == State.ReadyToBuy, "This mango batch is not ReadyToBuy yet!");
        _;
    }
    
    modifier purchased(uint _id) {
        require(items[_id].currentState == State.Purchased, "This mango batch is not Purchased yet!");
        _;
    }

    // constructor functions
    constructor() {
        _owner = msg.sender;
        uid = 1;
    }
    
    // methods
    function harvestMangoes(
        uint _uid, address _originFarmerID, string memory _originFarmerName, string memory _originFarmLatitude, string memory _originFarmLongitude, string memory _breed
    ) public onlyFarmer {
        items[_uid] = Product({
            batchId: '',
            uid: uid,
            ownerId: _owner,
            mrp: uint(0),
            currentState: defaultState,
            storageUnit: address(0),
            retailerId: address(0),
            consumerId: address(0),
            farmerId: _originFarmerID,
            farmerName: _originFarmerName,
            farmLatitude: _originFarmLatitude,
            farmLongitude: _originFarmLongitude,
            mangoBreed: _breed,
            timestamp: block.timestamp
        });

        uid++;
        emit Harvested(_uid);
    }

    function setForSale(uint256 _uid, uint256 price) harvested(_uid) verifyCaller(items[_uid].farmerId) public onlyFarmer {
        items[_uid].currentState = State.ForSale;
        items[_uid].mrp = price;

        emit ForSale(_uid);
    }

    function buyItem(uint256 _uid) forSale(_uid) paidEnough(items[_uid].mrp) checkValue(_uid) public payable onlyRetailer {
        items[_uid].ownerId = _owner;
        items[_uid].retailerId = msg.sender;
        items[_uid].currentState = State.SoldToRetailer;

        address payable originFarmerAddr = payable(items[_uid].farmerId);
        
        originFarmerAddr.transfer(msg.value);
        emit SoldToRetailer(_uid);
    }

    function processItem(uint256 _uid) soldToRetailer(_uid) verifyCaller(items[_uid].retailerId) public onlyRetailer {
        items[_uid].currentState = State.Processed;

        emit Processed(_uid);
    }

    function sellProduct(uint256 _uid, uint256 price) processed(_uid) verifyCaller(items[_uid].retailerId) public onlyRetailer {
        items[_uid].currentState = State.ReadyToBuy;
        items[_uid].mrp = price;

        emit ReadyToBuy(_uid);
    }

    // Consumer buys the ready to buy mangoes
    function purchaseItem(uint256 _uid) readyToBuy(_uid) paidEnough(items[_uid].mrp) checkValue(_uid) public payable onlyConsumer {
        items[_uid].ownerId = _owner;
        items[_uid].consumerId = msg.sender;
        items[_uid].currentState = State.Purchased;

        address payable retailerAddr = payable(items[_uid].retailerId);
        
        retailerAddr.transfer(msg.value);
        emit Purchased(_uid);
    }


    function fetchItemBufferOne(uint _uid) public view returns 
    ( uint itemUid, address ownerID, address originFarmerID, string memory originFarmName, string memory originFarmInformation, string memory originFarmLatitude, string memory originFarmLongitude )
    {
        // Assign values 
        itemUid = items[_uid].uid;
        ownerID = items[_uid].ownerId;
        originFarmerID = items[_uid].farmerId;
        originFarmName = items[_uid].farmerName;
        originFarmLatitude = items[_uid].farmLatitude;
        originFarmLongitude = items[_uid].farmLongitude;

        return ( itemUid, ownerID, originFarmerID, originFarmName, originFarmInformation, originFarmLatitude, originFarmLongitude );
    }

    function fetchItemBufferTwo(uint _uid) public view returns
    ( uint itemSKU, uint itemUPC, string memory productID, string memory productBreed, uint productPrice, uint itemState, address distributorID, address retailerID, address consumerID )
    {
        // Assign values
        itemUPC = items[_uid].uid;
        productID = items[_uid].batchId;
        productBreed = items[_uid].mangoBreed;
        productPrice = items[_uid].mrp;
        itemState = uint(items[_uid].currentState);
        retailerID = items[_uid].retailerId;
        consumerID = items[_uid].consumerId;

        return ( itemSKU, itemUPC, productID, productBreed, productPrice, itemState, distributorID, retailerID, consumerID );
    }

}
