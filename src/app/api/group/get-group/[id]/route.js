import dbConnect from '../../../../../utils/dbconnect';
import Group from '../../../../../models/Group';

export async function GET(req, { params }) {
  await dbConnect();

  const { id } = params;

  if (!id) {
    return new Response(JSON.stringify({ message: 'ID is required' }), { status: 400 });
  }

  try {
    const group = await Group.findById(id);

    if (!group) {
      return new Response(JSON.stringify({ message: 'Group not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Group fetched successfully', group }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
