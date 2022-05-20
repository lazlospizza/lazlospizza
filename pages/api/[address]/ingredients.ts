import { NextApiRequest, NextApiResponse } from 'next';
import { BigNumber, providers } from 'ethers';
import { getIngredientsContractAddress } from '../../../utils/network';
import { LazlosIngredients__factory } from '../../../contracts/typechain-types';

export enum IngredientKey {
  name,
  ingredientType,
  artist,
  price,
  supply,
}

export enum IngredientType {
  Base,
  Sauce,
  Cheese,
  Meat,
  Topping,
}

export default async function ingredients(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { address } = req.query;
    const infuraProvider = new providers.InfuraProvider(
      process.env.NEXT_PUBLIC_ETH_NETWORK,
      process.env.NEXT_PUBLIC_INFURA_ID,
    );
    const contract = LazlosIngredients__factory.connect(
      getIngredientsContractAddress(),
      infuraProvider,
    );
    const _numberOfIngredients = await contract.numIngredients();
    const numberOfIngredients = parseInt(_numberOfIngredients._hex, 16);

    const ingredients = await Promise.all(
      Array.from(Array(numberOfIngredients).keys()).map(async i => {
        const tokenId = i + 1;
        const _balance = await contract.balanceOfAddress(`${address}`, tokenId);
        const balance = parseInt(_balance._hex, 16);
        if (balance === 0) return null;
        const _ingredient = await contract.getIngredient(tokenId);
        const uri = await contract.uri(tokenId);
        const ingredient = {};
        for (let i = 0; i < 5; i += 1) {
          if (i === 1) {
            ingredient[IngredientKey[i]] = IngredientType[_ingredient[i]];
          } else if (i === 3) {
            ingredient[IngredientKey[i]] =
              parseInt((_ingredient[i] as BigNumber)._hex, 16) /
              1000000000000000000;
          } else if (i === 4) {
            ingredient[IngredientKey[i]] = parseInt(
              (_ingredient[i] as BigNumber)._hex,
              16,
            );
          } else {
            ingredient[IngredientKey[i]] = _ingredient[i];
          }
        }

        const uriString = Buffer.from(uri.split(',')[1], 'base64').toString(
          'ascii',
        );
        const uriJson = JSON.parse(uriString);

        return { ...ingredient, ...uriJson, tokenId };
      }),
    );

    res.statusCode = 201;
    res.json({ ingredients: ingredients.filter(ingredient => !!ingredient) });
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
