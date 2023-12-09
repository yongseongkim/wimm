import {SpoqaHanSans} from '@/assets';
import {Color, ColorUtils} from '@/colors';
import MarginButton from '@/components/MarginButton';
import React from 'react';
import {Dimensions, Modal} from 'react-native';
import styled from 'styled-components/native';

interface PropsType {
  isVisible: boolean;
  title?: string;
  message: string;
  onPressConfirm?: () => void;
  onPressCancel?: () => void;
}

const TextPopup = ({
  isVisible,
  title,
  message,
  onPressConfirm,
  onPressCancel,
}: PropsType) => {
  const screenWidth = Dimensions.get('window').width;
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <Dim>
        <Container width={screenWidth - 40 * 2}>
          <Contents>
            {title && <Title>{title}</Title>}
            <Message>{message}</Message>
          </Contents>
          <ButtonContainer>
            <CancelButton
              text="취소"
              textFont={SpoqaHanSans.Regular}
              color={Color.Black}
              backgroundColor={Color.White}
              onPress={onPressCancel}
            />
            <ButtonSpacer />
            <ConfirmButton
              text="확인"
              color={Color.Blue600}
              backgroundColor={Color.White}
              onPress={onPressConfirm}
            />
          </ButtonContainer>
        </Container>
      </Dim>
    </Modal>
  );
};

export default TextPopup;

const Dim = styled.View({
  flex: 1,
  backgroundColor: ColorUtils.WithOpacity(Color.Black, 40),
  justifyContent: 'center',
  alignItems: 'center',
});

const Container = styled.View<{width: number}>`
  width: ${({width}) => width}px;
  flex-direction: column;
  background-color: ${Color.White};
  border-radius: 8px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
`;

const Contents = styled.View({
  flexDirection: 'column',
  paddingTop: 30,
  paddingHorizontal: 25,
  paddingBottom: 20,
});

const Title = styled.Text({
  fontSize: 18,
  fontFamily: SpoqaHanSans.Bold,
  paddingBottom: 15,
});

const Message = styled.Text({
  fontSize: 15,
  fontFamily: SpoqaHanSans.Regular,
});

const ButtonContainer = styled.View({
  flexDirection: 'row',
});

const ButtonSpacer = styled.View({
  width: 10,
});

const ConfirmButton = styled(MarginButton)`
  flex: 1;
`;

const CancelButton = styled(MarginButton)`
  flex: 1;
`;
