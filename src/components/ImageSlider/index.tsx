import React from 'react';

import { 
  Container, 
  ImageIndexes, 
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from './styles';

type TProps = {
  imagesUrl: string[]
}

export const ImageSlider = (props: TProps) => {

  const { imagesUrl } = props

  return (
    <Container>
      <ImageIndexes>
        <ImageIndex active={true} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
      </ImageIndexes>

      <CarImageWrapper>
        <CarImage 
          source={{ uri: imagesUrl[0] }}
          resizeMode="contain"
        />
      </CarImageWrapper>

    </Container>
  );
}