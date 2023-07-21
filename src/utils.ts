import { clsx, type ClassValue } from "clsx"
import { customAlphabet } from "nanoid"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const createId = customAlphabet(
  "0123456789abcdefghijklmnopqrstuvwxyz",
  10,
)
