import {SpoqaHanSans} from '@/assets';
import {Color} from '@/colors';
import {isUndefined} from 'lodash';
import React from 'react';
import styled from 'styled-components/native';
import TransactionType from '../TransactionType';

interface PropsType {
  type?: TransactionType;
  onPressType?: (type: TransactionType) => void;
}

const IncomeExpenseSelector = ({type, onPressType}: PropsType) => {
  const isIncome = !isUndefined(type) && type === TransactionType.Income;
  const isExpense = !isUndefined(type) && type === TransactionType.Expense;
  return (
    <Container>
      <Item
        isSelected={isIncome}
        onPress={() => {
          onPressType?.(TransactionType.Income);
        }}>
        <ItemText isSelected={isIncome}>수입</ItemText>
      </Item>
      <Item
        isSelected={isExpense}
        onPress={() => {
          onPressType?.(TransactionType.Expense);
        }}>
        <ItemText isSelected={isExpense}>지출</ItemText>
      </Item>
    </Container>
  );
};

export default IncomeExpenseSelector;

const Container = styled.View({
  flexDirection: 'row',
});

const Item = styled.Pressable<{isSelected: boolean}>`
  padding: 10px;
  border-width: 2px;
  border-color: ${({isSelected}) =>
    isSelected ? Color.Blue600 : Color.Gray600};
  border-radius: 4px;
`;

const ItemText = styled.Text<{isSelected: boolean}>`
  color: ${({isSelected}) => (isSelected ? Color.Blue600 : Color.Gray600)};
  font-size: 18px;
  font-family: ${SpoqaHanSans.Regular};
`;
