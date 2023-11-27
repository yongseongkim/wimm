import React, {useState} from 'react';
import {Pressable} from 'react-native';

import {SpoqaHanSans, XMark} from '@/assets';
import {Color} from '@/colors';
import {Category} from '@/models';
import DatePicker from 'react-native-date-picker';
import styled from 'styled-components/native';
import CategorySelector from './__components__/CategorySelector';

export interface TransactionFormPropsType {}

const TransactionFormScreen = ({navigation}: any) => {
  const [selectedCategory, setSelectedCategory] = useState(Category.Other);
  const [isDateTimePickerOpen, setIsDateTimePickerOpen] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | undefined>(
    undefined,
  );

  return (
    <Container>
      <AppBar>
        <Spacer />
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <XMark
            width={44}
            height={44}
            style={{backgroundColor: Color.Blue050}}
          />
        </Pressable>
      </AppBar>

      <ValueInputContainer>
        <ValueInput textAlign={'right'} inputMode={'decimal'} />
        <ValueUnit>원</ValueUnit>
      </ValueInputContainer>

      <CategorySelector
        selectedCategory={selectedCategory}
        onChangeSelectedCategory={c => {
          setSelectedCategory(c);
        }}
      />

      <SelectedDateTimeContainer onPress={() => setIsDateTimePickerOpen(true)}>
        <SelectedDateTimeTitle>날짜</SelectedDateTimeTitle>
        <SelectedDateTimeValue>
          {selectedDateTime?.toISOString()}
        </SelectedDateTimeValue>
      </SelectedDateTimeContainer>

      <DatePicker
        modal
        date={selectedDateTime ?? new Date()}
        open={isDateTimePickerOpen}
        onConfirm={date => {
          setSelectedDateTime(date);
          setIsDateTimePickerOpen(false);
        }}
        onCancel={() => {
          setIsDateTimePickerOpen(false);
        }}
      />
    </Container>
  );
};

export default TransactionFormScreen;

const Container = styled.View({
  flexDirection: 'column',
});

const AppBar = styled.View({
  height: 44,
  flexDirection: 'row',
});

const Spacer = styled.View({flex: 1});

const ValueInputContainer = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
});

const ValueInput = styled.TextInput({
  flex: 1,
  fontSize: 24,
  fontFamily: SpoqaHanSans.Bold,
  backgroundColor: Color.Blue100,
});

const ValueUnit = styled.Text({
  fontSize: 24,
  fontFamily: SpoqaHanSans.Bold,
});

const SelectedDateTimeContainer = styled.Pressable({
  flexDirection: 'row',
  alignItems: 'center',
  height: 44,
  backgroundColor: Color.Blue100,
});

const SelectedDateTimeTitle = styled.Text({
  color: Color.Black,
  fontSize: 18,
  fontFamily: SpoqaHanSans.Regular,
});

const SelectedDateTimeValue = styled.Text({
  flex: 1,
  fontSize: 18,
  fontFamily: SpoqaHanSans.Regular,
});
