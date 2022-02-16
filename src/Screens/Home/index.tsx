import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components';

import { 
  Container, 
  Header,
  HeaderContent,
  TotalCars,
} from './styles';

export const Home = () => {
  const carTestOne = {
    brand: 'Audi',
    name: 'RS 5 Coupé',
    rent: {
      period: 'AO DIA',
      price: 120
    },
    thumbnail: 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png'
  }
  
  const carTestTwo = {
    brand: 'Porsche',
    name: 'Panamera',
    rent: {
      period: 'AO DIA',
      price: 340
    },
    thumbnail: 'https://www.pngkit.com/png/full/237-2375888_porsche-panamera-s.png'
  }


  return (
    <Container>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <HeaderContent>
          <Logo 
            width={RFValue(108)}
            height={RFValue(12)}
          />

          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>

      <Car 
        name={carTestOne.name}
        brand={carTestOne.brand}
        rent={carTestOne.rent}
        thumbnail={carTestOne.thumbnail}
      />

      <Car 
        name={carTestTwo.name}
        brand={carTestTwo.brand}
        rent={carTestTwo.rent}
        thumbnail={carTestTwo.thumbnail}
      />

    </Container>
  );
}