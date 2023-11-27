import React, {useState} from 'react';
import {Pressable, ScrollView} from 'react-native';

import {SpoqaHanSans, XMark} from '@/assets';
import {Color} from '@/colors';
import {Category} from '@/models';
import {TransactionManager} from '@/utils';
import {isEmpty, isUndefined} from 'lodash';
import DatePicker from 'react-native-date-picker';
import styled from 'styled-components/native';
import TransactionType from './TransactionType';
import CategorySelector from './__components__/CategorySelector';
import IncomeExpenseSelector from './__components__/IncomeExpenseSelector';

export interface TransactionFormPropsType {}

const TransactionFormScreen = ({navigation}: any) => {
  const [transactionType, setTransactionType] = useState<
    TransactionType | undefined
  >();
  const [value, setValue] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(Category.Other);
  const [isDateTimePickerOpen, setIsDateTimePickerOpen] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | undefined>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onPressConfirm = async () => {
    if (
      isUndefined(transactionType) ||
      isUndefined(selectedDateTime) ||
      isEmpty(title) ||
      value === 0
    ) {
      return;
    }

    await TransactionManager.getInstance().insertTransaction({
      title,
      description,
      category: selectedCategory,
      value: transactionType === TransactionType.Income ? value : -value,
      tradedAt: selectedDateTime,
    });
    navigation.goBack();
  };

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
      <ScrollView style={{flex: 1}} keyboardDismissMode="on-drag">
        <Contents>
          <IncomeExpenseSelector
            type={transactionType}
            onPressType={type => {
              setTransactionType(type);
            }}
          />

          <ValueInputContainer>
            <ValueInput
              value={value.toString()}
              textAlign={'right'}
              inputMode={'decimal'}
              onChangeText={text => {
                setValue(parseInt(text, 10));
              }}
            />
            <ValueUnit>원</ValueUnit>
          </ValueInputContainer>

          <CategorySelector
            selectedCategory={selectedCategory}
            onChangeSelectedCategory={c => {
              setSelectedCategory(c);
            }}
          />

          <SelectedDateTimeContainer
            onPress={() => setIsDateTimePickerOpen(true)}>
            <SelectedDateTimeTitle>날짜</SelectedDateTimeTitle>
            <SelectedDateTimeValue>
              {selectedDateTime?.toISOString()}
            </SelectedDateTimeValue>
          </SelectedDateTimeContainer>

          <TextRowContainer>
            <TextRowTitle>어디서, 어떤 목적으로 사용했나요?</TextRowTitle>
            <TextRowValue
              onChangeText={text => {
                setTitle(text);
              }}
            />
          </TextRowContainer>

          <TextRowContainer>
            <TextRowTitle>상세 내용</TextRowTitle>
            <TextRowValue
              onChangeText={text => {
                setDescription(text);
              }}
            />
          </TextRowContainer>

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
        </Contents>
      </ScrollView>
      <ButtonContainer>
        <ConfirmButton onPress={onPressConfirm}>
          <ConfirmButtonText>확인</ConfirmButtonText>
        </ConfirmButton>
      </ButtonContainer>
    </Container>
  );
};

export default TransactionFormScreen;

const Container = styled.SafeAreaView({
  flex: 1,
  flexDirection: 'column',
});

const AppBar = styled.View({
  height: 44,
  flexDirection: 'row',
});

const Contents = styled.View({});

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

const TextRowContainer = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  height: 44,
  backgroundColor: Color.Blue100,
});

const TextRowTitle = styled.Text({
  color: Color.Gray700,
  fontSize: 18,
  fontFamily: SpoqaHanSans.Regular,
});

const TextRowValue = styled.TextInput({
  flex: 1,
  color: Color.Black,
  fontSize: 18,
  fontFamily: SpoqaHanSans.Regular,
});

const ButtonContainer = styled.View({});

const ConfirmButton = styled.Pressable({
  height: 56,
  backgroundColor: Color.Blue500,
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: 20,
  marginVertical: 10,
});

const ConfirmButtonText = styled.Text({
  color: Color.White,
  fontSize: 20,
  fontFamily: SpoqaHanSans.Bold,
});
