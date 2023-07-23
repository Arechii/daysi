import { getEvent } from "~/app/_actions/event"

export const runtime = "edge"

export default async function Event({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug)

  return <div>{event.description}</div>
}
