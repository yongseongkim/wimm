import {Category} from '@/models';
import React from 'react';
import styled from 'styled-components/native';

import {
  Airplane,
  CartFill,
  ChartBarFill,
  CrossFill,
  Elipse,
  ForkKnife,
  GamecontrollerFill,
  GiftFill,
  GraduationcapFill,
  HouseFill,
  PhoneFill,
  Scissors,
  SpoqaHanSans,
  TramFill,
  WonsignCircleFill,
  WonsignSquareFill,
} from '@/assets';
import {Color, ColorUtils} from '@/colors';
import {TransactionModel} from '@/models/Transaction';
import isEmpty from 'lodash/isEmpty';
import {TouchableHighlight} from 'react-native';

interface PropsType {
  transaction: TransactionModel;
  onPress?: (transaction: TransactionModel) => void;
}

const DailyListItem = ({transaction, onPress}: PropsType) => {
  return (
    <TouchableHighlight
      underlayColor={ColorUtils.WithOpacity(Color.Blue500, 0.5)}
      onPress={() => {
        onPress?.(transaction);
      }}>
      <Container>
        <Icon category={Category.fromString(transaction.category)} />
        <Contents>
          <Value>{`${transaction.value > 0 ? '+' : '-'} ${Intl.NumberFormat(
            'ko-KR',
            {
              style: 'currency',
              currency: 'KRW',
            },
          ).format(Math.abs(transaction.value))}`}</Value>
          <Title>{transaction.title}</Title>
          {!isEmpty(transaction.description) && (
            <Description>{transaction.description}</Description>
          )}
        </Contents>
      </Container>
    </TouchableHighlight>
  );
};

export default DailyListItem;

const Icon = ({category}: {category: Category}) => {
  const width = 28;
  const tintColor = Color.Gray500;
  return (
    <>
      {category === Category.Salary && (
        <WonsignCircleFill width={width} height={width} color={tintColor} />
      )}
      {category === Category.Investment && (
        <ChartBarFill width={width} height={width} color={tintColor} />
      )}
      {category === Category.SideJob && (
        <WonsignSquareFill width={width} height={width} color={tintColor} />
      )}
      {category === Category.Food && (
        <ForkKnife width={width} height={width} color={tintColor} />
      )}
      {category === Category.Transport && (
        <TramFill width={width} height={width} color={tintColor} />
      )}
      {category === Category.Entertainment && (
        <GamecontrollerFill width={width} height={width} color={tintColor} />
      )}
      {category === Category.Travel && (
        <Airplane width={width} height={width} color={tintColor} />
      )}
      {category === Category.Shopping && (
        <CartFill width={width} height={width} color={tintColor} />
      )}
      {category === Category.Beauty && (
        <Scissors width={width} height={width} color={tintColor} />
      )}
      {category === Category.Gift && (
        <GiftFill width={width} height={width} color={tintColor} />
      )}
      {category === Category.Communication && (
        <PhoneFill width={width} height={width} color={tintColor} />
      )}
      {category === Category.Living && (
        <HouseFill width={width} height={width} color={tintColor} />
      )}
      {category === Category.Hospital && (
        <CrossFill width={width} height={width} color={tintColor} />
      )}
      {category === Category.Education && (
        <GraduationcapFill width={width} height={width} color={tintColor} />
      )}
      {category === Category.Other && (
        <Elipse width={width} height={width} color={tintColor} />
      )}
    </>
  );
};

const Container = styled.View({
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 10,
  paddingHorizontal: 25,
});

const Contents = styled.View({
  flex: 1,
  flexDirection: 'column',
  marginLeft: 15,
});

const Value = styled.Text({
  fontSize: 16,
  fontFamily: SpoqaHanSans.Bold,
});

const Title = styled.Text({
  fontSize: 13,
  fontFamily: SpoqaHanSans.Regular,
  marginTop: 5,
});

const Description = styled.Text({
  fontSize: 13,
  fontFamily: SpoqaHanSans.Regular,
  marginTop: 2,
});
