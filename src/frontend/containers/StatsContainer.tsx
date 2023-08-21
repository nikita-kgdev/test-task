"use client";
import { HeaderWrapper } from "@src/frontend/common/components/HeaderWrapper";
import { useQuery } from "@tanstack/react-query";
import { getClicks } from "@src/frontend/common/services/api/stats";
import { Fragment } from "react";
import { UserBanner } from "@src/frontend/common/components/UserBanner";
import styled from "styled-components";
import { MainLayout } from '@src/frontend/common/components/MainLayout';

const BannerContainer = styled(MainLayout)`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 20px;
`;

export const StatsContainer = () => {
  const { data } = useQuery(["clicks"], getClicks);
  if (!data) {
    return <></>;
  }
  return (
    <HeaderWrapper>
      <BannerContainer>
        {data.clicksData.map((banner) => (
          <Fragment key={banner.banner.id}>
            <p>Clicks: {banner.clicks.length}</p>
            <UserBanner
              banner={banner.banner}
              imageUrl={banner.banner.imageUrl}
            />
          </Fragment>
        ))}
      </BannerContainer>
    </HeaderWrapper>
  );
};
