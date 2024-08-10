import { z } from 'zod';

export const EventCreationOrUpdateSchema = z.object({
  eventName: z.string().trim().min(1, { message: 'Event name is required' }),
  description: z
    .string()
    .trim()
    .min(1, { message: 'Event description is required' }),
});

export const EventDeletionSchema = z.object({
  eventId: z.string({
    required_error: 'Event Id is required to delete an event',
  }),
  date: z.string({ required_error: 'Date is required to delete an event' }),
});

export type Event = {
  id: string;
  name: string;
  description: string | null;
  date: bigint;
};
