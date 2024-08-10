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
  try {
    const updatedOrCreatedValues = {
      name: data.name,
      description: data.description,
      startDate: Number(data.startDate),
      endDate: Number(data.endDate),
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
