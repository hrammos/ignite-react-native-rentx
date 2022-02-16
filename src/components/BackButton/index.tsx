import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

import { Container } from './styles';

interface IProps extends BorderlessButtonProps {
  color?: string
}

export const BackButton = (props: IProps) => {
  const { color } = props;
  
  const { colors } = useTheme(); 

  return (
    <Container>
      <MaterialIcons 
        name="chevron-left"
        size={24}
        color={color ? color : 'red'}
      />

    </Container>
  );
}