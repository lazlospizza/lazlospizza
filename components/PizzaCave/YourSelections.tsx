/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { parseEther } from 'ethers/lib/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BAKING_FEE, REBAKE_FEE, UNBAKE_FEE } from '../../constants';
import { useMainContract } from '../../hooks/useContract';
import { useWallet } from '../../hooks/useWallet';
import { Ingredient, Pizza, PizzaCave } from '../../types';
import {
  getIngredientsCount,
  getTotalCost,
  isPizzaValid,
  parsePrice,
  removeAdditionalIngredient,
  removeIngredient,
} from '../../utils/general';
import { AlertModal } from '../shared/AlertModal';
import { SuccessModal } from './SuccessModal';

interface Props {
  pizza?: Pizza | null;
  removeBurnIngredient?: (item: Ingredient) => void;
  addBurnIngredient?: (item: Ingredient) => void;
  tab: PizzaCave;
  setPizza: any;
}
export const YourSelections = ({
  pizza,
  tab,
  removeBurnIngredient,
  addBurnIngredient,
  setPizza,
}: Props) => {
  const { wallet, isConnected, fetchPizzas } = useWallet();
  const { mainContract } = useMainContract();
  const [disableBake, setDisableBake] = useState(true);
  const [isMinting, setIsMinting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [mintingTxn, setMintingTxn] = useState<string | null>(null);
  const [mintedTokenId, setMintedTokenId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const toast = useToast();
  const provider = wallet?.web3Provider;
  const ingredientsCount = useMemo(() => getIngredientsCount(pizza), [pizza]);
  const validatePizza = () => {
    let pizzaValid = isPizzaValid(pizza);
    if (
      pizzaValid &&
      tab === PizzaCave.rebake &&
      !pizza.additionalIngredients?.length &&
      !pizza.burnIngredients?.length
    ) {
      pizzaValid = false;
    }
    setDisableBake(!pizzaValid);
  };

  useEffect(() => {
    validatePizza();
  }, [pizza]);

  useEffect(() => {
    if (!!errorMessage) {
      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 9000,
        isClosable: true,
        onCloseComplete: () => setErrorMessage(null),
      });
    }
  }, [errorMessage, toast]);

  const handleBake = useCallback(async () => {
    if (!provider) return;
    try {
      const ingredientTokenIds = pizza?.allIngredients.map(
        ingredient => ingredient.tokenId,
      );
      setIsMinting(true);
      setErrorMessage(null);
      const signer = provider.getSigner();
      const contractWithSigner = mainContract.connect(signer);
      const result = await contractWithSigner.bakePizza(ingredientTokenIds, {
        from: signer._address,
        value: parseEther(BAKING_FEE.toFixed(2)),
      });

      setMintingTxn(result.hash);
      const receipt = await result.wait();
      const [mintedId] = receipt.events
        ?.map(({ topics }) => (topics?.[3] ? parseInt(topics?.[3], 16) : null))
        .filter(id => !!id);

      setMintedTokenId(mintedId);
      await fetchPizzas();
      setShowSuccessModal(true);
    } catch (e) {
      console.log(e);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.MM_ERR = e;
      setErrorMessage('Unexpected Error');
    } finally {
      setMintingTxn(null);
      setIsMinting(false);
    }
  }, [mainContract, provider, pizza]);

  const handleUnbake = useCallback(async () => {
    if (!provider) return;
    try {
      setIsMinting(true);
      setErrorMessage(null);
      const signer = provider.getSigner();
      const contractWithSigner = mainContract.connect(signer);
      const result = await contractWithSigner.unbakePizza(pizza.tokenId, {
        from: signer._address,
        value: parseEther(UNBAKE_FEE.toFixed(2)),
      });

      setMintingTxn(result.hash);
      await result.wait();
      await fetchPizzas();
      setShowSuccessModal(true);
    } catch (e) {
      console.log(e);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.MM_ERR = e;
      setMintingTxn(null);
      setErrorMessage('Unexpected Error');
    } finally {
      setMintingTxn(null);
      setIsMinting(false);
    }
  }, [mainContract, provider, pizza]);

  const handleRebake = useCallback(async () => {
    if (!provider) return;
    try {
      setIsMinting(true);
      setErrorMessage(null);
      const signer = provider.getSigner();
      const contractWithSigner = mainContract.connect(signer);
      const result = await contractWithSigner.rebakePizza(
        pizza.tokenId,
        pizza.additionalIngredients?.map(i => i.tokenId) || [],
        pizza.burnIngredients?.map(i => i.tokenId) || [],
        {
          from: signer._address,
          value: parseEther(REBAKE_FEE.toFixed(2)),
        },
      );

      setMintingTxn(result.hash);
      await result.wait();

      setMintedTokenId(pizza.tokenId);
      await fetchPizzas();
      setShowSuccessModal(true);
    } catch (e) {
      console.log(e);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.MM_ERR = e;
      setErrorMessage('Unexpected Error');
    } finally {
      setMintingTxn(null);
      setIsMinting(false);
    }
  }, [mainContract, provider, pizza]);
  const [alertOpened, setAlertOpened] = useState<string | null>();
  const showAlert = () => {
    setAlertOpened(
      'Please review your selections. Pizzas must include 1 base, 1 sauce, 1-3 cheeses, 0-4 meats  0-4 toppings.',
    );
  };
  const handleBuyAndBake = useCallback(async () => {
    if (!provider) return;
    try {
      const ingredientTokenIds = pizza?.allIngredients.map(
        ingredient => ingredient.tokenId,
      );
      setIsMinting(true);
      setErrorMessage(null);
      const totalCost = pizza?.allIngredients?.length
        ? getTotalCost(pizza.allIngredients)
        : 0;
      const signer = provider.getSigner();
      const contractWithSigner = mainContract.connect(signer);
      const result = await contractWithSigner.buyAndBakePizza(
        ingredientTokenIds,
        {
          from: signer._address,
          value: parseEther(
            (Math.round((totalCost + BAKING_FEE) * 100) / 100).toFixed(2),
          ),
        },
      );

      setMintingTxn(result.hash);
      const receipt = await result.wait();
      const [mintedId] = receipt.events
        ?.map(({ topics }) => (topics?.[3] ? parseInt(topics?.[3], 16) : null))
        .filter(id => !!id);

      setMintedTokenId(mintedId);
      await fetchPizzas();
      setShowSuccessModal(true);
    } catch (e) {
      console.log(e);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.MM_ERR = e;
      setErrorMessage('Unexpected Error');
    } finally {
      setMintingTxn(null);
      setIsMinting(false);
    }
  }, [mainContract, provider, pizza]);

  const handleBuyIngredients = useCallback(async () => {
    if (!provider) return;
    try {
      const ingredientTokenIds = pizza?.allIngredients.map(
        ingredient => ingredient.tokenId,
      );
      setIsMinting(true);
      setErrorMessage(null);
      const totalCost = pizza?.allIngredients?.length
        ? getTotalCost(pizza.allIngredients)
        : 0;
      const signer = provider.getSigner();
      const contractWithSigner = mainContract.connect(signer);
      const result = await contractWithSigner.buyIngredients(
        ingredientTokenIds,
        ingredientTokenIds.map(() => 1),
        {
          from: signer._address,
          value: parseEther((Math.round(totalCost * 100) / 100).toFixed(2)),
        },
      );

      setMintingTxn(result.hash);
      await result.wait();
      await fetchPizzas();
      setShowSuccessModal(true);
    } catch (e) {
      console.log(e);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.MM_ERR = e;
      setErrorMessage('Unexpected Error');
    } finally {
      setMintingTxn(null);
      setIsMinting(false);
    }
  }, [mainContract, provider, pizza]);

  const renderButtons = () => {
    const totalCost = pizza?.allIngredients?.length
      ? getTotalCost(pizza.allIngredients)
      : 0;
    switch (tab) {
      case PizzaCave.buyAndBake:
        return (
          <Stack pt={8}>
            <Button
              disabled={totalCost === 0 || !isConnected}
              className="tomato-btn"
              onClick={handleBuyIngredients}
              isLoading={isMinting}
            >{`Buy Ingredients Only (${parsePrice(
              Math.round((totalCost || 0) * 100) / 100,
              2,
              false,
            )})`}</Button>
            <Button
              disabled={!isConnected}
              opacity={disableBake ? '.4' : undefined}
              className="tomato-btn"
              onClick={disableBake ? showAlert : handleBuyAndBake}
              isLoading={isMinting}
            >{`Buy & Bake (${parsePrice(
              Math.round(((totalCost || 0) + BAKING_FEE) * 100) / 100,
              2,
              false,
            )})`}</Button>
          </Stack>
        );
      case PizzaCave.bake:
        return (
          <Stack pt={8}>
            <Button
              disabled={!isConnected}
              opacity={disableBake ? '.4' : undefined}
              className="tomato-btn"
              onClick={disableBake ? showAlert : handleBake}
              isLoading={isMinting}
            >{`Bake (${parsePrice(BAKING_FEE, undefined, false)})`}</Button>
          </Stack>
        );
      case PizzaCave.unbake:
        return (
          <Stack pt={8}>
            <Button
              disabled={disableBake || !isConnected}
              className="tomato-btn"
              onClick={disableBake ? showAlert : handleUnbake}
              isLoading={isMinting}
            >{`Unbake (${parsePrice(UNBAKE_FEE, undefined, false)})`}</Button>
          </Stack>
        );
      case PizzaCave.rebake:
        return (
          <Stack pt={8}>
            <Button
              disabled={!isConnected}
              opacity={disableBake ? '.4' : undefined}
              className="tomato-btn"
              onClick={disableBake ? showAlert : handleRebake}
              isLoading={isMinting}
            >{`Rebake (${parsePrice(REBAKE_FEE, undefined, false)})`}</Button>
          </Stack>
        );
      default:
        break;
    }
  };

  return (
    <>
      {alertOpened ? (
        <AlertModal
          message={alertOpened}
          isOpen={!!alertOpened}
          onRequestClose={setAlertOpened.bind(null, false)}
        />
      ) : null}
      <AlertModal
        showLoader={true}
        isOpen={isMinting && !!mintingTxn}
        hideClose
        message="Transaction in progress..."
      />
      <Box p="8">
        <Stack>
          {/* Image */}
          <Center
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '70%',
              }}
            >
              <img src="/assets/tablecloth.png" alt="tablecloth" />
              {(
                [
                  ...(pizza?.allIngredients || []),
                  ...(pizza?.additionalIngredients || []),
                ]
                  .filter(
                    item =>
                      !(pizza.burnIngredients || []).find(
                        burnItem => burnItem.tokenId == item.tokenId,
                      ),
                  )
                  .sort((a, b) => a.tokenId - b.tokenId) ?? []
              ).map(item => (
                <div
                  key={item.tokenId}
                  style={{
                    position: 'absolute',
                    width: '80%',
                    height: '80%',
                    backgroundImage: `url(https://lazlos-pizza.s3.amazonaws.com/pizza_layers/${item.tokenId}.png)`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                  }}
                />
              ))}
            </Box>
          </Center>
          {renderButtons()}
          {/* Number of Ingredients Selected */}
          <Flex pt={8} justifyContent="space-between">
            <Text fontWeight={700} color="gray.dark">
              {`Ingredients Selected`}
            </Text>
            <Text fontWeight={700} color="tomato.500">
              {ingredientsCount}
            </Text>
          </Flex>
          {/* Selected Ingredients */}
          {pizza?.allIngredients.length &&
            pizza?.allIngredients.map(item => (
              <Flex
                key={item.name}
                alignItems="center"
                pt={8}
                justifyContent="space-between"
              >
                {pizza?.burnIngredients?.find(
                  burn => burn.tokenId === item.tokenId,
                ) ? (
                  <Heading
                    size={'sm'}
                    fontSize={['12px', '16px']}
                    color={'gray.dark'}
                    textDecoration="line-through"
                  >
                    {item.name}
                  </Heading>
                ) : (
                  <Heading
                    size={'sm'}
                    fontSize={['12px', '16px']}
                    color={'gray.dark'}
                  >
                    {item.name}
                  </Heading>
                )}
                <Flex alignItems="center" gap={3}>
                  {tab === PizzaCave.buyAndBake && (
                    <Heading
                      size={'sm'}
                      fontSize={['12px', '16px']}
                      color={'tomato.500'}
                    >
                      {item.price}
                    </Heading>
                  )}
                  {tab === PizzaCave.rebake ? (
                    <>
                      {pizza?.burnIngredients?.find(
                        burn => burn.tokenId === item.tokenId,
                      ) ? (
                        <Button
                          className="tomato-btn"
                          size="sm"
                          onClick={() => removeBurnIngredient(item)}
                        >
                          Undo
                        </Button>
                      ) : (
                        <Button
                          className="tomato-btn"
                          size="sm"
                          onClick={() => addBurnIngredient(item)}
                        >
                          Burn
                        </Button>
                      )}
                    </>
                  ) : tab !== PizzaCave.unbake ? (
                    <Button
                      className="tomato-btn"
                      size="sm"
                      onClick={() =>
                        removeIngredient({
                          item,
                          pizza,
                          setPizza,
                        })
                      }
                    >
                      Remove
                    </Button>
                  ) : null}
                </Flex>
              </Flex>
            ))}
          {pizza?.additionalIngredients?.length &&
            pizza?.additionalIngredients.map(item => (
              <Flex
                key={item.name}
                pt={8}
                justifyContent="space-between"
                alignItems="center"
              >
                <Heading size={'sm'} color={'gray.dark'}>
                  {item.name}
                </Heading>
                <Button
                  className="tomato-btn"
                  onClick={() =>
                    removeAdditionalIngredient({
                      item,
                      setPizza,
                    })
                  }
                >
                  Remove
                </Button>
              </Flex>
            ))}
          {/* Buttons */}
        </Stack>
        <SuccessModal
          isOpen={showSuccessModal}
          setIsOpen={setShowSuccessModal}
          pizzaTokenId={mintedTokenId}
          type={tab}
        />
      </Box>
    </>
  );
};
