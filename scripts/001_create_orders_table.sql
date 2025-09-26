-- Create orders table to store completed orders
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'Vietnam',
  address TEXT NOT NULL,
  location TEXT NOT NULL,
  delivery_type TEXT NOT NULL DEFAULT 'delivery',
  cart_items JSONB NOT NULL,
  total_amount DECIMAL(10,2),
  order_status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on created_at for better query performance
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

-- Create an index on order_status for filtering
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(order_status);

-- Enable Row Level Security (RLS) for security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policies for orders table
-- For now, allow all operations since we don't have user authentication
-- In a production app with auth, you'd restrict these policies
CREATE POLICY "Allow all operations on orders" ON public.orders
  FOR ALL USING (true) WITH CHECK (true);
