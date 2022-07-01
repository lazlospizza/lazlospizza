import { Box, Button, Center, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { parseEther } from 'ethers/lib/utils';
import { useEffect, useState } from 'react';
import { RANDOM_BAKE_FEE } from '../../constants';
import { useMainContract } from '../../hooks/useContract';
import { useWallet } from '../../hooks/useWallet';
import { parsePrice } from '../../utils/general';
import { AlertModal } from '../shared/AlertModal';
import { SuccessModal } from './SuccessModal';

export const RandomBake = () => {
  const { wallet, pizzas, fetchPizzas } = useWallet();
  const { mainContract } = useMainContract();
  const [loading, setLoading] = useState(false);
  const [txn, setTxn] = useState(null);
  const [tokenId, setTokenId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const toast = useToast();

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

  const handleRandomBake = async () => {
    if (!wallet?.address || !wallet.web3Provider) return null;
    setTxn(null);
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/random_pizza?address=${wallet?.address}`,
      );
      const data: {
        address: string;
        r: string;
        s: string;
        v: number;
        timestamp: number;
        token_ids: number[];
      } = res.data;
      const signer = wallet.web3Provider.getSigner();
      const contractWithSigner = mainContract.connect(signer);
      const _txn = await contractWithSigner.bakeRandomPizza(
        data.token_ids,
        data.timestamp,
        data.r,
        data.s,
        data.v,
        {
          from: signer._address,
          value: parseEther(RANDOM_BAKE_FEE.toFixed(2)),
          gasLimit: 500000,
        },
      );
      setTxn(_txn);
      const receipt = await _txn.wait();

      const [mintedId] = receipt.events
        ?.map(({ topics }) => (topics?.[3] ? parseInt(topics?.[3], 16) : null))
        .filter(id => !!id);
      setTokenId(mintedId);
      await fetchPizzas();
      setShowSuccessModal(true);
    } catch (e) {
      console.log(e);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.MM_ERR = e;
      setErrorMessage('Unexpected Error');
    }
    setLoading(false);
  };

  const pizza = pizzas.find(p => p.tokenId === tokenId);

  return (
    <Stack>
      <AlertModal
        showLoader={true}
        isOpen={loading}
        hideClose
        message="Transaction in progress..."
      />
      <Stack m="10px">
        <Text color="tomato.500" fontWeight={700} fontSize={'xl'}>
          Random Bake ({parsePrice(RANDOM_BAKE_FEE)})
        </Text>
        <Text color="gray.dark" fontWeight={500} fontSize={'lg'}>
          {`Can't decide what you want, or just want to degen and enjoy a dopamine rush with instant reveal? Randomly baked pizzas have a minimum of 3 ingredients (1 base, 1 sauce, 1 cheese) and up to a maximum of 13 ingredients (1 base, 1 sauce, 3 cheeses, 4 meats, 4 toppings).`}
        </Text>
      </Stack>

      {/* Image and Button */}
      <Box
        p="40px"
        backgroundColor="background.dark"
        borderTop="2px"
        borderColor={'gray.light'}
      >
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
            {!pizza?.image ? (
              <img
                src={'/assets/pizza.gif'}
                style={{
                  width: '100%',
                  height: '100%',
                  maxWidth: 400,
                  maxHeight: 400,
                }}
                alt="pizza-loading"
              />
            ) : (
              <img
                src={pizza ? pizza.image : '/assets/tablecloth.png'}
                style={{
                  width: '100%',
                  height: '100%',
                  maxWidth: 400,
                  maxHeight: 400,
                }}
                alt="tablecloth"
              />
            )}
          </Center>
          {/* Button */}
          <Center>
            <Button
              className="tomato-btn"
              w="100%"
              maxW={'600'}
              mt="16"
              onClick={handleRandomBake}
              disabled={!wallet?.address}
              isLoading={loading}
            >{`Random Bake (${parsePrice(RANDOM_BAKE_FEE, 2, false)})`}</Button>
          </Center>
        </Stack>
      </Box>
      <SuccessModal
        isOpen={showSuccessModal}
        setIsOpen={setShowSuccessModal}
        pizzaTokenId={tokenId}
      />
    </Stack>
  );
};
