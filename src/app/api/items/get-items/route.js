import dbConnect from '@utils/dbconnect'
import Items from '@models/Items'
import '@models/Group'
import '@models/Users'
import '@models/Category'

export async function GET(req, res) {
  await dbConnect()

  const marketitems = await Items.find({})
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

  return new Response(JSON.stringify({ message: 'Get Items Successfully', marketitems }), { status: 201 })
}
