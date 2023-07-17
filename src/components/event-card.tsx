"use client"

import { useTransition } from "react"
import { type Event } from "~/db/schema"
import { TimerResetIcon, Trash2Icon } from "lucide-react"

import { deleteEventAction, resetEventAction } from "~/app/_actions/event"

import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { toast } from "./ui/use-toast"

const EventCard = ({ id, description, startedAt, resetAt }: Event) => {
  const [isPending, startTransition] = useTransition()

  const daysSince = Math.floor(
    Math.abs(resetAt.getTime() - new Date().getTime()) / (1000 * 3600 * 24),
  )

  const reset = () => {
    startTransition(async () => {
      await resetEventAction(id)
      toast({
        description: "Your event has been reset.",
      })
    })
  }

  const remove = () => {
    startTransition(() => deleteEventAction(id))
    toast({
      description: "Your event has been deleted.",
      variant: "destructive",
    })
  }

  return (
    <Card>
      <CardContent className="flex items-center gap-4 pt-6 md:gap-8">
        <p
          className="w-12 text-center text-2xl font-bold text-rose-400 md:w-20 md:text-3xl lg:text-4xl"
          suppressHydrationWarning
        >
          {daysSince}
        </p>
        <div className="flex w-3/4 flex-col">
          <p className="break-all text-sm md:text-base lg:text-lg">
            {description}
          </p>
          <p
            className="text-sm text-gray-500 dark:text-gray-400"
            suppressHydrationWarning
          >
            started on {startedAt.toLocaleDateString()}
          </p>
        </div>
        <div className="ml-auto flex flex-col gap-2 md:flex-row">
          <Button
            variant="outline"
            size="icon"
            disabled={isPending}
            onClick={() => reset()}
          >
            <TimerResetIcon />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            disabled={isPending}
            onClick={() => remove()}
          >
            <Trash2Icon />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default EventCard
