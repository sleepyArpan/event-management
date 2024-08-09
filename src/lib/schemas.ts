import { z } from 'zod';

export const EventCreationSchema = z.object({
  eventName: z.string().trim().min(1, { message: 'Event name is required' }),
  description: z
    .string()
    .trim()
    .min(1, { message: 'Event description is required' }),
});

export type Event = {
  id: string;
  name: string;
  description: string | null;
  date: bigint;
};
