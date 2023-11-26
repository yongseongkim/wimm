import React from 'react';
import {Pressable} from 'react-native';

import {SpoqaHanSans, XMark} from '@/assets';
import {Color} from '@/colors';
import styled from 'styled-components/native';

export interface TransactionFormPropsType {}

const TransactionFormScreen = ({navigation}: any) => {
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
