import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { Artist } from '../components/Artist';

export default function MeetArtists() {
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

      <Stack>
        <Artist />
        <Artist />
        <Artist />
        <Artist />
      </Stack>
    </Box>
  );
}
