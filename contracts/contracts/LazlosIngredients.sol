// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import '@openzeppelin/contracts/access/Ownable.sol';

import './ERC1155/ERC1155U.sol';
import './Types/Types.sol';

contract LazlosIngredients is ERC1155U, Ownable {
    using ECDSA for bytes32;
    using Counters for Counters.Counter;

    modifier onlyPizzaShop() {
        require(msg.sender == pizzaShopContractAddress, 'Only the pizza shop can call this method.');
        _;
    }

    Counters.Counter public numIngredients;
    mapping(uint256 => Ingredient) public ingredients;
    address public pizzaShopContractAddress;

    function setPizzaShopContractAddress(address addr) public onlyOwner {
        pizzaShopContractAddress = addr;
    }

    function getIngredient(uint256 tokenId) external view returns (Ingredient memory) {
        return ingredients[tokenId];
    }

    function addIngredient(Ingredient memory ingredient) public onlyOwner {
        numIngredients.increment();
        uint256 tokenId = numIngredients.current();
        ingredients[tokenId] = ingredient;
    }

    function increaseIngredientSupply(uint256 tokenId, uint256 amount) public onlyPizzaShop {
        unchecked {
            ingredients[tokenId].supply += uint256(amount);
        }
    }

    function decreaseIngredientSupply(uint256 tokenId, uint256 amount) public onlyPizzaShop {
        unchecked {
            ingredients[tokenId].supply -= uint256(amount);
        }
    }

    function mintIngredients(address addr, uint256[] memory tokenIds, uint256[] memory amounts) public onlyPizzaShop {
        _batchMint(addr, tokenIds, amounts, '');
    }

    function burnIngredients(address addr, uint256[] memory tokenIds, uint256[] memory amounts) external onlyPizzaShop {
        _batchBurn(addr, tokenIds, amounts);
    }

    function balanceOfAddress(address addr, uint256 tokenId) external view returns (uint256) {
        return balanceOf[addr][tokenId];
    }

    function uri(uint256 id) public view override returns (string memory) {
        // TODO - implement uri
        return '';
    }
}
