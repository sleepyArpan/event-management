import Link from 'next/link';
import { formatDate } from 'date-fns';
import { EventsList } from '@/components/events';
import { Modal } from '@/app/@modal/(.)date/[date]/modal';
import {
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { buttonVariants } from '@/components/ui/button';

type DateEventsListModalProps = {
  params: { date?: string };
};

export default function DateEventsListModal({
  params,
}: DateEventsListModalProps) {
  return (
    <Modal>
      <DialogTitle>
        Events for the day{' '}
        {formatDate(
          new Date(params.date ? Number(params.date) : ''),
          'dd MMM yyyy'
        )}
      </DialogTitle>
      <DialogDescription>List of events for the day</DialogDescription>
      <EventsList date={params.date} />
      <DialogFooter>
        <Link
          className={buttonVariants({ variant: 'default' })}
          href={`/add-event/?date=${params.date}`}>
          Add Event
        </Link>
      </DialogFooter>
    </Modal>
  );
}
