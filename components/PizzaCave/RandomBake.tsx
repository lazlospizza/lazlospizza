import { Box, Button, Center, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { parseEther } from 'ethers/lib/utils';
import { RANDOM_BAKE_FEE, REBAKE_FEE } from '../../constants';
import { useMainContract } from '../../hooks/useContract';
import { useWallet } from '../../hooks/useWallet';

export const RandomBake = () => {
  const { wallet } = useWallet();
  const { mainContract } = useMainContract();

  const handleRandomBake = async () => {
    if (!wallet?.address || !wallet.web3Provider) return null;
    console.log('test', wallet?.address);
    const res = await axios.get(
      `https://api.lazlospizza.com/random_pizza?address=${wallet?.address}`,
    );
    console.log(res.data);
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
    await result.wait();
  };

  return (
    <Stack>
      <Stack m="10px">
        <Text color="tomato.500" fontWeight={700} fontSize={'xl'}>
          Random Bake
        </Text>
        <Text color="gray.dark" fontWeight={500} fontSize={'lg'}>
          {`Can't decide what you want? Is oke, we have you covered! Get a completed pizza NFT with a random selection of ingredients. (${REBAKE_FEE} ETH + gas)`}
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
            <img src="/assets/tablecloth.svg" alt="tablecloth" />
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
            >{`Random Bake at ${RANDOM_BAKE_FEE}`}</Button>
          </Center>
        </Stack>
      </Box>
    </Stack>
  );
};
