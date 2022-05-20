// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import '@openzeppelin/contracts/access/Ownable.sol';
import "@openzeppelin/contracts/utils/Strings.sol";

import './Types/Types.sol';

/*
   __           _      _        ___ _                __ _                 
  / /  __ _ ___| | ___( )__    / _ (_)__________ _  / _\ |__   ___  _ __  
 / /  / _` |_  / |/ _ \/ __|  / /_)/ |_  /_  / _` | \ \| '_ \ / _ \| '_ \ 
/ /__| (_| |/ /| | (_) \__ \ / ___/| |/ / / / (_| | _\ \ | | | (_) | |_) |
\____/\__,_/___|_|\___/|___/ \/    |_/___/___\__,_| \__/_| |_|\___/| .__/ 
                                                                   |_|    

LazlosRendering is the rendering contract used for rendering tokenURI's in Lazlo's kitchen.
*/
contract LazlosRendering is Ownable {
    using Strings for uint256;

    address public ingredientsContractAddress;
    address public pizzasContractAddress;
    string public ingredientsIPFSHash;
    string public baseURI;

    function setIngredientsContractAddress(address addr) public onlyOwner {
        ingredientsContractAddress = addr;
    }

    function setPizzasContractAddress(address addr) public onlyOwner {
        pizzasContractAddress = addr;
    }

    function setIngredientsIPFSHash(string memory hash) public onlyOwner {
        ingredientsIPFSHash = hash;
    }

    function setBaseURI(string memory uri) public onlyOwner {
        baseURI = uri;
    }

    function ingredientTokenMetadata(uint256 id) public view returns (string memory) {
        Ingredient memory ingredient = ILazlosIngredients(ingredientsContractAddress).getIngredient(id);

        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(abi.encodePacked(
                    '{"name":"', ingredient.name,
                    '","description":"blah blah blah something about pizza","image":"https://gateway.pinata.cloud/ipfs/',
                    ingredientsIPFSHash, '/', id.toString(), '.png"}'
                ))
            )
        );
    }

    function pizzaTokenMetadata(uint256 id) external view returns (string memory) {
        Pizza memory pizza = ILazlosPizzas(pizzasContractAddress).pizza(id);

        string memory propertiesString;

        propertiesString = string(abi.encodePacked(
            '{"trait_type":"', getIngredientTypeName(pizza.base), '","value":"', getIngredientName(pizza.base), '"},'
            '{"trait_type":"', getIngredientTypeName(pizza.sauce), '","value":"', getIngredientName(pizza.sauce), '"}'
        ));

        for (uint256 i = 0; i < 3; i++) {
            uint16 cheese = pizza.cheeses[i];
            if (cheese == 0) {
                break;
            }

            propertiesString = string(abi.encodePacked(
                propertiesString,
                 ',{"trait_type":"', getIngredientTypeName(cheese), '","value":"', getIngredientName(cheese), '"}'
            ));
        }

        for (uint256 i = 0; i < 4; i++) {
            uint16 meat = pizza.meats[i];
            if (meat == 0) {
                break;
            }

            propertiesString = string(abi.encodePacked(
                propertiesString,
                 ',{"trait_type":"', getIngredientTypeName(meat), '","value":"', getIngredientName(meat), '"}'
            ));
        }

        for (uint256 i = 0; i < 4; i++) {
            uint16 topping = pizza.toppings[i];
            if (topping == 0) {
                break;
            }

            propertiesString = string(abi.encodePacked(
                propertiesString,
                 ',{"trait_type":"', getIngredientTypeName(topping), '","value":"', getIngredientName(topping), '"}'
            ));
        }

        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(abi.encodePacked(
                    '{"description":"blah blah blah something about pizza","image":"',
                    baseURI, '/tokens/', id.toString(), '/pizza_image.png","attributes":[',
                    propertiesString, ']}'
                ))
            )
        );
    }

    function getIngredientName(uint256 ingredientTokenId) private view returns (string memory) {
        return ILazlosIngredients(ingredientsContractAddress).getIngredient(ingredientTokenId).name;
    }

    function getIngredientTypeName(uint256 ingredientTokenId) private view returns (string memory) {
        Ingredient memory ingredient = ILazlosIngredients(ingredientsContractAddress).getIngredient(ingredientTokenId);
        
        if (ingredient.ingredientType == IngredientType.Base) {
            return "Base";
        
        } else if (ingredient.ingredientType == IngredientType.Sauce) {
            return "Sauce";
        
        } else if (ingredient.ingredientType == IngredientType.Cheese) {
            return "Cheese";
        
        } else if (ingredient.ingredientType == IngredientType.Meat) {
            return "Meat";
        
        } else {
            return "Topping";
        }
    }

    function uintToByteString(uint256 a, uint256 fixedLen)
        internal
        pure
        returns (bytes memory _uintAsString)
    {
        uint256 j = a;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(fixedLen);
        j = fixedLen;
        if (a == 0) {
            bstr[0] = "0";
            len = 1;
        }
        while (j > len) {
            j = j - 1;
            bstr[j] = bytes1(" ");
        }
        uint256 k = len;
        while (a != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(a - (a / 10) * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            a /= 10;
        }
        return bstr;
    }
}

library Base64 {
    string internal constant TABLE =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    function encode(bytes memory data) internal pure returns (string memory) {
        if (data.length == 0) return "";

        // load the table into memory
        string memory table = TABLE;

        // multiply by 4/3 rounded up
        uint256 encodedLen = 4 * ((data.length + 2) / 3);

        // add some extra buffer at the end required for the writing
        string memory result = new string(encodedLen + 32);

        assembly {
            // set the actual output length
            mstore(result, encodedLen)

            // prepare the lookup table
            let tablePtr := add(table, 1)

            // input ptr
            let dataPtr := data
            let endPtr := add(dataPtr, mload(data))

            // result ptr, jump over length
            let resultPtr := add(result, 32)

            // run over the input, 3 bytes at a time
            for {

            } lt(dataPtr, endPtr) {

            } {
                dataPtr := add(dataPtr, 3)

                // read 3 bytes
                let input := mload(dataPtr)

                // write 4 characters
                mstore(
                    resultPtr,
                    shl(248, mload(add(tablePtr, and(shr(18, input), 0x3F))))
                )
                resultPtr := add(resultPtr, 1)
                mstore(
                    resultPtr,
                    shl(248, mload(add(tablePtr, and(shr(12, input), 0x3F))))
                )
                resultPtr := add(resultPtr, 1)
                mstore(
                    resultPtr,
                    shl(248, mload(add(tablePtr, and(shr(6, input), 0x3F))))
                )
                resultPtr := add(resultPtr, 1)
                mstore(
                    resultPtr,
                    shl(248, mload(add(tablePtr, and(input, 0x3F))))
                )
                resultPtr := add(resultPtr, 1)
            }

            // padding with '='
            switch mod(mload(data), 3)
            case 1 {
                mstore(sub(resultPtr, 2), shl(240, 0x3d3d))
            }
            case 2 {
                mstore(sub(resultPtr, 1), shl(248, 0x3d))
            }
        }

        return result;
    }
}