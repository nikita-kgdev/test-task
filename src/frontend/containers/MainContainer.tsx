'use client'
import { HeaderWrapper } from "@src/frontend/common/components/HeaderWrapper";
import { useBanners } from "@src/frontend/common/hooks/api/use-banners";
import { UserBanner } from "@src/frontend/common/components/UserBanner";
import { useMutation } from "@tanstack/react-query";
import { createClick } from "@src/frontend/common/services/api/stats";
import styled from "styled-components";

const Banners = styled.main`
  max-width: 800px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin: 0 auto;
`;

export const MainContainer = () => {
  const { data } = useBanners();
  const clickMutation = useMutation(["clickMutation"], createClick);
  if (!data) {
    return <></>;
  }
  return (
    <HeaderWrapper>
      <Banners>
        {data.banners.map((banner, index) => (
          <UserBanner
            key={banner.id}
            banner={banner}
            imageUrl={banner.imageUrl}
            onUserClick={() => {
              clickMutation.mutate({
                ...banner,
                index,
                screenSize: JSON.stringify({
                  width: window.screen.width,
                  height: window.screen.height,
                }),
              });
            }}
          />
        ))}
      </Banners>
    </HeaderWrapper>
  );
};
