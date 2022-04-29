const hre = require("hardhat");

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
    { name: 'Cheddar Cheese',	ingredientType: 2},   // 6
    { name: 'Goat Cheese',	ingredientType: 2},     // 7
    { name: 'Mozzarella',	ingredientType: 2},       // 8
    { name: 'Anchovies',	ingredientType: 3},       // 9
    { name: 'Beef',	ingredientType: 3},             // 10
    { name: 'Chicken',	ingredientType: 3},         // 11
    { name: 'Chorizo',	ingredientType: 3},         // 12
    { name: 'Ham',	ingredientType: 3},             // 13
    { name: 'Pepperonis',	ingredientType: 3},       // 14
    { name: 'Salami',	ingredientType: 3},           // 15
    { name: 'Tuna',	ingredientType: 3},             // 16
    { name: 'Corn',	ingredientType: 4},             // 17
    { name: 'Chillies',	ingredientType: 4},         // 18
    { name: 'Green Peppers',	ingredientType: 4},   // 19
    { name: 'Jalapenos',	ingredientType: 4},       // 20
    { name: 'Mushroom',	ingredientType: 4},         // 21
    { name: 'Onion',	ingredientType: 4},           // 22
    { name: 'Pineapple',	ingredientType: 4},       // 23
    { name: 'Red Pepper',	ingredientType: 4},       // 24
  ]

  for (var i = 0; i < all_ingredients.length; i++) {
    const ingredient = all_ingredients[i];

    const tx = await ingredients.addIngredient({
      name: ingredient.name,
      ingredientType:	ingredient.ingredientType,
      artist: owner.address,
      price: hre.ethers.BigNumber.from('100000000000000000'),
      supply: 3,
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
  await pizzas.setPizzaShopContractAddress(shop.address);
  await pizzas.setRenderingContractAddress(rendering.address);
  await ingredients.setPizzaShopContractAddress(shop.address);
  await ingredients.setRenderingContractAddress(rendering.address);
  await rendering.setIngredientsIPFSHash('QmdtCPDURLck3uATRLYJUoHUcWxdxZLWFNJ6fAbqCovG91');
  await rendering.setIngredientsContractAddress(ingredients.address);

  console.log("LazlosPizzaShop deployed to:", shop.address);
  console.log("LazlosIngredients deployed to:", ingredients.address);
  console.log("LazlosPizzas deployed to:", pizzas.address);
  console.log("LazlosRenderingdeployed to:", rendering.address);

  const [owner] = await ethers.getSigners();

  await addIngredients(owner, ingredients);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
