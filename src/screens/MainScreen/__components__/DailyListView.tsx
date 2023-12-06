import isUndefined from 'lodash/isUndefined';
import sortBy from 'lodash/sortBy';
import React, {useMemo} from 'react';
import {useRecoilValue} from 'recoil';
import styled from 'styled-components/native';
import {transactionsState} from '../MainScreen';
import DailyListItem from './DailyListItem';

interface PropsType {
  selectedDate?: Date;
}

const DailyListView = ({selectedDate}: PropsType) => {
  const transactions = useRecoilValue(transactionsState);
  const dailyTransactions = useMemo(() => {
    const result = sortBy(
      isUndefined(selectedDate)
        ? transactions
        : transactions.filter(
            t => t.tradedAt.getDate() === selectedDate?.getDate(),
          ),
      t => t.tradedAt,
    ).reverse();
    return result;
  }, [transactions, selectedDate]);

  return (
    <Container>
      {dailyTransactions.map(transaction => (
        <DailyListItem key={transaction.id} transaction={transaction} />
      ))}
    </Container>
  );
};

export default DailyListView;

const Container = styled.View({
  flex: 1,
  flexDirection: 'column',
});
