import styled from "styled-components";
import { FC, ReactNode } from "react";

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center; 
  padding: 40px;
  gap: 40px;
  max-width: 500px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin: 0;
`;

const ContentContainer = styled.div`
  margin: 20px;
  width: max(330px, 100%);
`;

export const FormWrapper: FC<{ children: ReactNode; title: string }> = ({
  children,
  title,
}) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <ContentContainer>{children}</ContentContainer>
    </Wrapper>
  );
};
