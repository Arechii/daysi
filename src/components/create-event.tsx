"use client"

import { useEffect, useState, useTransition } from "react"
import { PlusIcon } from "lucide-react"

import { createEventAction } from "~/app/_actions/event"

import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Input } from "./ui/input"

const CreateEvent = () => {
  const [isPending, startTransition] = useTransition()
  const [description, setDescription] = useState("")
  // workaround for hydration issue between server & client locale
  const [startedOn, setStartedOn] = useState("")

  useEffect(() => setStartedOn(new Date().toLocaleDateString()), [])

  const create = () => {
    startTransition(() => createEventAction(description))
    setDescription("")
  }

  return (
    <Card>
      <CardContent className="flex flex-row items-center gap-8 pt-6">
        <p className="text-4xl font-bold text-rose-400">0</p>
        <div className="flex w-2/3 flex-col gap-2">
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
          <p className="text-sm text-gray-500 dark:text-gray-400">
            started on {startedOn}
          </p>
        </div>
        <Button
          className="ml-auto"
          variant="outline"
          size="icon"
          disabled={isPending}
          onClick={() => create()}
        >
          <PlusIcon />
        </Button>
      </CardContent>
    </Card>
  )
}

export default CreateEvent
