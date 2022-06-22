import { Box, useInterval } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { random } from 'lodash';
import { useEffect, useMemo, useState } from 'react';

const IngredientItem: React.FC = () => {
  const ingredientNumber = useMemo(() => {
    return random(1, 17);
  }, []);
  return (
    <img
      src={`/assets/ingredients/items/${ingredientNumber}.png`}
      alt="ingredient"
    />
  );
};

export const IngredientsRain: React.FC = () => {
  const [itemsToRender, setItemsToRender] = useState<
    {
      offset: number;
      key: number;
      width: number;
      animationDuration: number;
      animationEnd: number;
    }[]
  >([]);
  const addItems = () => {
    const newItemsToRender = [...itemsToRender].filter(
      item => item.animationEnd > +new Date(),
    );
    const newItemsCount = random(3, 7);
    for (let i = 0; i < newItemsCount; i++) {
      const offset = random(0, 100);
      const key = offset + Math.random() * 1000000;
      const animationDuration = random(3, 5);
      newItemsToRender.push({
        offset,
        key,
        animationDuration,
        animationEnd: 2000 + +new Date() + animationDuration * 1000,
        width: random(100, 150),
      });
    }
    setItemsToRender([...newItemsToRender]);
  };
  useInterval(() => {
    addItems();
  }, 1000);
  useEffect(() => {
    addItems();
  }, []);
  return (
    <Box
      top="0"
      left="0"
      w="100%"
      h="310px"
      position="absolute"
      bgColor="orange.100"
      overflow="hidden"
      m="0"
    >
      {itemsToRender.map(({ key, offset, animationDuration, width }) => {
        return (
          <ItemContainer
            key={key}
            offset={offset}
            animationDuration={animationDuration}
            width={width}
          >
            <IngredientItem />
          </ItemContainer>
        );
      })}
    </Box>
  );
};

const ItemContainer = styled.div<{
  offset: number;
  animationDuration: number;
  width: number;
}>`
  @keyframes falldown {
    0% {
      transform: translateY(-150px);
    }
    100% {
      transform: translateY(calc(100% + 450px));
    }
  }
  width: ${props => props.width}px;
  position: absolute;
  top: 0px;
  left: calc(${props => props.offset}% - ${props => props.width}px);
  animation-timing-function: linear;
  animation-name: falldown;
  animation-duration: ${props => props.animationDuration}s;
  animation-fill-mode: forwards;
  opacity: 0.7;
  img {
    width: 100%;
  }
`;
