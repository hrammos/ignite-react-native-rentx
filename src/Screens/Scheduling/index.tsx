import React, { useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { format } from 'date-fns';
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
  useRoute,
} from '@react-navigation/native';

import ArrowSvg from '../../assets/arrow.svg';

import { IDayProps, IMarkedDateProps } from '../../components/Calendar';
import { generateInterval } from '../../components/Calendar/generateInterval';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { ICarDTO } from '../../dtos/CarDTO';

import { 
  BackButton, 
  Button, 
  Calendar 
} from '../../components';

import { 
  Container, 
  Header, 
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';


interface IRentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

type TParams = {
  car: ICarDTO;
}

export const Scheduling = () => {
  const [lastSelectedDate, setLastSelectedDate] = useState<IDayProps>({} as IDayProps);
  const [markedDates, setMarkedDates] = useState<IMarkedDateProps>({} as IMarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriod>({} as IRentalPeriod);

  
  const { colors } = useTheme();
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const route = useRoute();

  const { car } = route.params as TParams;

  const handleConfirmRental = () => {
    if (!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
      Alert.alert('Selecione o intervalo para alugar.');

      return
    }

    navigation.navigate('SchedulingDetails', {
      car,
      dates: Object.keys(markedDates),
    });
  }
  
  const handleBack = () => navigation.goBack();

  const handleChangeDate = (date: IDayProps) => {
    
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;
    
    if(start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }
    
    setLastSelectedDate(end);
    
    const interval = generateInterval(start, end);
    
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    })
  }

  return (
    <Container>
      <Header>
        <StatusBar 
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        
        <BackButton 
          color={colors.shape}
          onPress={handleBack} 
        />

        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>
          
          <ArrowSvg />  

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
            {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar 
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button 
          title="Confirmar" 
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}