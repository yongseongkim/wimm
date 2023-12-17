import {GreaterThan, LessThan, SpoqaHanSans} from '@/assets';
import {Color, ColorUtils} from '@/colors';
import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';

interface PropsType {
  year: number;
  month: number;
  income: number;
  expense: number;
  onPressPreviousMonth: () => void;
  onPressNextMonth: () => void;
}

const MonthlySumOfTransactions = ({
  year,
  month,
  income,
  expense,
  onPressPreviousMonth,
  onPressNextMonth,
}: PropsType) => {
  const moveIconSize = 12;
  return (
    <Container>
      <SelectedMonthContainer>
        <SelectedMonthMover
          underlayColor={ColorUtils.WithOpacity(Color.Blue500, 0.5)}
          onPress={onPressPreviousMonth}>
          <LessThan
            width={moveIconSize}
            height={moveIconSize}
            color={Color.Black}
          />
        </SelectedMonthMover>
        <SelectedMonth>{`${year}년 ${month}월`}</SelectedMonth>
        <SelectedMonthMover
          underlayColor={ColorUtils.WithOpacity(Color.Blue500, 0.5)}
          onPress={onPressNextMonth}>
          <GreaterThan
            width={moveIconSize}
            height={moveIconSize}
            color={Color.Black}
          />
        </SelectedMonthMover>
      </SelectedMonthContainer>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <SumContainer>
          <SumRow>
            <SumRowTitle>수입</SumRowTitle>
            <SumRowValue>
              {Intl.NumberFormat('ko-KR', {
                style: 'currency',
                currency: 'KRW',
              }).format(income)}
            </SumRowValue>
          </SumRow>
          <SumRowSpacer />
          <SumRow>
            <SumRowTitle>지출</SumRowTitle>
            <SumRowValue>
              {Intl.NumberFormat('ko-KR', {
                style: 'currency',
                currency: 'KRW',
              }).format(expense)}
            </SumRowValue>
          </SumRow>
        </SumContainer>
      </View>
    </Container>
  );
};

export default MonthlySumOfTransactions;

const Container = styled.View`
  flex-direction: column;
  padding: 15px 20px;
`;

const SelectedMonthContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SelectedMonthMover = styled.TouchableHighlight`
  margin: 0px 3px;
  padding: 10px 10px;
`;

const SelectedMonth = styled.Text`
  color: ${Color.Black};
  font-size: 20px;
  font-family: ${SpoqaHanSans.Bold};
`;

const SumContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;

const SumRowSpacer = styled.View`
  height: 5px;
`;

const SumRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SumRowTitle = styled.Text`
  color: ${Color.Black};
  font-size: 13px;
  font-family: ${SpoqaHanSans.Regular};
  margin-right: 10px;
`;

const SumRowValue = styled.Text`
  color: ${Color.Black};
  font-size: 14px;
  font-family: ${SpoqaHanSans.Bold};
`;
