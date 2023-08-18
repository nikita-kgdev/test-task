import { BANNERS_KEY, useBanners } from "@src/shared/hooks/api/use-banners";
import { HeaderWrapper } from "@src/shared/components/HeaderWrapper";
import styled from "styled-components";
import { Button } from "@src/shared/components/Button";
import { useState } from "react";
import { BannerEntity } from "@src/shared/interfaces/banner";
import { BannerForm } from "@src/shared/components/BannerForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createBanner,
  deleteBanner,
  updateBanner,
} from "@src/shared/services/api/banner";

const Container = styled.main`
  width: 60%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 500px){
    width: 95%;
  }
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
        (banners) => banners && { banners: [banner,...banners.banners] },
      );
      setNewLabel(false);
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
    },
  });
  const deleteBannerMutation = useMutation(["deleteBanner"], deleteBanner, {
    onSuccess: (_,id) => {
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
              createBannerMutation.mutate(banner);
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
              updateBannerMutation.mutate({ id: banner.id, banner: newBanner })
            }
            onDelete={() => deleteBannerMutation.mutate(banner.id)}
            alwaysUserView={false}
          />
        ))}
      </Container>
    </HeaderWrapper>
  );
};
