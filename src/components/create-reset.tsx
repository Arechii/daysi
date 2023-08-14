"use client"

import { useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { insertResetSchema } from "~/db/schema"
import { Loader2Icon, TimerResetIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { createSignedUrl } from "~/app/_actions/image"
import { createReset } from "~/app/_actions/reset"

import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { toast } from "./ui/use-toast"

const schema = insertResetSchema.pick({ note: true }).extend({
  image: z
    .custom<FileList>()
    .optional()
    .refine((files?: FileList) => {
      if (!files?.[0]) return true
      return files[0].size <= 16 * 1024 * 1024
    }, "Max file size is 16MB.")
    .transform((files?: FileList) => files?.[0]),
})

const CreateReset = ({ eventId }: { eventId: string }) => {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const onSubmit = ({ image, ...values }: z.infer<typeof schema>) => {
    setOpen(false)
    startTransition(async () => {
      let imageId: string | null = null

      if (image) {
        const { type, size } = image
        const { signedUrl, id } = await createSignedUrl({
          type,
          size,
        })

        await fetch(signedUrl, {
          method: "PUT",
          body: image,
        })

        imageId = id
      }

      await createReset({ eventId, imageId, ...values })

      toast({
        description: "Your event has been reset.",
      })
    })
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" disabled={isPending}>
          {!isPending ? (
            <TimerResetIcon />
          ) : (
            <Loader2Icon className="animate-spin" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reset event</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-8"
          >
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      {...field}
                      value={field.value?.name}
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="self-end">
              Reset
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateReset
