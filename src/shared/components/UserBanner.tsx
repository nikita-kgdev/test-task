import { FC } from "react";
import { Banner } from "@src/shared/interfaces/banner";
import styled from "styled-components";
import { Button } from "@src/shared/components/Button";
import { TfiClose } from "react-icons/tfi";

const BackGround = styled.div<{ color: string }>`
  padding: 50px;
  background-color: ${({ color }) => color};
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: relative;
  text-align: center;
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

export const UserBanner: FC<{
  banner: Banner;
  onUserClick?: () => void;
  onClose?: () => void;
}> = ({ banner, onUserClick, onClose }) => {
  return (
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
  );
};
