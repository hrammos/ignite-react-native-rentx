import React from 'react';
import { SvgProps } from 'react-native-svg';

import { Container, Name } from './styles';

type TProps = {
  name: string;
  icon: React.FC<SvgProps>
};

export const Accessory = (props: TProps) => {
  const { name, icon: Icon } = props

  return (
    <Container>
      <Icon width={32} height={32} />
      <Name>{name}</Name>
    </Container>
  );
}