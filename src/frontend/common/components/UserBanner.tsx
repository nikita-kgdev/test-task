import { FC } from "react";
import { NoImageBanner } from "@src/shared/interfaces/banner";
import styled, { css } from "styled-components";
import { Button } from "@src/frontend/common/components/Button";
import { TfiClose } from "react-icons/tfi";

const Container = styled.div<{ color: string; imageFirst: boolean }>`
  display: flex;
  flex-direction: ${({ imageFirst }) => (imageFirst ? "row" : "row-reverse")};
  background-color: ${({ color }) => color};

  @media (max-width: 800px) {
    margin: 0 auto;
    display: block;
  }
`;

const TextData = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10% 50px;
  flex-direction: column;
  align-items: center;
  position: relative;
  text-align: center;
  width: 50%;
  aspect-ratio: 1/1;
  @media (max-width: 1300px) {
    padding: 3% 50px;
  }
  @media (max-width: 800px) {
    width: 100%;
    aspect-ratio: initial;
    justify-content: flex-start;
    gap: 10px;
    padding: 3% 20px;
  }
`;

const Title = styled.h3`
  text-align: center;
  font-size: 50px;
  margin: 0;
  font-weight: 700;
  @media (max-width: 1000px) {
    font-size: 28px;
  }
`;

const Content = styled.span`
  text-align: center;
  font-size: 24px;
`;

const UserClickButton = styled(Button)`
  //width: max(100%, 100px);
  font-size: 16px;
  width: auto;
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
  width: 100%;
  aspect-ratio: 1/1;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const UserBanner: FC<{
  banner: NoImageBanner;
  onUserClick?: () => void;
  onClose?: () => void;
  imageUrl?: string;
}> = ({ banner, onUserClick, onClose, imageUrl = "" }) => {
  return (
    <Container color={banner.color} imageFirst={banner.imageFirst}>
      <ImageContainer>
        <Img alt={banner.title} src={imageUrl} />
      </ImageContainer>
      <TextData>
        {onClose && (
          <CloseButton onClick={onClose}>
            <TfiClose />
          </CloseButton>
        )}
        <Title>{banner.title}</Title>
        <Content>{banner.content}</Content>
        <UserClickButton onClick={onUserClick}>{banner.label}</UserClickButton>
      </TextData>
    </Container>
  );
};
