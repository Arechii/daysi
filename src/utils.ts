import { clsx, type ClassValue } from "clsx"
import { customAlphabet } from "nanoid"
import { twMerge } from "tailwind-merge"

import { env } from "./env.mjs"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const createId = customAlphabet(
  "0123456789abcdefghijklmnopqrstuvwxyz",
  10,
)

export const imageUrl = (key: string) => `${env.R2_DOMAIN}/${key}`
