import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let query = 'SELECT * FROM bikes ORDER BY created_at DESC';
    let params = [];
    
    if (category) {
      query = 'SELECT * FROM bikes WHERE category = $1 ORDER BY created_at DESC';
      params = [category];
    }
    
    const bikes = await sql(query, params);
    
    return Response.json({ bikes });
  } catch (error) {
    console.error('Error fetching bikes:', error);
    return Response.json({ error: 'Failed to fetch bikes' }, { status: 500 });
  }
}