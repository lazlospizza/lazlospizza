import { InfoIcon } from '@chakra-ui/icons';
import {
  Box,
  Text,
  Stack,
  Button,
  Flex,
  Center,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { colors } from '../../styles/theme';
import { Ingredient, IngredientGroup, Pizza, PizzaCave } from '../../types';
import { AlertModal } from '../shared/AlertModal';
import { IngredientList } from './IngredientList';

interface Props {
  ingredientGroups: IngredientGroup[];
  ownedIngredients?: Ingredient[];
  addIngredient: (ingredient: Ingredient) => void;
  removeIngredient?: (Ingredient: Ingredient) => void;
  unburnIngredient?: (Ingredient: Ingredient) => void;
  pizza: Pizza;
  tab: PizzaCave;
  handleQuickStart?: () => void;
  unselectPizza?: () => void;
}

export const SelectYourIngredients = ({
  ingredientGroups,
  ownedIngredients,
  addIngredient,
  removeIngredient,
  unburnIngredient,
  pizza,
  tab,
  handleQuickStart,
  unselectPizza,
}: Props) => {
  const [alertOpened, setAlertOpened] = useState<string | null>();
  const showAlert = () => {
    setAlertOpened(
      'All pizzas must have 1 base, 1 sauce, 1-3 cheeses, 0-4 meats  0-4 toppings.',
    );
  };
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
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundImage: `url(${pizza.image})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
              }}
            />
          </Center>
          {/* Right of Image */}
          <Flex width={'100%'} justifyContent={'space-between'}>
            {/* Name and Cost */}
            <Flex direction={'column'} px="8" py="3">
              <Stack spacing={3}>
                {pizza?.allIngredients.map(ingredient => (
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
              <Button className="tomato-btn" onClick={unselectPizza}>
                Selected
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    );
  };

  const ingredientsTabs = useMemo(() => {
    return ingredientGroups?.map(group => {
      const ownedFromGroup =
        group.ingredients?.filter(ingredient =>
          ownedIngredients?.find(
            ownedIngredient =>
              ingredient.tokenId === ownedIngredient.tokenId &&
              !!ownedIngredient.balance,
          ),
        ) || [];
      return { group, ownedFromGroup, name: group.name };
    });
  }, [ingredientGroups, ownedIngredients]);

  return (
    <>
      {alertOpened ? (
        <AlertModal
          message={alertOpened}
          isOpen={!!alertOpened}
          onRequestClose={setAlertOpened.bind(null, false)}
        />
      ) : null}
      <Box style={{ marginTop: 20, padding: 10 }}>
        <Stack>
          {tab === PizzaCave.rebake && renderPizza()}
          {tab === PizzaCave.buyAndBake && (
            <Flex justify={'space-between'} alignItems="center">
              <Text color="gray.dark" fontWeight={700} fontSize={'xl'}>
                Select your Ingredients{' '}
                <InfoIcon
                  ml={2}
                  color="tomato.500"
                  fontSize={'l'}
                  sx={{ cursor: 'pointer' }}
                  onClick={showAlert}
                />
              </Text>
              {!!handleQuickStart && (
                <Button onClick={handleQuickStart} className="tomato-btn">
                  Quick Start
                </Button>
              )}
            </Flex>
          )}
          {ingredientGroups && (
            <Tabs color={'primary'}>
              <TabList>
                {ingredientsTabs.map(item => (
                  <Tab
                    sx={{
                      color: 'gray.dark',
                      fontSize: '18px',
                      border: 'none',
                      marginRight: '5px',
                      borderBottomStyle: 'solid',
                      borderBottomWidth: '2px',
                      borderBottomColor: 'background.light',
                      [`&[aria-selected=true]`]: {
                        color: 'tomato.500',
                        borderBottomColor: 'tomato.500',
                      },
                    }}
                    key={item.name}
                  >
                    {item.name}
                  </Tab>
                ))}
              </TabList>
              <TabPanels>
                {ingredientsTabs.map(item => (
                  <TabPanel key={item.name}>
                    <IngredientList
                      ingredientGroup={item.group}
                      ownedIngredients={ownedIngredients}
                      addIngredient={addIngredient}
                      removeIngredient={removeIngredient}
                      unburnIngredient={unburnIngredient}
                      pizza={pizza}
                      tab={tab}
                      columns={2}
                    />
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          )}
        </Stack>
      </Box>
    </>
  );
};
