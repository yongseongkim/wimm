import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';

import {SpoqaHanSans, XMark} from '@/assets';
import {Color} from '@/colors';
import MarginButton from '@/components/MarginButton';
import TextPopup from '@/components/TextPopup';
import {Category} from '@/models';
import {TransactionModel} from '@/models/Transaction';
import {DateFormatter, ifLet} from '@/utils';
import {useObject, useRealm} from '@realm/react';
import {isEmpty, isNull, isUndefined} from 'lodash';
import DatePicker from 'react-native-date-picker';
import Realm from 'realm';
import styled from 'styled-components/native';
import TransactionType from './TransactionType';
import CategorySelector from './__components__/CategorySelector';
import TransactionTypeSelector from './__components__/TransactionTypeSelector';

export interface PropsType {
  transactionId?: string;
  initialDateString?: string;
}

const TransactionFormScreen = ({route, navigation}: any) => {
  const params = (route.params as PropsType) ?? {};
  const realm = useRealm();

  // Transaction 수정 시
  const initialTransactionId = params.transactionId;
  let savedTransaction: TransactionModel | null = null;
  if (initialTransactionId) {
    savedTransaction = useObject(
      TransactionModel,
      new Realm.BSON.ObjectId(initialTransactionId),
    );
  }

  const [transactionType, setTransactionType] = useState<TransactionType>(
    isNull(savedTransaction)
      ? TransactionType.Expense
      : savedTransaction?.value < 0
      ? TransactionType.Expense
      : TransactionType.Income,
  );
  const [value, setValue] = useState(Math.abs(savedTransaction?.value ?? 0));
  const initialCategory = savedTransaction?.category;
  const [selectedCategory, setSelectedCategory] = useState(
    !isUndefined(initialCategory)
      ? Category.fromString(initialCategory)
      : Category.Other,
  );

  const [isDateTimePickerOpen, setIsDateTimePickerOpen] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<Date>(
    ifLet(params.initialDateString, str => DateFormatter.dateInForm(str)) ??
      savedTransaction?.tradedAt ??
      new Date(),
  );
  const [title, setTitle] = useState(savedTransaction?.title ?? '');
  const [description, setDescription] = useState(
    savedTransaction?.description ?? '',
  );
  const [isConfirmDeletePopupVisible, setIsConfirmDeletePopupVisibleVisible] =
    useState(false);

  const onPressSave = async () => {
    if (
      isUndefined(transactionType) ||
      isUndefined(selectedDateTime) ||
      isEmpty(title) ||
      value === 0
    ) {
      return;
    }

    realm.beginTransaction();
    const valueWithType =
      transactionType === TransactionType.Income ? value : -value;
    if (!isNull(savedTransaction)) {
      savedTransaction.title = title;
      savedTransaction.description = description;
      savedTransaction.category = selectedCategory;
      savedTransaction.value = valueWithType;
      savedTransaction.tradedAt = selectedDateTime;
    } else {
      realm.create('Transaction', {
        _id: new Realm.BSON.ObjectId(),
        title,
        description,
        category: selectedCategory,
        value: valueWithType,
        tradedAt: selectedDateTime,
      });
    }
    realm.commitTransaction();

    navigation.goBack();
  };

  const onPressDelete = async () => {
    if (isNull(savedTransaction)) {
      return;
    }
    setIsConfirmDeletePopupVisibleVisible(true);
  };

  const onConfirmDelete = async () => {
    if (isNull(savedTransaction)) {
      return;
    }
    realm.write(() => {
      realm.delete(savedTransaction);
    });
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
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
        <ScrollView style={{flex: 1}} keyboardDismissMode="interactive">
          <Contents>
            <CommonSection style={{alignItems: 'center'}} disabled={true}>
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
                {selectedDateTime &&
                  DateFormatter.formatInForm(selectedDateTime)}
              </CommonSectionValue>
            </CommonSection>

            <CommonSection disabled={true}>
              <CommonSectionTitle>{'장소 / 용도'}</CommonSectionTitle>
              <CommonSectionValue
                value={title}
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
                multiline={true}
                value={description}
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
          <SaveButton
            text={'저장'}
            color={Color.White}
            backgroundColor={Color.Blue600}
            onPress={onPressSave}
          />
          {!isNull(savedTransaction) && (
            <DeleteButton
              text={'삭제'}
              color={Color.White}
              backgroundColor={Color.Red600}
              onPress={onPressDelete}
            />
          )}
        </ButtonContainer>
        <TextPopup
          isVisible={isConfirmDeletePopupVisible}
          message="정말 삭제하시겠습니까?"
          onPressCancel={() => {
            setIsConfirmDeletePopupVisibleVisible(false);
          }}
          onPressConfirm={onConfirmDelete}
        />
      </Container>
    </KeyboardAvoidingView>
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
  flexDirection: 'row',
  alignItems: 'flex-start',
  paddingVertical: 5,
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
  padding: 0, // TextInput 은 자동으로 들어가는 inset 이 있어서 제거.
  marginLeft: 10,
});

const ValueInputContainer = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 17,
});

const ValueInput = styled.TextInput({
  flex: 1,
  fontSize: 35,
  fontFamily: SpoqaHanSans.Bold,
});

const ValueUnit = styled.Text({
  color: Color.Black,
  fontSize: 35,
  fontFamily: SpoqaHanSans.Bold,
  marginLeft: 2,
});

const ButtonContainer = styled.View({});

const SaveButton = styled(MarginButton)`
  margin: 10px 20px;
`;

const DeleteButton = styled(MarginButton)`
  margin: 10px 20px;
`;
