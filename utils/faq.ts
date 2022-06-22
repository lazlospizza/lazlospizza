export const faqItems: { question: string; answer: string }[] = [
  {
    question: `Who is Lazlo?`,
    answer: `Laszlo Hanyecz is the Bitcoin Pizza Guy that bought two pizzas for 10,000 BTC in May 2010 in what is believed to have been the very first purchase of physical goods using the cryptocurrency. This project is named in his honor (sorry, we kinda bastardised the spelling by dropping the ‘s’ after a straw poll asking some people to spell it out). Totally Lazlo, our mascot is a chef-ified version of Totally, a Blitmap original artwork designed by, you guessed it, @Totally.`,
  },
  {
    question: `What’s the TL:DR for the game?`,
    answer: `In short:
•	Bake a pizza in the pizza cave,
•	Get a lower score than the Score to Beat,
•	Claim the Rarity Reward at the end of the cycle.
Bake a pizza in the Pizza Cave, check your Rarity Score in My Wallet after baking – if you get the lowest score overall in the Reward Cycle (see Score to Beat above) you can claim your Rarity Reward when the reward block rolls around. If at first you don’t manage to get a lower score than the Score to Beat, use the Check Rarity tool when Rebaking your pizza to improve your score.`,
  },
  {
    question: `How often are Rarity Rewards paid?`,
    answer: `Rarity Reward cycles last 10,000 blocks of the Ethereum block chain, which at current rates is approximatey 40-42 hours. Occasionally, Rewards Cycles may be put on turbo mode and occur over 1,000 blocks (~4 hours).  In either case, a countdown until the next Reward Block updates live on the the website.`,
  },
  {
    question: `How are Rarity Scores calculated?`,
    answer: `Every pizza, by design, has a total of 21 traits. Each trait has an associated percentage score that reflects the percentage of existing pizzas with said trait at that time. Rarity scores are calculated by summing the prevailing percentage score associated with each trait and dividing by 21. Rarity scores, therefore, range from 0-100.
As users Bake, Unbake and Rebake pizzas, the percentage scores associated with ingredient traits change dynamically, meaning that Rarity Scores also change on an ongoing basis.`,
  },
  {
    question: `What if I get the lowest score in a cycle but other users copy my pizza, making my score increase? Can I still win?`,
    answer: `Yes.
The Rarity Reward is rewarded to the user that achieves the lowest Rarity Score overall in the cycle. Given how Rarity Scores are calculated (see below), if you achieve the lowest Rarity Score and other users then copy your pizza, your pizza (and their pizza) will then have higher Rarity Scores than you initially achieved. However, it is the lowest score that you achieved in the first instance that matters. It shall be posted as the Score to Beat and will be the winning score unless a better score is achieved.`,
  },
  {
    question: `How are Rarity Rewards calculated?`,
    answer: `1% of the Rewards Pool is paid out as a Rarity Reward at the end of each Reward Cycle.`,
  },
  {
    question: `What are Founder/Dev payments?`,
    answer: `At each Rarity Reward block a payment is made claimable to the Founder wallet (0.75%) and to the Dev Fund wallet (0.25%). This is how the founder gets paid from the project. (Disclosure: the founder, when_lambo, also receives an artist commission payment for sales of Plain Base ingredient NFTs)`,
  },
  {
    question: `What’s the Rewards Pool?`,
    answer: `The Rewards Pool (RP) is calculated as follows: 
RP = Total ETH in Lazlo’s Pizza smart contract – Unclaimed Artist Commission – Unclaimed Rarity Rewards – Unclaimed Founder Payment – Unclaimed Development Fund Payment.
Here follows an example with figures, wherein some artists have not claimed all of their commission, a previous winner has yet to claim their reward, the Founder has claimed payment and the Dev Fund has not claimed recent payment:
RP = Total ETH in smart contract (125 ETH) – Unclaimed Artist Commission (5 ETH) – Unclaimed Rarity Rewards (1 ETH) – Unclaimed Founder Payment (0 ETH) – Unclaimed Development Fund Payment (0.25 ETH)

RP = 125 ETH – 5 ETH – 1 ETH –  0 ETH – 0.25 ETH
RP = 118.75 ETH.
With a Rewards Pool of 118.75 ETH, the payments at the next Rarity Reward Block will be as follows:
Rarity Reward Winner (1% of RP) = 1.1875 ETH
Founder Payment (0.75% of RP) = 0.890625 ETH
Development Fund (0.25% of RP) = 0.296875 ETH
`,
  },
  {
    question: `Nice artwork, who did it?`,
    answer: `A major driving force behind Lazlo’s Pizza was the idea of a building a collaborative NFT project, using the artwork of many artists to create a new piece of NFT art.  Thus, the ingredients for Lazlo’s Pizza come from a collective of respected NFT artists that have had their talent exhibited in projects such as Blitmap, Flipmap, Crypto Teddies, Smots, Mooncat Rescue and Blitoadz. Check out the Meet Pizzaiolos page to find out more.

Artists receive a 10% commission each time one of their ingredients is minted.
`,
  },
  {
    question: `What’s the smart contract address?`,
    answer: `0x93d6E1b962606470c5c28fDB56dCF53b1bB1CD8C
`,
  },
  {
    question: `How are Rarity Scores and winners verified?`,
    answer: `Rarity scores and winners are calculated in real time on our server. When a Reward Cycle reaches its conclusion, a signed message is sent to the smart contract to allow the winner to claim their reward. In the interests of full transparency, this code is being made open source so that pizza lovers everywhere may run it and verify for themselves that everything is as it should be. Don’t trust, verify!
`,
  },
  {
    question: `BAKE, REBAKE, UNBAKE – what’s the difference?`,
    answer: `A user may BAKE a pizza using ingredients they hold in their wallet for a fee of 0.01 ETH. All pizzas must follow the pizza parameters (see below).
A user may REBAKE a pizza they already hold in their wallet for a fee of 0.01 ETH. The REBAKE process allows a user to remove and burn* ingredients already on the pizza, and/or add ingredients they hold in their wallet to improve their Rarity Score. (*Ingredients that are removed and burned are not returned to the user’s wallet. This process is irreversible.)
A user may UNBAKE a pizza they hold in their wallet for a fee of 0.05 ETH. The UNBAKE process returns all constituent ingredient NFTs to the user’s wallet.`,
  },
  {
    question: `What are the pizza parameters?`,
    answer: `All pizzas must include 1 base, 1 sauce, 1-3 cheeses, 0-4 meats and 0-4 toppings.`,
  },
  {
    question: `When Metaverse?`,
    answer: `Lazlo is already cooking up some pizzas in the Metaverse! You can visit the pizza parlor, order a pie, play some arcade games (yes, really!) and have a dance around the place while checking out some of our artists’ other work. Head to 2 Sapphire Terrace in Voxels here: https://www.voxels.com/parcels/6582`,
  },
  {
    question: `What’s the best strategy?`,
    answer: `Get the lowest score! Simples 😊 
Really though, in testing, using the Check Rarity tool in the Pizza Cave was invaluable, as choosing the ingredients with the lowest live percentage scores proved to be a strong strategy in getting a low score. A cheeky strategy that also appeared involved UNBAKING one pizza to improve the Rarity Score of another – quite the giga-brain move if you ask us!`,
  },
  {
    question: `What if a whale buys up all the ingredients?`,
    answer: `The simple answer to this is: IT’S NOT PROFITABLE. 
It would cost 100 ETH to purchase the entire supply of one single ingredient from a total number of 25. Even with the entire supply of one ingredient, a winning Rarity Score would not be guaranteed, as other ingredient trait rarities may negate any supposed advantage. 
`,
  },
];
