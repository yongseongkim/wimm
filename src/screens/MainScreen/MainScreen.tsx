import React from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import MonthlyGridView from './__components__/MonthlyGridView';
import {SafeAreaView} from 'react-native-safe-area-context';

const MainScreen = () => {
  return (
    <ScrollView>
      <SafeAreaView>
        <Container>
          <MonthlyGridView />
        </Container>
      </SafeAreaView>
    </ScrollView>
  );
};

export default MainScreen;

const Container = styled.View`
  flex-direction: column;
`;
