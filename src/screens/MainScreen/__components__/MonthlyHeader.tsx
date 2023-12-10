import {TransactionModel} from '@/models/Transaction';
import isUndefined from 'lodash/isUndefined';
import React from 'react';
import styled from 'styled-components/native';
import MonthlyGridView from './MonthlyGridView';
import MonthlyStatisticsView from './MonthlyStatisticsView';

interface PropsType {
  style?: any;
  year: number;
  month: number;
  transactions: TransactionModel[];
  selectedDate?: Date;
  onPressMoveToPreviousMonth: () => void;
  onPressMoveToNextMonth: () => void;
  onSelectDate: (date?: Date) => void;
}

const MonthlyHeader = ({
  style,
  year,
  month,
  transactions,
  selectedDate,
  onPressMoveToPreviousMonth,
  onPressMoveToNextMonth,
  onSelectDate,
}: PropsType) => {
  return (
    <Container style={style}>
      <MonthlyStatisticsView
        year={year}
        month={month}
        income={transactions
          .map(transaction => transaction.value)
          .filter(value => value > 0)
          .reduce((acc, cur) => acc + cur, 0)}
        expense={Math.abs(
          transactions
            .map(transaction => transaction.value)
            .filter(value => value < 0)
            .reduce((acc, cur) => acc + cur, 0),
        )}
        onPressPreviousMonth={onPressMoveToPreviousMonth}
        onPressNextMonth={onPressMoveToNextMonth}
      />
      <MonthlyGridView
        year={year}
        month={month}
        selectedDay={selectedDate?.getDate()}
        transactions={transactions}
        onSelectDate={date => {
          if (
            !isUndefined(selectedDate) &&
            selectedDate.getDate() === date.getDate()
          ) {
            onSelectDate(undefined);
          } else {
            onSelectDate(date);
          }
        }}
      />
    </Container>
  );
};

export default MonthlyHeader;

const Container = styled.View({});
