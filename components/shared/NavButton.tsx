import { Text } from '@chakra-ui/react';
import { CSSProperties, useState } from 'react';

interface Props {
  title: string;
  isSelected: boolean;
  onClick: () => void;
}

export const NavButton = ({ title, isSelected, onClick }: Props) => {
  //   const [isSelected, setIsSelected] = useState(false);
  const selected: CSSProperties = {
    color: '#CC4443',
    cursor: 'pointer',
    borderColor: '#CC4443',
  };
  const notSelected: CSSProperties = {
    color: '#3D3431',
    cursor: 'pointer',
    marginBottom: '16',
    borderColor: 'white',
  };

  return (
    <Text
      mr="4"
      pb="3"
      borderBottom="4px"
      color={'tomato.500'}
      fontWeight={500}
      style={isSelected ? selected : notSelected}
      onClick={onClick}
    >
      {title}
    </Text>
  );
};
