import React, { useState, useEffect } from 'react';
import { StatusBar, FlatList } from 'react-native';
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'
import { useTheme } from 'styled-components';
import { ICarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';

import { 
  LoadingAnimation, 
  BackButton, 
  Car,
} from '../../components';

import { 
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';

type TCars = {
  id: string;
  user_id: string;
  car: ICarDTO;
  startDate: string;
  endDate: string;
}

export const MyCars = () => {
  const [cars, setCars] = useState<TCars[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const { colors } = useTheme();

  const handleBack = () => navigation.goBack();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get('/schedules_byuser?user_id=1');

        setCars(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <Container>
      <Header>
        <StatusBar 
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
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

        <SubTitle>Conforto, segurança e praticidade.</SubTitle>
      </Header>

      {isLoading ? <LoadingAnimation /> : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList 
            data={cars}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign 
                      name="arrowright" 
                      size={20}
                      color={colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
}