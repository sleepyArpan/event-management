'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import {
  EventCreationOrUpdateSchema,
  EventDeletionSchema,
} from '@/lib/schemas';

export async function createOrEditEvent(
  previousState: { status: string; date: string; eventId?: string },
  data: FormData
) {
  const formData = Object.fromEntries(data);
  const parsedFormData = EventCreationOrUpdateSchema.safeParse(formData);
  if (!parsedFormData.success) {
    return {
      message: 'Form submitted with invalid data',
      status: 'error',
      date: previousState.date,
    };
  }
  try {
    const updatedOrCreatedValues = {
      date: Number(previousState.date),
      name: parsedFormData.data.eventName,
      description: parsedFormData.data.description,
    };
    if (previousState.eventId) {
      await prisma.event.update({
        where: { id: previousState.eventId },
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
      status: 'error',
      date: previousState.date,
    };
  }
  revalidatePath('/', 'layout');
  redirect('/');
}

export async function deleteEvent({
  eventId,
  date,
}: {
  eventId: string;
  date: string;
}) {
  const parsedFormData = EventDeletionSchema.safeParse({ eventId, date });

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
