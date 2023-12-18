import {TransactionModel} from '@/models/Transaction';
import {DateFormatter, ifLet} from '@/utils';
import {isNull} from 'lodash';
import moment from 'moment';
import React, {useState} from 'react';
import {pickSingle} from 'react-native-document-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {ImportCSVConfirmationPropsType} from '../ImportCSVConfirmation';
import {TransactionFormPropsType} from '../TransactionFormScreen';
import FloatingButtons from './__components__/FloatingButtons';
import MonthlyTransactions from './__components__/MonthlyTransactions';

const MainScreen = ({navigation}: any) => {
  const [selectedMonth, setSelectedMonth] = useState(moment().startOf('month'));
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const year = selectedMonth.year();
  const month = selectedMonth.month() + 1;

  const [isFloatingButtonsExpanded, setIsFloatingButtonsExpanded] =
    useState(false);

  const onSelectTransaction = (transaction: TransactionModel) => {
    navigation.navigate('TransactionForm', {
      transactionId: transaction._id.toString(),
    } as TransactionFormPropsType);
  };

  const onPressDocument = async () => {
    try {
      const selectedFile = await pickSingle({
        presentationStyle: 'fullScreen',
        mode: 'import',
        copyTo: 'cachesDirectory',
        type: ['text/csv', 'public.comma-separated-values-text'],
      });
      if (!isNull(selectedFile.fileCopyUri)) {
        navigation.navigate('ImportCSVConfirmation', {
          csvFileUrl: selectedFile.fileCopyUri,
        } as ImportCSVConfirmationPropsType);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container edges={[]}>
      <MonthlyTransactions
        year={year}
        month={month}
        selectedDate={selectedDate}
        onPressMoveToPreviousMonth={() => {
          setSelectedMonth(selectedMonth.clone().subtract(1, 'month'));
          setSelectedDate(undefined);
        }}
        onPressMoveToNextMonth={() => {
          setSelectedMonth(selectedMonth.clone().add(1, 'month'));
          setSelectedDate(undefined);
        }}
        onSelectDate={date => {
          setSelectedDate(date);
        }}
        onSelectTransaction={onSelectTransaction}
      />
      <FloatingButtons
        isExpanded={isFloatingButtonsExpanded}
        onPress={() => {
          setIsFloatingButtonsExpanded(!isFloatingButtonsExpanded);
        }}
        onPressCustomInput={() => {
          navigation.navigate('TransactionForm', {
            initialDateString: ifLet(selectedDate, date =>
              DateFormatter.formatInForm(date),
            ),
          } as TransactionFormPropsType);
          setIsFloatingButtonsExpanded(false);
        }}
        onPressDocument={() => {
          onPressDocument();
          setIsFloatingButtonsExpanded(false);
        }}
      />
    </Container>
  );
};

export default MainScreen;

const Container = styled(SafeAreaView)`
  flex: 1;
`;

const MonthlyHeaderWrapper = styled(MonthlyTransactions)``;
