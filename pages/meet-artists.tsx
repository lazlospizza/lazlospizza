import { Box, Stack, Text } from '@chakra-ui/react';
import { Artist, ArtistProps } from '../components/Artist';

export default function MeetArtists() {
  const artists: ArtistProps[] = [
    {
      name: 'when_lambo',
      bio: `Founder of Lazlo's Pizza, Co-founder of Flipmap and MAHASSIVE pizza lover! Combining his two of his favourite things with this project: PIZZA and NFTs!`,
      role: 'Founder',
      link: 'https://twitter.com/WhenLambo6135 ',
      imgSrc: '/assets/when_lambo.png',
    },
    {
      name: 'Totally',
      bio: `Co-Founder of @supdotxyz. Game Dev. @Blitmap artist. Creator of @Suprize_Machine`,
      role: 'Lazlo Designer',
      link: 'https://twitter.com/_BigPapap_',
      imgSrc: '/assets/Totally.jpg',
    },
    {
      name: 'Hirsch',
      role: 'Front End Dev',
      link: 'https://twitter.com/MikeAHirsch ',
    },
    {
      name: 'BRAINDRAIND',
      bio: `Human Creative and Game Dev in NYC. NFT artist contributing to Blitmap, Polysart and OKPC whilst hacking the planet with Chainrunners!`,
      role: 'Artists',
      link: 'https://twitter.com/BrainDraind ',
      imgSrc: '/assets/BrainDraind.jpg',
    },
    {
      name: 'cielxnoel',
      bio: `Ciel Noel makes hybrid handmade and generative NFT art with a focus on interactive game elements.`,
      role: 'Artists',
      link: 'http://www.twitter.com/@cielxnoel',
      imgSrc: '/assets/CielxNoel.jpg',
    },
    {
      name: 'Davina Pixel',
      bio: `Pizza loving pixel queen watching from afar.`,
      role: 'Artists',
      imgSrc: '/assets/DavinaPixel.png',
    },
    {
      name: 'Focus Points',
      bio: `At time of writing, proudly holds the record of ‘least amount of Twitter followers in Crypto’. Co-creator of Blitoadz.`,
      role: 'Artists',
      link: 'https://twitter.com/FocusPoints_NFT',
      imgSrc: '/assets/FocusPoints.jpg',
    },
    {
      name: 'HypnoBrando',
      bio: `A California native who loves building new things in Web3. Founder of https://www.chainpass.xyz.`,
      role: 'Artists',
      link: 'https://twitter.com/hypnobrando',
      imgSrc: '/assets/HypnoBrando.png',
    },
    {
      name: 'NUMO',
      bio: `Numo is a self-taught pixel artist from Germany. He started his (pixel) art journey in July 2020. Starting with small pixel art pieces posting on Twitter, he finds his way to gorgeous landscape and animated pixel art. numo is also the creator of the cute CryptoTeddies collection.`,
      role: 'Artists',
      link: 'https://twitter.com/numo_0',
    },
    {
      name: 'Sato',
      bio: `Long time enthusiast/investor/collector in crypto and NFTs with a passion for the arts. `,
      role: 'Artists',
      link: 'https://twitter.com/TheAIArtist ',
      imgSrc: '/assets/Sato.jpg',
    },
    {
      name: 'SMOTS',
      bio: `Smots is the Creator of the exciting NFT project, Smots. Discover and collect the mystical creatures that occupy the 5 wonderful realms in the Smotsverse!`,
      role: 'Artists',
      link: 'https://twitter.com/Smotsnft ',
      imgSrc: '/assets/Smots.jpg',
    },
    {
      name: 'Varley',
      bio: `Varley is a Blitmap original artist and half of the creative duo Highley Varlet. Come stop by Highley Varlet Studios on Cryptovoxel's Scarcity Island to see their latest NFT adventures!`,
      role: 'Artists',
      link: 'https://twitter.com/highleyvarlet',
      imgSrc: '/assets/Varley.jpg',
    },
    {
      name: 'Veenus',
      bio: `NFT artist and collector. Original Blitmap artist.`,
      role: 'Artists',
      link: 'https://twitter.com/Veenus_rising ',
      imgSrc: '/assets/Veenus.png',
    },

    {
      name: 'zod',
      bio: `zod is a newly-minted pixel artist based in New York City. A game industry veteran, he's helped make games in roles that run the gamut of QA, engineering, and production.`,
      role: 'Artists',
      link: 'https://twitter.com/privatezod ',
      imgSrc: '/assets/Zod.jpg',
    },
    {
      name: 'Rockpole',
      bio: `Rockpole is a web2 UI expert making steps into the world of web3. He designed the streamlined UI of Lazlo's Pizza, making it simple and intuitive to bake your favorite pie!`,
      role: 'UI Design',
      imgSrc: '/assets/RockPole.png',
    },
    {
      name: 'HOT SAUCE',
      role: 'Helpoor',
      link: 'https://twitter.com/capag777 ',
      imgSrc: '/assets/HotSauce.jpg',
    },
  ];

  return (
    <Box p="20px" w="full">
      <Stack m="10px">
        <Text color="tomato.500" fontWeight={700} fontSize={'xl'}>
          Meet Artist
        </Text>
        <Text color="gray.dark" fontWeight={500} fontSize={'lg'}>
          {`Meet our Awesome Artist`}
        </Text>
      </Stack>

      <Stack m="20px" spacing={'20px'}>
        {artists.map((artist, index) => (
          <Artist
            key={index}
            name={artist.name}
            bio={artist.bio}
            role={artist.role}
            link={artist.link}
          />
        ))}
      </Stack>
    </Box>
  );
}
