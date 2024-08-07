import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatDate } from 'date-fns';

type AddDialogProps = {
  date: string;
};

export function AddDialog({ date }: AddDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='default'>Add Event</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>
            Add Event for {formatDate(new Date(Number(date)), 'dd MMM yyyy')}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='eventName' className='text-right'>
              Event Name
            </Label>
            <Input
              id='eventName'
              defaultValue='Doctors Appointment'
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='descripton' className='text-right'>
              Description
            </Label>
            <Input
              id='description'
              defaultValue='Visit the doctor for checkup'
              className='col-span-3'
            />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit'>Add Event</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
