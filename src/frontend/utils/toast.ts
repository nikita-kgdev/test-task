import { toast } from "react-toastify";

export const info = (message: string) => {
  toast(message, { autoClose: 300, theme: "dark" });
};
