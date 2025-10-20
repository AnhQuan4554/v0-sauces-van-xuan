'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';

const AdminPage = () => {
  const router = useRouter();

  const handleRedirect = (path: string) => {
    router.push(path);
  };

  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center">
      <Dialog open={true}>
        <DialogContent className="border-primary/20 mx-2 rounded-2xl border bg-white shadow-2xl sm:mx-auto sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-primary mb-2 text-xl font-bold">
              Select Management Section
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 flex flex-col gap-4">
            <Button
              className="soft-button bg-accent text-accent-foreground hover:bg-accent/80 flex items-center justify-between rounded-lg px-4 py-3 text-base font-semibold transition"
              onClick={() => handleRedirect('/admin/orders')}
            >
              <span>Order Management</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              className="soft-button bg-primary hover:bg-primary/80 flex items-center justify-between rounded-lg px-4 py-3 text-base font-semibold text-white transition"
              onClick={() => handleRedirect('/admin/products')}
            >
              <span>Product Management</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;
