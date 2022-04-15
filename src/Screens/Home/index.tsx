import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

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
  MyCarsButton
} from './styles';

export const Home = () => {
  const [cars, setCars] = useState<ICarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const { navigate }: NavigationProp<ParamListBase> = useNavigation();
  const { colors } = useTheme();

  const handleCarDetails = (car: ICarDTO) => navigate('CarDetails', { car });
  
  const handleOpenMyCars = () => navigate('MyCars');

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
            {`Total de ${cars.length} carros`}
          </TotalCars>
        </HeaderContent>
      </Header>

      {loading ? <Loading /> : (
        <CarList 
          data={cars}
          keyExtractor={item=> item.id}
          renderItem={({ item }) => 
            <Car data={item} onPress={() => handleCarDetails(item)} />
          }
        />
      )}

      <MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons 
          name="ios-car-sport"
          size={32}
          color={colors.shape}
        />
      </MyCarsButton>
    </Container>
  );
}