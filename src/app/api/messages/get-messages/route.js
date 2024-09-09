// app/api/users/route.js
import dbConnect from '../../../../utils/dbconnect';
import '../../../../models/Users';
import Message from '../../../../models/Messages';

export async function GET(req, res) {
  await dbConnect();

  try {
    const messg = await Message.find({})
    .populate({
        path: 'users',
        select: 'name email',
      });
      

    return new Response(JSON.stringify({ message: 'Get Messages successfully', messg }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
