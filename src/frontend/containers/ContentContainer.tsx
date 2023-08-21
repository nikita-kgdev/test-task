'use client'
import {
  BANNERS_KEY,
  useBanners,
} from "@src/frontend/common/hooks/api/use-banners";
import { HeaderWrapper } from "@src/frontend/common/components/HeaderWrapper";
import styled from "styled-components";
import { Button } from "@src/frontend/common/components/Button";
import { useState } from "react";
import { BannerEntity } from "@src/shared/interfaces/banner";
import { BannerForm } from "@src/frontend/common/components/BannerForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createBanner,
  deleteBanner,
  updateBanner,
} from "@src/frontend/common/services/api/banner";
import { createBannerFormData } from "@src/frontend/utils/bannerFormData";
import { MainLayout } from '@src/frontend/common/components/MainLayout';
import { info } from '@src/frontend/utils/toast';

const Container = styled(MainLayout)`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ContentContainer = () => {
  const { data } = useBanners();
  const [newLabel, setNewLabel] = useState(false);
  const queryClient = useQueryClient();
  const createBannerMutation = useMutation(["createBanner"], createBanner, {
    onSuccess: ({ banner }) => {
      queryClient.setQueryData<{ banners: BannerEntity[] }>(
        [BANNERS_KEY],
        (banners) => banners && { banners: [banner, ...banners.banners] },
      );
      setNewLabel(false);
      info('banner created');
    },
  });
  const updateBannerMutation = useMutation(["updateBanner"], updateBanner, {
    onSuccess: ({ banner }) => {
      queryClient.setQueryData<{ banners: BannerEntity[] }>(
        [BANNERS_KEY],
        (banners) =>
          banners && {
            banners: banners.banners.map((prev) =>
              prev.id === banner.id ? banner : prev,
            ),
          },
      );
      info('banner updated');
    },
  });
  const deleteBannerMutation = useMutation(["deleteBanner"], deleteBanner, {
    onSuccess: (_, id) => {
      queryClient.setQueryData<{ banners: BannerEntity[] }>(
        [BANNERS_KEY],
        (banners) =>
          banners && {
            banners: banners.banners.filter((banner) => banner.id !== id),
          },
      );
    },
  });
  if (!data) {
    return <></>;
  }
  return (
    <HeaderWrapper showStatsLink>
      <Container>
        <Header>
          <h2>Modify content</h2>
          {data.banners.length <= 2 && (
            <Button
              onClick={() => {
                setNewLabel(true);
              }}
            >
              Create
            </Button>
          )}
        </Header>
        {newLabel && (
          <BannerForm
            onSave={(banner) => {
              createBannerMutation.mutate(createBannerFormData(banner));
            }}
            onDelete={() => {
              setNewLabel(false);
            }}
            alwaysUserView={false}
          />
        )}
        {data.banners.map((banner) => (
          <BannerForm
            banner={banner}
            key={banner.id}
            onSave={(newBanner) =>
              updateBannerMutation.mutate({
                id: banner.id,
                banner: createBannerFormData(newBanner),
              })
            }
            onDelete={() => deleteBannerMutation.mutate(banner.id)}
            alwaysUserView={false}
          />
        ))}
      </Container>
    </HeaderWrapper>
  );
};
