import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const testimonials = await sql(`
      SELECT t.*, b.name as bike_name 
      FROM testimonials t 
      LEFT JOIN bikes b ON t.bike_id = b.id 
      ORDER BY t.created_at DESC
    `);
    
    return Response.json({ testimonials });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return Response.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { customer_name, rating, review_text, bike_id } = body;

    // Validate required fields
    if (!customer_name || !rating || !review_text) {
      return Response.json(
        { error: 'Customer name, rating, and review are required' },
        { status: 400 }
      );
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return Response.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    const result = await sql(
      `INSERT INTO testimonials (customer_name, rating, review_text, bike_id) 
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [customer_name, rating, review_text, bike_id]
    );

    return Response.json({ 
      success: true, 
      testimonialId: result[0].id,
      message: 'Thank you for your review!' 
    });
  } catch (error) {
    console.error('Error submitting testimonial:', error);
    return Response.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}