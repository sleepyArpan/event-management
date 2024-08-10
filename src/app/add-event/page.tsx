import { AddOrEditEventForm } from '@/components/form';

type AddEventProps = {
  searchParams: { date?: string };
};

export default function AddEvent({ searchParams }: AddEventProps) {
  const date = searchParams.date;

  if (!date) {
    return (
      <div>
        <span className='text-red-600 font-semibold text-xl'>
          Please select a date from the calendar
        </span>
      </div>
    );
  }

  return (
    <div className='p-4 md:w-[500px]'>
      <h1 className='font-semibold text-xl'>Add event</h1>
      <AddOrEditEventForm date={date} />
    </div>
  );
}
