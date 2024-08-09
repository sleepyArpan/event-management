import prisma from '@/lib/prisma';
import { Calendar } from '@/components/ui/calendar';

export default async function Home() {
  const events = await prisma.event.findMany();

  return (
    <main className='h-screen bg-gray-200'>
      <div className='bg-white'>
        <Calendar events={events} />
      </div>
    </main>
  );
}
