import {SpoqaHanSans} from '@/assets';
import {Color} from '@/colors';
import {Category} from '@/models';
import {isNil, range} from 'lodash';
import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import TransactionType from '../TransactionType';
import CategorySelectorItem from './CategorySelectorItem';

interface PropsType {
  transactionType: TransactionType;
  selectedCategory?: Category;
  onChangeSelectedCategory: (category: Category) => void;
}

const CategorySelector = ({
  transactionType,
  selectedCategory = Category.Other,
  onChangeSelectedCategory,
}: PropsType) => {
  let categories: Category[];
  switch (transactionType) {
    case TransactionType.Income:
      categories = Category.categoriesForIncome();
      break;
    case TransactionType.Expense:
      categories = Category.categoriesForExpense();
      break;
  }
  const numberOfColumns = 6;
  const numberOfRows = Math.ceil(categories.length / numberOfColumns);
  return (
    <Container>
      <Header>
        <HeaderTitle>카테고리</HeaderTitle>
        <HeaderText>{Category.getDisplayText(selectedCategory)}</HeaderText>
      </Header>
      <CategoryGrid>
        {range(numberOfRows).map(row => {
          return (
            <CategoryGridRow key={row}>
              {range(numberOfColumns).map(column => {
                const category = categories[row * numberOfColumns + column];
                if (isNil(category)) {
                  return <View style={{flex: 1}} />;
                }
                const isSelected = selectedCategory == category;
                return (
                  <CategorySelectorItem
                    key={category}
                    category={category}
                    isSelected={isSelected}
                    onPress={onChangeSelectedCategory}
                  />
                );
              })}
            </CategoryGridRow>
          );
        })}
      </CategoryGrid>
    </Container>
  );
};

export default CategorySelector;

const Container = styled.View({
  flexDirection: 'column',
});

const Header = styled.View({
  height: 44,
  flexDirection: 'row',
  alignItems: 'center',
});

const HeaderTitle = styled.Text({
  width: '30%',
  color: Color.Gray500,
  fontSize: 15,
  fontFamily: SpoqaHanSans.Regular,
});

const HeaderText = styled.Text({
  fontSize: 15,
  fontFamily: SpoqaHanSans.Regular,
});

const CategoryGrid = styled.View({
  flexDirection: 'column',
});

const CategoryGridRow = styled.View({
  flexDirection: 'row',
  alignItems: 'inherit',
});
