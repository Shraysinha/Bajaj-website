import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, inquiry_type, bike_id } = body;

    // Validate required fields
    if (!name || !email || !phone || !inquiry_type) {
      return Response.json(
        { error: 'Name, email, phone, and inquiry type are required' },
        { status: 400 }
      );
    }

    // Insert inquiry into database
    const result = await sql(
      `INSERT INTO inquiries (name, email, phone, message, inquiry_type, bike_id) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [name, email, phone, message, inquiry_type, bike_id]
    );

    return Response.json({ 
      success: true, 
      inquiryId: result[0].id,
      message: 'Your inquiry has been submitted successfully. We will contact you soon!' 
    });
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return Response.json({ error: 'Failed to submit inquiry' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const inquiries = await sql(
      `SELECT i.*, b.name as bike_name 
       FROM inquiries i 
       LEFT JOIN bikes b ON i.bike_id = b.id 
       ORDER BY i.created_at DESC`
    );
    
    return Response.json({ inquiries });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return Response.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}