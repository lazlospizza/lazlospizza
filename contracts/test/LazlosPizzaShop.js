const { expect } = require("chai");
const hre = require("hardhat");

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

    // 1
    await ingredients.addIngredient({
        name: 'Dough',
        ingredientType: 0,
        artist: owner.address,
        price: hre.ethers.BigNumber.from('100000000000000000'),
        supply: 3,
    })

    // 2
    await ingredients.addIngredient({
        name: 'Marinara',
        ingredientType: 1,
        artist: owner.address,
        price: hre.ethers.BigNumber.from('100000000000000000'),
        supply: 3,
    })

    // 3
    await ingredients.addIngredient({
        name: 'Pesto',
        ingredientType: 1,
        artist: owner.address,
        price: hre.ethers.BigNumber.from('100000000000000000'),
        supply: 3,
    })

    // 4
    await ingredients.addIngredient({
        name: 'Mozzarella',
        ingredientType: 2,
        artist: owner.address,
        price: hre.ethers.BigNumber.from('100000000000000000'),
        supply: 3,
    })

    // 5
    await ingredients.addIngredient({
        name: 'Ricotta',
        ingredientType: 2,
        artist: owner.address,
        price: hre.ethers.BigNumber.from('100000000000000000'),
        supply: 3,
    })

    // 6
    await ingredients.addIngredient({
        name: 'Pepperoni',
        ingredientType: 3,
        artist: owner.address,
        price: hre.ethers.BigNumber.from('100000000000000000'),
        supply: 3,
    })

    // 7
    await ingredients.addIngredient({
        name: 'Sausage',
        ingredientType: 3,
        artist: owner.address,
        price: hre.ethers.BigNumber.from('100000000000000000'),
        supply: 3,
    })

    // 8
    await ingredients.addIngredient({
        name: 'Basil',
        ingredientType: 4,
        artist: owner.address,
        price: hre.ethers.BigNumber.from('100000000000000000'),
        supply: 3,
    })

    // 9
    await ingredients.addIngredient({
        name: 'Pineapple',
        ingredientType: 4,
        artist: owner.address,
        price: hre.ethers.BigNumber.from('100000000000000000'),
        supply: 1,
    })

    return [shop, ingredients, pizzas, rendering, owner];
}

describe("LazlosPizzaShop", function () {
    it("ingredients should return the correct ingredient", async function () {
        const [_1, ingredients, _2, _3, _4] = await setup();
        expect((await ingredients.ingredients(6)).name).to.equal('Pepperoni');
        expect((await ingredients.ingredients(8)).name).to.equal('Basil');
        expect((await ingredients.ingredients(7)).supply).to.equal(3);
        expect((await ingredients.ingredients(9)).supply).to.equal(1);
    });

    it("buyIngredients should mint multiple ingredients and reduce supply", async function () {
        const [shop, ingredients, _1, _2, owner] = await setup();
        await shop.buyIngredients([1, 3, 5, 7, 9], [1, 2, 3, 2, 1], {
            value: hre.ethers.BigNumber.from('900000000000000000')
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

        expect((await ingredients.ingredients(1)).supply).to.equal(2);
        expect((await ingredients.ingredients(2)).supply).to.equal(3);
        expect((await ingredients.ingredients(3)).supply).to.equal(1);
    });

    it("bakePizza should mint a pizza NFT and burn ingredients", async function () {
        const [shop, ingredients, pizzas, _1, owner] = await setup();
        await shop.buyIngredients([1, 2, 3, 4, 5, 6, 7, 8, 9], [2, 2, 2, 2, 2, 2, 2, 2, 1], {
            value: hre.ethers.BigNumber.from('1700000000000000000')
        });

        expect(await ingredients.balanceOf(owner.address, 1)).to.equal(2);

        await shop.bakePizza([1, 2, 4, 5, 6, 7, 8, 9], {
            value: hre.ethers.BigNumber.from('10000000000000000')
        });

        expect(await ingredients.balanceOf(owner.address, 1)).to.equal(1);
        expect(await pizzas.ownerOf(1)).to.equal(owner.address);
        expect((await pizzas.pizza(1)).base).to.equal(1);
        expect((await pizzas.pizza(1)).sauce).to.equal(2);

        const cheeses = (await pizzas.pizza(1)).cheeses;
        expect(cheeses[0]).to.equal(4);
        expect(cheeses[1]).to.equal(5);
        expect(cheeses[2]).to.equal(0);

        const meats = (await pizzas.pizza(1)).meats;
        expect(meats[0]).to.equal(6);
        expect(meats[1]).to.equal(7);
        expect(meats[2]).to.equal(0);
        expect(meats[3]).to.equal(0);

        const toppings = (await pizzas.pizza(1)).toppings;
        expect(toppings[0]).to.equal(8);
        expect(toppings[1]).to.equal(9);
        expect(toppings[2]).to.equal(0);
        expect(toppings[3]).to.equal(0);
    });

    it("rendering should work", async function () {
        const [shop, ingredients, pizzas, rendering, owner] = await setup();
        await shop.buyIngredients([1, 2, 3, 4, 5, 6, 7, 8, 9], [2, 2, 2, 2, 2, 2, 2, 2, 1], {
            value: hre.ethers.BigNumber.from('1700000000000000000')
        });

        const metadata1 = await ingredients.uri(1);
        const metadata10 = await ingredients.uri(10);
        const metadata21 = await ingredients.uri(21);
        expect(metadata1).to.equal('data:application/json;base64,eyJuYW1lIjoiRG91Z2giLCJkZXNjcmlwdGlvbiI6ImJsYWggYmxhaCBibGFoIHNvbWV0aGluZyBhYm91dCBwaXp6YSIsImltYWdlIjoiaHR0cHM6Ly9nYXRld2F5LnBpbmF0YS5jbG91ZC9pcGZzL0ZBS0VfSVBGU19IQVNILzEucG5nIn0=');
        expect(metadata10).to.equal('data:application/json;base64,eyJuYW1lIjoiIiwiZGVzY3JpcHRpb24iOiJibGFoIGJsYWggYmxhaCBzb21ldGhpbmcgYWJvdXQgcGl6emEiLCJpbWFnZSI6Imh0dHBzOi8vZ2F0ZXdheS5waW5hdGEuY2xvdWQvaXBmcy9GQUtFX0lQRlNfSEFTSC8xMC5wbmcifQ==');
        expect(metadata21).to.equal('data:application/json;base64,eyJuYW1lIjoiIiwiZGVzY3JpcHRpb24iOiJibGFoIGJsYWggYmxhaCBzb21ldGhpbmcgYWJvdXQgcGl6emEiLCJpbWFnZSI6Imh0dHBzOi8vZ2F0ZXdheS5waW5hdGEuY2xvdWQvaXBmcy9GQUtFX0lQRlNfSEFTSC8yMS5wbmcifQ==');
    });
});
