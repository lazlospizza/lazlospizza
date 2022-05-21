import { Box, Heading, Stack, useToast } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { IngredientList } from '../components/PizzaCave/IngredientList';
import { SelectYourPizza } from '../components/PizzaCave/SelectYourPizza';
import { useIngredientsContract } from '../hooks/useContract';
import { useWallet } from '../hooks/useWallet';

export default function MyWallet() {
  const { ingredientsContract } = useIngredientsContract();
  const { wallet, ingredients, ingredientGroups, pizzas } = useWallet();
  const [ownedIngredients, setOwnedIngredients] = useState<
    { tokenId: number; amount: number }[]
  >([]);
  const [errorMessage, setErrorMessage] = useState('');
  const toast = useToast();
  const provider = wallet?.web3Provider;

  const getIngredients = useCallback(async () => {
    if (!provider || !ingredients.length) return;
    try {
      setErrorMessage(null);
      const results = await ingredientsContract.balanceOfBatch(
        ingredients.map(() => wallet?.address),
        ingredients.map(ingredient => ingredient.tokenId),
      );
      const parsedResults = results.map(bigNumber =>
        parseInt(bigNumber._hex, 16),
      );

      setOwnedIngredients(
        ingredients.map(({ tokenId }, index) => ({
          tokenId,
          amount: parsedResults[index],
        })),
      );
    } catch (e) {
      console.log(e);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.MM_ERR = e;
      setErrorMessage('Unexpected Error');
    } finally {
      // setIsMinting(false);
    }
  }, [ingredientsContract, provider, ingredients]);

  useEffect(() => {
    getIngredients();
  }, [getIngredients]);

  return (
    <Box p="20px" w="full">
      <Heading fontFamily="Lato" size="lg" color="tomato.500">
        My Wallet
      </Heading>
      <SelectYourPizza pizzas={pizzas} />
      <Box style={{ marginTop: 20, padding: 10 }}>
        {ingredientGroups &&
          ingredientGroups.map(_group => {
            const ownedFromGroup =
              _group.ingredients?.filter(ingredient =>
                ownedIngredients?.find(
                  ownedIngredient =>
                    ingredient.tokenId === ownedIngredient.tokenId &&
                    ownedIngredient.amount > 0,
                ),
              ) || [];
            return ownedFromGroup.length || !ownedIngredients ? (
              <IngredientList
                ingredientGroup={_group}
                ownedIngredients={ownedIngredients}
                key={_group.name}
              />
            ) : null;
          })}
      </Box>
    </Box>
  );
}
