import dbConnect from '../../../../../utils/dbconnect';
import Bill from '../../../../../models/Bills';

export async function DELETE(req, { params }) {
  await dbConnect();

  const { id } = params;

  if (!id) {
    return new Response(JSON.stringify({ message: 'ID is required' }), { status: 400 });
  }

  try {
    const bill = await Bill.findByIdAndDelete(id);

    if (!bill) {
      return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Item deleted successfully', bill }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
