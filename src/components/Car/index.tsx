import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { ICarDTO } from '../../dtos/CarDTO'
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

type TProps = RectButtonProps & {
  data: ICarDTO  
};

export const Car = (props: TProps) => {
  const { data, ...rest } = props;

  return (
    <Container {...rest}>
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