import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';

import Logo from '../../assets/logo.svg';
import { Car, Loading } from '../../components';
import { api } from '../../services/api';
import { ICarDTO } from '../../dtos/CarDTO'

import { 
  Container, 
  Header,
  HeaderContent,
  TotalCars,
  CarList,
} from './styles';

export const Home = () => {
  const [cars, setCars] = useState<ICarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const { navigate }: NavigationProp<ParamListBase> = useNavigation();

  const handleCarDetails = (car: ICarDTO) => navigate('CarDetails', { car });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get('/cars');

        setCars(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return <Loading />
   
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

      <CarList 
        data={cars}
        keyExtractor={item=> item.id}
        renderItem={({ item }) => 
          <Car data={item} onPress={() => handleCarDetails(item)} />
        }
      />
    </Container>
  );
}