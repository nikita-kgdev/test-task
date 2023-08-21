import styled, { css } from "styled-components";
import { FC } from "react";
import Link from "next/link";
import { BsFillGeoAltFill } from "react-icons/bs";

const Mask = styled.div<{ burgerMenuOpened: boolean }>`
  background: rgba(0, 0, 0, 0.38);
  position: absolute;
  top: calc(100% + 1px);
  right: 0;
  height: calc(100vh - 100%);
  width: 0;
  display: flex;
  flex-direction: row-reverse;
  overflow: hidden;
  z-index: 1;
  transition: 0.3s ease-in-out;
  ${({ burgerMenuOpened }) =>
    burgerMenuOpened &&
    css`
      overflow: visible;
      width: 100vw;
    `};
  @media (width > 850px) {
    display: none;
  }
`;

const SidebarStyled = styled.div`
  background: #fff;
  width: 80vw;
  height: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const SidebarLink = styled(Link)`
  font-size: 19px;
  color: rgba(0, 0, 0, 0.87);
`;

const Separator = styled.hr`
  width: 100%;
  height: 1px;
  color: rgba(0, 0, 0, 0.87);
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ControlButton = styled(Link)`
  font-weight: 600;
  padding: 7px 16px;
  border: 1px solid #000;
  border-radius: 500px;
  color: #000;
`;

const ControlButtonBlack = styled(ControlButton)`
  border: none;
  color: #fff;
  background: #000;
`;

const FindLink = styled(Link)`
  color: #000;
  font-weight: 600;
  gap: 5px;
  display: flex;
  align-items: center;

  &:hover {
    color: #006241;
  }
`;

export const Sidebar: FC<{
  burgerMenuOpened: boolean;
  showStatsLink: boolean;
}> = ({ burgerMenuOpened, showStatsLink }) => {
  return (
    <Mask burgerMenuOpened={burgerMenuOpened}>
      <SidebarStyled>
        <SidebarLink href="/">Menu</SidebarLink>
        <SidebarLink href="/">Rewards</SidebarLink>
        <SidebarLink href="/">Gift cards</SidebarLink>
        <Separator />
        <div>
          <ControlButtonBlack href="/admin/content">
            Admin panel
          </ControlButtonBlack>
        </div>
        <Controls>
          <ControlButton href="/admin/sign-in">Sign in</ControlButton>
          {showStatsLink ? (
            <ControlButtonBlack href="/admin/stats">Stats</ControlButtonBlack>
          ) : (
            <ControlButtonBlack href="/admin/sign-up">
              Join now
            </ControlButtonBlack>
          )}
        </Controls>
        <FindLink href="/">
          <BsFillGeoAltFill fontSize={20} />
          Find a store
        </FindLink>
      </SidebarStyled>
    </Mask>
  );
};
