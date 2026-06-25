
DROP POLICY IF EXISTS "Anyone can upload embed images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view embed images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update embed images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete embed images" ON storage.objects;

CREATE POLICY "Anyone can upload embed images"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'embed-images');

CREATE POLICY "Anyone can view embed images"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'embed-images');

CREATE POLICY "Anyone can update embed images"
ON storage.objects FOR UPDATE
TO anon, authenticated
USING (bucket_id = 'embed-images');

CREATE POLICY "Anyone can delete embed images"
ON storage.objects FOR DELETE
TO anon, authenticated
USING (bucket_id = 'embed-images');
