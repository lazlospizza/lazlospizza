// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import '@openzeppelin/contracts/access/Ownable.sol';

import './ERC721/ERC721U.sol';
import './Types/Types.sol';

contract LazlosPizzas is ERC721U, Ownable {
    using Counters for Counters.Counter;

    modifier onlyPizzaShop() {
        require(msg.sender == pizzaShopContractAddress, 'Only the pizza shop can call this method.');
        _;
    }

    address public pizzaShopContractAddress;
    Counters.Counter public numPizzas;
    mapping(uint256 => Pizza) pizzas;

    constructor() ERC721U("Lazlo's Pizza", "LAZLO") {}

    function setPizzaShopContractAddress(address addr) public onlyOwner {
        pizzaShopContractAddress = addr;
    }

    function tokenURI(uint256 id) public view override returns (string memory) {
        // TODO - implement me
        return '';
    }

    function bake(address baker, Pizza memory pizzaData) external onlyPizzaShop returns (uint256) {
        numPizzas.increment();
        uint256 tokenId = numPizzas.current();
        pizzas[tokenId] = pizzaData;

        _safeMint(baker, tokenId);

        return tokenId;
    }

    function rebake(address baker, uint256 pizzaTokenId, Pizza memory pizzaData) external onlyPizzaShop {
        require(baker == ownerOf[pizzaTokenId], "Baker doesn't own this pizza.");

        pizzas[pizzaTokenId] = pizzaData;
    }

    function pizza(uint256 tokenId) external view returns (Pizza memory) {
        return pizzas[tokenId];
    }
}
