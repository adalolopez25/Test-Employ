import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const POST = async (req: NextRequest) => {
  try {
    const session = req.cookies.get('session')?.value;
    if (!session) return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });

    const { data: userData } = await supabase.auth.getUser(session);
    if (!userData.user) return NextResponse.json({ message: 'User not found' }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get('avatar') as File;

    if (!file) return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });

    // 🔹 Subir a bucket avatars
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(`${userData.user.id}-${file.name}`, file, { upsert: true });

    if (error) return NextResponse.json({ message: error.message }, { status: 400 });

    const publicUrl = supabase.storage.from('avatars').getPublicUrl(data.path).data.publicUrl;

    // 🔹 Actualizar columna avatar en profiles
    await supabase.from('profiles').update({ avatar: publicUrl }).eq('id', userData.user.id);

    return NextResponse.json({ message: 'Avatar uploaded', avatarUrl: publicUrl });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Error uploading avatar' }, { status: 500 });
  }
};
