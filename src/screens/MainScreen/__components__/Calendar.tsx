import {TransactionModel} from '@/models/Transaction';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components/native';
import CalendarWeek from './CalendarWeek';
import MonthlyGridWeekHeader from './CalendarWeekHeader';

interface PropsType {
  year: number;
  month: number;
  selectedDay?: number;
  transactions: TransactionModel[];
  onSelectDate?: (date: Date) => void;
}

const Calendar = ({
  year,
  month,
  selectedDay,
  transactions,
  onSelectDate,
}: PropsType) => {
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
          <CalendarWeek
            key={`${year}-${month}-${index}`}
            week={index}
            startOfFirstWeek={startOfFirstWeek}
            daysInMonth={daysInMonth}
            selectedDay={selectedDay}
            transactions={transactions}
            onPressDay={day => {
              onSelectDate?.(
                moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').toDate(),
              );
            }}
          />
        ))}
    </Container>
  );
};

export default Calendar;

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  padding: 0 4px;
`;
