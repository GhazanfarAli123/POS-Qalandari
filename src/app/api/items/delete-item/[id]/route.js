import dbConnect from '@utils/dbconnect'
import Item from '@models/Items'

export async function DELETE(req, { params }) {
  await dbConnect()

  const { id } = params

  if (!id) {
    return new Response(JSON.stringify({ message: 'ID is required' }), { status: 400 })
  }

  try {
    const items = await Item.findByIdAndDelete(id)

    if (!items) {
      return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 })
    }

    return new Response(JSON.stringify({ message: 'Item deleted successfully', items }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 })
  }
}
