import React, {useState} from 'react';
import {ScrollView} from 'react-native';

import {SpoqaHanSans, XMark} from '@/assets';
import {Color} from '@/colors';
import MarginButton from '@/components/MarginButton';
import {Category} from '@/models';
import {DateFormatter} from '@/utils';
import {useRealm} from '@realm/react';
import {isEmpty, isUndefined} from 'lodash';
import DatePicker from 'react-native-date-picker';
import styled from 'styled-components/native';
import TransactionType from './TransactionType';
import CategorySelector from './__components__/CategorySelector';
import TransactionTypeSelector from './__components__/TransactionTypeSelector';

export interface TransactionFormPropsType {
  initialDateTime?: Date;
}

const TransactionFormScreen = ({route, navigation}: any) => {
  const params = route.params as TransactionFormPropsType;

  const [transactionType, setTransactionType] = useState<TransactionType>(
    TransactionType.Expense,
  );

  const [value, setValue] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(Category.Other);
  const [isDateTimePickerOpen, setIsDateTimePickerOpen] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<Date>(
    params?.initialDateTime ?? new Date(),
  );
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const realm = useRealm();

  const onPressConfirm = async () => {
    if (
      isUndefined(transactionType) ||
      isUndefined(selectedDateTime) ||
      isEmpty(title) ||
      value === 0
    ) {
      return;
    }

    realm.write(() => {
      realm.create('Transaction', {
        _id: new Realm.BSON.ObjectId(),
        title,
        description,
        category: selectedCategory,
        value: transactionType === TransactionType.Income ? value : -value,
        tradedAt: selectedDateTime,
      });
    });

    navigation.goBack();
  };

  return (
    <Container>
      <AppBar>
        <Spacer />
        <CloseButton
          onPress={() => {
            navigation.goBack();
          }}>
          <XMark width={20} height={20} />
        </CloseButton>
      </AppBar>
      <ScrollView style={{flex: 1}} keyboardDismissMode="on-drag">
        <Contents>
          <CommonSection disabled={true}>
            <CommonSectionTitle>분류</CommonSectionTitle>
            <TransactionTypeSelector
              type={transactionType}
              onPressType={type => {
                setTransactionType(type);
              }}
            />
          </CommonSection>

          <ValueInputContainer>
            <ValueInput
              value={value.toString()}
              textAlign={'right'}
              inputMode={'decimal'}
              onChangeText={text => {
                setValue(parseInt(isEmpty(text) ? '0' : text, 10) ?? 0);
              }}
            />
            <ValueUnit>원</ValueUnit>
          </ValueInputContainer>

          <CategorySelector
            transactionType={transactionType}
            selectedCategory={selectedCategory}
            onChangeSelectedCategory={c => {
              setSelectedCategory(c);
            }}
          />

          <CommonSection onPress={() => setIsDateTimePickerOpen(true)}>
            <CommonSectionTitle>날짜</CommonSectionTitle>
            <CommonSectionValue
              editable={false}
              placeholder="선택해주세요"
              pointerEvents="none"
              placeholderTextColor={Color.Gray500}>
              {selectedDateTime && DateFormatter.formatInForm(selectedDateTime)}
            </CommonSectionValue>
          </CommonSection>

          <CommonSection disabled={true}>
            <CommonSectionTitle>{'장소 / 용도'}</CommonSectionTitle>
            <CommonSectionValue
              placeholder="입력해주세요"
              placeholderTextColor={Color.Gray500}
              onChangeText={text => {
                setTitle(text);
              }}
            />
          </CommonSection>

          <CommonSection disabled={true}>
            <CommonSectionTitle>상세 내용</CommonSectionTitle>
            <CommonSectionValue
              placeholder="입력해주세요 (선택)"
              placeholderTextColor={Color.Gray500}
              onChangeText={text => {
                setDescription(text);
              }}
            />
          </CommonSection>

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
        <ConfirmButton
          text={'확인'}
          color={Color.White}
          backgroundColor={Color.Blue600}
          onPress={onPressConfirm}
        />
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
  flexDirection: 'row',
  padding: 8,
});

const CloseButton = styled.Pressable({
  padding: 10,
  justifyContent: 'center',
  alignItems: 'center',
});

const Contents = styled.View({
  paddingHorizontal: 25,
});

const Spacer = styled.View({flex: 1});

const CommonSection = styled.TouchableOpacity({
  height: 44,
  flexDirection: 'row',
  alignItems: 'center',
});

const CommonSectionTitle = styled.Text({
  width: '30%',
  color: Color.Gray500,
  fontSize: 16,
  fontFamily: SpoqaHanSans.Regular,
});

const CommonSectionValue = styled.TextInput({
  flex: 1,
  color: Color.Black,
  fontSize: 16,
  fontFamily: SpoqaHanSans.Regular,
});

const ValueInputContainer = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 17,
});

const ValueInput = styled.TextInput({
  flex: 1,
  fontSize: 38,
  fontFamily: SpoqaHanSans.Bold,
});

const ValueUnit = styled.Text({
  fontSize: 38,
  fontFamily: SpoqaHanSans.Bold,
  marginLeft: 3,
});

const ButtonContainer = styled.View({});

const ConfirmButton = styled(MarginButton)`
  margin: 10px 20px;
`;
