// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import '@openzeppelin/contracts/access/Ownable.sol';
import "@openzeppelin/contracts/utils/Strings.sol";

import './Types/Types.sol';

contract LazlosPizzaShop is Ownable {
    using ECDSA for bytes32;
    using Counters for Counters.Counter;

    uint256 public bakePizzaPrice = 0.01 ether;
    uint256 public unbakePizzaPrice = 0.05 ether;
    uint256 public rebakePizzaPrice = 0.01 ether;
    address public pizzaContractAddress;
    address public ingredientsContractAddress;
    address private systemAddress;

    function setPizzaContractAddress(address addr) public onlyOwner {
        pizzaContractAddress = addr;
    }

    function setIngredientsContractAddress(address addr) public onlyOwner {
        ingredientsContractAddress = addr;
    }
    
    function setSystemAddress(address addr) public onlyOwner {
        systemAddress = addr;
    }

    function buyIngredients(uint256[] memory tokenIds, uint256[] memory amounts) public payable {
        uint256 expectedPrice;
        for (uint256 i = 0; i < tokenIds.length; i++) {
            uint256 tokenId = tokenIds[i];
            uint256 amount = amounts[i];

            Ingredient memory ingredient = ILazlosIngredients(ingredientsContractAddress).getIngredient(tokenId);
            require(bytes(ingredient.name).length != 0, 'Ingredient does not exist');
            require(ingredient.supply >= amount, 'Not enough ingredient leftover.');

            ILazlosIngredients(ingredientsContractAddress).decreaseIngredientSupply(tokenId, amount);

            unchecked {
                expectedPrice += ingredient.price * amount;
            }
        }
        
        require(expectedPrice == msg.value, 'Invalid price.');

        ILazlosIngredients(ingredientsContractAddress).mintIngredients(msg.sender, tokenIds, amounts);
    }

    function bakePizza(uint256[] memory tokenIds) public payable returns (uint256) {
        require(msg.value == bakePizzaPrice, 'Invalid price.');
        return _bakePizza(tokenIds, true);
    }

    function buyAndBakePizza(uint256[] memory tokenIds) public payable returns (uint256) {
        // Validate that:
        //  1. None of these ingredients are sold out.
        //  2. The given eth is correct (cost of ingredients + bake price).
        uint256 expectedPrice = bakePizzaPrice;
        for (uint256 i = 0; i < tokenIds.length; i++) {
            uint256 tokenId = tokenIds[i];

            Ingredient memory ingredient = ILazlosIngredients(ingredientsContractAddress).getIngredient(tokenId);
            require(ingredient.supply >= 1, 'Ingredient sold out.');

            ILazlosIngredients(ingredientsContractAddress).decreaseIngredientSupply(tokenId, 1);

            unchecked {
                expectedPrice += ingredient.price;
            }
        }

        require(expectedPrice == msg.value, 'Invalid price.');
        return _bakePizza(tokenIds, false);
    }
    
    struct NumIngredientsUsed {
        uint16 cheeses;
        uint16 meats;
        uint16 toppings;
    }

    function _bakePizza(uint256[] memory tokenIds, bool useBuyersIngredients) private returns (uint256) {
        Pizza memory pizza;
        return _addIngredientsToPizza(0, pizza, tokenIds, useBuyersIngredients);
    }

    function _addIngredientsToPizza(
        uint256 pizzaTokenId,
        Pizza memory pizza,
        uint256[] memory tokenIds,
        bool useBuyersIngredients
    ) private returns (uint256) {
        // Calculate num ingredients already used in the pizza if its not a fresh bake.
        NumIngredientsUsed memory numIngredientsUsed;

        if (pizzaTokenId != 0) {
            for (uint256 i; i<pizza.cheeses.length;) {
                if (pizza.cheeses[i] == 0) {
                    break;
                }

                unchecked {
                    numIngredientsUsed.cheeses++;
                    i++;
                }
            }

            for (uint256 i; i<pizza.meats.length;) {
                if (pizza.meats[i] == 0) {
                    break;
                }

                unchecked {
                    numIngredientsUsed.meats++;
                    i++;
                }
            }

            for (uint256 i; i<pizza.toppings.length;) {
                if (pizza.toppings[i] == 0) {
                    break;
                }

                unchecked {
                    numIngredientsUsed.toppings++;
                    i++;
                }
            }
        }
        
        // Loop over each token and:
        //  1. Check that the buyer has the correct balance for each ingredient (if useBuyersIngredients is true).
        //  2. Collect the ingredients and validate that the correct amount of each ingredient is being used:
        //      - 1 Base
        //      - 1 Sauce
        //      - 1-3 Cheeses
        //      - 0-4 Meats
        //      - 0-4 Toppings
        uint256[] memory amounts = new uint256[](tokenIds.length);
        for (uint256 i = 0; i < tokenIds.length;) {
            uint256 tokenId = tokenIds[i];

            if (useBuyersIngredients) {
                uint256 balance = ILazlosIngredients(ingredientsContractAddress).balanceOfAddress(msg.sender, tokenId);
                require(balance > 0, 'Missing ingredient.');
            }
            
            Ingredient memory ingredient = ILazlosIngredients(ingredientsContractAddress).getIngredient(tokenId);
            
            if (ingredient.ingredientType == IngredientType.Base) {
                require(pizza.base == 0, 'Cannot use more than 1 base.');

                pizza.base = uint16(tokenId);
            
            } else if (ingredient.ingredientType == IngredientType.Sauce) {
                require(pizza.sauce == 0, 'Cannot use more than 1 sauce.');

                pizza.sauce = uint16(tokenId);
            
            } else if (ingredient.ingredientType == IngredientType.Cheese) {
                unchecked {
                    numIngredientsUsed.cheeses++;
                }
                
                require(numIngredientsUsed.cheeses <= 3, 'Cannot use more than 3 cheeses.');
                
                pizza.cheeses[numIngredientsUsed.cheeses - 1] = uint16(tokenId);
            
            } else if (ingredient.ingredientType == IngredientType.Meat) {
                unchecked {
                    numIngredientsUsed.meats++;
                }
                
                require(numIngredientsUsed.meats <= 4, 'Cannot use more than 4 meats.');
                
                pizza.meats[numIngredientsUsed.meats - 1] = uint16(tokenId);

            } else if (ingredient.ingredientType == IngredientType.Topping) {
                unchecked {
                    numIngredientsUsed.toppings++;
                }
                
                require(numIngredientsUsed.toppings <= 4, 'Cannot use more than 4 toppings.');
                
                pizza.toppings[numIngredientsUsed.toppings - 1] = uint16(tokenId);
            
            } else {
                revert('Invalid ingredient type.');
            }

            amounts[i] = 1;

            unchecked {
                i++;
            }
        }

        require(pizza.base != 0, 'A base is required.');
        require(pizza.sauce != 0, 'A sauce is required.');
        require(pizza.cheeses[0] != 0, 'At least one cheese is required.');
        validateNoDuplicateIngredients(pizza);

        // Make sure to burn buyer's ingredients.
        if (useBuyersIngredients) {
            ILazlosIngredients(ingredientsContractAddress).burnIngredients(msg.sender, tokenIds, amounts);
        }

        if (pizzaTokenId == 0) {
            // Now we mint a new pizza.
            return ILazlosPizzas(pizzaContractAddress).bake(msg.sender, pizza);
        
        } else {
            // Rebake pizza now.
            ILazlosPizzas(pizzaContractAddress).rebake(msg.sender, pizzaTokenId, pizza);
            return pizzaTokenId;
        }
    }

    function validateNoDuplicateIngredients(Pizza memory pizza) internal pure {
        validateNoDuplicates3(pizza.cheeses);
        validateNoDuplicates4(pizza.meats);
        validateNoDuplicates4(pizza.toppings);
    }

    function validateNoDuplicates3(uint16[3] memory arr) internal pure {
        for (uint256 i; i<arr.length;) {
            if (arr[i] == 0) {
                break;
            }

            for (uint256 j; j<arr.length;) {
                if (arr[j] == 0) {
                    break;
                }

                if (i == j) {
                    unchecked {
                        j++;
                    }
                    continue;
                }

                require(arr[i] != arr[j], 'No duplicate ingredients.');      

                unchecked {
                    j++;
                }
            }

            unchecked {
                i++;
            }
        }
    }

    function validateNoDuplicates4(uint16[4] memory arr) internal pure {
        for (uint256 i; i<arr.length;) {
            if (arr[i] == 0) {
                break;
            }

            for (uint256 j; j<arr.length;) {
                if (arr[j] == 0) {
                    break;
                }

                if (i == j) {
                    unchecked {
                        j++;
                    }
                    continue;
                }

                require(arr[i] != arr[j], 'No duplicate ingredients.');      

                unchecked {
                    j++;
                }
            }

            unchecked {
                i++;
            }
        }
    }

    function unbakePizza(uint256 pizzaTokenId) public payable {
        require(msg.value == unbakePizzaPrice, 'Invalid price.');

        Pizza memory pizza = ILazlosPizzas(pizzaContractAddress).pizza(pizzaTokenId);

        // Sum up the number of ingredients in this pizza.
        // Every pizza has at least 3 ingredients.
        uint256 numIngredientsInPizza = 3;
        for (uint256 i=1; i<3;) {
            if (pizza.cheeses[i] == 0) {
                break;
            }

            numIngredientsInPizza++;

            unchecked {
                i++;
            }
        }

        for (uint256 i; i<4;) {
            if (pizza.meats[i] == 0) {
                break;
            }

            numIngredientsInPizza++;

            unchecked {
                i++;
            }
        }

        for (uint256 i; i<4;) {
            if (pizza.toppings[i] == 0) {
                break;
            }

            numIngredientsInPizza++;

            unchecked {
                i++;
            }
        }

        // Build up tokenIds array.
        uint256[] memory tokenIds = new uint256[](numIngredientsInPizza);
        tokenIds[0] = uint256(pizza.base);
        tokenIds[1] = uint256(pizza.sauce);
        uint256 tokenIdsIndex = 2;

        for (uint256 i=0; i<3;) {
            if (pizza.cheeses[i] == 0) {
                break;
            }

            tokenIds[tokenIdsIndex] = pizza.cheeses[i];
            unchecked {
                tokenIdsIndex++;
                i++;
            }
        }

        for (uint256 i; i<4;) {
            if (pizza.meats[i] == 0) {
                break;
            }

            tokenIds[tokenIdsIndex] = pizza.meats[i];
            unchecked {
                tokenIdsIndex++;
                i++;
            }
        }

        for (uint256 i; i<4;) {
            if (pizza.toppings[i] == 0) {
                break;
            }

            tokenIds[tokenIdsIndex] = pizza.toppings[i];
            unchecked {
                tokenIdsIndex++;
                i++;
            }
        }

        // Create amounts array which is just a bunch of 1's.
        uint256[] memory amounts = new uint256[](numIngredientsInPizza);
        for (uint256 i; i<numIngredientsInPizza;) {
            amounts[i] = 1;

            unchecked {
                i++;
            }
        }

        ILazlosIngredients(ingredientsContractAddress).mintIngredients(msg.sender, tokenIds, amounts);
    }

    function rebakePizza(uint256 pizzaTokenId, uint256[] memory ingredientTokenIdsToAdd, uint256[] memory ingredientTokenIdsToRemove) public payable {
        require(msg.value == rebakePizzaPrice, 'Invalid price.');

        Pizza memory pizza = ILazlosPizzas(pizzaContractAddress).pizza(pizzaTokenId);

        // Loop over ingredients to be removed from pizza and update the pizza accordingly.
        for (uint256 i; i<ingredientTokenIdsToRemove.length;) {
            uint256 tokenIdToRemove = ingredientTokenIdsToRemove[i];

            Ingredient memory ingredient = ILazlosIngredients(ingredientsContractAddress).getIngredient(tokenIdToRemove);

            if (ingredient.ingredientType == IngredientType.Base) {
                pizza.base = 0;
            
            } else if (ingredient.ingredientType == IngredientType.Sauce) {
                pizza.sauce = 0;
            
            } else if (ingredient.ingredientType == IngredientType.Cheese) {
                bool foundCheese;
                uint16[3] memory updatedCheeses;
                uint256 updatedCheeseIndex;
                for (uint256 j; j<updatedCheeses.length;) {
                    uint256 existingCheese = pizza.cheeses[j];
                    if (existingCheese == 0) {
                        break;
                    }

                    if (existingCheese != tokenIdToRemove) {
                        updatedCheeses[updatedCheeseIndex] = uint16(existingCheese);

                        unchecked {
                            updatedCheeseIndex++;
                        }
                    
                    } else {
                        foundCheese = true;
                    }

                    unchecked {
                        j++;
                    }
                }

                require(foundCheese, 'Could not find cheese to be removed.');
                pizza.cheeses = updatedCheeses;
            
            } else if (ingredient.ingredientType == IngredientType.Meat) {
                bool foundMeat;
                uint16[4] memory updatedMeats;
                uint256 updatedMeatIndex;
                for (uint256 j; j<updatedMeats.length;) {
                    uint256 existingMeat = pizza.meats[j];
                    if (existingMeat == 0) {
                        break;
                    }

                    if (existingMeat != tokenIdToRemove) {
                        updatedMeats[updatedMeatIndex] = uint16(existingMeat);

                        unchecked {
                            updatedMeatIndex++;
                        }
                    
                    } else {
                        foundMeat = true;
                    }

                    unchecked {
                        j++;
                    }
                }

                require(foundMeat, 'Could not find meat to be removed.');
                pizza.meats = updatedMeats;

            } else if (ingredient.ingredientType == IngredientType.Topping) {
                bool foundTopping;
                uint16[4] memory updatedToppings;
                uint256 updatedToppingIndex;
                for (uint256 j; j<updatedToppings.length;) {
                    uint256 existingTopping = pizza.toppings[j];
                    if (existingTopping == 0) {
                        break;
                    }

                    if (existingTopping != tokenIdToRemove) {
                        updatedToppings[updatedToppingIndex] = uint16(existingTopping);

                        unchecked {
                            updatedToppingIndex++;
                        }
                    
                    } else {
                        foundTopping = true;
                    }

                    unchecked {
                        j++;
                    }
                }

                require(foundTopping, 'Could not find topping to be removed.');
                pizza.toppings = updatedToppings;
            
            } else {
                revert('Invalid ingredient type.');
            }

            unchecked {
                i++;
            }
        } 

        _addIngredientsToPizza(pizzaTokenId, pizza, ingredientTokenIdsToAdd, true);
    }

    function bakeRandomPizza(uint256[] memory tokenIds, bytes memory signature) public payable returns (uint256) {
        bytes memory message;
        for (uint256 i; i<tokenIds.length;) {
            message = abi.encodePacked(message, ',' , tokenIds[i]);

            unchecked {
                i++;
            }
        }

        bytes32 hash = keccak256(message);
        bytes32 signedHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
        bool validSignature = signedHash.recover(signature) == systemAddress;

        require(validSignature, 'Invalid signature.');

        return buyAndBakePizza(tokenIds);
    }
}
