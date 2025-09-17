import sql from "@/app/api/utils/sql";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const bikes = await sql('SELECT * FROM bikes WHERE id = $1', [id]);
    
    if (bikes.length === 0) {
      return Response.json({ error: 'Bike not found' }, { status: 404 });
    }
    
    return Response.json({ bike: bikes[0] });
  } catch (error) {
    console.error('Error fetching bike:', error);
    return Response.json({ error: 'Failed to fetch bike' }, { status: 500 });
  }
}