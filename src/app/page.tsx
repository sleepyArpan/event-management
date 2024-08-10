import prisma from '@/lib/prisma';
import { Calendar } from '@/components/ui/calendar';

export default async function Home() {
  const events = await prisma.event.findMany();

  return <Calendar events={events} />;
}
