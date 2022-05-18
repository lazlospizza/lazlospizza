const hre = require("hardhat");
const fs = require("fs");

// deploy all of the ingredients
//
// 0 - base
// 1 - sauce
// 2 - cheese
// 3 - meat
// 4 - topping
async function addIngredients(owner, ingredients) {
  const all_ingredients = [
    { name: 'Gluten Free Base',	ingredientType: 0}, // 1
    { name: 'Plain Base',	ingredientType: 0},       // 2
    { name: 'BBQ Sauce',	ingredientType: 1},       // 3
    { name: 'Chilli Sauce',	ingredientType: 1},     // 4
    { name: 'Tomato Sauce',	ingredientType: 1},     // 5
    { name: 'Garlic Sauce',	ingredientType: 1},     // 6
    { name: 'Cheddar Cheese',	ingredientType: 2},   // 7
    { name: 'Goat Cheese',	ingredientType: 2},     // 8
    { name: 'Mozzarella',	ingredientType: 2},       // 9
    { name: 'Anchovies',	ingredientType: 3},       // 10
    { name: 'Beef',	ingredientType: 3},             // 11
    { name: 'Chicken',	ingredientType: 3},         // 12
    { name: 'Chorizo',	ingredientType: 3},         // 13
    { name: 'Ham',	ingredientType: 3},             // 14
    { name: 'Pepperonis',	ingredientType: 3},       // 15
    { name: 'Salami',	ingredientType: 3},           // 16
    { name: 'Tuna',	ingredientType: 3},             // 17
    { name: 'Corn',	ingredientType: 4},             // 18
    { name: 'Chillies',	ingredientType: 4},         // 19
    { name: 'Green Peppers',	ingredientType: 4},   // 20
    { name: 'Jalapenos',	ingredientType: 4},       // 21
    { name: 'Mushroom',	ingredientType: 4},         // 22
    { name: 'Onion',	ingredientType: 4},           // 23
    { name: 'Pineapple',	ingredientType: 4},       // 24
    { name: 'Red Pepper',	ingredientType: 4},       // 25
  ]

  for (var i = 0; i < all_ingredients.length; i++) {
    const ingredient = all_ingredients[i];

    const tx = await ingredients.addIngredient({
      name: ingredient.name,
      ingredientType:	ingredient.ingredientType,
      artist: owner.address,
      price: hre.ethers.BigNumber.from('10000000000000000'),
      supply: 100,
    });
    await tx.wait();

    console.log("Added ingredient:", ingredient.name);
  }
}

async function main() {
    const LazlosPizzaShop = await ethers.getContractFactory("LazlosPizzaShop");
    const LazlosIngredients = await ethers.getContractFactory("LazlosIngredients");
    const LazlosPizzas = await ethers.getContractFactory("LazlosPizzas");
    const LazlosRendering = await ethers.getContractFactory("LazlosRendering");

    const shop = await LazlosPizzaShop.deploy();
    const ingredients = await LazlosIngredients.deploy();
    const pizzas = await LazlosPizzas.deploy();
    const rendering = await LazlosRendering.deploy();

    await shop.setPizzaContractAddress(pizzas.address);
    await shop.setIngredientsContractAddress(ingredients.address);
    await shop.setSystemAddress('0x2F9EFbE3BfdFd0dC274311a4B2A29c421b0F4ae5');
    await pizzas.setPizzaShopContractAddress(shop.address);
    await pizzas.setRenderingContractAddress(rendering.address);
    await ingredients.setPizzaShopContractAddress(shop.address);
    await ingredients.setRenderingContractAddress(rendering.address);
    await rendering.setIngredientsIPFSHash('QmPXfUXjCrvBm5aUaz6pNWp61CKHK4i2i4X3Q9SBguh1mJ');
    await rendering.setIngredientsContractAddress(ingredients.address);
    await rendering.setPizzasContractAddress(pizzas.address);
    await rendering.setBaseURI('http://lazlospizzaapi-dev.eba-t2m7znq3.us-east-1.elasticbeanstalk.com');

    console.log("LazlosPizzaShop deployed to:", shop.address);
    console.log("LazlosIngredients deployed to:", ingredients.address);
    console.log("LazlosPizzas deployed to:", pizzas.address);
    console.log("LazlosRenderingdeployed to:", rendering.address);

    const [owner] = await ethers.getSigners();

    await addIngredients(owner, ingredients);
    
    await shop.bakeRandomPizza(
        [2,3,6,8,14,11],
        1652910800,
        '0x28df45477c8abeee7f0ec588a2992bdfd74986482d570fda45d7cb377cb5aeba',
        '0x6c0108b06477031902e38be93b0f07995ffd942056791c29aa0cc1dad219c7b0',
        28
    );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
