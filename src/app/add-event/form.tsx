'use client';

import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
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
import { EventCreationSchema } from '@/lib/schemas';
import { createEvent } from '@/actions';

type AddEventForm = {
  date: string;
};

export function AddEventForm({ date }: AddEventForm) {
  const router = useRouter();
  const [formState, formAction] = useFormState(createEvent, {
    status: 'idle',
    date,
    message: '',
  });
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<z.infer<typeof EventCreationSchema>>({
    resolver: zodResolver(EventCreationSchema),
    defaultValues: {
      description: '',
      eventName: '',
    },
  });
  const isSuccess = formState.status === 'success';
  const isFailure = formState.status === 'error';

  useEffect(() => {
    if (isSuccess) {
      router.push(`/?date=${date}`);
    }
  }, [date, isSuccess, router]);

  return (
    <Form {...form}>
      <form
        ref={formRef}
        // action comes into play when js hasnt loaded, after that react hook form
        // takes over for validation and submission, for which we use onSubmit
        action={formAction}
        // rather than calling the action ourselves in a custom function, we want to
        // leverage the default form behaviour i.e. calling the action. Hence we are
        // doing this
        onSubmit={evt => {
          evt.preventDefault();
          form.handleSubmit(() => {
            formAction(new FormData(formRef.current!));
          })(evt);
        }}>
        <div className='grid gap-4 py-4'>
          {isFailure && (
            <span className='text-lg text-red-500 font-semibold'>
              {formState.message}
            </span>
          )}
          <div className='flex gap-4'>
            <FormField
              control={form.control}
              name='eventName'
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
        </div>
        <Button type='submit'>Add Event</Button>
      </form>
    </Form>
  );
}
