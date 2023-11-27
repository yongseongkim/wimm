import {SpoqaHanSans} from '@/assets';
import {Color} from '@/colors';
import {Category} from '@/models';
import {isNil, range} from 'lodash';
import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';

interface PropsType {
  selectedCategory?: Category;
  onChangeSelectedCategory: (category: Category) => void;
}

const CategorySelector = ({
  selectedCategory = Category.Other,
  onChangeSelectedCategory,
}: PropsType) => {
  const categories = Object.values(Category);
  const numberOfColumns = 6;
  const numberOfRows = Math.ceil(categories.length / numberOfColumns);
  return (
    <Container>
      <Header>
        <Spacer />
        <HeaderText>{selectedCategory}</HeaderText>
      </Header>
      {range(numberOfRows).map(row => {
        return (
          <Row key={row}>
            {range(numberOfColumns).map(column => {
              const category = categories[row * numberOfColumns + column];
              if (isNil(category)) {
                return <View style={{flex: 1}} />;
              }
              const isSelected = selectedCategory == category;
              return (
                <Item
                  key={category}
                  isSelected={isSelected}
                  onPress={() => {
                    onChangeSelectedCategory(category);
                  }}>
                  <CategoryText isSelected={isSelected}>
                    {category}
                  </CategoryText>
                </Item>
              );
            })}
          </Row>
        );
      })}
    </Container>
  );
};

export default CategorySelector;

const Container = styled.View({
  flexDirection: 'column',
});

const Header = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 20,
  paddingVertical: 10,
  backgroundColor: Color.Red100,
});

const Spacer = styled.View({flex: 1});

const HeaderText = styled.Text({
  fontSize: 20,
  fontFamily: SpoqaHanSans.Bold,
});

const Row = styled.View({
  flexDirection: 'row',
  alignItems: 'inherit',
});

const Item = styled.Pressable<{isSelected: boolean}>`
  flex: 1;
  margin: 10px;
  background-color: ${({isSelected}) =>
    isSelected ? Color.Blue800 : Color.Transparent};
  justify-content: center;
`;

// TODO: 임시방편, svg 로 변경 예정
const CategoryText = styled.Text<{isSelected: boolean}>`
  color: ${({isSelected}) => (isSelected ? Color.White : Color.Black)};
  font-size: 16px;
  font-family: ${SpoqaHanSans.Bold};
  text-align: center;
`;
