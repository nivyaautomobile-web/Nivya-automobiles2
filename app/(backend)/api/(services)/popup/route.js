import { ConnectDB } from '@/lib/config/db';
import Popup from '@/lib/models/popup';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await ConnectDB();
    const {  number } = await req.json();

    if ( !number ) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    const newEntry = await Popup.create({ number });

    return NextResponse.json(
      { success: true, data: newEntry },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await ConnectDB();
    const popups = await Popup.find().sort({ createdAt: -1 });
    return NextResponse.json(
      { success: true, data: popups },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
