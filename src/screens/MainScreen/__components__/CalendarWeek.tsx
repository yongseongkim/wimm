import {TransactionModel} from '@/models/Transaction';
import isNull from 'lodash/isNull';
import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import CalendarDay from './CalendarDay';

interface PropsType {
  style?: any;
  week: number;
  startOfFirstWeek: number;
  daysInMonth: number;
  selectedDay?: number;
  transactions: TransactionModel[];
  onPressDay?: (day: number) => void;
}

const CalendarWeek = ({
  style,
  week,
  startOfFirstWeek,
  daysInMonth,
  selectedDay,
  transactions,
  onPressDay,
}: PropsType) => {
  let days;
  // days:
  // null, null, null, 1, 2, 3, 4
  // ...
  // 26, 27, 28, 29, 30, null, null
  const isFirstWeek = week === 0;
  if (isFirstWeek) {
    days = Array(startOfFirstWeek)
      .fill(null)
      .concat(
        [...Array(7 - startOfFirstWeek).keys()].map((_, index) => index + 1),
      );
  } else {
    days = [...Array(7).keys()].map((_, index) => {
      const day = 7 - startOfFirstWeek + (week - 1) * 7 + index + 1;
      return daysInMonth >= day ? day : null;
    });
  }

  return (
    <Container style={style}>
      {days.map((day, index) =>
        isNull(day) ? (
          <View key={`${week}_${index}`} style={{flex: 1}} />
        ) : (
          <CalendarDayWrapper
            key={day}
            day={day}
            transactions={transactions.filter(
              t => t.tradedAt.getDate() === day,
            )}
            isSelected={day === selectedDay}
            onPress={() => {
              day && onPressDay?.(day);
            }}
          />
        ),
      )}
    </Container>
  );
};

export default CalendarWeek;

const Container = styled.View`
  flex-direction: row;
`;

const CalendarDayWrapper = styled(CalendarDay)`
  flex: 1;
`;
