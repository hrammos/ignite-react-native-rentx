import React from 'react';
import { Text } from 'react-native';
import { BackButton } from '../../components';

import { 
  Container,
  Header
} from './styles';

export const CarDetails = () => {

  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}} />
      </Header>

    </Container>
  );
}