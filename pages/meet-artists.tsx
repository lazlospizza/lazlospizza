import { Box, Grid, Heading, Stack, Text } from '@chakra-ui/react';
import { Artist, ArtistProps } from '../components/Artist';

const artists: ArtistProps[] = [
  {
    name: 'when_lambo',
    bio: `Founder of Lazlo's Pizza, Co-founder of Flipmap and MAHASSIVE pizza lover! Combining his two of his favourite things with this project: PIZZA and NFTs!`,
    role: 'Founder',
    link: 'https://twitter.com/WhenLambo6135',
    imgSrc: `when_lambo.png`,
  },
  {
    name: 'hypnobrando',
    bio: (
      <>
        A California native who loves building new things in Web3. Founder of{' '}
        <a href="https://www.chainpass.xyz" target="_blank" rel="noreferrer">
          chainpass.xyz
        </a>
        .
      </>
    ),
    role: 'Dev Team',
    link: 'https://twitter.com/hypnobrando',
    imgSrc: 'HypnoBrando.png',
  },
  {
    name: 'Hirsch',
    role: 'Dev Team',
    bio: 'Founder of Kickstart Crew, Indelible Labs, and OnChainKevin. NFT addict.',
    link: 'https://twitter.com/MikeAHirsch',
    imgSrc: 'hirsch.jpg',
  },
  {
    name: 'Tarik',
    role: 'Dev Team',
    bio: 'Front-end and Mobile engineer.',
    imgSrc: 'tarik.jpeg',
  },
  {
    name: 'Rockpole',
    bio: `Rockpole is a web2 UI expert making steps into the world of web3. He designed the streamlined UI of Lazlo's Pizza, making it simple and intuitive to bake your favorite pie!`,
    role: 'Dev Team',
    imgSrc: 'RockPole.png',
  },
  {
    name: 'ClemLaFlemme',
    bio: `Scientist and engineer, currently experimenting in solidity.`,
    role: 'Dev Team',
    link: 'https://twitter.com/ClementWalter',
    imgSrc: 'clemlaflemme.png',
  },
  {
    name: 'BRAINDRAIND',
    bio: `Human Creative and Game Dev in NYC. NFT artist contributing to Blitmap, Polysart and OKPC whilst hacking the planet with Chainrunners!`,
    role: 'Artists',
    link: 'https://twitter.com/BrainDraind',
    imgSrc: 'BrainDraind.jpg',
  },
  {
    name: 'cielxnoel',
    bio: `Ciel Noel makes hybrid handmade and generative NFT art with a focus on interactive game elements.`,
    role: 'Artists',
    link: 'http://www.twitter.com/@cielxnoel',
    imgSrc: 'CielxNoel.jpg',
  },
  {
    name: 'Davina Pixel',
    bio: `Pizza loving pixel queen watching from afar.`,
    role: 'Artists',
    imgSrc: 'DavinaPixel.png',
  },
  {
    name: 'Focus Points',
    bio: `Founder of blitoadz. Striving to become a person of value, rather than success.`,
    role: 'Artists',
    link: 'https://twitter.com/FocusPoints_NFT',
    imgSrc: 'FocusPoints.jpg',
  },
  {
    name: 'HOT SAUCE',
    role: 'Artists',
    link: 'https://twitter.com/capag777',
    bio: 'Random helpful guy on Twitter that helped when_lambo mint his first Mooncat. HOT SAUCE, fittingly, will receive royalty payments for any Chilli Sauce ingredient sales - when_lambo thanks you!',
    imgSrc: 'HotSauce.jpg',
  },
  {
    name: 'NUMO',
    bio: `Numo is a self-taught pixel artist from Germany. He started his (pixel) art journey in July 2020. Starting with small pixel art pieces posting on Twitter, he finds his way to gorgeous landscape and animated pixel art. numo is also the creator of the cute CryptoTeddies collection.`,
    role: 'Artists',
    imgSrc: 'Numo.jpg',
    link: 'https://twitter.com/numo_0',
  },
  {
    name: 'Sato',
    bio: `Long time enthusiast/investor/collector in crypto and NFTs with a passion for the arts. `,
    role: 'Artists',
    link: 'https://twitter.com/TheAIArtist',
    imgSrc: 'Sato.jpg',
  },
  {
    name: 'SMOTS',
    bio: `Smots is the Creator of the exciting NFT project, Smots. Discover and collect the mystical creatures that occupy the 5 wonderful realms in the Smotsverse!`,
    role: 'Artists',
    link: 'https://twitter.com/Smotsnft',
    imgSrc: 'Smots.png',
  },
  {
    name: 'Totally',
    bio: `Co-Founder of @supdotxyz. Game Dev. @Blitmap artist. Creator of @Suprize_Machine`,
    role: 'Lazlo Designer',
    link: 'https://twitter.com/_BigPapap_',
    imgSrc: 'Totally.jpg',
  },
  {
    name: 'Varley',
    bio: `Varley is a Blitmap original artist and half of the creative duo Highley Varlet. Come stop by Highley Varlet Studios on Cryptovoxel's Scarcity Island to see their latest NFT adventures!`,
    role: 'Artists',
    link: 'https://twitter.com/highleyvarlet',
    imgSrc: 'Varley.jpg',
  },
  {
    name: 'Veenus',
    bio: `NFT artist and collector. Original Blitmap artist.`,
    role: 'Artists',
    link: 'https://twitter.com/Veenus_rising',
    imgSrc: 'Veenus.png',
  },
  {
    name: 'zod',
    bio: `zod is a newly-minted pixel artist based in New York City. A game industry veteran, he's helped make games in roles that run the gamut of QA, engineering, and production.`,
    role: 'Artists',
    link: 'https://twitter.com/privatezod',
    imgSrc: 'Zod.jpg',
  },
  {
    name: 'Markeetox',
    bio: `Metaverse Builder, Digital Artist, Twinkies Devourer.`,
    role: 'Metaverse Team',
    link: 'https://twitter.com/markeetox',
    imgSrc: 'Markeetox.jpg',
  },
  {
    name: 'Lexicon Devils',
    bio: `Metaverse architects & experience design`,
    role: 'Metaverse Team',
    link: 'https://twitter.com/devils_lexicon',
    imgSrc: 'Lexicon Devils.png',
  },
];

export default function MeetArtists() {
  return (
    <Box p={['15px', '30px']} w="full">
      <Stack mb={10}>
        <Text color="tomato.500" fontWeight={700} fontSize={'xl'}>
          Meet Pizzaiolos
        </Text>
        <Text color="gray.dark" fontWeight={500} fontSize={'lg'}>
          {`Meet our Awesome Artist`}
        </Text>
      </Stack>
      <Grid gridTemplateColumns={[`1fr`, `1fr`, `1fr`, '1fr 1fr']} gap={5}>
        {artists.map((artist, artistIdx) => (
          <Artist key={`artist${artistIdx}`} artist={artist} />
        ))}
      </Grid>
    </Box>
  );
}
