'use server';

import prisma from '@/lib/prisma';
import { EventCreationSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';

export async function createEvent(
  previousState: { status: string; date: string },
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
  await prisma.event.create({
    data: {
      date: Number(previousState.date),
      name: parsedFormData.data.eventName,
      description: parsedFormData.data.description,
    },
  });
  revalidatePath('/');
  return {
    message: 'Event created successfully!',
    status: 'success',
    date: previousState.date,
  };
}
