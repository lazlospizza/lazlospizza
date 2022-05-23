import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useGetWindowSize } from '../utils/general';

export interface ArtistProps {
  name: string;
  role: string;
  bio?: string;
  link?: string;
  imgSrc?: string;
}

export const Artist = ({ bio, name, role, imgSrc, link }: ArtistProps) => {
  const size = useGetWindowSize();
  return (
    <Box className="artist-card">
      {size > 600 ? (
        <Flex>
          <img
            src={`/assets/${imgSrc || 'default-artist.svg'}`}
            alt="artist-photo"
            style={{ maxWidth: '200px', maxHeight: '200px' }}
          />
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
      ) : (
        // small
        <Stack>
          <img
            src={`/assets/${imgSrc || 'default-artist.svg'}`}
            alt="artist-photo"
          />
          <Stack mx="20px">
            <Heading color="tomato.500" size={'md'}>
              {name}
            </Heading>
            <Text color="gray.light" fontWeight={600} fontSize={'lg'}>
              {role}
            </Text>
          </Stack>
          <Text color="gray.dark" fontWeight={500} fontSize={'lg'}>
            {bio}
          </Text>
          {link && (
            <Link href={link}>
              <a>{link}</a>
            </Link>
          )}
        </Stack>
      )}
    </Box>
  );
};
