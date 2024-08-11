'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import {
  EventCreationOrUpdateSchema,
  EventDeletionSchema,
  Event,
} from '@/lib/schemas';

export async function createOrEditEvent(
  data: Omit<Event, 'id'>,
  eventId?: string
) {
  const parsedData = EventCreationOrUpdateSchema.safeParse(data);
  if (!parsedData.success) {
    return {
      message: 'Form submitted with invalid data',
    };
  }
  try {
    const updatedOrCreatedValues = {
      name: data.name,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
    };
    if (eventId) {
      await prisma.event.update({
        where: { id: eventId },
        data: updatedOrCreatedValues,
      });
    } else {
      await prisma.event.create({
        data: updatedOrCreatedValues,
      });
    }
  } catch (error) {
    return {
      message: 'Some error occured please try again',
    };
  }
  revalidatePath('/', 'layout');
  redirect('/');
}

export async function deleteEvent({ eventId }: { eventId: string }) {
  const parsedFormData = EventDeletionSchema.safeParse({ eventId });

  if (!parsedFormData.success) {
    return {
      message: 'Some error occurred, please try again',
    };
  }
  try {
    await prisma.event.delete({ where: { id: parsedFormData.data.eventId } });
  } catch {
    return {
      message: 'Some error occurred, please try again',
    };
  }
  revalidatePath('/', 'layout');
}
