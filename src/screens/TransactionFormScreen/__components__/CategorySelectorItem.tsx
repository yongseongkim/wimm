import {
  Airplane,
  CartFill,
  ChartBarFill,
  CrossFill,
  Elipse,
  ForkKnife,
  GamecontrollerFill,
  GiftFill,
  GraduationcapFill,
  HouseFill,
  PhoneFill,
  Scissors,
  TramFill,
  WonsignCircleFill,
  WonsignSquareFill,
} from '@/assets';
import {Color} from '@/colors';

import {Category} from '@/models';
import React, {useState} from 'react';
import styled from 'styled-components/native';

interface PropsType {
  category: Category;
  isSelected: boolean;
  onPress: (category: Category) => void;
}

const CategorySelectorItem = ({category, isSelected, onPress}: PropsType) => {
  const width = 24;
  const tintColor = isSelected ? Color.White : Color.Gray500;

  const [borderRadius, setBorderRadius] = useState(0);
  return (
    <Container
      isSelected={isSelected}
      borderRadius={borderRadius}
      onLayout={event => {
        const {width} = event.nativeEvent.layout;
        setBorderRadius(width / 2);
      }}
      onPress={() => {
        onPress(category);
      }}>
      {category === Category.Salary && (
        <WonsignCircleFill width={width} height={width} color={tintColor} />
      )}
      {category === Category.Investment && (
        <ChartBarFill width={width} height={width} color={tintColor} />
      )}
      {category === Category.SideJob && (
        <WonsignSquareFill width={width} height={width} color={tintColor} />
      )}
      {category === Category.Food && (
        <ForkKnife width={width} height={width} color={tintColor} />
      )}
      {category === Category.Transportation && (
        <TramFill width={width} height={width} color={tintColor} />
      )}
      {category === Category.Entertainment && (
        <GamecontrollerFill width={width} height={width} color={tintColor} />
      )}
      {category === Category.Travel && (
        <Airplane width={width} height={width} color={tintColor} />
      )}
      {category === Category.Shopping && (
        <CartFill width={width} height={width} color={tintColor} />
      )}
      {category === Category.Beauty && (
        <Scissors width={width} height={width} color={tintColor} />
      )}
      {category === Category.Gift && (
        <GiftFill width={width} height={width} color={tintColor} />
      )}
      {category === Category.Communication && (
        <PhoneFill width={width} height={width} color={tintColor} />
      )}
      {category === Category.Living && (
        <HouseFill width={width} height={width} color={tintColor} />
      )}
      {category === Category.Hospital && (
        <CrossFill width={width} height={width} color={tintColor} />
      )}
      {category === Category.Education && (
        <GraduationcapFill width={width} height={width} color={tintColor} />
      )}
      {category === Category.Other && (
        <Elipse width={width} height={width} color={tintColor} />
      )}
    </Container>
  );
};

export default CategorySelectorItem;

const Container = styled.Pressable<{isSelected: boolean; borderRadius: number}>`
  flex: 1;
  aspect-ratio: 1;
  margin: 5px;
  justify-content: center;
  align-items: center;
  background-color: ${({isSelected}) => {
    return isSelected ? Color.Blue600 : Color.Transparent;
  }};
  border-radius: ${({borderRadius}) => borderRadius}px;
`;
