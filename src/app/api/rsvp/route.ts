import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, attending, message } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'data', 'rsvp.json');
    
    // Read existing data
    let data = [];
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      data = JSON.parse(fileContent);
    } catch (error) {
      // File might not exist yet, handled by mkdir in setup but just in case
    }

    // Add new response
    const newResponse = {
      id: Date.now().toString(),
      name,
      attending,
      message,
      timestamp: new Date().toISOString()
    };

    data.push(newResponse);

    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true, message: 'RSVP submitted successfully' });
  } catch (error) {
    console.error('RSVP Error:', error);
    return NextResponse.json({ error: 'Failed to submit RSVP' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'rsvp.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json([]);
  }
}
