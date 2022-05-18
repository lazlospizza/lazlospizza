import {
  Box,
  Text,
  Stack,
  Button,
  Flex,
  Center,
  Heading,
} from '@chakra-ui/react';
import { colors } from '../../styles/theme';
import { Ingredient, IngredientGroup, Pizza, PizzaCave } from '../../types';
import { IngredientList } from './IngredientList';

interface Props {
  ingredientGroups: IngredientGroup[];
  ownedIngredients?: { tokenId: number; amount: number }[];
  addIngredient: (ingredient: Ingredient) => void;
  removeIngredient?: (Ingredient: Ingredient) => void;
  pizza: Pizza;
  tab: PizzaCave;
  handleQuickStart?: () => void;
}

export const SelectYourIngredients = ({
  ingredientGroups,
  ownedIngredients,
  addIngredient,
  removeIngredient,
  pizza,
  tab,
  handleQuickStart,
}: Props) => {
  const renderPizza = () => {
    return (
      <Box
        key={pizza.tokenId}
        className="artist-card"
        backgroundColor={colors.cheese[150]}
        p="2"
      >
        <Flex>
          <Center
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 150,
              height: 150,
            }}
          >
            <img src="/assets/tablecloth.svg" alt="tablecloth" />
            {(
              pizza?.allIngredients?.sort((a, b) => a.tokenId - b.tokenId) ?? []
            ).map(item => (
              <div
                key={item.tokenId}
                style={{
                  position: 'absolute',
                  width: '90%',
                  height: '90%',
                  backgroundImage: `url(/assets/ingredients/baked/${item.imgUrl})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center center',
                }}
              />
            ))}
          </Center>
          {/* Right of Image */}
          <Flex width={'100%'} justifyContent={'space-between'}>
            {/* Name and Cost */}
            <Flex direction={'column'} px="8" py="3">
              <Stack spacing={3}>
                {pizza.allIngredients.map(ingredient => (
                  <Heading
                    key={ingredient.tokenId}
                    size={'sm'}
                    color="gray.dark"
                  >
                    {ingredient.name}
                  </Heading>
                ))}
              </Stack>
            </Flex>
            <Flex direction={'column'} justifyContent={'space-between'} py="2">
              <Button className="tomato-btn" onClick={() => {}} disabled>
                Select
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    );
  };

  return (
    <Box style={{ marginTop: 20, padding: 10 }}>
      <Stack>
        {tab === PizzaCave.rebake && renderPizza()}
        {tab === PizzaCave.buyAndBake && (
          <Flex justify={'space-between'} alignItems="center">
            <Text color="gray.dark" fontWeight={700} fontSize={'xl'}>
              Select your Ingredients
            </Text>
            {!!handleQuickStart && (
              <Button onClick={handleQuickStart} className="tomato-btn">
                Quick Start
              </Button>
            )}
          </Flex>
        )}
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
                addIngredient={addIngredient}
                removeIngredient={removeIngredient}
                pizza={pizza}
                tab={tab}
              />
            ) : null;
          })}
      </Stack>
    </Box>
  );
};
