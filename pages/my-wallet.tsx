import { Box, Flex, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { IngredientList } from '../components/PizzaCave/IngredientList';
import { SelectYourPizza } from '../components/PizzaCave/SelectYourPizza';
import { NavButton } from '../components/shared/NavButton';
import { useWallet } from '../hooks/useWallet';
import { colors } from '../styles/theme';

enum Tabs {
  pizzas,
  ingredients,
}

export default function MyWallet() {
  const { myIngredients, ingredientGroups, myPizzas } = useWallet();
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.pizzas);
  console.log(myIngredients, ingredientGroups);
  return (
    <Box p="20px" w="full">
      <Heading fontFamily="Lato" size="lg" color="tomato.500">
        My Wallet
      </Heading>
      <Flex pt="4" px="8" alignContent={'center'} justifyContent={'center'}>
        <NavButton
          title="My Pizzas"
          isSelected={selectedTab === Tabs.pizzas}
          onClick={() => {
            setSelectedTab(Tabs.pizzas);
          }}
          bgColor={colors.gray.background}
        />
        <NavButton
          title="My Ingredients"
          isSelected={selectedTab === Tabs.ingredients}
          onClick={() => {
            setSelectedTab(Tabs.ingredients);
          }}
          bgColor={colors.gray.background}
        />
      </Flex>
      {selectedTab === Tabs.pizzas && (
        <SelectYourPizza pizzas={myPizzas} columns={2} />
      )}
      {selectedTab === Tabs.ingredients && (
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
      )}
    </Box>
  );
}
