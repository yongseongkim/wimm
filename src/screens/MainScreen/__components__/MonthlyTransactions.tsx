import {TransactionModel} from '@/models/Transaction';
import {useQuery, useRealm} from '@realm/react';
import {FlashList} from '@shopify/flash-list';
import {sortBy} from 'lodash';
import isUndefined from 'lodash/isUndefined';
import moment from 'moment';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Calendar from './Calendar';
import DailyListItem from './DailyListItem';
import MonthlySumOfTransactions from './MonthlySumOfTransactions';

interface PropsType {
  year: number;
  month: number;
  selectedDate?: Date;
  onPressMoveToPreviousMonth: () => void;
  onPressMoveToNextMonth: () => void;
  onSelectDate: (date?: Date) => void;
  onSelectTransaction: (transaction: TransactionModel) => void;
}

enum ItemType {
  Header,
  Item,
}

type Item = {
  _id: string;
  type: ItemType;
  transaction: TransactionModel | undefined;
};

const MonthlyTransactions = ({
  year,
  month,
  selectedDate,
  onPressMoveToPreviousMonth,
  onPressMoveToNextMonth,
  onSelectDate,
  onSelectTransaction,
}: PropsType) => {
  const realm = useRealm();
  const safeAreaInsets = useSafeAreaInsets();
  const firstDayOfMonth = moment(`${year}-${month}`, 'YYYY-MM').startOf(
    'month',
  );
  const lastDayOfMonth = firstDayOfMonth.clone().endOf('month');

  const transactions = useQuery(TransactionModel).filtered(
    '$0 <= tradedAt && tradedAt < $1',
    firstDayOfMonth.toDate(),
    lastDayOfMonth.toDate(),
  );
  const dailyTransactions = sortBy(
    isUndefined(selectedDate)
      ? transactions
      : transactions.filter(
          t => t.tradedAt.getDate() === selectedDate?.getDate(),
        ),
    t => t.tradedAt,
  ).reverse();

  return (
    <FlashList
      contentContainerStyle={{
        paddingTop: safeAreaInsets.top,
        paddingBottom: safeAreaInsets.bottom,
      }}
      showsVerticalScrollIndicator={true}
      indicatorStyle="black"
      data={[{_id: 'Header', type: ItemType.Header} as Item].concat(
        dailyTransactions.map(
          t =>
            ({
              _id: t._id.toString(),
              type: ItemType.Item,
              transaction: t,
            } as Item),
        ),
      )}
      estimatedItemSize={100}
      keyExtractor={item => item._id.toString()}
      renderItem={({item}) => {
        if (item.type === ItemType.Header) {
          return (
            <>
              <MonthlySumOfTransactions
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
              <Calendar
                year={year}
                month={month}
                selectedDay={selectedDate?.getDate()}
                transactions={Array.from(transactions.values())}
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
            </>
          );
        } else if (!isUndefined(item.transaction)) {
          return (
            <DailyListItem
              transaction={item.transaction}
              onPress={() => {
                if (!isUndefined(item.transaction)) {
                  onSelectTransaction(item.transaction);
                }
              }}
            />
          );
        } else {
          return null;
        }
      }}
    />
  );
};

export default MonthlyTransactions;
