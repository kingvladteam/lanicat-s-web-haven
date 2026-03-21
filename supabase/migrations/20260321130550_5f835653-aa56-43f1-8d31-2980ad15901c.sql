
-- Create storage bucket for embed images
INSERT INTO storage.buckets (id, name, public)
VALUES ('embed-images', 'embed-images', true);

-- Allow anyone to upload images (public embed builder)
CREATE POLICY "Anyone can upload embed images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'embed-images');

-- Allow anyone to read embed images
CREATE POLICY "Anyone can read embed images"
ON storage.objects FOR SELECT
USING (bucket_id = 'embed-images');
