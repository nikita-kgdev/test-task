import styled, { css } from "styled-components";
import { FC, ReactNode, useState } from "react";
import Link from "next/link";
import { SiStarbucks } from "react-icons/si";
import { useAuthContext } from "@src/frontend/common/context/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsFillGeoAltFill } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { Sidebar } from '@src/frontend/common/components/Sidebar';

const Header = styled.header`
  padding: 0 40px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 2px 2px rgba(0, 0, 0, 0.06),
    0 0 2px rgba(0, 0, 0, 0.07);
  height: 99px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const hideOnSmallScreen = css`
  @media (width <= 850px) {
    display: none;
  }
`;
const hideOnBigScreen = css`
  @media (width > 850px) {
    display: none;
  }
`;

const HeaderContent = styled.div`
  max-width: min(80%, 600px);
  display: flex;
  justify-content: space-between;
`;

const LogoMainLink = styled(Link)`
  color: #006241;
  font-size: 50px;
  display: flex;
  align-items: center;
`;

const LogoNavLink = styled(Link)`
  color: #000;
  font-weight: 700;
  gap: 5px;
  display: flex;
  align-items: center;

  &:hover {
    color: #006241;
  }
  ${hideOnSmallScreen}

`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;

  ${hideOnSmallScreen}
`;

const BurgerMenu = styled.div`
  cursor: pointer;
  font-size: 24px;
  ${hideOnBigScreen}
`;

const ControlButtons = styled.div`
  display: flex;
  gap: 20px;
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

export const HeaderWrapper: FC<{
  children?: ReactNode;
  hideNav?: boolean;
  showStatsLink?: boolean;
}> = ({ children, hideNav = false, showStatsLink = false }) => {
  const { user } = useAuthContext();
  const [burgerMenuOpened, setBurgerMenuOpened] = useState(false);
  return (
    <>
      <Header>
        <HeaderContent>
          <Nav>
            <LogoMainLink href="/">
              <SiStarbucks />
            </LogoMainLink>
            {!hideNav && (
              <>
                <LogoNavLink href={"/"}>Menu</LogoNavLink>
                <LogoNavLink href={"/"}>Rewards</LogoNavLink>
                <LogoNavLink href={"/"}>Gift Cards</LogoNavLink>
              </>
            )}
          </Nav>
        </HeaderContent>
        {!hideNav && (
          <Controls>
            <LogoNavLink href={"/"}>
              <BsFillGeoAltFill fontSize={20} />
              Find a store
            </LogoNavLink>
            {!!user && (
              <ControlButtonBlack href="/admin/content">
                Admin Panel
              </ControlButtonBlack>
            )}
            <ControlButtons>
              <ControlButton href="/admin/sign-in">Sign in</ControlButton>
              {showStatsLink ? (
                <ControlButtonBlack href="/admin/stats">
                  Stats
                </ControlButtonBlack>
              ) : (
                <ControlButtonBlack href="/admin/sign-up">
                  Join now
                </ControlButtonBlack>
              )}
            </ControlButtons>
          </Controls>
        )}
        <BurgerMenu onClick={() => setBurgerMenuOpened((prev) => !prev)}>
          {burgerMenuOpened ? <GrClose /> : <GiHamburgerMenu />}
        </BurgerMenu>
        <Sidebar burgerMenuOpened={burgerMenuOpened} showStatsLink={showStatsLink}/>
      </Header>
      {children}
    </>
  );
};
