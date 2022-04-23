const hre = require("hardhat");

async function main() {
  const LazlosPizzaShop = await ethers.getContractFactory("LazlosPizzaShop");
  const LazlosIngredients = await ethers.getContractFactory("LazlosIngredients");
  const LazlosPizzas = await ethers.getContractFactory("LazlosPizzas");

  const shop = await LazlosPizzaShop.deploy();
  const ingredients = await LazlosIngredients.deploy();
  const pizzas = await LazlosPizzas.deploy();

  await shop.setPizzaContractAddress(pizzas.address);
  await shop.setIngredientsContractAddress(ingredients.address);
  await pizzas.setPizzaShopContractAddress(shop.address);
  await ingredients.setPizzaShopContractAddress(shop.address);

  console.log("LazlosPizzaShop deployed to:", shop.address);
  console.log("LazlosIngredients deployed to:", ingredients.address);
  console.log("LazlosPizzas deployed to:", pizzas.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
