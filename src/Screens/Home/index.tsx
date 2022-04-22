import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';

import {
  useNavigation,
  NavigationProp,
  ParamListBase
} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
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
} from './styles';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export const Home = () => {
  const [cars, setCars] = useState<ICarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: positionX.value },
      { translateY: positionY.value },
    ],
  }));

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, context: any) {
      context.positionX = positionX.value;
      context.positionY = positionY.value;
    },
    
    onActive(event, context: any) {
      positionX.value = context.positionX + event.translationX;
      positionY.value = context.positionY + event.translationY;
    },
    
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

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

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: 'absolute',
              bottom: 13,
              right: 22,
            }
          ]}
        >
          <ButtonAnimated 
            onPress={handleOpenMyCars}
            style={[styles.button, { backgroundColor: colors.main }]}
          >
            <Ionicons 
              name="ios-car-sport"
              size={32}
              color={colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const styles =  StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
})