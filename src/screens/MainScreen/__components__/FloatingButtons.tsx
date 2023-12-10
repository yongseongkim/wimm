import {FolderFillBadgePlus, Plus, SquareAndPencil} from '@/assets';
import {Color, ColorUtils} from '@/colors';
import React, {useEffect} from 'react';
import Animated, {
  Easing,
  ReduceMotion,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import FloatingActionButton, {
  FLOATING_ACTION_BUTTON_SIZE,
} from './FloatingActionButton';

interface PropsType {
  isExpanded: boolean;
  onPress: () => void;
  onPressCustomInput: () => void;
  onPressDocument: () => void;
}

const EXPAND_BUTTON_SIZE = 56;
const FLOATING_ACTION_BUTTON_SPACING = 14;

const FloatingButtons = ({
  isExpanded,
  onPress,
  onPressCustomInput,
  onPressDocument,
}: PropsType) => {
  const safeAreaInsets = useSafeAreaInsets();

  const progressOfExpansion = useSharedValue(0);
  const expandRotate = useDerivedValue(() => {
    return `${progressOfExpansion.value * 45}deg`;
  }, [progressOfExpansion.value]);
  const customInputBottom = useDerivedValue(() => {
    return (
      progressOfExpansion.value *
      (EXPAND_BUTTON_SIZE + FLOATING_ACTION_BUTTON_SPACING)
    );
  }, [progressOfExpansion.value]);
  const documentBottom = useDerivedValue(() => {
    return (
      progressOfExpansion.value *
      (EXPAND_BUTTON_SIZE +
        FLOATING_ACTION_BUTTON_SIZE +
        FLOATING_ACTION_BUTTON_SPACING * 2)
    );
  }, [progressOfExpansion.value]);

  useEffect(() => {
    if (isExpanded) {
      progressOfExpansion.value = withSpring(1, {
        duration: 200,
        reduceMotion: ReduceMotion.System,
      });
    } else {
      progressOfExpansion.value = withTiming(0, {
        duration: 200,
        easing: Easing.inOut(Easing.quad),
        reduceMotion: ReduceMotion.System,
      });
    }
  }, [isExpanded]);

  return (
    <Container safeAreaBottomInset={safeAreaInsets.bottom}>
      <FloatingActionButton
        style={{
          bottom: customInputBottom,
          opacity: progressOfExpansion,
          backgroundColor: Color.Gray400,
        }}
        onPress={onPressCustomInput}>
        <SquareAndPencil width={24} height={24} color={Color.White} />
      </FloatingActionButton>
      <FloatingActionButton
        style={{
          bottom: documentBottom,
          opacity: progressOfExpansion,
          backgroundColor: Color.Gray400,
        }}
        onPress={onPressDocument}>
        <FolderFillBadgePlus width={24} height={24} color={Color.White} />
      </FloatingActionButton>
      <ExpandButton
        underlayColor={ColorUtils.WithOpacity(Color.Blue600, 0.6)}
        onPress={onPress}>
        <Animated.View style={{transform: [{rotate: expandRotate}]}}>
          <Plus width={24} height={24} color={Color.White} />
        </Animated.View>
      </ExpandButton>
    </Container>
  );
};

export default FloatingButtons;

const Container = styled.View<{safeAreaBottomInset: number}>`
  position: absolute;
  height: 100%;
  right: 14px;
  bottom: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: ${({safeAreaBottomInset}) => safeAreaBottomInset + 25}px;
`;

const ExpandButton = styled.TouchableHighlight`
  width: ${EXPAND_BUTTON_SIZE}px;
  height: ${EXPAND_BUTTON_SIZE}px;
  border-radius: 28px;
  background-color: ${Color.Blue600};
  align-items: center;
  justify-content: center;
  z-index: 10;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;
