import dbConnect from '../../../../../utils/dbconnect'
import MarketGetItems from '../../../../../models/MarketGetItems'
import '../../../../../models/Group'
import '../../../../../models/Users'
import '../../../../../models/Category'

export async function GET(req, res) {
  await dbConnect()

  const url = new URL(req.url)
  const id = url.pathname.split('/').pop()

  const marketitems = await MarketGetItems.find({ _id: id })
    .populate({
      path: 'group',
      select: 'name slug'
    })
    .populate({
      path: 'user',
      select: 'name slug'
    })
    .populate({
      path: 'category',
      select: 'name slug'
    })
    .sort({ time: -1 })

  return new Response(JSON.stringify({ message: 'Group created successfully', marketitems }), { status: 201 })
}
