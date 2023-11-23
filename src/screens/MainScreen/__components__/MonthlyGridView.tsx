import moment from 'moment';
import React from 'react';
import styled from 'styled-components/native';
import MonthlyGridWeek from './MonthlyGridWeek';
import MonthlyGridWeekHeader from './MonthlyGridWeekHeader';

interface PropsType {
  year: number;
  month: number;
}

const MonthlyGridView = ({year, month}: PropsType) => {
  const firstDate = moment(`${year}-${month}`, 'YYYY-MM').startOf('month');
  const daysInMonth = firstDate.daysInMonth();

  // '일 월 화 수 목 금 토' 기준
  const startOfFirstWeek = firstDate.isoWeekday() % 7; // 일요일을 0 으로 만들기 위해
  const numberOfWeeks = Math.ceil((daysInMonth + startOfFirstWeek) / 7);
  return (
    <Container>
      <MonthlyGridWeekHeader />
      {Array(numberOfWeeks)
        .fill(0)
        .map((_, index) => (
          <MonthlyGridWeek
            key={`${year}-${month}-${index}`}
            week={index}
            startOfFirstWeek={startOfFirstWeek}
            daysInMonth={daysInMonth}
            selectedDay={25}
          />
        ))}
    </Container>
  );
};

export default MonthlyGridView;

const Container = styled.View`
  flex: 1;
  flex-direction: column;
`;
