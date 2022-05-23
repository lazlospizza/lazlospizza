import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';

export interface ArtistProps {
  name: string;
  role: string;
  bio?: string;
  link?: string;
  imgSrc?: string;
}

export const Artist = ({ bio, name, role, imgSrc, link }: ArtistProps) => {
  return (
    <Box className="artist-card">
      <Flex>
        <img src={imgSrc || '/assets/default-artist.svg'} alt="artist-photo" />
        <Stack mx="20px">
          <Heading color="tomato.500" size={'md'}>
            {name}
          </Heading>
          <Text color="gray.light" fontWeight={600} fontSize={'lg'}>
            {role}
          </Text>
          <Text color="gray.dark" fontWeight={500} fontSize={'lg'}>
            {bio}
          </Text>
          {link && (
            <Link href={link}>
              <a>{link}</a>
            </Link>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};
