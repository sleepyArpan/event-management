import { z } from 'zod';

export const EventCreationOrUpdateSchema = z
  .object({
    name: z.string().trim().min(1, { message: 'Event name is required' }),
    description: z
      .string()
      .trim()
      .min(1, { message: 'Event description is required' }),
    startDate: z.date({ required_error: 'Start Date is required' }),
    endDate: z.date({ required_error: 'End Date is required' }),
  })
  .refine(data => data.startDate <= data.endDate, {
    message: 'End date cannot be before start date',
    path: ['endDate'],
  });

export const EventDeletionSchema = z.object({
  eventId: z.string({
    required_error: 'Event Id is required to delete an event',
  }),
});

export type Event = {
  id: string;
  name: string;
  description: string | null;
  startDate: number;
  endDate: number;
};
