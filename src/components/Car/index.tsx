import React from 'react';

import GasolineSvg from '../../assets/gasoline.svg'

import { 
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from './styles';

type TRent = {
  period: string
  price: number
};

type TProps = {
  brand: string
  name: string
  rent: TRent
  thumbnail: string
};

export const Car = (props: TProps) => {
  const { brand, name, rent, thumbnail } = props;

  return (
    <Container>
      <Details>
        <Brand>{brand}</Brand>
        <Name>{name}</Name>

        <About>
          <Rent>
            <Period>{rent.period}</Period>
            <Price>{`R$ ${rent.price}`}</Price>
          </Rent>

          <Type>
            <GasolineSvg />
          </Type>
        </About>
      </Details>

      <CarImage 
        source={{ uri: thumbnail }} 
        resizeMode="contain"
      />

    </Container>
  );
}