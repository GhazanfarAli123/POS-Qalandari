import dbConnect from '@utils/dbconnect'
import Message from '@models/Messages'

export async function POST(req, res) {
  await dbConnect()

  const { message, users } = await req.json()

  if (!message) {
    return new Response(JSON.stringify({ message: 'message is required' }), { status: 400 })
  }

  const msg = new Message({ message, users })
  await msg.save()

  return new Response(JSON.stringify({ message: 'Category created successfully', msg }), { status: 201 })
}
