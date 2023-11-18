import React from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import MonthlyGridView from './__components__/MonthlyGridView';

const MainScreen = () => {
  return (
    <ScrollView>
      <Container>
        <MonthlyGridView />
      </Container>
    </ScrollView>
  );
};

export default MainScreen;

const Container = styled.View`
  flex-direction: column;
`;
