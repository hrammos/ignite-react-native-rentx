import React from 'react'; 
import { createStackNavigator } from '@react-navigation/stack';
import { 
  Home,
  CarDetails,
  Scheduling,
  SchedulingComplete,
  SchedulingDetails,
  MyCars,
} from '../screens';

const { Navigator, Screen } = createStackNavigator();

export const StackRoutes = () => {

  return (
    <Navigator 
      screenOptions={{ headerShown: false }} 
      initialRouteName="Home"
    >
      <Screen 
        name="Home" 
        component={Home}
      />
      
      <Screen 
        name="CarDetails" 
        component={CarDetails}
      />
      
      <Screen 
        name="Scheduling" 
        component={Scheduling}
      />
      
      <Screen 
        name="SchedulingComplete" 
        component={SchedulingComplete}
      />
      
      <Screen 
        name="SchedulingDetails" 
        component={SchedulingDetails}
      />
      
      <Screen 
        name="MyCars" 
        component={MyCars}
      />
    </Navigator>
  );
};