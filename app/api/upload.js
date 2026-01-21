import { createClient } from '@supabase/supabase-js';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: '파일 파싱 오류' });
    }

    const file = files.file[0];
    const fileBuffer = fs.readFileSync(file.filepath);
    const fileName = `${Date.now()}-${file.originalFilename}`;

    try {
      const { data, error } = await supabase.storage
        .from('uploads') // 버킷 이름
        .upload(fileName, fileBuffer, {
          contentType: file.mimetype,
        });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('uploads')
        .getPublicUrl(fileName);

      res.status(200).json({
        message: '업로드 성공',
        url: urlData.publicUrl,
        path: data.path,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}