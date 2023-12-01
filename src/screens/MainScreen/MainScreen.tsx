import {Transaction} from '@/models';
import {TransactionManager} from '@/utils';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {atom, useRecoilState} from 'recoil';
import styled from 'styled-components/native';
import MonthlyGridView from './__components__/MonthlyGridView';
import MonthlyStatisticsView from './__components__/MonthlyStatisticsView';

export const transactionsState = atom<Transaction[]>({
  key: 'transactions',
  default: [],
});

const MainScreen = ({navigation}: any) => {
  const [selectedMonth, setSelectedMonth] = useState(moment().startOf('month'));
  const year = selectedMonth.year();
  const month = selectedMonth.month() + 1;

  const [transactions, setTransactions] = useRecoilState(transactionsState);

  useEffect(() => {
    const getTransactions = async ({
      year,
      month,
    }: {
      year: number;
      month: number;
    }) => {
      try {
        const result = await TransactionManager.getInstance().getTransactions(
          year,
          month,
        );
        setTransactions(result);
      } catch (e) {
        console.log(e);
      }
    };
    getTransactions({year, month});
  }, [year, month]);

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
            }}
            onPressNextMonth={() => {
              setSelectedMonth(selectedMonth.add(+1, 'month').clone());
            }}
            onPressAddTransaction={() => {
              navigation.navigate('TransactionForm');
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
