import { Box, Stack, Text } from '@chakra-ui/react';
import { Artist } from '../components/Artist';

export default function MeetArtists() {
  return (
    <Box p="20px" w="full">
      <Stack m="10px">
        <Text color="tomato.500" fontWeight={700} fontSize={'xl'}>
          Meet Artist
        </Text>
        <Text color="gray.dark" fontWeight={500} fontSize={'lg'}>
          {`Coming Soon`}
          {/* {`Meet our Awesome Artist`} */}
        </Text>
      </Stack>

      {/* <Stack m="20px" spacing={'20px'}>
        <Artist
          name={'Artist Name'}
          about={`I am an artist. I love art. Check out my work`}
        />
        <Artist
          name={'Artist Name'}
          about={`I am an artist. I love art. Check out my work`}
        />
        <Artist
          name={'Artist Name'}
          about={`I am an artist. I love art. Check out my work`}
        />
        <Artist
          name={'Artist Name'}
          about={`I am an artist. I love art. Check out my work`}
        />
        <Artist
          name={'Artist Name'}
          about={`I am an artist. I love art. Check out my work`}
        />
      </Stack> */}
    </Box>
  );
}
