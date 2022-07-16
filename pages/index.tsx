import { Box, Button, Center, Flex, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { Bake } from '../components/PizzaCave/Bake';
import { BuyAndBake } from '../components/PizzaCave/BuyAndBake';
import { RandomBake } from '../components/PizzaCave/RandomBake';
import { Rebake } from '../components/PizzaCave/Rebake';
import { Unbake } from '../components/PizzaCave/Unbake';
import { useIsMobile } from '../utils/general';

enum Tabs {
  buyAndBake = 'Buy & Bake',
  bake = 'Bake',
  unbake = 'Unbake',
  rebake = 'Rebake',
  randomBake = 'Random Bake',
}

export default function PizzaCave() {
  const isMobile = useIsMobile();
  const [tab, setTab] = useState(Tabs.buyAndBake);

  const renderSubpage = (tab: Tabs) => {
    switch (tab) {
      case Tabs.buyAndBake:
        return <BuyAndBake />;
      case Tabs.bake:
        return <Bake />;
      case Tabs.unbake:
        return <Unbake />;
      case Tabs.rebake:
        return <Rebake />;
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
      <Flex
        m="20px"
        style={isMobile ? { flexWrap: 'wrap', justifyContent: 'center' } : {}}
        className="tour-pizza-cave"
      >
        <Button
          onClick={() => setTab(Tabs.buyAndBake)}
          backgroundColor={tab === Tabs.buyAndBake ? '#3D3431' : ''}
          className={
            tab === Tabs.buyAndBake ? 'cave-nav-btn-selected' : 'cave-nav-btn'
          }
        >
          {Tabs.buyAndBake}
        </Button>
        <Button
          onClick={() => setTab(Tabs.bake)}
          backgroundColor={tab === Tabs.bake ? '#3D3431' : ''}
          className={
            tab === Tabs.bake ? 'cave-nav-btn-selected' : 'cave-nav-btn'
          }
        >
          {Tabs.bake}
        </Button>
        <Button
          onClick={() => setTab(Tabs.unbake)}
          backgroundColor={tab === Tabs.unbake ? '#3D3431' : ''}
          className={
            tab === Tabs.unbake ? 'cave-nav-btn-selected' : 'cave-nav-btn'
          }
        >
          {'Unbake'}
        </Button>
        <Button
          onClick={() => setTab(Tabs.rebake)}
          backgroundColor={tab === Tabs.rebake ? '#3D3431' : ''}
          className={
            tab === Tabs.rebake ? 'cave-nav-btn-selected' : 'cave-nav-btn'
          }
        >
          {Tabs.rebake}
        </Button>
        <Button
          onClick={() => setTab(Tabs.randomBake)}
          backgroundColor={tab === Tabs.randomBake ? '#3D3431' : ''}
          className={
            tab === Tabs.randomBake ? 'cave-nav-btn-selected' : 'cave-nav-btn'
          }
        >
          {Tabs.randomBake}
        </Button>
      </Flex>

      {renderSubpage(tab)}
    </Box>
  );
}
