const { expect } = require("chai");
const hre = require("hardhat");

async function addIngredients(owner, ingredients) {
    const all_ingredients = [
      { name: 'Gluten Free Base',	ingredientType: 0, artist: '0x2F9EFbE3BfdFd0dC274311a4B2A29c421b0F4ae5' }, // 1
      { name: 'Plain Base',	ingredientType: 0, artist: '0xafBDEc0ba91FDFf03A91CbdF07392e6D72d43712' },       // 2
      { name: 'BBQ Sauce',	ingredientType: 1, artist: '0x2052051a0474fb0b98283b3f38c13b0b0b6a3677' },       // 3
      { name: 'Chilli Sauce',	ingredientType: 1, artist: '0x7215340d449C6Ae73334e75d95e1d7596d802704' },     // 4
      { name: 'Tomato Sauce',	ingredientType: 1, artist: '0x8e29B3F71a8c7276d122C88d9bf317e857ABb376' },     // 5
      { name: 'Garlic Sauce',	ingredientType: 1, artist: '0x03A15366DA50B720C1806705F216c54F7A20De3c' },     // 6
      { name: 'Cheddar Cheese',	ingredientType: 2, artist: '0xab2056903a7b62BAc46F45A3D7a70AC799CA88CB' },   // 7
      { name: 'Goat Cheese',	ingredientType: 2, artist: '0x9Bf043a72ca1cD3DC4BCa66c9F6c1d040CfF7772' },     // 8
      { name: 'Mozzarella',	ingredientType: 2, artist: '0xf0c10e3a5e45cfec080e458b9b76dbcf3000ec96' },       // 9
      { name: 'Anchovies',	ingredientType: 3, artist: '0x2F39321594596014e5882ECd3B89b1B9B5787f5F' },       // 10
      { name: 'Beef',	ingredientType: 3, artist: '0x71c5fdea421231826558319551b85cC45C0bC4d4' },             // 11
      { name: 'Chicken',	ingredientType: 3, artist: '0x6EBd8991fC87F130DE28DE4b37F882d6cbE9aB28' },         // 12
      { name: 'Chorizo',	ingredientType: 3, artist: '0xC5fFbCd8A374889c6e95f8df733e32A0e9476a9c' },         // 13
      { name: 'Ham',	ingredientType: 3, artist: '0xC5fFbCd8A374889c6e95f8df733e32A0e9476a9c' },             // 14
      { name: 'Pepperonis',	ingredientType: 3, artist: '0x9Bf043a72ca1cD3DC4BCa66c9F6c1d040CfF7772' },       // 15
      { name: 'Salami',	ingredientType: 3, artist: '0xd42bd96B117dd6BD63280620EA981BF967A7aD2B' },           // 16
      { name: 'Tuna',	ingredientType: 3, artist: '0x4cfc5922a1820902e86c5212522f04f16b2861db' },             // 17
      { name: 'Corn',	ingredientType: 4, artist: '0xEbc19928B5D64C981318b80B9de4378c379083F2' },             // 18
      { name: 'Chillies',	ingredientType: 4, artist: '0x71c5fdea421231826558319551b85cC45C0bC4d4' },         // 19
      { name: 'Green Peppers',	ingredientType: 4, artist: '0x2F39321594596014e5882ECd3B89b1B9B5787f5F' },   // 20
      { name: 'Jalapenos',	ingredientType: 4, artist: '0x4cfc5922a1820902e86c5212522f04f16b2861db' },       // 21
      { name: 'Mushroom',	ingredientType: 4, artist: '0xC5fFbCd8A374889c6e95f8df733e32A0e9476a9c' },         // 22
      { name: 'Onion',	ingredientType: 4, artist: '0xd42bd96B117dd6BD63280620EA981BF967A7aD2B' },           // 23
      { name: 'Pineapple',	ingredientType: 4, artist: '0xab2056903a7b62BAc46F45A3D7a70AC799CA88CB' },       // 24
      { name: 'Red Pepper',	ingredientType: 4, artist: '0x6EBd8991fC87F130DE28DE4b37F882d6cbE9aB28' },       // 25
    ]
  
    for (var i = 0; i < all_ingredients.length; i++) {
      const ingredient = all_ingredients[i];
  
      const tx = await ingredients.addIngredient({
        name: ingredient.name,
        ingredientType:	ingredient.ingredientType,
        artist: owner.address,
        price: hre.ethers.BigNumber.from('10000000000000000'),
        supply: 100,
        initialSupply: 100,
      });
      await tx.wait();
    }
}

