import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BuyAndBake } from '../components/PizzaCave/BuyAndBake';
import { RandomBake } from '../components/PizzaCave/RandomBake';
import { BAKING_FEE } from '../constants';

enum Tabs {
  bake = 'Bake',
  unbake = 'Unbake',
  rebake = 'Rebake',
  randomBake = 'Random Bake',
}

export default function PizzaCave() {
  const [tab, setTab] = useState(Tabs.bake);

  const renderSubpage = (tab: Tabs) => {
    switch (tab) {
      case Tabs.bake:
        return <BuyAndBake />;
      case Tabs.randomBake:
        return <RandomBake />;
      default:
        break;
    }
  };

  return (
    <Box>
      {/* sub head */}
      <Flex w="full" backgroundColor="cheese.200">
        <Center mx="30px" my="10px">
          <img
            src="/assets/pizza.svg"
            alt="pizza"
            width="100px"
            height="100px"
          />
        </Center>
        <Center>
          <Heading size="lg" color="gray.dark">
            Pizza Cave
          </Heading>
        </Center>
      </Flex>

      {/* Page nav */}
      <Flex m="20px">
        <Button onClick={() => setTab(Tabs.bake)} className="cave-nav-btn">
          {'Bake'}
        </Button>
        <Button onClick={() => setTab(Tabs.unbake)} className="cave-nav-btn">
          {'Unbake'}
        </Button>
        <Button onClick={() => setTab(Tabs.rebake)} className="cave-nav-btn">
          {'Rebake'}
        </Button>
        <Button
          onClick={() => setTab(Tabs.randomBake)}
          className="cave-nav-btn"
        >
          {'Random Bake'}
        </Button>
      </Flex>

      {renderSubpage(tab)}
    </Box>
  );
}
