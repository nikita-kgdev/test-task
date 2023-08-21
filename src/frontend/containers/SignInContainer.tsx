'use client'
import styled from "styled-components";
import { useFormInput } from "@src/frontend/common/hooks/useFormInput";
import { Button } from "@src/frontend/common/components/Button";
import { FormEvent } from "react";
import { FormWrapper } from "@src/frontend/common/components/FormWrapper";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@src/frontend/common/services/api/user";
import { info } from "@src/frontend/utils/toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setAuth } from "@src/frontend/common/services/auth";
import { HeaderWrapper } from "@src/frontend/common/components/HeaderWrapper";
import { useAuthContext } from "@src/frontend/common/context/AuthContext";
import { BeautifulInput } from "@src/frontend/common/components/BeautifulInput";

export const SignInFormContainer = styled.form`
  border: 1px solid gray;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Start = styled.div`
  align-self: flex-start;
  display: flex;
  align-items: center;
  font-size: 16px;
`;

const Checkbox = styled.input`
  accent-color: #00754a;
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const UnderlinedLink = styled(Link)`
  text-decoration: underline;
  display: block;
  color: #00754a;
  font-weight: 700;

  &:hover {
    text-decoration: none;
  }
`;

export const SignInContainer = () => {
  const emailInput = useFormInput();
  const passwordInput = useFormInput();
  const router = useRouter();
  const { refresh } = useAuthContext();
  const signInMutation = useMutation(["sing-in"], signIn, {
    onSuccess: ({ session }) => {
      info("Logged in");
      setAuth(session);
      refresh();
      router.push("/");
    },
  });
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInMutation.mutate({
      email: emailInput.value,
      password: passwordInput.value,
    });
  };
  return (
    <HeaderWrapper hideNav>
      <FormWrapper title="Login to account">
        <SignInFormContainer onSubmit={onSubmit}>
          <BeautifulInput
            id="login-email"
            placeholder="Email"
            type="email"
            value={emailInput.value}
            onChange={emailInput.onChange}
          />
          <BeautifulInput
            id="login-password"
            placeholder="Password"
            type="password"
            value={passwordInput.value}
            onChange={passwordInput.onChange}
          />
          <Start>
            <Checkbox type="checkbox" /> Keep me signed in.{" "}
            <UnderlinedLink href="/">Details</UnderlinedLink>
          </Start>
          <Start>
            <div>
              <UnderlinedLink href="/">Forgot your username?</UnderlinedLink>
              <UnderlinedLink href="/">Forgot your password?</UnderlinedLink>
            </div>
          </Start>
          <Bottom>
            <p>
              {" "}
              Don&apos;t have an account?{" "}
              <Link href="/src/app/admin/sign-up">sign up</Link>
            </p>
            <Button $colorScheme="primary" $big>
              Sing in
            </Button>
          </Bottom>
        </SignInFormContainer>
      </FormWrapper>
    </HeaderWrapper>
  );
};
