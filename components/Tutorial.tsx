import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { selectShowTutorial, toggleTutorial } from '../store/appSlice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store';
import { useWallet } from '../hooks/useWallet';

const ReactourNoSSR = dynamic(() => import('reactour'), { ssr: false });

export const Tutorial: React.FC = () => {
  const showTutorial = useSelector(selectShowTutorial);
  const dispatch = useAppDispatch();
  const closeTutorial = () => dispatch(toggleTutorial(false));
  const wallet = useWallet();
  useEffect(() => {
    if (!wallet.isConnected) {
      return;
    }
    const initialShown = localStorage.getItem('tutorialInitialShown');
    if (!initialShown) {
      setTimeout(() => {
        dispatch(toggleTutorial(true));
      }, 1000);
      localStorage.setItem('tutorialInitialShown', 'true');
    }
  }, [wallet, dispatch]);
  return (
    <>
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
            content:
              'Mama mia, welcome to Lazlo’s Pizza! I’m Lazlo, let me show you around.',
            selector: 'body',
          },
          {
            content:
              'Lazlo’s Pizza lets users build their own pizza and create their own rarity, rewarding users that that achieve the best Rarity Score with ETH rewards. Reward amounts and a countdown to the payout can be viewed here.',
            selector: '.tour-rewards-step',
          },
          {
            content: (
              <div>
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
            content:
              'Use the Check Rarity tool to help you find the rarest ingredients to add to your pizza for a better Rarity Score.',
            selector: '.tour-check-rarity',
          },
          {
            content:
              'Once you have baked your pizza you can check out your current Rarity Score by visiting My Wallet. Rarity Scores update dynamically as pizzas are baked and unbaked by all users so it is worth checking your score on a regular basis.',
            selector: '.tour-my-wallet',
          },
          {
            content:
              'Learn more about Rarity Scores and how Rewards are awarded on the Rarity Rewards page. you can also view a list of previous winners.',
            selector: '.tour-rarity-rewards',
          },
          {
            content:
              'Lazlo’s Pizza is not only a game, it is a collaborative art project involving many respected NFT pixel artists that each receive commission when you buy their ingredients. You can meet them here.',
            selector: '.tour-meet-artists',
          },
          {
            content:
              'Got more questions? Check out the FAQs, or connect with us on Twitter and Discord.',
            selector: '.tour-faq',
          },
        ]}
        isOpen={showTutorial}
        disableDotsNavigation={true}
        className="pizza-tour"
      />
    </>
  );
};
