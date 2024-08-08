import { formatDate } from 'date-fns';
import { AddEventForm } from '@/app/add-event/form';

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
    <>
      <h1 className='text-primary-foreground font-semibold text-xl'>
        Add event for {formatDate(new Date(Number(date)), 'dd MMM yyyy')}
      </h1>
      <AddEventForm date={date} />
    </>
  );
}
