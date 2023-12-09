import {SpoqaHanSans} from '@/assets';
import {Color} from '@/colors';
import React from 'react';
import styled from 'styled-components/native';

interface PropsType {
  style?: any;
  text: string;
  textFont?: SpoqaHanSans;
  color: Color;
  backgroundColor: Color;
  onPress?: () => void;
}

const MarginButton = ({
  style,
  text,
  textFont = SpoqaHanSans.Bold,
  color,
  backgroundColor,
  onPress,
}: PropsType) => {
  return (
    <Container style={style} color={backgroundColor} onPress={onPress}>
      <Label color={color} font={textFont}>
        {text}
      </Label>
    </Container>
  );
};

export default MarginButton;

const Container = styled.Pressable<{color: Color}>`
  height: 56px;
  background-color: ${({color}) => color};
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

const Label = styled.Text<{color: Color; font: SpoqaHanSans}>`
  color: ${({color}) => color};
  font-size: 15px;
  font-family: ${({font}) => font};
`;
