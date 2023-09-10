// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../contracts/AccessControls/Farmer.sol";
import "../contracts/AccessControls/Retailer.sol";
import "../contracts/AccessControls/Consumer.sol";


contract SupplyChain is Ownable, Farmer, Retailer, Consumer {
    address _owner;

    enum State {
        Harvested,
        Washed,
        PeelednPitted,
        ForSale,
        SoldToRetailer,
        Processed,
        ReadyToBuy,
        Purchased,
        Discarded
    }

    State constant defaultState = State.Harvested;

    event Harvested(uint256 batchId);
    event Washed(uint256 batchId);
    event PeelednPitted(uint256 batchId);
    event ForSale(uint256 batchId);
    event SoldToRetailer(uint256 batchId);
    event Processed(uint256 batchId);
    event ReadyToBuy(uint256 batchId);
    event Purchased(uint256 batchId);
    event Discarded(uint256 batchId);

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
        // mango details
        string mangoBreed;
        uint256 timestamp;
        // product details, only applicable after processing
        uint256 expirationDate;
    }

    mapping(uint256 => Product) items;

    modifier _onlyOwner() {
        require(msg.sender == _owner, "Method accessible only to the owner");
        _;
    }

    modifier verifyCaller(address addr) {
        require(msg.sender == addr);
        _;
    }

    modifier paidEnough(uint256 _price) {
        require(
            msg.value >= _price,
            "More money is required, this is not enough to handle the transaction!"
        );
        _;
    }

    modifier checkDate(uint256 date) {
        require(
            block.timestamp <= date, "The product has been expired!!"
        );
        _;
    }

    // to check the price and refunds the remaining balance
    modifier checkValue(uint256 _uid) {
        _;
        uint256 _price = items[_uid].mrp;
        uint256 amountToReturn = msg.value - _price;

        address payable consumerAddressPayable = payable(
            items[_uid].consumerId
        );

        consumerAddressPayable.transfer(amountToReturn);
    }

    // modifiers to check state of the mango batch
    modifier harvested(uint256 _id) {
        require(
            items[_id].currentState == State.Harvested,
            "This mango batch is not Harvested yet!"
        );
        _;
    }

    modifier washedNcleaned(uint256 _id) {
        require(
            items[_id].currentState == State.Washed,
            "This mango batch is not Washed n Cleaned yet!"
        );
        _;
    }

    modifier peeledNpitted(uint _id) {
        require(items[_id].currentState == State.PeelednPitted, "This mango batch is not Peeled or Pitted yet!");
        _;
    }

    modifier forSale(uint256 _id) {
        require(
            items[_id].currentState == State.ForSale,
            "This mango batch is not ForSale yet!"
        );
        _;
    }

    modifier soldToRetailer(uint256 _id) {
        require(
            items[_id].currentState == State.SoldToRetailer,
            "This mango batch is not SoldToRetailer yet!"
        );
        _;
    }

    modifier processed(uint256 _id) {
        require(
            items[_id].currentState == State.Processed,
            "This mango batch is not Processed yet!"
        );
        _;
    }

    modifier readyToBuy(uint256 _id) {
        require(
            items[_id].currentState == State.ReadyToBuy,
            "This mango batch is not ReadyToBuy yet!"
        );
        _;
    }

    modifier purchased(uint256 _id) {
        require(
            items[_id].currentState == State.Purchased,
            "This mango batch is not Purchased yet!"
        );
        _;
    }

    modifier notDiscarded(uint256 _id) {
        require(items[_id].currentState != State.Discarded, "This item was discarded.");
        _;
    }

    // constructor functions
    constructor() {
        _owner = msg.sender;
        uid = 1;
    }

    // methods
    function harvestMangoes(
        uint256 _uid,
        address _originFarmerID,
        string memory _originFarmerName,
        string memory _originFarmLatitude,
        string memory _originFarmLongitude,
        string memory _breed
    ) public onlyFarmer {
        items[_uid] = Product({
            batchId: "",
            uid: uid,
            ownerId: _owner,
            mrp: uint256(0),
            currentState: defaultState,
            storageUnit: address(0),
            retailerId: address(0),
            consumerId: address(0),
            farmerId: _originFarmerID,
            farmerName: _originFarmerName,
            farmLatitude: _originFarmLatitude,
            farmLongitude: _originFarmLongitude,
            mangoBreed: _breed,
            timestamp: block.timestamp,
            expirationDate: uint256(0)
        });

        uid++;
        emit Harvested(_uid);
    }

    function washMangoes(uint256 _uid) public onlyFarmer notDiscarded(_uid) {
        items[_uid].currentState = State.Washed;

        emit Washed(_uid);
    }

    function peelNpittMangoes(uint256 _uid) public onlyFarmer notDiscarded(_uid) {
        items[_uid].currentState = State.PeelednPitted;

        emit PeelednPitted(_uid);
    }

    function setForSale(uint256 _uid, uint256 price)
        public
        harvested(_uid)
        verifyCaller(items[_uid].farmerId)
        onlyFarmer
        notDiscarded(_uid)
    {
        items[_uid].currentState = State.ForSale;
        items[_uid].mrp = price;

        emit ForSale(_uid);
    }

    function buyItem(uint256 _uid)
        public
        payable
        forSale(_uid)
        paidEnough(items[_uid].mrp)
        checkValue(_uid)
        onlyRetailer
        notDiscarded(_uid)
    {
        items[_uid].ownerId = _owner;
        items[_uid].retailerId = msg.sender;
        items[_uid].currentState = State.SoldToRetailer;

        address payable originFarmerAddr = payable(items[_uid].farmerId);

        originFarmerAddr.transfer(msg.value);
        emit SoldToRetailer(_uid);
    }

    function processItem(uint256 _uid)
        public
        soldToRetailer(_uid)
        verifyCaller(items[_uid].retailerId)
        onlyRetailer
        notDiscarded(_uid)
    {
        items[_uid].currentState = State.Processed;

        emit Processed(_uid);
    }

    function sellProduct(uint256 _uid, uint256 price, uint256 expDate)
        public
        processed(_uid)
        verifyCaller(items[_uid].retailerId)
        onlyRetailer
        notDiscarded(_uid)
    {
        items[_uid].currentState = State.ReadyToBuy;
        items[_uid].mrp = price;
        items[_uid].expirationDate = expDate;

        emit ReadyToBuy(_uid);
    }

    // Consumer buys the ready to buy mangoes
    function purchaseItem(uint256 _uid)
        public
        payable
        readyToBuy(_uid)
        paidEnough(items[_uid].mrp)
        checkValue(_uid)
        checkDate(items[_uid].expirationDate)
        onlyConsumer
        notDiscarded(_uid)
    {
        items[_uid].ownerId = _owner;
        items[_uid].consumerId = msg.sender;
        items[_uid].currentState = State.Purchased;

        address payable retailerAddr = payable(items[_uid].retailerId);

        retailerAddr.transfer(msg.value);
        emit Purchased(_uid);
    }

    function disacardItem(uint256 _uid) public {
        items[_uid].currentState = State.Discarded;

        emit Discarded(_uid);
    }

    function fetchOriginDidi(uint256 _uid)
        public
        view
        returns (
            uint256 itemUid,
            address ownerID,
            address originFarmerID,
            string memory originFarmName,
            string memory originFarmInformation,
            string memory originFarmLatitude,
            string memory originFarmLongitude
        )
    {
        // Assign values
        itemUid = items[_uid].uid;
        ownerID = items[_uid].ownerId;
        originFarmerID = items[_uid].farmerId;
        originFarmName = items[_uid].farmerName;
        originFarmLatitude = items[_uid].farmLatitude;
        originFarmLongitude = items[_uid].farmLongitude;

        return (
            itemUid,
            ownerID,
            originFarmerID,
            originFarmName,
            originFarmInformation,
            originFarmLatitude,
            originFarmLongitude
        );
    }

    function fetchProductDetails(uint256 _uid)
        public
        view
        returns (
            uint256 itemUid,
            string memory productID,
            string memory productBreed,
            uint256 productPrice,
            uint256 expirationDate,
            uint256 itemState,
            address distributorID,
            address retailerID,
            address consumerID
        )
    {
        // Assign values
        itemUid = items[_uid].uid;
        productID = items[_uid].batchId;
        productBreed = items[_uid].mangoBreed;
        productPrice = items[_uid].mrp;
        expirationDate = items[_uid].expirationDate;
        itemState = uint256(items[_uid].currentState);
        retailerID = items[_uid].retailerId;
        consumerID = items[_uid].consumerId;

        return (
            itemUid,
            productID,
            productBreed,
            productPrice,
            expirationDate,
            itemState,
            distributorID,
            retailerID,
            consumerID
        );
    }
}
