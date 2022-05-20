import { NextApiRequest, NextApiResponse } from 'next';
import { providers } from 'ethers';
import { getPizzaContractAddress } from '../../../utils/network';
import { LazlosPizzas__factory } from '../../../contracts/typechain-types';
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
    const { address } = req.query;
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
    const ingredients = ingredientsRes.data.ingredients;

    const pizzas = await Promise.all(
      Array.from(Array(numberOfPizzas).keys()).map(async i => {
        const tokenId = i + 1;
        const owner = await contract.ownerOf(tokenId);
        if (owner !== address) return null;
        const _pizza = await contract.pizza(tokenId);
        const uri = await contract.tokenURI(tokenId);
        const pizza = { allIngredients: [] };
        for (let i = 0; i < 5; i += 1) {
          if (i <= 1) {
            pizza[PizzaKey[i]] = ingredients.find(
              ingredient => ingredient.tokenId === _pizza[i],
            );
            if (pizza[PizzaKey[i]])
              pizza.allIngredients.push(pizza[PizzaKey[i]]);
          } else {
            pizza[PizzaKey[i]] = ingredients.filter(ingredient =>
              (_pizza[i] as unknown as number[]).includes(ingredient.tokenId),
            );
            if (pizza[PizzaKey[i]])
              pizza.allIngredients.push(...pizza[PizzaKey[i]]);
          }
        }

        const uriString = Buffer.from(uri.split(',')[1], 'base64').toString(
          'ascii',
        );
        const uriJson = JSON.parse(uriString);

        return { ...pizza, ...uriJson, tokenId };
      }),
    );

    res.statusCode = 201;
    res.json({ pizzas: pizzas.filter(pizza => !!pizza) });
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
