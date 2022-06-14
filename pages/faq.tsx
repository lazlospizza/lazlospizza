import {
  Box,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Text,
  Center,
  AccordionIcon,
} from '@chakra-ui/react';
import { faqItems } from '../utils/faq';

export default function Faq() {
  return (
    <Box p="20px" w="full">
      <Center mb={10} mt={6}>
        <Heading color="tomato.500">FAQ</Heading>
      </Center>
      <Accordion allowMultiple>
        {faqItems.map((item, idx) => (
          <AccordionItem key={idx} mb={5}>
            <Heading color="tomato.500" cursor="pointer">
              <AccordionButton
                px={4}
                py={3}
                borderWidth={['1px', '2px']}
                borderColor="tomato.500"
                backgroundColor="cheese.100"
                borderStyle="solid"
                _hover={{
                  backgroundColor: 'cheese.100',
                }}
                fontSize={[18, 24]}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                {item.question}
                <AccordionIcon ml={5} fontSize={30} />
              </AccordionButton>
            </Heading>
            <AccordionPanel
              borderWidth={['1px', '2px']}
              borderColor="tomato.500"
              borderStyle="solid"
              borderTop="none"
              p={0}
            >
              <Text
                color="gray.dark"
                p={4}
                fontSize={[18, 22]}
                fontWeight={600}
              >
                {item.answer}
              </Text>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}
