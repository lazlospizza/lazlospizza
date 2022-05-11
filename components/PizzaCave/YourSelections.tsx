import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { BAKING_FEE } from '../../constants';
import { Pizza, PizzaCave } from '../../types';

interface Props {
  pizza: Pizza;
  tab: PizzaCave;
}
export const YourSelections = ({ pizza, tab }: Props) => {
  // const [disableBuy, setDisableBuy] = useState(true);
  const [disableBake, setDisableBake] = useState(true);

  const validatePizza = () => {
    if (isEmpty(pizza.allIngredients)) return setDisableBake(true);
    if (!pizza.base) return setDisableBake(true);
    if (!pizza.sauce) return setDisableBake(true);
    // add checks for other ingredients
    console.log('Bake and Bake Allowed!');
    setDisableBake(false);
  };

  useEffect(() => {
    validatePizza();
  }, [pizza]);

  const renderButtons = () => {
    switch (tab) {
      case PizzaCave.buyAndBake:
        return (
          <Stack pt={8}>
            <>
              <Button
                disabled={pizza.totalCost === 0}
                className="tomato-btn"
              >{`Buy Ingredients only at ${pizza.totalCost}`}</Button>
              <Button
                disabled={disableBake}
                className="tomato-btn"
              >{`Buy and Bake only at ${
                Math.round((pizza.totalCost + BAKING_FEE) * 100) / 100
              }`}</Button>
            </>
          </Stack>
        );
      case PizzaCave.bake:
        return (
          <Button
            disabled={disableBake}
            className="tomato-btn"
          >{`Bake Pizza at ${BAKING_FEE}`}</Button>
        );

      default:
        break;
    }
  };

  return (
    <Box p="8">
      <Stack>
        {/* Image */}
        <Center
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src="/assets/tablecloth.svg" alt="tablecloth" />
          {(pizza?.allIngredients ?? []).map(item => (
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
        {/* Number of Ingredients Selected */}
        <Flex pt={8} justifyContent="space-between">
          <Text fontWeight={700} color="gray.dark">
            {`Ingredients Selected`}
          </Text>
          <Text fontWeight={700} color="tomato.500">
            {pizza.allIngredients.length}
          </Text>
        </Flex>
        {/* Selected Ingredients */}
        {pizza.allIngredients.length &&
          pizza.allIngredients.map(item => (
            <Flex key={item.name} pt={8} justifyContent="space-between">
              <Heading size={'sm'} color={'gray.dark'}>
                {item.name}
              </Heading>
              <Heading size={'sm'} color={'tomato.500'}>
                {item.cost}
              </Heading>
            </Flex>
          ))}
        {/* Buttons */}
        {renderButtons()}
      </Stack>
    </Box>
  );
};
