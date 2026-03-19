
-- Documentation modules table
CREATE TABLE public.doc_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  full_description TEXT,
  icon_name TEXT NOT NULL DEFAULT 'Bot',
  module_type TEXT NOT NULL DEFAULT 'commands' CHECK (module_type IN ('commands', 'config')),
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Documentation entries (commands or config fields)
CREATE TABLE public.doc_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID REFERENCES public.doc_modules(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  usage TEXT,
  arguments JSONB DEFAULT '[]'::jsonb,
  is_premium BOOLEAN DEFAULT false,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.doc_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doc_entries ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Anyone can read doc_modules" ON public.doc_modules FOR SELECT USING (true);
CREATE POLICY "Anyone can read doc_entries" ON public.doc_entries FOR SELECT USING (true);

-- Admin write
CREATE POLICY "Admins can manage doc_modules" ON public.doc_modules FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage doc_entries" ON public.doc_entries FOR ALL USING (public.has_role(auth.uid(), 'admin'));
