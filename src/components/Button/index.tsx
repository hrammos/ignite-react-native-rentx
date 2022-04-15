import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import { Container, Title } from './styles';

type TProps = RectButtonProps & {
  title: string;
  color?: string;
  enabled?: boolean
  loading?: boolean
};

export const Button = (props: TProps) => {
  const { 
    title, 
    color, 
    enabled = true,
    loading = false,
    ...rest
  } = props;

  const { colors } = useTheme();

  const isDisabled = (enabled === false || loading === true)

  return (
    <Container 
      color={color}
      enabled={enabled}
      style={{ opacity: isDisabled ? 0.5 : 1 }}
      {...rest} 
    >
      {loading 
        ? <ActivityIndicator color={colors.shape}/>
        : <Title>{title}</Title>
      }
    </Container>
  );
}