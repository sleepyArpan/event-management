type DayEventsProps = {
  eventsOfTheDay: {
    id: string;
    name: string;
    description: string | null;
    date: bigint;
  }[];
};

export default function DayEvents({ eventsOfTheDay }: DayEventsProps) {
  if (eventsOfTheDay.length === 0) {
    return (
      <span className='inline text-primary-foreground underline'>
        No Events found, create some if you want!
      </span>
    );
  }
  return eventsOfTheDay.map(event => (
    <p key={event.id} className='text-primary-foreground'>
      {event.name}
    </p>
  ));
}
