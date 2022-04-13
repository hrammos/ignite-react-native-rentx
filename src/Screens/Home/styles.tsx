import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';
import { FlatList, FlatListProps } from 'react-native';
import { ICarDTO } from '../../dtos/CarDTO';

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  justify-content: flex-end;

  width: 100%;
  height: ${RFValue(113)}px;
  background-color: ${({ theme }) => theme.colors.header};
  padding: 24px 16px;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TotalCars = styled.Text`
  font-size: ${RFValue(11)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
`;

export const CarList = styled(
  FlatList as new (props: FlatListProps<ICarDTO>) => FlatList<ICarDTO>  
).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showsVerticalScrollIndicator: false
})``;

export const MyCarsButton = styled(RectButton)`
  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 13px;
  right: 22px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.main};
`;