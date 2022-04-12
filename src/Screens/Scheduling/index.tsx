import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';

import ArrowSvg from '../../assets/arrow.svg';

import { 
  BackButton, 
  Button, 
  Calendar 
} from '../../components';
import { IDayProps, IMarkedDateProps } from '../../components/Calendar';
import { generateInterval } from '../../components/Calendar/generateInterval';

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


export const Scheduling = () => {
  const [lastSelectedDate, setLastSelectedDate] = useState<IDayProps>({} as IDayProps);
  const [markedDates, setMarkedDates] = useState<IMarkedDateProps>({} as IMarkedDateProps);

  const { colors } = useTheme();
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const handleConfirmRental = () => navigation.navigate('SchedulingDetails');
  
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
            <DateValue selected={false}>
              03/03/2022
            </DateValue>
          </DateInfo>
          
          <ArrowSvg />  

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={false}>
              04/03/2022
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