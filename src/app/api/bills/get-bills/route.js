import dbConnect from '../../../../utils/dbconnect';
import Bills from '../../../../models/Bills';
import '../../../../models/Group'
import '../../../../models/Users'
import '../../../../models/Items'
// import Bill from '../../../../models/Bills';

export async function GET(req, res) {
  await dbConnect();

  const bill = await Bills.find({})
  .populate({
    path: 'items',
    select: 'name slug',
  })
  .populate({
    path: 'group',
    select: 'name slug',
  })
  .populate({
    path: 'user',
    select: 'name slug',
  })


  return new Response(JSON.stringify({ message: 'Group created successfully', bill }), { status: 201 });
}
 