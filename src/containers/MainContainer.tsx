import { HeaderWrapper } from "@src/shared/components/HeaderWrapper";
import { useBanners } from "@src/shared/hooks/api/use-banners";
import { UserBanner } from "@src/shared/components/UserBanner";
import { useMutation } from "@tanstack/react-query";
import { createClick } from "@src/shared/services/api/stats";
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
        {data.banners.map(({ id,...banner }, index) => (
          <UserBanner
            key={id}
            banner={banner}
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
