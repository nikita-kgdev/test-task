import { FC, useState } from "react";
import {
  Banner as BannerInterface,
  BannerLabel,
} from "@src/shared/interfaces/banner";
import styled from "styled-components";
import { useFormInput } from "@src/shared/hooks/useFormInput";
import { Input } from "@src/shared/components/Input";
import Select from "react-select";
import { Button } from "@src/shared/components/Button";
import { ColorPicker } from "@src/shared/components/ColorPicker";
import { UserBanner } from "@src/shared/components/UserBanner";

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
  onSave: (banner: BannerInterface) => void;
  onDelete: () => void;
  alwaysUserView: boolean;
}> = ({ banner = {}, onSave, onDelete, alwaysUserView = false }) => {
  const titleInput = useFormInput({ initialValue: banner?.title ?? "" });
  const contentInput = useFormInput({ initialValue: banner?.content ?? "" });
  const [color, setColor] = useState(banner?.color ?? "#772932");
  const [label, setLabel] = useState(banner?.label ?? BannerLabel.ORDER_NOW);
  const [userView, setUserView] = useState(alwaysUserView);
  return userView ? (
    <UserBanner
      onClose={() => {
        setUserView(false);
      }}
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
      <Controls>
        <Button onClick={() => onDelete()}>Delete</Button>
        <Button
          onClick={() =>
            onSave({
              title: titleInput.value,
              content: contentInput.value,
              color,
              label,
            })
          }
        >
          Save
        </Button>
      </Controls>
      <Button onClick={() => setUserView(true)}>Preview</Button>
    </BannerStyled>
  );
};
