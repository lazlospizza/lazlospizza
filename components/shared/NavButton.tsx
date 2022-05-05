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
    // borderBottom: '4px',
    // borderColor: '#CC4443',
    // border: '4px',
  };
  const notSelected: CSSProperties = {
    color: '#3D3431',
    cursor: 'pointer',
    marginBottom: '16',
    // borderColor: '#CC4443',
    // border: '4px',
  };

  return (
    <Text
      mr="4"
      pb="3"
      //   lineHeight={8}
      //   border="4px"
      borderBottom="4px"
      borderColor={isSelected ? 'tomato.500' : 'white'}
      color={'tomato.500'}
      fontWeight={500}
      style={isSelected ? selected : notSelected}
      onClick={onClick}
    >
      {title}
    </Text>
  );
};
