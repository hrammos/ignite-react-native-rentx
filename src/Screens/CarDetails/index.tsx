import React from 'react';
import {
  useNavigation,
  useRoute,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import { ICarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import { 
  BackButton, 
  ImageSlider, 
  Accessory,
  Button,
} from '../../components';

import { 
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  About,
  Footer,
} from './styles';

type TParams = {
  car: ICarDTO;
}

export const CarDetails = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const route = useRoute();

  const { car } = route.params as TParams;

  const handleConfirmRental = () => navigation.navigate('Scheduling');
  const handleBack = () => navigation.goBack();

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.price}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map(accessory => (
            <Accessory 
              key={accessory.type}
              name={accessory.name} 
              icon={getAccessoryIcon(accessory.type)} 
            />
          ))}
        </Accessories>

        <About>{car.about}</About>
      </Content>

      <Footer>
        <Button 
          title="Escolher período do aluguel" 
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}