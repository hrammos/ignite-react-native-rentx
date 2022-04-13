import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { format } from 'date-fns';
import { 
  useNavigation,
  NavigationProp,
  ParamListBase,
  useRoute, 
} from '@react-navigation/native';
import { ICarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getPlatformDate } from '../../utils/getPlatformDate';

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
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer,
} from './styles';

type TParams = {
  car: ICarDTO;
  dates: string[];
}

interface IRentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

export const SchedulingDetails = () => {
  const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriod>({} as IRentalPeriod);


  const { colors } = useTheme();
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const route = useRoute();

  const { car, dates } = route.params as TParams;

  const rentTotal = Number(dates.length * car.rent.price);

  const handleConfirmRental = async () => {
    const responseSchedules = await api.get(`/schedules_bycars/${car.id}`);

    if (!responseSchedules) return
    
    const unavailable_dates = [
      ...responseSchedules.data.unavailable_dates,
      ...dates,
    ]

    const response = await api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates,
    });

    if (!response) {
      Alert.alert('Não foi possível confirmar o agendamento.');


      return;
    }

    navigation.navigate('SchedulingComplete');
  }
  
  const handleBack = () => navigation.goBack();

  useEffect(() => {
    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
    })
  }, [])

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
            <Period>{car.rent.period}</Period>
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

        <RentalPeriod>
          <CalendarIcon>
            <Feather 
              name="calendar"
              size={RFValue(24)}
              color={colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>

          <Feather 
            name="chevron-right"
            size={RFValue(10)}
            color={colors.text}
          />

          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>
              {`R$ ${car.rent.price} x${dates.length} diárias`}
            </RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button 
          title="Alugar agora"
          color={colors.success} 
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}