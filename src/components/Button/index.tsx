import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title } from './styles';

type TProps = RectButtonProps & {
  title: string;
  color?: string;
};

export const Button = (props: TProps) => {
  const { title, color, ...rest } = props;

  return (
    <Container {...rest} color={color}>
      <Title>{title}</Title>
    </Container>
  );
}