import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, attending, message } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('rsvp')
      .insert([
        { name, attending, message }
      ])
      .select();

    if (error) {
      console.error('Supabase Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'RSVP submitted successfully', data });
  } catch (error) {
    console.error('RSVP Error:', error);
    return NextResponse.json({ error: 'Failed to submit RSVP' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from('rsvp')
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
    console.error('Fetch RSVP Error:', error);
    return NextResponse.json({
      data: [],
      count: 0,
      totalPages: 0,
      currentPage: 1
    });
  }
}
