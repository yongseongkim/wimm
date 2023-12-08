import {TransactionModel} from '@/models/Transaction';
import {useQuery} from '@realm/react';
import isUndefined from 'lodash/isUndefined';
import moment from 'moment';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import DailyListView from './__components__/DailyListView';
import MonthlyGridView from './__components__/MonthlyGridView';
import MonthlyStatisticsView from './__components__/MonthlyStatisticsView';

const MainScreen = ({navigation}: any) => {
  const [selectedMonth, setSelectedMonth] = useState(moment().startOf('month'));
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const year = selectedMonth.year();
  const month = selectedMonth.month() + 1;

  const transactionQuery = useQuery(TransactionModel, transactions =>
    transactions.filtered(
      '$0 <= tradedAt AND tradedAt < $1',
      selectedMonth.toDate(),
      selectedMonth.endOf('month').toDate(),
    ),
  );
  const transactions = Array.from(transactionQuery);

  return (
    <ScrollView>
      <SafeAreaView>
        <Container>
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
            onPressPreviousMonth={() => {
              setSelectedMonth(selectedMonth.add(-1, 'month').clone());
              setSelectedDate(undefined);
            }}
            onPressNextMonth={() => {
              setSelectedMonth(selectedMonth.add(+1, 'month').clone());
              setSelectedDate(undefined);
            }}
            onPressAddTransaction={() => {
              navigation.navigate('TransactionForm');
            }}
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
                setSelectedDate(undefined);
              } else {
                setSelectedDate(date);
              }
            }}
          />
          <DailyListView
            transactions={transactions}
            selectedDate={selectedDate}
          />
        </Container>
      </SafeAreaView>
    </ScrollView>
  );
};

export default MainScreen;

const Container = styled.View`
  flex-direction: column;
`;
