import {Color} from '@/colors';
import React from 'react';
import {TouchableHighlight} from 'react-native';
import styled from 'styled-components/native';

interface PropsType {
  style?: any;
  day?: number;
  income?: number;
  expense?: number;
  isSelected: boolean;
  onPress?: () => void;
}

const MonthlyGridDayItem = ({
  style,
  day,
  income,
  expense,
  isSelected,
  onPress,
}: PropsType) => {
  return (
    <TouchableHighlight style={style} onPress={onPress}>
      <Container>
        <DayText
          allowFontScaling={false}
          textColor={isSelected ? Color.White : Color.Blue600}
          backgroundColor={isSelected ? Color.Blue600 : Color.Transparent}>
          {day}
        </DayText>
        <Contents>
          <IncomeText
            allowFontScaling={false}
            numberOfLines={1}
            textColor={Color.Blue500}>
            {income}
          </IncomeText>
          <ExpenseText
            allowFontScaling={false}
            numberOfLines={1}
            textColor={Color.Red600}>
            {expense}
          </ExpenseText>
        </Contents>
      </Container>
    </TouchableHighlight>
  );
};

export default MonthlyGridDayItem;

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
`;

const IncomeText = styled.Text<{textColor: Color}>`
  color: ${({textColor}) => textColor};
  font-size: 11px;
`;

const ExpenseText = styled.Text<{textColor: Color}>`
  color: ${({textColor}) => textColor};
  font-size: 11px;
`;
