import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

interface IButtonProps extends RectButtonProps {
  color?: string;
};

type TButtonTextProps = {
  light: boolean;
}

export const Container = styled(RectButton)<IButtonProps>`
  align-items: center;
  justify-content: center;
  
  width: 100%;
  padding: 19px;
  background-color: ${({ color, theme }) => color ? color : theme.colors.main};
`;

export const Title = styled.Text<TButtonTextProps>`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme, light }) => light 
    ? theme.colors.header
    : theme.colors.shape
  };
`;