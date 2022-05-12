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
import { isEmpty } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { BAKING_FEE } from '../../constants';
import { useMainContract } from '../../hooks/useContract';
import { useWallet } from '../../hooks/useWallet';
import { Pizza, PizzaCave } from '../../types';

interface Props {
  pizza: Pizza;
  tab: PizzaCave;
}
export const YourSelections = ({ pizza, tab }: Props) => {
  const { wallet, isConnected } = useWallet();
  const { mainContract } = useMainContract();
  const [disableBake, setDisableBake] = useState(true);
  const [isMinting, setIsMinting] = useState(false);
  const [mintingTxn, setMintingTxn] = useState<string | null>(null);
  const [tokenIds, setTokenIds] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const toast = useToast();
  const provider = wallet?.web3Provider;

  const validatePizza = () => {
    if (isEmpty(pizza.allIngredients)) return setDisableBake(true);
    if (!pizza.base) return setDisableBake(true);
    if (!pizza.sauce) return setDisableBake(true);
    if (!pizza.cheese) return setDisableBake(true);
    // add checks for other ingredients
    console.log('Bake and Bake Allowed!');
    setDisableBake(false);
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
      const ingredientTokenIds = pizza.allIngredients.map(
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

      const mintedIds = receipt.events
        ?.map(({ args }) => (args?.[2] ? parseInt(args?.[2]) : null))
        .filter(id => !!id);

      setTokenIds(mintedIds);
    } catch (e) {
      console.log(e);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.MM_ERR = e;
      setMintingTxn(null);
      setErrorMessage('Unexpected Error');
    } finally {
      setIsMinting(false);
    }
  }, [mainContract, provider, pizza]);

  const handleBuyAndBake = useCallback(async () => {
    if (!provider) return;
    try {
      const ingredientTokenIds = pizza.allIngredients.map(
        ingredient => ingredient.tokenId,
      );
      setIsMinting(true);
      setErrorMessage(null);
      const signer = provider.getSigner();
      const contractWithSigner = mainContract.connect(signer);
      const result = await contractWithSigner.buyAndBakePizza(
        ingredientTokenIds,
        {
          from: signer._address,
          value: parseEther(
            (Math.round((pizza.totalCost + BAKING_FEE) * 100) / 100).toFixed(2),
          ),
        },
      );

      setMintingTxn(result.hash);
      const receipt = await result.wait();

      console.log(receipt);

      // const mintedIds = receipt.events
      //   ?.map(({ args }) => (args?.[2] ? parseInt(args?.[2]) : null))
      //   .filter(id => !!id);

      // setTokenIds(mintedIds);
    } catch (e) {
      console.log(e);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.MM_ERR = e;
      setMintingTxn(null);
      setErrorMessage('Unexpected Error');
    } finally {
      setIsMinting(false);
    }
  }, [mainContract, provider, pizza]);

  const handleBuyIngredients = useCallback(async () => {
    if (!provider) return;
    try {
      const ingredientTokenIds = pizza.allIngredients.map(
        ingredient => ingredient.tokenId,
      );
      setIsMinting(true);
      setErrorMessage(null);
      const signer = provider.getSigner();
      const contractWithSigner = mainContract.connect(signer);
      const result = await contractWithSigner.buyIngredients(
        ingredientTokenIds,
        ingredientTokenIds.map(() => 1),
        {
          from: signer._address,
          value: parseEther(
            (Math.round(pizza.totalCost * 100) / 100).toFixed(2),
          ),
        },
      );

      setMintingTxn(result.hash);
      const receipt = await result.wait();

      const mintedIds = receipt.events
        ?.map(({ args }) => (args?.[2] ? parseInt(args?.[2]) : null))
        .filter(id => !!id);

      setTokenIds(mintedIds);
    } catch (e) {
      console.log(e);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.MM_ERR = e;
      setMintingTxn(null);
      setErrorMessage('Unexpected Error');
    } finally {
      setIsMinting(false);
    }
  }, [mainContract, provider, pizza]);

  const renderButtons = () => {
    switch (tab) {
      case PizzaCave.buyAndBake:
        return (
          <Stack pt={8}>
            <>
              <Button
                disabled={pizza.totalCost === 0 || !isConnected}
                className="tomato-btn"
                onClick={handleBuyIngredients}
                isLoading={isMinting}
              >{`Buy Ingredients only at ${
                Math.round(pizza.totalCost * 100) / 100
              }`}</Button>
              <Button
                disabled={disableBake || !isConnected}
                className="tomato-btn"
                onClick={handleBuyAndBake}
                isLoading={isMinting}
              >{`Buy and Bake only at ${
                Math.round((pizza.totalCost + BAKING_FEE) * 100) / 100
              }`}</Button>
            </>
          </Stack>
        );
      case PizzaCave.bake:
        return (
          <Button
            disabled={disableBake || !isConnected}
            className="tomato-btn"
            onClick={handleBake}
            isLoading={isMinting}
          >{`Bake only at ${BAKING_FEE}`}</Button>
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
