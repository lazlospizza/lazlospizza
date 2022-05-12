import { Text } from '@chakra-ui/react';
import { CSSProperties } from 'react';

interface Props {
  title: string;
  isSelected: boolean;
  onClick: () => void;
  bgColor?: string; // to 'hide' bottom border when not selected
}

export const NavButton = ({
  title,
  isSelected,
  onClick,
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
      mr="4"
      pb="3"
      borderBottom="4px"
      color={'tomato.500'}
      fontWeight={500}
      style={isSelected ? selectedStyle : notSelectedStyle}
      onClick={onClick}
    >
      {title}
    </Text>
  );
};
