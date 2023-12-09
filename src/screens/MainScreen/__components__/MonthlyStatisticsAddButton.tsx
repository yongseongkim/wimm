import {SpoqaHanSans} from '@/assets';
import {Color} from '@/colors';
import React from 'react';
import {styled} from 'styled-components/native';

interface PropsType {
  onPress: () => void;
}

const MonthlyStatisticsAddButton = ({onPress}: PropsType) => {
  return (
    <Container onPress={onPress}>
      <Label>추가</Label>
    </Container>
  );
};

export default MonthlyStatisticsAddButton;

const Container = styled.Pressable({
  width: 100,
  height: 32,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: Color.Blue600,
  borderRadius: 4,
});

const Label = styled.Text({
  color: Color.White,
  fontSize: 14,
  fontFamily: SpoqaHanSans.Bold,
});
