import React from 'react';
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
  const { colors } = useTheme();
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const handleConfirmRental = () => navigation.navigate('SchedulingDetails');
  const handleBack = () => navigation.goBack();

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
        <Calendar />
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