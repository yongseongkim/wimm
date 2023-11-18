import {View, Text} from 'react-native';
import React from 'react';
import MonthlyGridDayItem from './MonthlyGridDayItem';
import MonthlyGridWeek from './MonthlyGridWeek';
import styled from 'styled-components/native';
import {Color} from '@/colors';
import MonthlyGridWeekHeader from './MonthlyGridWeekHeader';

const MonthlyGridView = () => {
  return (
    <Container>
      <MonthlyGridWeekHeader />
      <MonthlyGridWeek />
      <MonthlyGridWeek />
      <MonthlyGridWeek />
      <MonthlyGridWeek />
    </Container>
  );
};

export default MonthlyGridView;

const Container = styled.View`
  flex: 1;
  flex-direction: column;
`;
