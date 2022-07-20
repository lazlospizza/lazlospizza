import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { selectShowTutorial, toggleTutorial } from '../store/appSlice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store';
import { useWallet } from '../hooks/useWallet';
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';

const ReactourNoSSR = dynamic(() => import('reactour'), { ssr: false });

export const Tutorial: React.FC = () => {
  const showTutorial = useSelector(selectShowTutorial);
  const dispatch = useAppDispatch();
  const openTutorial = () => dispatch(toggleTutorial(true));
  const closeTutorial = () => dispatch(toggleTutorial(false));
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const wallet = useWallet();
  const closeModal = () => {
    setModalOpened(false);
  };
  useEffect(() => {
    if (!wallet.isConnected) {
      return;
    }
    const initialShown = localStorage.getItem('initialPopupShown');
    if (!initialShown) {
      setModalOpened(true);
      localStorage.setItem('initialPopupShown', 'true');
    }
  }, [wallet, dispatch]);
  const items = [
    {
      title: '1. Select ingredients',
      img: '/assets/ingredients-pane.png',
    },
    {
      title: '2. Bake a pizza',
      img: '/assets/tutorial_pizza.png',
    },
    {
      title: '3. Get the lowest rarity score',
      img: '/assets/tutorial_score_to_beat.png',
    },
    {
      title: '4. Win eth rewards',
      img: '/assets/tutorial_winner.png',
    },
  ];
  return (
    <>
      <Modal isOpen={modalOpened} onClose={closeModal} size="4xl">
        <ModalOverlay />
        <ModalContent backgroundColor={'tomato.500'} position="relative">
          <Box sx={{ position: 'absolute', top: '10px', left: '10px' }}>
            <img
              style={{
                height: `80px`,
              }}
              src="/assets/logo-header.png"
              className="logo"
              alt="Logo"
            />
          </Box>
          <ModalHeader>
            <Stack alignItems={'center'}>
              <Box mb={2}>
                <img
                  src="/assets/header-logo.png"
                  className="logo"
                  alt="Logo"
                  style={{ height: '70px' }}
                />
              </Box>
              <Text
                fontFamily="heading"
                fontSize="15px"
                color="cheese.200"
                textTransform="uppercase"
              >
                Bake the rarest pizza to win eth rewards!
              </Text>
            </Stack>
          </ModalHeader>
          <ModalBody>
            <Flex
              flexWrap="wrap"
              justifyContent="space-around"
              alignItems="center"
              maxW="600px"
              margin="0 auto"
            >
              {items.map(item => (
                <Stack
                  key={item.title}
                  height="100%"
                  sx={{ width: ['100%', '50%'] }}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Stack sx={{ margin: '10px', border: '2px solid #FFDF8D' }}>
                    <Text
                      fontSize="18px"
                      lineHeight="24px"
                      fontWeight="bold"
                      textAlign="center"
                      color="cheese.200"
                      textTransform="uppercase"
                    >
                      {item.title}
                    </Text>
                    <Box sx={{ flex: 1 }} m={4}>
                      <img
                        src={item.img}
                        alt={item.title}
                        style={{ width: '100%' }}
                      />
                    </Box>
                  </Stack>
                </Stack>
              ))}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              backgroundColor={'white'}
              color="gray.dark"
              mr={3}
              onClick={closeModal}
            >
              Continue to Site
            </Button>
            <Button
              backgroundColor={'cheese.200'}
              color="gray.dark"
              mr={3}
              onClick={() => {
                closeModal();
                openTutorial();
              }}
            >
              View tutorial
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <ReactourNoSSR
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onRequestClose={closeTutorial}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        steps={[
          {
            content: (
              <div className="pizza-tour-step">
                Mama mia, welcome to Lazlo’s Pizza! I’m Lazlo, let me show you
                around.
              </div>
            ),
            selector: 'body',
          },
          {
            content: (
              <div className="pizza-tour-step">
                Lazlo’s Pizza lets users build their own pizza and create their
                own rarity, rewarding users that achieve the best Rarity Score
                with ETH rewards. Reward amounts and a countdown to the next
                payout can be viewed here.
              </div>
            ),
            selector: '.tour-rewards-step',
          },
          {
            content: (
              <div className="pizza-tour-step">
                All pizzas are created here in the Pizza Cave. There are 5
                functions:
                <p>
                  1. BUY & BAKE: Buy ingredients and bake a pizza in one
                  transaction.
                </p>
                <p>2. BAKE: Bake a pizza using ingredients in your wallet.</p>
                <p>3. REBAKE: Customize a pizza in your wallet.</p>
                <p>
                  4. UNBAKE: Break a pizza in your wallet into its separate
                  ingredients.
                </p>
                <p>
                  5. RANDOM BAKE: Get a random pizza surprise with instant
                  reveal.
                </p>
              </div>
            ),
            selector: '.tour-pizza-cave',
          },
          {
            content: (
              <div className="pizza-tour-step">
                Use the Check Rarity tool to help you find the rarest
                ingredients to add to your pizza for a better Rarity Score.
              </div>
            ),
            selector: '.tour-check-rarity',
          },
          {
            content: (
              <div className="pizza-tour-step">
                Once you have baked your pizza you can check out your current
                Rarity Score by visiting My Wallet. Rarity Scores update
                dynamically as pizzas are baked and unbaked by all users so it
                is worth checking your score on a regular basis.
              </div>
            ),
            selector: '.tour-my-wallet',
          },
          {
            content: (
              <div className="pizza-tour-step">
                Learn more about Rarity Scores and how Rewards are awarded on
                the Rarity Rewards page. You can also view a list of previous
                winners.
              </div>
            ),
            selector: '.tour-rarity-rewards',
          },
          {
            content: (
              <div className="pizza-tour-step">
                Lazlo’s Pizza is not only a game, it is a collaborative art
                project involving many respected NFT pixel artists that each
                receive commission when you buy their ingredients. You can meet
                them here.
              </div>
            ),
            selector: '.tour-meet-artists',
          },
          {
            content: (
              <div className="pizza-tour-step">
                Got more questions? Check out the FAQs, or connect with us on
                Twitter.
              </div>
            ),
            selector: '.tour-faq',
          },
        ]}
        isOpen={showTutorial}
        disableDotsNavigation={true}
        className="pizza-tour"
        maskSpace={0}
        lastStepNextButton={<div>Done</div>}
      />
    </>
  );
};
