import { Box, Button, Center, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { parseEther } from 'ethers/lib/utils';
import { useState } from 'react';
import { RANDOM_BAKE_FEE } from '../../constants';
import { useMainContract } from '../../hooks/useContract';
import { useWallet } from '../../hooks/useWallet';

export const RandomBake = () => {
  const { wallet, ingredients, pizzas } = useWallet();
  const { mainContract } = useMainContract();
  const [loading, setLoading] = useState(false);
  const [tokenId, setTokenId] = useState<number | null>(null);

  const handleRandomBake = async () => {
    if (!wallet?.address || !wallet.web3Provider) return null;
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.lazlospizza.com/random_pizza?address=${wallet?.address}`,
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
      const result = await contractWithSigner.bakeRandomPizza(
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
      const receipt = await result.wait();

      const [mintedId] = receipt.events
        ?.map(({ topics }) => (topics?.[3] ? parseInt(topics?.[3], 16) : null))
        .filter(id => !!id);
      setTokenId(mintedId);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const pizza = pizzas.find(p => p.tokenId === tokenId);

  return (
    <Stack>
      <Stack m="10px">
        <Text color="tomato.500" fontWeight={700} fontSize={'xl'}>
          Random Bake ({RANDOM_BAKE_FEE} ETH)
        </Text>
        <Text color="gray.dark" fontWeight={500} fontSize={'lg'}>
          {`Can't decide what you want? Is oke, we have you covered! Get a completed pizza NFT with a random selection of ingredients. (${RANDOM_BAKE_FEE} ETH + gas)`}
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
            <img
              src={pizza ? pizza.image : '/assets/tablecloth.svg'}
              alt="tablecloth"
            />
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
            >{`Random Bake at ${RANDOM_BAKE_FEE}`}</Button>
          </Center>
        </Stack>
      </Box>
    </Stack>
  );
};
