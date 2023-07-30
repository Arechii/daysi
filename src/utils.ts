import { clsx, type ClassValue } from "clsx"
import { customAlphabet } from "nanoid"
import { twMerge } from "tailwind-merge"

import { type Image } from "./db/schema"
import { env } from "./env.mjs"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const createId = customAlphabet(
  "0123456789abcdefghijklmnopqrstuvwxyz",
  10,
)

export const imageUrl = (image: Pick<Image, "id" | "type">) =>
  `${env.R2_DOMAIN}/${image.id}.${image.type.split("/")[1]}`
