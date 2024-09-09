import dbConnect from '@utils/dbconnect'

import Group from '@models/Group'

export async function GET(req, res) {
  await dbConnect()

  const group = await Group.find({})

  return new Response(JSON.stringify({ message: 'Group created successfully', group }), { status: 201 })
}
