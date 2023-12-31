import { type Image } from "@prisma/client"
import { clsx, type ClassValue } from "clsx"
import { customAlphabet } from "nanoid"
import { twMerge } from "tailwind-merge"

import { env } from "../env.js"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const createId = customAlphabet(
  "0123456789abcdefghijklmnopqrstuvwxyz",
  10,
)

export const imageUrl = (image: Pick<Image, "id" | "type">) =>
  `${env.R2_DOMAIN}/${image.id}.${image.type.split("/")[1]}`

export const formatDate = (date?: Date | null) => {
  if (!date) return "unknown"

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export const getRelativeTime = (date?: Date | null) => {
  if (!date) return "unknown"

  const daysDifference = Math.round(
    (date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  )

  return new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  }).format(daysDifference, "day")
}
