import React from 'react';

import { Container, Title } from './styles';

type TProps = {
  title: string;
  color?: string;
  onPress?: () => void;
};

export const Button = (props: TProps) => {
  const { title, color, onPress, ...rest } = props;

  return (
    <Container {...rest} color={color}>
      <Title>{title}</Title>
    </Container>
  );
}