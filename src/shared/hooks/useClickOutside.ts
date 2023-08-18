import { useEffect, useRef } from "react";

export const useClickOutside = <T extends HTMLElement>({
  onOutside,
}: {
  onOutside: () => void;
}) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        onOutside();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return { ref };
};
