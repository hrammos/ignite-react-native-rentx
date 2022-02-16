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

type TCar = {
  brand: string
  name: string
  rent: TRent
  thumbnail: string
}

type TProps = {
  data: TCar  
};

export const Car = (props: TProps) => {
  const { data } = props;

  return (
    <Container>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{`R$ ${data.rent.price}`}</Price>
          </Rent>

          <Type>
            <GasolineSvg />
          </Type>
        </About>
      </Details>

      <CarImage 
        source={{ uri: data.thumbnail }} 
        resizeMode="contain"
      />

    </Container>
  );
}