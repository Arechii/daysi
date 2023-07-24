"use client"

import { useTransition } from "react"
import Link from "next/link"
import { Trash2Icon } from "lucide-react"

import { deleteEvent, type GetEvents } from "~/app/_actions/event"

import CreateReset from "./create-reset"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Separator } from "./ui/separator"
import { toast } from "./ui/use-toast"

const EventCard = ({
  id,
  description,
  startedAt,
  daysSince,
  lastReset,
}: GetEvents[number]) => {
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
                <span>last reset on {lastReset.toLocaleDateString()}</span>
              </>
            )}
          </div>
        </div>
        <div className="ml-auto flex flex-col gap-2 md:flex-row">
          <CreateReset eventId={id} />
          <DeleteEvent id={id} />
        </div>
      </CardContent>
    </Card>
  )
}

const DeleteEvent = ({ id }: { id: string }) => {
  const [, startTransition] = useTransition()

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="destructive" size="icon">
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this event?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
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
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default EventCard
