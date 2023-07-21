"use client"

import { useTransition } from "react"
import Link from "next/link"
import { type Event } from "~/db/schema"
import { TimerResetIcon, Trash2Icon } from "lucide-react"

import { deleteEvent } from "~/app/_actions/event"
import { createReset } from "~/app/_actions/reset"

import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Separator } from "./ui/separator"
import { toast } from "./ui/use-toast"

const EventCard = ({ id, description, startedAt, resets }: Event) => {
  const [isPending, startTransition] = useTransition()

  const lastReset = resets[0]

  const daysSince = Math.floor(
    Math.abs(
      (lastReset?.createdAt ?? startedAt).getTime() - new Date().getTime(),
    ) /
      (1000 * 3600 * 24),
  )

  const reset = () => {
    startTransition(async () => {
      await createReset({ eventId: id })
      toast({
        description: "Your event has been reset.",
      })
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
          <Link
            href={`/event/${id}`}
            className="break-all text-sm md:text-base lg:text-lg"
          >
            {description}
          </Link>
          <div
            className="flex h-5 items-center space-x-4 text-sm text-gray-500 dark:text-gray-400"
            suppressHydrationWarning
          >
            <span>started on {startedAt.toLocaleDateString()}</span>
            {lastReset && (
              <>
                <Separator orientation="vertical" />
                <span>
                  last reset on {lastReset.createdAt?.toLocaleDateString()}
                </span>
              </>
            )}
          </div>
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
          <DeleteEvent id={id} />
        </div>
      </CardContent>
    </Card>
  )
}

const DeleteEvent = ({ id }: { id: string }) => {
  const [isPending, startTransition] = useTransition()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash2Icon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this event?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            variant="destructive"
            disabled={isPending}
            onClick={() => {
              startTransition(async () => {
                await deleteEvent(id)
                toast({
                  description: "Your event has been deleted.",
                  variant: "destructive",
                })
              })
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EventCard
