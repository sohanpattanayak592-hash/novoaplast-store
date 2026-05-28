-- Migration script for NOVOPLAST Supabase Database

-- 1. Ensure the customer column is JSONB to store nested address data
-- If the column doesn't exist, this will add it.
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='orders' AND column_name='customer') THEN
    ALTER TABLE orders ADD COLUMN customer JSONB;
  END IF;
END $$;

-- 2. Add the promo_code column to store any applied discounts
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='orders' AND column_name='promo_code') THEN
    ALTER TABLE orders ADD COLUMN promo_code TEXT;
  END IF;
END $$;
