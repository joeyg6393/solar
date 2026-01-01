import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, address, propertyType, electricBill, timeline, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !address || !propertyType || !electricBill || !timeline) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert into database
    const result = await sql`
      INSERT INTO contact_submissions (name, email, phone, address, property_type, electric_bill, timeline, message, created_at)
      VALUES (${name}, ${email}, ${phone}, ${address}, ${propertyType}, ${electricBill}, ${timeline}, ${message || ''}, NOW())
      RETURNING id, created_at;
    `;

    return NextResponse.json({
      success: true,
      id: result.rows[0].id,
      message: 'Form submitted successfully'
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Contact API endpoint' });
}
