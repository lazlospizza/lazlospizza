import {
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
  useDisclosure,
  Center,
  Text,
  Stack,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { TwitterShareButton, TwitterIcon } from 'react-share';
import { useWallet } from '../../hooks/useWallet';
import { selectRewardsInfo } from '../../store/appSlice';
import { PizzaCave } from '../../types';
import { parsePrice } from '../../utils/general';

export const SuccessModal = ({
  isOpen,
  setIsOpen,
  pizzaTokenId,
  type,
}: {
  isOpen: boolean;
  setIsOpen: (show: boolean) => void;
  pizzaTokenId?: number;
  type: PizzaCave | 'random';
}) => {
  const { myPizzas } = useWallet();
  const { onClose } = useDisclosure();

  const mintedPizza = useMemo(
    () => myPizzas.find(p => p.tokenId === pizzaTokenId),
    [myPizzas, pizzaTokenId],
  );
  const rewardInfo = useSelector(selectRewardsInfo);

  const info: { title: string; hashtags: string[]; url: string } =
    useMemo(() => {
      switch (type) {
        case 'random':
          return {
            title: `Mama Mia! I just baked a Random Pizza and got a Rarity Score of ${mintedPizza?.rarity} @LazlosPizza. Can you beat my score and win the ${rewardInfo?.nextRarityReward} reward? ${rewardInfo?.blocksRemaining} blocks to go`,
            url: 'https://twitter.com/LazlosPizza/status/1543193434219024384?s=20&t=AZkR97N3JkmGYHUsB62hqQ',
            hashtags: ['ETH', 'NFT', 'LazlosPizza'],
          };
        case PizzaCave.bake:
        case PizzaCave.buyAndBake:
          return {
            title: mintedPizza
              ? `Mama Mia! I just baked a pie over @LazlosPizza and scored ${mintedPizza?.rarity}. The best score wins ${rewardInfo?.nextRarityReward} in ${rewardInfo?.blocksRemaining} blocks. Bet you can’t beat me!`
              : `Nom, nom, nom! I just stocked up on some ingredients over @LazlosPizza. Designed by some of the hottest #NFT pixel artists. Now to bake a pie and see if I can win the ${rewardInfo?.nextRarityReward} Reward.`,
            hashtags: mintedPizza
              ? ['LazlosPizza', 'ETH', 'NFT']
              : ['LazlosPizza', 'ETH'],
            url: mintedPizza
              ? 'https://twitter.com/LazlosPizza/status/1547332075627417603?s=20&t=mLU0fMrDajeZ29uGv5UwqQ'
              : 'https://twitter.com/LazlosPizza/status/1547328531058802688?s=20&t=mLU0fMrDajeZ29uGv5UwqQ',
          };
        case PizzaCave.rebake:
          return {
            title: `Bellisima, I just Rebaked my pizza to improve my Rarity Score and got ${mintedPizza?.rarity} @LazlosPizza. Nom, nom, the current ${rewardInfo?.nextRarityReward} Reward. Tell me quick — only ${rewardInfo?.blocksRemaining} more blocks before the next reward payout!`,
            hashtags: ['LazlosPizza', 'ETH', 'NFTs'],
            url: 'https://twitter.com/LazlosPizza/status/1547330369770475520?s=20&t=mLU0fMrDajeZ29uGv5UwqQ',
          };
        case PizzaCave.unbake:
          return {
            title: `I just Unbaked my pizza to get all my ingredients back in my wallet. What should I bake to win the ${rewardInfo?.nextRarityReward} Reward. Tell me quick — only ${rewardInfo?.blocksRemaining} more blocks before the next reward payout!`,
            hashtags: ['LazlosPizza', 'NFTs', 'ETH'],
            url: 'https://twitter.com/LazlosPizza/status/1547339842664660993?s=20&t=PvIa-N-TGWKDYYyVv8o27w',
          };
      }
    }, [type, mintedPizza, rewardInfo]);

  const handleOnClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor={'tomato.500'} p={12}>
          <Center>
            <Text
              textAlign={'center'}
              color={'cheese.200'}
              fontSize={'2xl'}
            >{`Transaction Complete`}</Text>
          </Center>
          <Center mt={8}>
            <img
              alt="Pizza"
              // NOTE: added hash to invalidate cache
              src={
                mintedPizza?.image
                  ? `${mintedPizza.image}?hash=${Math.round(
                      Math.random() * 1e10,
                    )}`
                  : '/assets/ingredients-pane.png'
              }
              style={{ width: '100%' }}
            />
          </Center>
          <Stack direction="row" justifyContent="center" mt={8}>
            <Center>
              <TwitterShareButton
                url={info?.url}
                title={info?.title}
                hashtags={info?.hashtags}
              >
                <Button backgroundColor="cheese.200">
                  <TwitterIcon
                    size={32}
                    round={true}
                    iconFillColor="#00acee"
                    bgStyle={{ fill: 'rgba(0,0,0,0)' }}
                  />
                  <Text color="gray.dark">Share on Twitter!</Text>
                </Button>
              </TwitterShareButton>
            </Center>
            <Center>
              <Button
                backgroundColor={'white'}
                color="gray.dark"
                mr={3}
                onClick={handleOnClose}
              >
                Close
              </Button>
            </Center>
          </Stack>
        </ModalContent>
      </Modal>
    </>
  );
};
