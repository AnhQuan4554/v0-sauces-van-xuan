'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from '@/i18n/navigation';

interface AdminModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AdminModal({ open, onOpenChange }: AdminModalProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (code === process.env.ADMIN_CODE) {
      router.push('/admin');
      onOpenChange(false);
      setCode('');
      setError('');
    } else {
      setError('Invalid code. Please try again.');
      setCode('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="mx-2 sm:mx-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">Admin Access</DialogTitle>
          <DialogDescription className="text-sm">
            Enter the admin code to access the admin panel.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code" className="text-sm">
              Admin Code
            </Label>
            <Input
              id="code"
              type="password"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError('');
              }}
              placeholder="Enter admin code"
              className="w-full cursor-text text-sm sm:text-base"
            />
            {error && <p className="text-destructive text-xs sm:text-sm">{error}</p>}
          </div>
          <div className="flex flex-col justify-end gap-2 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="soft-button cursor-pointer text-sm"
            >
              Cancel
            </Button>
            <Button type="submit" className="soft-button cursor-pointer text-sm">
              Access Admin
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
