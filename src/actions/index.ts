'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { EventCreationSchema } from '@/lib/schemas';

export async function createOrEditEvent(
  previousState: { status: string; date: string; eventId?: string },
  data: FormData
) {
  const formData = Object.fromEntries(data);
  const parsedFormData = EventCreationSchema.safeParse(formData);
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
  revalidatePath('/');
  redirect(`/?date=${previousState.date}`);
}
