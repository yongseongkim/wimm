import {View, Text} from 'react-native';
import React from 'react';
import MonthlyGridDayItem from './MonthlyGridDayItem';
import MonthlyGridWeek from './MonthlyGridWeek';
import styled from 'styled-components/native';
import {Color} from '@/colors';
import MonthlyGridWeekHeader from './MonthlyGridWeekHeader';

interface PropsType {
  year: number;
  month: number;
}

const MonthlyGridView = ({year, month}: PropsType) => {


  return (
    <Container>
      <MonthlyGridWeekHeader />
      <MonthlyGridWeek year={year} month={month} week={0} />
      <MonthlyGridWeek year={year} month={month} week={0} />
      <MonthlyGridWeek year={year} month={month} week={0} />
      <MonthlyGridWeek year={year} month={month} week={0} />
      <MonthlyGridWeek year={year} month={month} week={0} />
    </Container>
  );
};

export default MonthlyGridView;

const Container = styled.View`
  flex: 1;
  flex-direction: column;
`;
