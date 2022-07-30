import { InfoIcon } from '@chakra-ui/icons';
import { Box, Text, Tooltip } from '@chakra-ui/react';
import { CSSProperties } from 'react';

interface Props {
  title: string;
  isSelected: boolean;
  onClick: () => void;
  infoTooltip?: string;
  bgColor?: string; // to 'hide' bottom border when not selected
  badge?: number;
}

export const NavButton = ({
  title,
  isSelected,
  onClick,
  infoTooltip,
  bgColor = 'white',
  badge,
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
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontSize={['13px', '16px']}
    >
      {title}
      {!!badge && (
        <Box
          sx={{
            bgColor: 'tomato.500',
            color: 'white',
            width: '16px',
            height: '16px',
            borderRadius: '8px',
            fontSize: '11px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            top: '-10px',
            right: '-2px',
          }}
        >
          {badge}
        </Box>
      )}
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
          <InfoIcon
            color="tomato.500"
            fontSize={'l'}
            sx={{
              position: 'relative',
              top: '-10px',
              right: '-2px',
            }}
          />
        </Tooltip>
      ) : null}
    </Text>
  );
};
