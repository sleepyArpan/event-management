import { EventsList } from '@/components/events';
import { Modal } from '@/app/@modal/(.)[date]/modal';

type DateEventsListModalProps = {
  params: { date?: string };
};

export default function DateEventsListModal({
  params,
}: DateEventsListModalProps) {
  return (
    <Modal>
      <EventsList date={params.date} />
    </Modal>
  );
}
