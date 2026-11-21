import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const ALLOWED: Record<string, string> = {
  'image/png': 'png', 'image/jpeg': 'jpg', 'image/gif': 'gif', 'image/webp': 'webp',
};
const MAX = 5 * 1024 * 1024;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  try {
    const form = await req.formData();
    const file = form.get('file');
    if (!(file instanceof File)) return json({ error: 'Файл не надано' }, 400);
    const ext = ALLOWED[file.type];
    if (!ext) return json({ error: 'Дозволені лише PNG, JPG, GIF, WEBP' }, 400);
    if (file.size === 0 || file.size > MAX) return json({ error: 'Максимальний розмір файлу — 5 МБ' }, 400);

    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from('embed-images').upload(path, file, { contentType: file.type, upsert: false });
    if (error) { console.error(error); return json({ error: 'Не вдалося завантажити зображення' }, 500); }
    const { data } = supabase.storage.from('embed-images').getPublicUrl(path);
    return json({ url: data.publicUrl });
  } catch (e) {
    console.error(e);
    return json({ error: 'Не вдалося завантажити зображення' }, 500);
  }
});
