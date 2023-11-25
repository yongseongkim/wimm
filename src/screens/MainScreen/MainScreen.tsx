import moment from 'moment';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import MonthlyGridView from './__components__/MonthlyGridView';
import MonthlyStatisticsView from './__components__/MonthlyStatisticsView';

const MainScreen = () => {
  const [selectedMonth, setSelectedMonth] = useState(moment().startOf('month'));
  const year = selectedMonth.year();
  const month = selectedMonth.month() + 1;
  return (
    <ScrollView>
      <SafeAreaView>
        <Container>
          <MonthlyStatisticsView
            year={year}
            month={month}
            income={0}
            expense={0}
            onPressPreviousMonth={() => {
              setSelectedMonth(selectedMonth.add(-1, 'month').clone());
            }}
            onPressNextMonth={() => {
              setSelectedMonth(selectedMonth.add(+1, 'month').clone());
            }}
          />
          <MonthlyGridView year={year} month={month} />
        </Container>
      </SafeAreaView>
    </ScrollView>
  );
};

export default MainScreen;

const Container = styled.View`
  flex-direction: column;
`;
