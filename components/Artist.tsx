import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';

interface ArtistProps {
  name: string;
  about: string;
}

export const Artist = ({ name, about }: ArtistProps) => {
  return (
    <Box className="artist-card">
      <Flex>
        <img src="/assets/default-artist.svg" alt="artist-photo" />
        <Stack mx="20px">
          <Heading color="tomato.500" size={'md'}>
            Artist Name
          </Heading>
          <Text color="gray.dark" fontWeight={500} fontSize={'lg'}>
            {`I am an artist. I love art. Check out my work`}
          </Text>
        </Stack>
      </Flex>
    </Box>
  );
};
