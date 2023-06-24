import { customAlphabet } from "nanoid";

export const createId = customAlphabet(
  "0123456789abcdefghijklmnopqrstuvwxyz",
  10
);
