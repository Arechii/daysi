"use client"

import { useTransition } from "react"
import { deleteEvent } from "app/_actions/event"
import { Loader2Icon, Trash2Icon } from "lucide-react"

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
import { Button, buttonVariants } from "./ui/button"
import { toast } from "./ui/use-toast"

const DeleteEvent = ({ eventId }: { eventId: string }) => {
  const [isPending, startTransition] = useTransition()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="text-destructive"
          variant="link"
          size="icon"
          disabled={isPending}
        >
          {!isPending ? (
            <Trash2Icon />
          ) : (
            <Loader2Icon className="animate-spin" />
          )}
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
            className={buttonVariants({ variant: "destructive" })}
            onClick={() => {
              startTransition(async () => {
                await deleteEvent(eventId)
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

export default DeleteEvent