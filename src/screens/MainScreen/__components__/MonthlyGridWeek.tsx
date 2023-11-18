import React from 'react';
import styled from 'styled-components/native';
import MonthlyGridDayItem from './MonthlyGridDayItem';

interface PropsType {
  style?: any;
  year: number;
  month: number;
  week: number;
}

const MonthlyGridWeek = ({style}: PropsType) => {
  return (
    <Container style={style}>
      <MonthlyGridDayItemWrapper
        day={1}
        income={1700000}
        expense={9990000}
        isSelected={true}
      />
      <MonthlyGridDayItemWrapper
        day={1}
        income={1700000}
        expense={9990000}
        isSelected={true}
      />
      <MonthlyGridDayItemWrapper
        day={1}
        income={1700000}
        expense={9990000}
        isSelected={true}
      />
      <MonthlyGridDayItemWrapper
        day={1}
        income={1700000}
        expense={9990000}
        isSelected={true}
      />
      <MonthlyGridDayItemWrapper
        day={1}
        income={1700000}
        expense={9990000}
        isSelected={true}
      />
      <MonthlyGridDayItemWrapper
        day={1}
        income={1700000}
        expense={9990000}
        isSelected={true}
      />
      <MonthlyGridDayItemWrapper
        day={1}
        income={1700000}
        expense={9990000}
        isSelected={true}
      />
    </Container>
  );
};

export default MonthlyGridWeek;

const Container = styled.View`
  flex-direction: row;
`;

const MonthlyGridDayItemWrapper = styled(MonthlyGridDayItem)`
  flex: 1;
`;
