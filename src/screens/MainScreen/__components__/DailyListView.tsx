import {TransactionModel} from '@/models/Transaction';
import isUndefined from 'lodash/isUndefined';
import sortBy from 'lodash/sortBy';
import React, {useMemo} from 'react';
import styled from 'styled-components/native';
import DailyListItem from './DailyListItem';

interface PropsType {
  selectedDate?: Date;
  transactions: TransactionModel[];
  onPressTransaction?: (transaction: TransactionModel) => void;
}

const DailyListView = ({
  selectedDate,
  transactions,
  onPressTransaction,
}: PropsType) => {
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
        <DailyListItem
          key={transaction._id.toString()}
          transaction={transaction}
          onPress={onPressTransaction}
        />
      ))}
    </Container>
  );
};

export default DailyListView;

const Container = styled.View({
  flex: 1,
  flexDirection: 'column',
});
