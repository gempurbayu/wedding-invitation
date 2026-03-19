import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Helper to generate slug from name
const generateSlug = (name: string) => {
  return encodeURIComponent(name.trim());
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from('invitations')
      .select('*', { count: 'exact' });

    if (search) {
      query = query.ilike('name', `%${search}%`);
    }

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;

    return NextResponse.json({
      data: data || [],
      count: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
      currentPage: page
    });
  } catch (error) {
    console.error('Fetch Invitations Error:', error);
    return NextResponse.json({ error: 'Failed to fetch invitations' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, whatsapp } = await request.json();
    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

    const slug = generateSlug(name);
    const { data, error } = await supabase
      .from('invitations')
      .insert([{ name, whatsapp, slug }])
      .select();

    if (error) throw error;
    return NextResponse.json({ success: true, data: data[0] });
  } catch (error) {
    console.error('Create Invitation Error:', error);
    return NextResponse.json({ error: 'Failed to create invitation' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const { error } = await supabase
      .from('invitations')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete Invitation Error:', error);
    return NextResponse.json({ error: 'Failed to delete invitation' }, { status: 500 });
  }
}
