// utils/orderStatus.ts
export function getStatusColorClass(status: string): string {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
    case 'processing':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    case 'completed':
      return 'bg-green-100 text-green-800 hover:bg-green-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 hover:bg-red-200';
    default:
      return '';
  }
}
