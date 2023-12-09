import React, {useState} from 'react';
import {ScrollView} from 'react-native';

import {SpoqaHanSans, XMark} from '@/assets';
import {Color} from '@/colors';
import MarginButton from '@/components/MarginButton';
import TextPopup from '@/components/TextPopup';
import {Category} from '@/models';
import {TransactionModel} from '@/models/Transaction';
import {DateFormatter} from '@/utils';
import {useRealm} from '@realm/react';
import {isEmpty, isUndefined} from 'lodash';
import DatePicker from 'react-native-date-picker';
import Realm from 'realm';
import styled from 'styled-components/native';
import TransactionType from './TransactionType';
import CategorySelector from './__components__/CategorySelector';
import TransactionTypeSelector from './__components__/TransactionTypeSelector';

export interface TransactionFormPropsType {
  transaction?: TransactionModel;
  initialDate?: Date;
}

const TransactionFormScreen = ({route, navigation}: any) => {
  const params = (route.params as TransactionFormPropsType) ?? {};

  const [transactionType, setTransactionType] = useState<TransactionType>(
    TransactionType.Expense,
  );

  const [value, setValue] = useState(Math.abs(params.transaction?.value ?? 0));
  const initialCategory = params?.transaction?.category;
  const [selectedCategory, setSelectedCategory] = useState(
    !isUndefined(initialCategory)
      ? Category.fromString(initialCategory)
      : Category.Other,
  );
  const [isDateTimePickerOpen, setIsDateTimePickerOpen] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<Date>(
    params.initialDate ?? params.transaction?.tradedAt ?? new Date(),
  );
  const [title, setTitle] = useState(params.transaction?.title ?? '');
  const [description, setDescription] = useState(
    params.transaction?.description ?? '',
  );

  const realm = useRealm();

  const onPressSave = async () => {
    if (
      isUndefined(transactionType) ||
      isUndefined(selectedDateTime) ||
      isEmpty(title) ||
      value === 0
    ) {
      return;
    }

    realm.write(() => {
      const valueWithType =
        transactionType === TransactionType.Income ? value : -value;
      if (!isUndefined(params.transaction)) {
        params.transaction.title = title;
        params.transaction.description = description;
        params.transaction.category = selectedCategory;
        params.transaction.value = valueWithType;
        params.transaction.tradedAt = selectedDateTime;
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
    });

    navigation.goBack();
  };

  const [isConfirmDeletePopupVisible, setIsConfirmDeletePopupVisibleVisible] =
    useState(false);

  const onPressDelete = async () => {
    if (isUndefined(params.transaction)) {
      return;
    }
    setIsConfirmDeletePopupVisibleVisible(true);
  };

  const onConfirmDelete = async () => {
    realm.write(() => {
      realm.delete(params.transaction);
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
        {!isUndefined(params.transaction) && (
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
  fontSize: 15,
  fontFamily: SpoqaHanSans.Regular,
});

const CommonSectionValue = styled.TextInput({
  flex: 1,
  color: Color.Black,
  fontSize: 15,
  fontFamily: SpoqaHanSans.Regular,
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
  fontSize: 35,
  fontFamily: SpoqaHanSans.Bold,
  marginLeft: 3,
});

const ButtonContainer = styled.View({});

const SaveButton = styled(MarginButton)`
  margin: 10px 20px;
`;

const DeleteButton = styled(MarginButton)`
  margin: 10px 20px;
`;
