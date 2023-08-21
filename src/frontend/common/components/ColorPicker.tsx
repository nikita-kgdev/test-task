import { FC, LegacyRef, useRef, useState } from "react";
import styled from "styled-components";
import { GithubPicker } from "react-color";
import { useClickOutside } from "@src/frontend/common/hooks/useClickOutside";

const Color = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  width: 20px;
  height: 20px;
  border-radius: 10px;
  position: relative;
`;

const PickerContainer = styled.div`
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 0;
`;

export const ColorPicker: FC<{
  color: string;
  onChange: (color: string) => void;
}> = ({ color, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  const { ref } = useClickOutside<HTMLDivElement>({
    onOutside: () => {
      setShowPicker(false);
    },
  });
  return (
    <Color
      tabIndex={0}
      color={color}
      onClick={() => {
        setShowPicker(true);
      }}
      ref={ref}
    >
      {showPicker && (
        <PickerContainer
            onClick={(event) => {
              event.stopPropagation();
            }}>
          <GithubPicker
            color={color}
            onChange={(color) => {
              setShowPicker(false);
              onChange(color.hex);
            }}
          />
        </PickerContainer>
      )}
    </Color>
  );
};
