import React from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import MonthlyGridView from './__components__/MonthlyGridView';
import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';

const MainScreen = () => {
  const now = moment();
  return (
    <ScrollView>
      <SafeAreaView>
        <Container>
          <MonthlyGridView year={now.year()} month={now.month() + 1} />
        </Container>
      </SafeAreaView>
    </ScrollView>
  );
};

export default MainScreen;

const Container = styled.View`
  flex-direction: column;
`;
