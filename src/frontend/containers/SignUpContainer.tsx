'use client'
import styled from "styled-components";
import { useFormInput } from "@src/frontend/common/hooks/useFormInput";
import { Input } from "@src/frontend/common/components/Input";
import { Button } from "@src/frontend/common/components/Button";
import { FormEvent } from "react";
import { FormWrapper } from "@src/frontend/common/components/FormWrapper";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@src/frontend/common/services/api/user";
import { info } from "@src/frontend/utils/toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setAuth } from "@src/frontend/common/services/auth";
import { HeaderWrapper } from "@src/frontend/common/components/HeaderWrapper";

export const SignUpFormContainer = styled.form`
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

export const SignUpContainer = () => {
  const emailInput = useFormInput();
  const passwordInput = useFormInput();
  const router = useRouter();
  const signUpMutation = useMutation(["sing-up"], signUp, {
    onSuccess: ({ session }) => {
      info("Account created and logged in");
      setAuth(session);
      router.push("/");
    },
  });
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signUpMutation.mutate({
      email: emailInput.value,
      password: passwordInput.value,
    });
  };
  return (
    <HeaderWrapper hideNav>
      <FormWrapper title="Create an account">
        <SignUpFormContainer onSubmit={onSubmit}>
          <Input
            placeholder="Email"
            type="email"
            value={emailInput.value}
            onChange={emailInput.onChange}
          />
          <Input
            placeholder="Password"
            type="password"
            value={passwordInput.value}
            onChange={passwordInput.onChange}
          />
          <Bottom>
            <p>
              {" "}
              Have an account? <Link href="/src/app/admin/sign-in">sign in</Link>
            </p>
            <Button $colorScheme="primary" $big>
              Sing up
            </Button>
          </Bottom>
        </SignUpFormContainer>
      </FormWrapper>
    </HeaderWrapper>
  );
};
