import React from 'react';
import { BackButton, ImageSlider } from '../../components';

import { 
  Container,
  Header,
  CarImages,
} from './styles';

export const CarDetails = () => {

  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={['https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png']} />
      </CarImages>
    </Container>
  );
}