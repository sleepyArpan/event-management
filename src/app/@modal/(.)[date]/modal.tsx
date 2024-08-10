'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent } from '@/components/ui/dialog';

// add modal header and possibly footer here too
export function Modal({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
