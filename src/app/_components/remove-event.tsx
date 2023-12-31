"use client"

import { useTransition } from "react"
import { api } from "~/trpc/react"
import { Loader2Icon, Trash2Icon } from "lucide-react"

import { revalidate } from "../_actions/utils"
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

const RemoveEvent = ({ eventId }: { eventId: string }) => {
  const [isPending, startTransition] = useTransition()

  const { mutateAsync: removeEvent } = api.event.remove.useMutation()

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
                await removeEvent(eventId)
                toast({
                  description: "Your event has been deleted.",
                  variant: "destructive",
                })
                revalidate("/dashboard")
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

export default RemoveEvent
