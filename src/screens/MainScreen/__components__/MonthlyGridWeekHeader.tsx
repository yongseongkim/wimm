import {Color} from '@/colors';
import React from 'react';
import styled from 'styled-components/native';

const MonthlyGridWeekHeader = () => {
  return (
    <Container>
      <Weekend>일</Weekend>
      <Weekday>월</Weekday>
      <Weekday>화</Weekday>
      <Weekday>수</Weekday>
      <Weekday>목</Weekday>
      <Weekday>금</Weekday>
      <Weekend>토</Weekend>
    </Container>
  );
};

export default MonthlyGridWeekHeader;

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 7px 0;
`;

const Day = styled.Text`
  flex: 1;
  color: ${Color.Black};
  font-size: 12px;
  text-align: center;
`;

const Weekday = styled(Day)``;

const Weekend = styled(Day)``;
