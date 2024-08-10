'use client';

import { useState, FormEvent } from 'react';
import { Trash2 } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { deleteEvent } from '@/actions';

type DeleteEventProps = {
  eventId: string;
};

export function DeleteEvent({ eventId }: DeleteEventProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messageFromServer, setMessageFromServer] = useState<
    string | undefined
  >();

  async function handleSubmit() {
    const response = await deleteEvent({ eventId });
    if (!response) {
      setIsOpen(false);
      return;
    }
    setMessageFromServer(response.message);
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Trash2 className='text-primary w-4 h-4' />
      </PopoverTrigger>
      <PopoverContent>
        <div>Are you sure you want to delete this event?</div>
        {messageFromServer && (
          <div>
            <span className='text-lg text-red-500 font-semibold'>
              {messageFromServer}
            </span>
          </div>
        )}
        <Button onClick={handleSubmit}>Yes I am sure</Button>
      </PopoverContent>
    </Popover>
  );
}
