'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { EventCreationSchema } from '@/lib/schemas';

export async function createEvent(
  previousState: { status: string; date: string },
  data: FormData
) {
  const formData = Object.fromEntries(data);
  // get id into the scema
  const parsedFormData = EventCreationSchema.safeParse(formData);
  if (!parsedFormData.success) {
    return {
      message: 'Form submitted with invalid data',
      status: 'error',
      date: previousState.date,
    };
  }
  try {
    // figure out here if we want to create or edit
    await prisma.event.create({
      data: {
        date: Number(previousState.date),
        name: parsedFormData.data.eventName,
        description: parsedFormData.data.description,
      },
    });
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
