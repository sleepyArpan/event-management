import { Calendar } from '@/components/ui/calendar';
import prisma from '@/lib/prisma';
import { DayEvents } from '@/components/day-events';
import { AddDialog } from '@/components/add-dialog';

type HomeProps = {
  searchParams: { date?: string };
};

export default async function Home({ searchParams }: HomeProps) {
  const selectedDate = searchParams.date;

  async function renderEvents() {
    if (!selectedDate) {
      return (
        <span className='inline text-primary-foreground underline'>
          Select a date to see events on that day!
        </span>
      );
    }
    const events = await prisma.event.findMany({
      where: { date: Number(selectedDate) },
    });
    return <DayEvents eventsOfTheDay={events} />;
  }

  return (
    <main className='h-screen grid place-items-center bg-gray-200'>
      <div className='max-w-3xl h-[500px] flex flex-wrap'>
        <div className='bg-white w-full md:w-2/4'>
          <Calendar />
          {selectedDate && <AddDialog date={selectedDate} />}
        </div>
        <div className='bg-primary p-4 w-full md:w-2/4'>
          {await renderEvents()}
        </div>
      </div>
    </main>
  );
}
