import { Calendar } from '@/components/ui/calendar';

export default function Home() {
  return (
    <main className='h-screen grid place-items-center bg-gray-200'>
      <div className='max-w-3xl h-[500px] flex'>
        <div className='bg-white'>
          <Calendar />
        </div>
        <div className='bg-primary w-2/4'>
          <span className='text-white'>hello world</span>
        </div>
      </div>
    </main>
  );
}
