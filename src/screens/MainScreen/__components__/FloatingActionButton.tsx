import {Color, ColorUtils} from '@/colors';
import React, {PropsWithChildren} from 'react';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

interface PropsType extends PropsWithChildren {
  style?: any;
  onPress: () => void;
}

export const FLOATING_ACTION_BUTTON_SIZE = 48;

const FloatingActionButton = ({style, children, onPress}: PropsType) => {
  return (
    <Container style={[style, {backgroundColor: Color.Transparent}]}>
      <TouchableArea
        backgroundColor={style.backgroundColor}
        underlayColor={ColorUtils.WithOpacity(style.backgroundColor, 0.8)}
        onPress={onPress}>
        {children}
      </TouchableArea>
    </Container>
  );
};

export default FloatingActionButton;

const Container = styled(Animated.View)`
  position: absolute;
  width: ${FLOATING_ACTION_BUTTON_SIZE}px;
  height: ${FLOATING_ACTION_BUTTON_SIZE}px;
`;

const TouchableArea = styled.TouchableHighlight<{backgroundColor: Color}>`
  width: 100%;
  height: 100%;
  border-radius: ${FLOATING_ACTION_BUTTON_SIZE / 2}px;
  align-items: center;
  justify-content: center;
  background-color: ${({backgroundColor}) => backgroundColor};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;
