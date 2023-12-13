import {SpoqaHanSans} from '@/assets';
import {Color} from '@/colors';
import MarginButton from '@/components/MarginButton';
import {Category} from '@/models';
import {useRealm} from '@realm/react';
import {isEmpty} from 'lodash';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {readString} from 'react-native-csv';
import Realm from 'realm';
import styled from 'styled-components/native';

var RNFS = require('react-native-fs');

export interface PropsType {
  csvFileUrl: string;
}

const ImportCSVConfirmation = ({route, navigation}: any) => {
  const params = (route.params as PropsType) ?? {};

  const realm = useRealm();
  const [rows, setRows] = useState<string[][]>([]);

  useEffect(() => {
    async function loadCSV() {
      try {
        const content = await RNFS.readFile(params.csvFileUrl, 'utf8');
        const {data, errors, meta} = readString(content);
        if (!isEmpty(data)) {
          setRows(data as string[][]);
        }
      } catch (error) {}
    }
    loadCSV();
  }, []);

  const onPressSave = () => {
    realm.beginTransaction();
    rows.forEach(row => {
      const [amount, category, title, description, tradedAt] = row;
      if (isNaN(parseInt(amount, 10)) || isEmpty(title)) {
        return;
      }
      try {
        realm.create('Transaction', {
          _id: new Realm.BSON.ObjectId(),
          title,
          description,
          category: Category.fromString(category),
          value: parseInt(amount, 10),
          tradedAt: moment(tradedAt).toDate(),
        });
      } catch (error) {
        console.log(error);
      }
    });
    realm.commitTransaction();
    navigation.goBack();
  };

  return (
    <Container>
      <ScrollView style={{flex: 1}}>
        <Contents>
          <Title>CSV 파일 내용을 확인하세요.</Title>
          <Message>
            {'총'}
            <BoldMessage>{`${rows.length}개`}</BoldMessage>
            {'개의 행이 있습니다.\n'}
            {'차례대로 '}
            <BoldMessage>{`금액, 카테고리, 장소/용도, 상세 내용, 거래시간`}</BoldMessage>
            {'으로 저장합니다.\n'}
            {`카테고리는\n`}
            {[
              ...new Set(
                Category.categoriesForIncome().concat(
                  Category.categoriesForExpense(),
                ),
              ),
            ].map((ctg, index) => {
              return `- ${ctg}\n`;
            })}
            {`와 매칭되어야 저장됩니다. 그 외는 '기타'로 저장됩니다.\n`}
            {'금액 0원 이거나 장소/용도 가 없으면 저장되지 않습니다.'}
          </Message>
          {rows.length > 0 && <Row>{rows[0].map(e => `'${e}'`).join(' ')}</Row>}
          {rows.length > 1 && <Row>{rows[1].map(e => `'${e}'`).join(' ')}</Row>}
          {rows.length > 4 && <Row>{'...'}</Row>}
          {rows.length > 3 && (
            <Row>{rows[rows.length - 2].map(e => `'${e}'`).join(' ')}</Row>
          )}
          {rows.length > 2 && (
            <Row>{rows[rows.length - 1].map(e => `'${e}'`).join(' ')}</Row>
          )}
        </Contents>
      </ScrollView>
      <ButtonContainer>
        <SaveButton
          text={'저장하기'}
          color={Color.White}
          backgroundColor={Color.Blue600}
          onPress={onPressSave}
        />
        <CancelButton
          text={'취소하기'}
          color={Color.White}
          backgroundColor={Color.Gray500}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </ButtonContainer>
    </Container>
  );
};

export default ImportCSVConfirmation;

const Container = styled.SafeAreaView({
  flex: 1,
  flexDirection: 'column',
});

const Contents = styled.View({
  flex: 1,
  flexDirection: 'column',
  paddingTop: 30,
  paddingHorizontal: 25,
});

const Title = styled.Text({
  color: Color.Black,
  fontSize: 20,
  fontFamily: SpoqaHanSans.Bold,
});

const Message = styled.Text({
  color: Color.Black,
  fontSize: 16,
  fontFamily: SpoqaHanSans.Regular,
  paddingTop: 10,
  paddingBottom: 20,
});

const BoldMessage = styled.Text({
  color: Color.Black,
  fontSize: 16,
  fontFamily: SpoqaHanSans.Bold,
  paddingTop: 10,
  paddingBottom: 20,
});

const Row = styled.Text({
  color: Color.Gray600,
  fontSize: 14,
  fontFamily: SpoqaHanSans.Regular,
});

const ButtonContainer = styled.View({
  flexDirection: 'column',
});

const SaveButton = styled(MarginButton)`
  margin: 10px 20px;
`;

const CancelButton = styled(MarginButton)`
  margin: 10px 20px;
`;
