import { InfoIcon } from '@chakra-ui/icons';
import { Icon, Text, Tooltip } from '@chakra-ui/react';
import { CSSProperties } from 'react';

interface Props {
  title: string;
  isSelected: boolean;
  onClick: () => void;
  infoTooltip?: string;
  bgColor?: string; // to 'hide' bottom border when not selected
}

export const NavButton = ({
  title,
  isSelected,
  onClick,
  infoTooltip,
  bgColor = 'white',
}: Props) => {
  const selectedStyle: CSSProperties = {
    color: '#CC4443',
    cursor: 'pointer',
    borderColor: '#CC4443',
  };
  const notSelectedStyle: CSSProperties = {
    color: '#3D3431',
    cursor: 'pointer',
    marginBottom: '16',
    borderColor: bgColor,
  };

  return (
    <Text
      textAlign="center"
      w="100%"
      mx="2"
      pb="3"
      borderBottom="4px"
      color={'tomato.500'}
      fontWeight={500}
      style={isSelected ? selectedStyle : notSelectedStyle}
      onClick={onClick}
    >
      {title}
      {infoTooltip ? (
        <Tooltip
          backgroundColor="blackAlpha.800"
          color="whiteAlpha.900"
          px={5}
          py={3}
          fontSize="initial"
          label={infoTooltip}
          placement="left"
        >
          <InfoIcon ml={2} color="tomato.500" fontSize={'l'} />
        </Tooltip>
      ) : null}
    </Text>
  );
};
