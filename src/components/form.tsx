'use client';

import { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { EventCreationOrUpdateSchema, Event } from '@/lib/schemas';
import { createOrEditEvent } from '@/actions';

type AddOrEditEventFormProps = {
  event?: Event;
};

export function AddOrEditEventForm({ event }: AddOrEditEventFormProps) {
  const [messageFromServer, setMessageFromServer] = useState<string>();
  const form = useForm<z.infer<typeof EventCreationOrUpdateSchema>>({
    resolver: zodResolver(EventCreationOrUpdateSchema),
    defaultValues: {
      description: event?.description ?? '',
      name: event?.name ?? '',
      endDate: event?.endDate ? new Date(Number(event.endDate)) : undefined,
      startDate: event?.startDate
        ? new Date(Number(event.startDate))
        : undefined,
    },
  });

  async function handleFormSubmit(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    const values = form.getValues();
    const response = await createOrEditEvent(
      {
        name: values.name,
        description: values.description,
        endDate: values.endDate.valueOf(),
        startDate: values.startDate.valueOf(),
      },
      event?.id
    );
    if (response?.message) {
      setMessageFromServer(response.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleFormSubmit}>
        <div className='grid gap-4 py-4'>
          {messageFromServer && (
            <span className='text-lg text-red-500 font-semibold'>
              {messageFromServer}
            </span>
          )}
          <div className='flex gap-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Event Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Doctors Appointment'
                      className='col-span-3'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex gap-4'>
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Event Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Visit the doctor for checkup'
                      className='col-span-3'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex gap-4'>
            <FormField
              control={form.control}
              name='startDate'
              render={({ field }) => {
                return (
                  <FormItem className='w-full flex flex-col'>
                    <FormLabel>Event From</FormLabel>
                    <FormControl>
                      <DatePicker
                        date={field.value}
                        onChangeDate={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <div className='flex gap-4'>
            <FormField
              control={form.control}
              name='endDate'
              render={({ field }) => {
                return (
                  <FormItem className='w-full flex flex-col'>
                    <FormLabel>Event To</FormLabel>
                    <FormControl>
                      <DatePicker
                        date={field.value}
                        onChangeDate={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
        </div>
        <Button type='submit'>{event ? 'Edit Event' : 'Add Event'}</Button>
      </form>
    </Form>
  );
}
