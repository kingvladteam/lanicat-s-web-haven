
-- 1) Private schema for SECURITY DEFINER helpers used by RLS
CREATE SCHEMA IF NOT EXISTS private;
GRANT USAGE ON SCHEMA private TO authenticated, anon;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, anon;

-- 2) Recreate policies that referenced public.has_role to use private.has_role
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage doc_entries" ON public.doc_entries;
DROP POLICY IF EXISTS "Admins can manage doc_modules" ON public.doc_modules;

CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (private.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (private.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL USING (private.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT USING (private.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage doc_entries" ON public.doc_entries
  FOR ALL USING (private.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage doc_modules" ON public.doc_modules
  FOR ALL USING (private.has_role(auth.uid(), 'admin'::app_role));

-- 3) Revoke EXECUTE on public SECURITY DEFINER functions from anon/authenticated/PUBLIC.
-- Trigger functions still execute via triggers (which run as table owner / definer).
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.is_admin_by_discord_id(text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- 4) Storage: tighten policies on embed-images bucket
DROP POLICY IF EXISTS "Anyone can upload embed images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can read embed images" ON storage.objects;

-- Only authenticated users can upload, and only into their own folder (path prefix = user id)
CREATE POLICY "Authenticated users can upload to own folder in embed-images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'embed-images'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update own files in embed-images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (
    bucket_id = 'embed-images'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own files in embed-images"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'embed-images'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- No broad SELECT policy: public bucket still serves files via public URLs,
-- but listing the bucket contents through the API is no longer possible.
