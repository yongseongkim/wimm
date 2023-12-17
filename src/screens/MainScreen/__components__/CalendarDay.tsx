import {Color, ColorUtils} from '@/colors';
import {TransactionModel} from '@/models/Transaction';
import React from 'react';
import {TouchableHighlight} from 'react-native';
import styled from 'styled-components/native';

interface PropsType {
  style?: any;
  day?: number;
  transactions: TransactionModel[];
  isSelected: boolean;
  onPress?: () => void;
}

const CalendarDay = ({
  style,
  day,
  transactions,
  isSelected,
  onPress,
}: PropsType) => {
  const income = transactions
    .filter(t => t.value > 0)
    .reduce((acc, cur) => acc + cur.value, 0);
  const expense = Math.abs(
    transactions
      .filter(t => t.value < 0)
      .reduce((acc, cur) => acc + cur.value, 0),
  );
  return (
    <TouchableHighlight
      style={style}
      underlayColor={ColorUtils.WithOpacity(Color.Blue600, 0.2)}
      onPress={onPress}>
      <Container>
        <DayText
          allowFontScaling={false}
          textColor={isSelected ? Color.White : Color.Gray500}
          backgroundColor={isSelected ? Color.Blue600 : Color.Transparent}>
          {day}
        </DayText>
        <Contents>
          <ExpenseText
            allowFontScaling={false}
            numberOfLines={1}
            textColor={Color.Gray500}>
            {`-${expense}`}
          </ExpenseText>
          <IncomeText
            allowFontScaling={false}
            numberOfLines={1}
            textColor={Color.Blue600}>
            {`+${income}`}
          </IncomeText>
        </Contents>
      </Container>
    </TouchableHighlight>
  );
};

export default CalendarDay;

const Container = styled.View`
  flex-direction: column;
  align-items: center;
`;

const DayText = styled.Text<{textColor: Color; backgroundColor: Color}>`
  aspect-ratio: 1;
  padding: 5px;
  text-align: center;
  color: ${({textColor}) => textColor};
  background-color: ${({backgroundColor}) => backgroundColor};
  font-size: 16px;
`;

const Contents = styled.View`
  margin-top: 5px;
  height: 45px;
  align-items: center;
`;

const IncomeText = styled.Text<{textColor: Color}>`
  color: ${({textColor}) => textColor};
  font-size: 11px;
`;

const ExpenseText = styled.Text<{textColor: Color}>`
  color: ${({textColor}) => textColor};
  font-size: 11px;
`;
