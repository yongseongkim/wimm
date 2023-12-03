import {SpoqaHanSans} from '@/assets';
import {Color} from '@/colors';
import React from 'react';
import styled from 'styled-components/native';

interface PropsType {
  style?: any;
  text: string;
  color: Color;
  backgroundColor: Color;
  onPress?: () => void;
}

const MarginButton = ({
  style,
  text,
  color,
  backgroundColor,
  onPress,
}: PropsType) => {
  return (
    <Container style={style} color={backgroundColor} onPress={onPress}>
      <Label color={color}>{text}</Label>
    </Container>
  );
};

export default MarginButton;

const Container = styled.Pressable<{color: Color}>`
  height: 56px;
  background-color: ${({color}) => color};
  justify-content: center;
  align-items: center;
`;

const Label = styled.Text<{color: Color}>`
  color: ${({color}) => color};
  font-size: 20px;
  font-family: ${SpoqaHanSans.Bold};
`;
