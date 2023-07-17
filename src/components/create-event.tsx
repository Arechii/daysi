"use client"

import { useState, useTransition } from "react"
import { PlusIcon } from "lucide-react"

import { createEventAction } from "~/app/_actions/event"

import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Input } from "./ui/input"

const CreateEvent = () => {
  const [isPending, startTransition] = useTransition()
  const [description, setDescription] = useState("")

  const create = () => {
    startTransition(async () => {
      await createEventAction(description)
      setDescription("")
    })
  }

  return (
    <Card>
      <CardContent className="flex items-center gap-4 pt-6 md:gap-8">
        <p className="w-12 text-center text-2xl font-bold text-rose-400 md:w-20 md:text-3xl lg:text-4xl">
          0
        </p>
        <div className="flex w-3/4 flex-col gap-2">
          <Input
            className="h-7"
            type="text"
            placeholder="description"
            minLength={3}
            maxLength={128}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                create()
              }
            }}
          />
          <p
            className="text-sm text-gray-500 dark:text-gray-400"
            suppressHydrationWarning
          >
            started on {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="ml-auto flex flex-col gap-2 md:flex-row">
          <Button
            variant="outline"
            size="icon"
            disabled={isPending}
            onClick={() => create()}
          >
            <PlusIcon />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default CreateEvent
