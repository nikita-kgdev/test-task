import { FC, useState } from "react";
import {
  Banner as BannerInterface,
  BannerLabel,
  CreateBanner,
} from "@src/shared/interfaces/banner";
import styled from "styled-components";
import { useFormInput } from "@src/frontend/common/hooks/useFormInput";
import { Input } from "@src/frontend/common/components/Input";
import Select from "react-select";
import { Button } from "@src/frontend/common/components/Button";
import { ColorPicker } from "@src/frontend/common/components/ColorPicker";
import { UserBanner } from "@src/frontend/common/components/UserBanner";
import { getFileSrc } from "@src/frontend/utils/getBlobSrc";

const BannerStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border: 1px solid black;
  border-radius: 10px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Title = styled.div`
  width: 100px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const options = Object.values(BannerLabel).map((label) => ({
  label,
}));

export const BannerForm: FC<{
  banner?: Partial<BannerInterface>;
  onSave: (banner: Partial<CreateBanner>) => void;
  onDelete: () => void;
  alwaysUserView: boolean;
}> = ({ banner = {}, onSave, onDelete, alwaysUserView = false }) => {
  const titleInput = useFormInput({ initialValue: banner?.title ?? "" });
  const contentInput = useFormInput({ initialValue: banner?.content ?? "" });
  const [color, setColor] = useState(banner?.color ?? "#772932");
  const [label, setLabel] = useState(banner?.label ?? BannerLabel.ORDER_NOW);
  const [userView, setUserView] = useState(alwaysUserView);
  const [file, setFile] = useState<File | undefined>();
  return userView ? (
    <UserBanner
      onClose={() => {
        setUserView(false);
      }}
      imageUrl={ file ? getFileSrc(file) : banner.imageUrl}
      banner={{
        title: titleInput.value,
        content: contentInput.value,
        color,
        label,
      }}
    />
  ) : (
    <BannerStyled>
      <Row>
        <Title>Title:</Title>
        <Input value={titleInput.value} onChange={titleInput.onChange} />
      </Row>
      <Row>
        <Title>Content:</Title>
        <Input value={contentInput.value} onChange={contentInput.onChange} />
      </Row>
      <Row>
        <Title>Color:</Title>
        <ColorPicker color={color} onChange={setColor} />
      </Row>
      <Row>
        <Title>Label:</Title>
        <Select
          options={options}
          onChange={(value) => {
            if (value) {
              setLabel(value.label);
            }
          }}
          value={{ label }}
        />
      </Row>
      <Row>
        <Title>Image:</Title>
        <Input
            accept='image/*'
          type="file"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              setFile(file);
            }
          }}
        />
      </Row>
      <Controls>
        <Button onClick={() => onDelete()}>Delete</Button>
        <Button
          $colorScheme="primary"
          disabled={!(banner.imageUrl || file)}
          onClick={() => {
            onSave({
              title: titleInput.value,
              content: contentInput.value,
              color,
              label,
              imageUrl: file,
            });
          }}
        >
          Save
        </Button>
      </Controls>
      <Button disabled={!(banner.imageUrl || file)} $colorScheme="primary" onClick={() => setUserView(true)}>
        Preview
      </Button>
    </BannerStyled>
  );
};
