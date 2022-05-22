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
    { name: 'Gluten-free',	ingredientType: 0, artist: '0x2F9EFbE3BfdFd0dC274311a4B2A29c421b0F4ae5' },    // 1
    { name: 'Plain',	ingredientType: 0, artist: '0xafBDEc0ba91FDFf03A91CbdF07392e6D72d43712' },          // 2
    { name: 'BBQ',	ingredientType: 1, artist: '0x2052051a0474fb0b98283b3f38c13b0b0b6a3677' },            // 3
    { name: 'Chilli',	ingredientType: 1, artist: '0x7215340d449C6Ae73334e75d95e1d7596d802704' },          // 4
    { name: 'Tomato',	ingredientType: 1, artist: '0x8e29B3F71a8c7276d122C88d9bf317e857ABb376' },          // 5
    { name: 'Garlic',	ingredientType: 1, artist: '0x03A15366DA50B720C1806705F216c54F7A20De3c' },          // 6
    { name: 'Cheddar',	ingredientType: 2, artist: '0xab2056903a7b62BAc46F45A3D7a70AC799CA88CB' },        // 7
    { name: "Goat's Cheese",	ingredientType: 2, artist: '0x9Bf043a72ca1cD3DC4BCa66c9F6c1d040CfF7772' },  // 8
    { name: 'Mozzarella',	ingredientType: 2, artist: '0xf0c10e3a5e45cfec080e458b9b76dbcf3000ec96' },      // 9
    { name: 'Anchovies',	ingredientType: 3, artist: '0x2F39321594596014e5882ECd3B89b1B9B5787f5F' },      // 10
    { name: 'Beef',	ingredientType: 3, artist: '0x71c5fdea421231826558319551b85cC45C0bC4d4' },            // 11
    { name: 'Chicken',	ingredientType: 3, artist: '0x6EBd8991fC87F130DE28DE4b37F882d6cbE9aB28' },        // 12
    { name: 'Chorizo',	ingredientType: 3, artist: '0xC5fFbCd8A374889c6e95f8df733e32A0e9476a9c' },        // 13
    { name: 'Ham',	ingredientType: 3, artist: '0xC5fFbCd8A374889c6e95f8df733e32A0e9476a9c' },            // 14
    { name: 'Pepperoni',	ingredientType: 3, artist: '0x9Bf043a72ca1cD3DC4BCa66c9F6c1d040CfF7772' },      // 15
    { name: 'Salami',	ingredientType: 3, artist: '0xd42bd96B117dd6BD63280620EA981BF967A7aD2B' },          // 16
    { name: 'Tuna',	ingredientType: 3, artist: '0x4cfc5922a1820902e86c5212522f04f16b2861db' },            // 17
    { name: 'Corn',	ingredientType: 4, artist: '0xEbc19928B5D64C981318b80B9de4378c379083F2' },            // 18
    { name: 'Chillies',	ingredientType: 4, artist: '0x71c5fdea421231826558319551b85cC45C0bC4d4' },        // 19
    { name: 'Green Peppers',	ingredientType: 4, artist: '0x2F39321594596014e5882ECd3B89b1B9B5787f5F' },  // 20
    { name: 'Jalapenos',	ingredientType: 4, artist: '0x4cfc5922a1820902e86c5212522f04f16b2861db' },      // 21
    { name: 'Mushrooms',	ingredientType: 4, artist: '0xC5fFbCd8A374889c6e95f8df733e32A0e9476a9c' },      // 22
    { name: 'Onions',	ingredientType: 4, artist: '0xd42bd96B117dd6BD63280620EA981BF967A7aD2B' },          // 23
    { name: 'Pineapple',	ingredientType: 4, artist: '0xab2056903a7b62BAc46F45A3D7a70AC799CA88CB' },      // 24
    { name: 'Red Peppers',	ingredientType: 4, artist: '0x6EBd8991fC87F130DE28DE4b37F882d6cbE9aB28' },    // 25
  ]

  for (var i = 0; i < all_ingredients.length; i++) {
    const ingredient = all_ingredients[i];

    const tx = await ingredients.addIngredient({
      name: ingredient.name,
      ingredientType:	ingredient.ingredientType,
      artist: ingredient.artist,
      price: hre.ethers.BigNumber.from('10000000000000000'),
      supply: 10000,
      initialSupply: 10000,
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
  await shop.setSystemAddress('0x5c1de450faecb6676de88330dc3974b9851b2f2f');
  await pizzas.setPizzaShopContractAddress(shop.address);
  await pizzas.setRenderingContractAddress(rendering.address);
  await ingredients.setPizzaShopContractAddress(shop.address);
  await ingredients.setRenderingContractAddress(rendering.address);
  await rendering.setIngredientsIPFSHash('QmRpABeFSqXkpCSxUugwKrKhTrVrJQ2i3yYu7an1fgWYaa');
  await rendering.setIngredientsContractAddress(ingredients.address);
  await rendering.setPizzasContractAddress(pizzas.address);
  await rendering.setBaseURI('https://api.lazlospizza.com');
  await rendering.setIngredientsDescription("The finest pixelated produce on the blockchain. Combine your faves to bake a pizza in Lazlo's Pizza Cave at lazlospizza.com.");
  await rendering.setPizzaDescription("Pixelated pizzas win prizes in Lazlo's Pizza Cave. Visit lazlospizza.com to bake your own.");

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
