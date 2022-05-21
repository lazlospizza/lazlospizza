import { NextApiRequest, NextApiResponse } from 'next';
import { providers } from 'ethers';
import { getPizzaContractAddress } from '../../utils/network';
import { LazlosPizzas__factory } from '../../contracts/typechain-types';
import axios from 'axios';

export enum PizzaKey {
  base,
  sauce,
  cheeses,
  meats,
  toppings,
}

export default async function pizzas(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const infuraProvider = new providers.InfuraProvider(
      process.env.NEXT_PUBLIC_ETH_NETWORK,
      process.env.NEXT_PUBLIC_INFURA_ID,
    );
    const contract = LazlosPizzas__factory.connect(
      getPizzaContractAddress(),
      infuraProvider,
    );
    const _numberOfPizzas = await contract.numPizzas();
    const numberOfPizzas = parseInt(_numberOfPizzas._hex, 16);

    const ingredientsRes = await axios.get(
      process.env.NEXT_PUBLIC_DOMAIN_URL + '/api/ingredients',
    );
    const _ingredients = ingredientsRes.data.ingredients;

    const _pizzas = await Promise.all(
      Array.from(Array(numberOfPizzas).keys()).map(async i => {
        const tokenId = i + 1;
        const _pizza = await contract.pizza(tokenId);
        const uri = await contract.tokenURI(tokenId);
        const owner = await contract.ownerOf(tokenId);
        const pizza = { allIngredients: [] };
        for (let i = 0; i < 5; i += 1) {
          pizza[PizzaKey[i]] = _pizza[i];
          if (i <= 1) {
            if (pizza[PizzaKey[i]]) pizza?.allIngredients.push(_pizza[i]);
          } else {
            if (pizza[PizzaKey[i]])
              pizza?.allIngredients.push(...pizza[PizzaKey[i]]);
          }
        }

        const uriString = Buffer.from(uri.split(',')[1], 'base64').toString(
          'ascii',
        );
        const uriJson = JSON.parse(uriString);

        return { ...uriJson, ...pizza, tokenId, owner };
      }),
    );

    const ingredients = _ingredients.map(ingredient => {
      const numberOfPizzas = _pizzas.filter(pizza =>
        pizza.allIngredients.find(tokenId => tokenId === ingredient.tokenId),
      ).length;
      const rarity = (numberOfPizzas / _pizzas.length) * 100;
      return { ...ingredient, numberOfPizzas, rarity };
    });

    const pizzas = await Promise.all(
      _pizzas.map(async _pizza => {
        const pizza = { ..._pizza, allIngredients: [] };
        for (let i = 0; i < 5; i += 1) {
          if (i <= 1) {
            pizza[PizzaKey[i]] = ingredients.find(
              ingredient => ingredient.tokenId === _pizza[PizzaKey[i]],
            );
            if (pizza[PizzaKey[i]])
              pizza?.allIngredients.push(pizza[PizzaKey[i]]);
          } else {
            pizza[PizzaKey[i]] = ingredients.filter(ingredient =>
              (_pizza[PizzaKey[i]] as unknown as number[]).includes(
                ingredient.tokenId,
              ),
            );
            if (pizza[PizzaKey[i]])
              pizza?.allIngredients.push(...pizza[PizzaKey[i]]);
          }
        }

        return pizza;
      }),
    );

    res.statusCode = 201;
    res.json({ pizzas, ingredients });
    return res.end();
  } catch (e) {
    console.log(e);
    res.statusCode = 400;
    res.json({
      error: e.message || 'Something went wrong.',
    });
    return res.end();
  }
}
