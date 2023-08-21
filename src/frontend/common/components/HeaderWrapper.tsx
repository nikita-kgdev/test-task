import styled from "styled-components";
import { FC, ReactNode } from "react";
import Link from "next/link";
import { SiStarbucks } from "react-icons/si";
import { useAuthContext } from "@src/frontend/common/context/AuthContext";

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

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  
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
  return (
    <>
      <Header>
        <HeaderContent>
          <Nav>
            <LogoMainLink href="/">
              <SiStarbucks />
            </LogoMainLink>
          </Nav>
        </HeaderContent>
        {!hideNav && (
          <Controls>
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
      </Header>
      {children}
    </>
  );
};
