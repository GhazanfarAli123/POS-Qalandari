import dbConnect from '../../../../../utils/dbconnect';
import User from '../../../../../models/Users';

export async function DELETE(req, { params }) {
  await dbConnect();

  const { id } = params;

  if (!id) {
    return new Response(JSON.stringify({ message: 'ID is required' }), { status: 400 });
  }

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return new Response(JSON.stringify({ message: 'user not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'user deleted successfully', user }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
