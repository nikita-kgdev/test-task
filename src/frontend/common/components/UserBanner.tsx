import { FC } from "react";
import { NoImageBanner } from "@src/shared/interfaces/banner";
import styled, { css } from "styled-components";
import { Button } from "@src/frontend/common/components/Button";
import { TfiClose } from "react-icons/tfi";

const Container = styled.div`
  display: flex;

  @media (max-width: 800px) {
    margin: 0 auto;
    flex-direction: column-reverse;
    align-items: center;
  }
`;

const layout = css`
    width: 50%;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const BackGround = styled.div<{ color: string }>`
  padding: 50px;
  background-color: ${({ color }) => color};
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: relative;
  text-align: center;
  ${layout}
`;

const Title = styled.h3`
  text-align: center;
  font-size: 24px;
  font-weight: 700;
`;

const UserClickButton = styled(Button)`
  width: max(100%, 100px);
  border-color: #000;
  color: #000;
  background-color: transparent;
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  color: #000;
  border: none;
`;

const Img = styled.img`
  ${layout}
`;

export const UserBanner: FC<{
  banner: NoImageBanner;
  onUserClick?: () => void;
  onClose?: () => void;
  imageUrl?: string;
}> = ({ banner, onUserClick, onClose, imageUrl= '' }) => {
  return (
    <Container>
      <BackGround color={banner.color}>
        {onClose && (
          <CloseButton onClick={onClose}>
            <TfiClose />
          </CloseButton>
        )}
        <Title>{banner.title}</Title>
        {banner.content}
        <UserClickButton onClick={onUserClick}>{banner.label}</UserClickButton>
      </BackGround>
      <Img alt={banner.title} src={imageUrl} />
    </Container>
  );
};
