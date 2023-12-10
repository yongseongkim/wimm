import {TransactionModel} from '@/models/Transaction';
import {useQuery} from '@realm/react';
import isUndefined from 'lodash/isUndefined';
import sortBy from 'lodash/sortBy';
import moment from 'moment';
import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {TransactionFormPropsType} from '../TransactionFormScreen';
import DailyListItem from './__components__/DailyListItem';
import MonthlyHeader from './__components__/MonthlyHeader';

const MainScreen = ({navigation}: any) => {
  const safeAreaInsets = useSafeAreaInsets();

  const [selectedMonth, setSelectedMonth] = useState(moment().startOf('month'));
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  console.log(selectedDate);
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
  const dailyTransactions = sortBy(
    isUndefined(selectedDate)
      ? transactions
      : transactions.filter(
          t => t.tradedAt.getDate() === selectedDate?.getDate(),
        ),
    t => t.tradedAt,
  ).reverse();

  const onPressTransaction = (transaction: TransactionModel) => {
    navigation.navigate('TransactionForm', {
      transactionId: transaction._id.toString(),
    } as TransactionFormPropsType);
  };

  return (
    <Container>
      <FlatList
        style={{flex: 1}}
        data={dailyTransactions}
        ListHeaderComponent={
          <MonthlyHeaderWrapper
            paddingTop={safeAreaInsets.top}
            year={year}
            month={month}
            transactions={transactions}
            onPressMoveToPreviousMonth={() => {
              setSelectedMonth(selectedMonth.add(-1, 'month').clone());
              setSelectedDate(undefined);
            }}
            onPressMoveToNextMonth={() => {
              setSelectedMonth(selectedMonth.add(+1, 'month').clone());
              setSelectedDate(undefined);
            }}
            onSelectDate={date => {
              setSelectedDate(date);
            }}
          />
        }
        keyExtractor={item => item._id.toString()}
        renderItem={({item}) => (
          <DailyListItem
            transaction={item}
            onPress={() => {
              onPressTransaction(item);
            }}
          />
        )}
      />
    </Container>
  );
};

export default MainScreen;

const Container = styled.View({
  flex: 1,
});

const MonthlyHeaderWrapper = styled(MonthlyHeader)<{paddingTop: number}>`
  padding-top: ${({paddingTop}) => paddingTop}px;
`;