async function setup() {
    const [owner] = await ethers.getSigners();

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
    await rendering.setIngredientsIPFSHash('FAKE_IPFS_HASH');
    await rendering.setIngredientsContractAddress(ingredients.address);
    await rendering.setPizzasContractAddress(pizzas.address);
    await rendering.setIngredientsDescription("Lazlos ingredients!");
    await rendering.setPizzaDescription("Lazlos pizzas!");

    await addIngredients(owner, ingredients);

    return [shop, ingredients, pizzas, rendering, owner];
}

describe("LazlosPizzaShop", function () {
    it("ingredients should return the correct ingredient", async function () {
        const [_1, ingredients, _2, _3, _4] = await setup();
        expect((await ingredients.ingredients(7)).name).to.equal('Cheddar Cheese');
        expect((await ingredients.ingredients(9)).name).to.equal('Mozzarella');
        expect((await ingredients.ingredients(8)).supply).to.equal(100);
        expect((await ingredients.ingredients(10)).supply).to.equal(100);
    });

    it("buyIngredients should mint multiple ingredients and reduce supply", async function () {
        const [shop, ingredients, _1, _2, owner] = await setup();
        await shop.buyIngredients([1, 3, 5, 7, 9], [1, 2, 3, 2, 1], {
            value: hre.ethers.BigNumber.from('90000000000000000')
        });

        expect(await ingredients.balanceOf(owner.address, 1)).to.equal(1);
        expect(await ingredients.balanceOf(owner.address, 2)).to.equal(0);
        expect(await ingredients.balanceOf(owner.address, 3)).to.equal(2);
        expect(await ingredients.balanceOf(owner.address, 4)).to.equal(0);
        expect(await ingredients.balanceOf(owner.address, 5)).to.equal(3);
        expect(await ingredients.balanceOf(owner.address, 6)).to.equal(0);
        expect(await ingredients.balanceOf(owner.address, 7)).to.equal(2);
        expect(await ingredients.balanceOf(owner.address, 8)).to.equal(0);
        expect(await ingredients.balanceOf(owner.address, 9)).to.equal(1);

        expect((await ingredients.ingredients(1)).supply).to.equal(99);
        expect((await ingredients.ingredients(2)).supply).to.equal(100);
        expect((await ingredients.ingredients(3)).supply).to.equal(98);
    });

    it("bakePizza should mint a pizza NFT and burn ingredients", async function () {
        const [shop, ingredients, pizzas, _1, owner] = await setup();
        await shop.buyIngredients([1, 2, 3, 4, 5, 6, 7, 8, 12, 19], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], {
            value: hre.ethers.BigNumber.from('100000000000000000')
        });

        expect(await ingredients.balanceOf(owner.address, 1)).to.equal(1);

        await shop.bakePizza([1, 4, 7, 8, 12, 19], {
            value: hre.ethers.BigNumber.from('10000000000000000')
        });

        expect(await ingredients.balanceOf(owner.address, 1)).to.equal(0);
        expect(await pizzas.ownerOf(1)).to.equal(owner.address);
        expect((await pizzas.pizza(1)).base).to.equal(1);
        expect((await pizzas.pizza(1)).sauce).to.equal(4);

        const cheeses = (await pizzas.pizza(1)).cheeses;
        expect(cheeses[0]).to.equal(7);
        expect(cheeses[1]).to.equal(8);
        expect(cheeses[2]).to.equal(0);

        const meats = (await pizzas.pizza(1)).meats;
        expect(meats[0]).to.equal(12);
        expect(meats[3]).to.equal(0);
        expect(meats[2]).to.equal(0);
        expect(meats[3]).to.equal(0);

        const toppings = (await pizzas.pizza(1)).toppings;
        expect(toppings[0]).to.equal(19);
        expect(toppings[1]).to.equal(0);
        expect(toppings[2]).to.equal(0);
        expect(toppings[3]).to.equal(0);
    });

    it("rendering should work", async function () {
        const [shop, ingredients, pizzas, rendering, owner] = await setup();
        await shop.buyIngredients([1, 2, 3, 4, 5, 6, 7, 8, 12, 19], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], {
            value: hre.ethers.BigNumber.from('100000000000000000')
        });

        await shop.bakePizza([1, 4, 7, 8, 12, 19], {
            value: hre.ethers.BigNumber.from('10000000000000000')
        });

        const metadata1 = await ingredients.uri(1);
        expect(metadata1).to.equal('data:application/json;base64,eyJuYW1lIjoiR2x1dGVuIEZyZWUgQmFzZSIsImRlc2NyaXB0aW9uIjoiTGF6bG9zIGluZ3JlZGllbnRzISIsImltYWdlIjoiaHR0cHM6Ly9nYXRld2F5LnBpbmF0YS5jbG91ZC9pcGZzL0ZBS0VfSVBGU19IQVNILzEucG5nIn0=');
    
        const metadataPizza1 = await pizzas.tokenURI(1);
        expect(metadataPizza1).to.equal('data:application/json;base64,eyJkZXNjcmlwdGlvbiI6IkxhemxvcyBwaXp6YXMhIiwiaW1hZ2UiOiIvdG9rZW5zLzEvcGl6emFfaW1hZ2UucG5nIiwiYXR0cmlidXRlcyI6W3sidHJhaXRfdHlwZSI6IkJhc2UiLCJ2YWx1ZSI6IkdsdXRlbiBGcmVlIEJhc2UifSx7InRyYWl0X3R5cGUiOiJTYXVjZSIsInZhbHVlIjoiQ2hpbGxpIFNhdWNlIn0seyJ0cmFpdF90eXBlIjoiQ2hlZGRhciBDaGVlc2UiLCJ2YWx1ZSI6IlllcyJ9LHsidHJhaXRfdHlwZSI6IkdvYXQgQ2hlZXNlIiwidmFsdWUiOiJZZXMifSx7InRyYWl0X3R5cGUiOiJNb3p6YXJlbGxhIiwidmFsdWUiOiJObyJ9LHsidHJhaXRfdHlwZSI6IkFuY2hvdmllcyIsInZhbHVlIjoiTm8ifSx7InRyYWl0X3R5cGUiOiJCZWVmIiwidmFsdWUiOiJObyJ9LHsidHJhaXRfdHlwZSI6IkNoaWNrZW4iLCJ2YWx1ZSI6IlllcyJ9LHsidHJhaXRfdHlwZSI6IkNob3Jpem8iLCJ2YWx1ZSI6Ik5vIn0seyJ0cmFpdF90eXBlIjoiSGFtIiwidmFsdWUiOiJObyJ9LHsidHJhaXRfdHlwZSI6IlBlcHBlcm9uaXMiLCJ2YWx1ZSI6Ik5vIn0seyJ0cmFpdF90eXBlIjoiU2FsYW1pIiwidmFsdWUiOiJObyJ9LHsidHJhaXRfdHlwZSI6IlR1bmEiLCJ2YWx1ZSI6Ik5vIn0seyJ0cmFpdF90eXBlIjoiQ29ybiIsInZhbHVlIjoiTm8ifSx7InRyYWl0X3R5cGUiOiJDaGlsbGllcyIsInZhbHVlIjoiWWVzIn0seyJ0cmFpdF90eXBlIjoiR3JlZW4gUGVwcGVycyIsInZhbHVlIjoiTm8ifSx7InRyYWl0X3R5cGUiOiJKYWxhcGVub3MiLCJ2YWx1ZSI6Ik5vIn0seyJ0cmFpdF90eXBlIjoiTXVzaHJvb20iLCJ2YWx1ZSI6Ik5vIn0seyJ0cmFpdF90eXBlIjoiT25pb24iLCJ2YWx1ZSI6Ik5vIn0seyJ0cmFpdF90eXBlIjoiUGluZWFwcGxlIiwidmFsdWUiOiJObyJ9LHsidHJhaXRfdHlwZSI6IlJlZCBQZXBwZXIiLCJ2YWx1ZSI6Ik5vIn1dfQ==');
    });
});
