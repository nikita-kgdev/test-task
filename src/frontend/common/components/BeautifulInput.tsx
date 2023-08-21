import { ChangeEvent, FC, HTMLInputTypeAttribute, useState } from "react";
import styled, { css } from "styled-components";
import { Input } from "@src/frontend/common/components/Input";
import { BsFillXOctagonFill } from "react-icons/bs";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const Container = styled.div`
  position: relative;
`;

const focusedLabel = css<{ error: boolean }>`
  top: -10px;
  padding: 0 5px;
  bottom: 0;
  font-size: 15px;
  left: 15px;
  opacity: 1;
  color: ${({ error }) => (error ? "#d62b1f" : "#404040")};
`;

const Label = styled.label<{ active: boolean; error: boolean }>`
  position: absolute;
  font-size: 19px;
  color: #8b8888;
  pointer-events: none;
  top: 9px;
  left: 12px;
  transition: all 0.1s ease;
  background: #fff;
  height: 30px;
  ${({ active }) => active && focusedLabel}
  color: ${({ error }) => error && "#d62b1f"}
`;

const Asterisk = styled.span<{ error: boolean }>`
  color: ${({ error }) => (error ? "#d62b1f" : "#00754a")};
`;

const InputStyled = styled(Input)<{ error: boolean }>`
  width: 100%;
  height: 50px;
  transition: all 0.1s ease;

  &:focus-visible {
    outline: none;
  }

  ${({ error }) =>
    error &&
    css`
      border-color: #d62b1f;
    `}
  &:focus ~ ${Label} {
    ${focusedLabel};
    color: ${({ error }) => !error && "#00754a"};
  }
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  font-size: 18px;
`;

const ErrorIcon = styled(BsFillXOctagonFill)`
  color: #d62b1f;
`;

export const BeautifulInput: FC<{
  placeholder?: string;
  id: string;
  value: string;
  type?: HTMLInputTypeAttribute;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}> = ({ placeholder, id, type, value, onChange }) => {
  const [wasFocused, setWasFocused] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const showError = wasFocused && !value;
  const EyeIcon = passwordShown ? AiOutlineEye : AiOutlineEyeInvisible;
  return (
    <Container>
      <InputStyled
        onBlur={() => {
          setWasFocused(true);
        }}
        error={showError}
        type={passwordShown ? "text" : type}
        onChange={onChange}
        value={value}
        id={id}
      />
      <Label active={!!value} error={showError}>
        <Asterisk error={showError}>*</Asterisk> {placeholder}
      </Label>
      <Icons>
        {type === "password" && (
          <EyeIcon
            cursor="pointer"
            onClick={() => {
              setPasswordShown((prev) => !prev);
            }}
            fontSize={22}
          />
        )}
        {showError && <ErrorIcon />}
      </Icons>
    </Container>
  );
};
