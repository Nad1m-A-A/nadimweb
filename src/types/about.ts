import type { IconType } from "react-icons";

export type FocusItem = {
  Icon: IconType;
  title: string;
  body: string;
};

export type AboutItem = {
  id: string;
  question: string;
} & (
  | { kind: "list"; items: FocusItem[] }
  | { kind: "text"; body: string }
);
