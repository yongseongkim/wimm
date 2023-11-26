import {SpoqaHanSans} from '@/assets';
import {Color} from '@/colors';
import React from 'react';
import {Pressable, Text, TouchableHighlight, View} from 'react-native';
import styled from 'styled-components/native';

interface PropsType {
  year: number;
  month: number;
  income: number;
  expense: number;
  onPressPreviousMonth: () => void;
  onPressNextMonth: () => void;
  onPressAddTransaction: () => void;
}

const MonthlyStatisticsView = ({
  year,
  month,
  income,
  expense,
  onPressPreviousMonth,
  onPressNextMonth,
  onPressAddTransaction,
}: PropsType) => {
  return (
    <Container>
      <SelectedMonthContainer>
        <TouchableHighlight onPress={onPressPreviousMonth}>
          <SelectedMonthMover>{'<'}</SelectedMonthMover>
        </TouchableHighlight>
        <SelectedMonth>{`${year}년 ${month}월`}</SelectedMonth>
        <TouchableHighlight onPress={onPressNextMonth}>
          <SelectedMonthMover>{'>'}</SelectedMonthMover>
        </TouchableHighlight>
      </SelectedMonthContainer>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <StatisticsContainer>
          <StatisticsRow>
            <StatisticsRowTitle>수입</StatisticsRowTitle>
            <StatisticsRowValue>
              {Intl.NumberFormat('ko-KR', {
                style: 'currency',
                currency: 'KRW',
              }).format(income)}
            </StatisticsRowValue>
          </StatisticsRow>
          <StatisticsRowSpacer />
          <StatisticsRow>
            <StatisticsRowTitle>지출</StatisticsRowTitle>
            <StatisticsRowValue>
              {Intl.NumberFormat('ko-KR', {
                style: 'currency',
                currency: 'KRW',
              }).format(expense)}
            </StatisticsRowValue>
          </StatisticsRow>
        </StatisticsContainer>
        <Pressable
          style={{
            width: 100,
            height: 32,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Color.Blue600,
          }}
          onPress={onPressAddTransaction}>
          <Text
            style={{
              color: Color.White,
              fontSize: 15,
              fontFamily: SpoqaHanSans.Bold,
            }}>
            추가
          </Text>
        </Pressable>
      </View>
    </Container>
  );
};

export default MonthlyStatisticsView;

const Container = styled.View`
  flex-direction: column;
  padding: 15px 20px;
`;

const SelectedMonthContainer = styled.View`
  flex-direction: row;
`;

const SelectedMonthMover = styled.Text`
  color: ${Color.Black};
  padding: 0px 10px;
  font-size: 20px;
  font-family: ${SpoqaHanSans.Bold};
`;

const SelectedMonth = styled.Text`
  color: ${Color.Black};
  font-size: 20px;
  font-family: ${SpoqaHanSans.Bold};
`;

const StatisticsContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;

const StatisticsRowSpacer = styled.View`
  height: 5px;
`;

const StatisticsRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StatisticsRowTitle = styled.Text`
  color: ${Color.Black};
  font-size: 13px;
  font-family: ${SpoqaHanSans.Regular};
  margin-right: 10px;
`;

const StatisticsRowValue = styled.Text`
  color: ${Color.Black};
  font-size: 14px;
  font-family: ${SpoqaHanSans.Bold};
`;
