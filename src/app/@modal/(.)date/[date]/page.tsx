import Link from 'next/link';
import { EventsList } from '@/components/events';
import { Modal } from '@/app/@modal/(.)date/[date]/modal';
import {
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { buttonVariants } from '@/components/ui/button';
import { formatDateInCalendarFormat } from '@/lib/utils';

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
        {params.date ? formatDateInCalendarFormat(Number(params.date)) : null}
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
