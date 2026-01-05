import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Check if Supabase is configured
    if (!supabase) {
      console.error('Supabase not configured - missing environment variables');
      return NextResponse.json(
        { error: 'Database not configured. Please set up Supabase environment variables.' },
        { status: 503 }
      );
    }

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
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name,
          email,
          phone,
          address,
          property_type: propertyType,
          electric_bill: electricBill,
          timeline,
          message: message || ''
        }
      ])
      .select('id, created_at')
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to submit form. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: data.id,
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
