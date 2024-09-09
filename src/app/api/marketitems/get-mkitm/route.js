import dbConnect from '@utils/dbconnect'

import MarketGetItems from '@models/MarketGetItems'

import '@models/Group'

import '@models/Users'

import '@models/Category'

export async function GET(req, res) {
  await dbConnect()

  const marketitems = await MarketGetItems.find({})
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
    .sort({ date: -1 })
  //   console.log(group)

  return new Response(JSON.stringify({ message: 'Group created successfully', marketitems }), { status: 201 })
}
