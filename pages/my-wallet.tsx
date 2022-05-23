import { Box, Heading } from '@chakra-ui/react';
import { IngredientList } from '../components/PizzaCave/IngredientList';
import { SelectYourPizza } from '../components/PizzaCave/SelectYourPizza';
import { useWallet } from '../hooks/useWallet';

export default function MyWallet() {
  const { myIngredients, ingredientGroups, myPizzas } = useWallet();

  return (
    <Box p="20px" w="full">
      <Heading fontFamily="Lato" size="lg" color="tomato.500">
        My Wallet
      </Heading>
      <SelectYourPizza pizzas={myPizzas} />
      <Box style={{ marginTop: 20, padding: 10 }}>
        {ingredientGroups &&
          ingredientGroups.map(_group => {
            const ownedFromGroup =
              _group.ingredients?.filter(ingredient =>
                myIngredients?.find(
                  myIngredient =>
                    ingredient.tokenId === myIngredient.tokenId &&
                    !!myIngredient.balance,
                ),
              ) || [];
            return ownedFromGroup.length || !myIngredients ? (
              <IngredientList
                ingredientGroup={_group}
                ownedIngredients={myIngredients}
                key={_group.name}
              />
            ) : null;
          })}
      </Box>
    </Box>
  );
}
