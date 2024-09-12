import dbConnect from '@utils/dbconnect'
import MarketGetItems from '@models/MarketGetItems'
import '@models/Group'
import '@models/Users'
import '@models/Category'

export async function GET(req, res) {
  await dbConnect()

  const marketItems = await MarketGetItems.find({})
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

  const groupedItems = marketItems.reduce((acc, item) => {
    const groupName = item.group.name
    if (!acc[groupName]) {
      acc[groupName] = {
        group: item.group,
        totalPrice: 0,
        items: []
      }
    }

    acc[groupName].totalPrice += item.price
    acc[groupName].items.push(item)

    return acc
  }, {})

  const result = Object.keys(groupedItems).map(groupName => ({
    group: groupedItems[groupName].group,
    totalPrice: groupedItems[groupName].totalPrice,
    items: groupedItems[groupName].items
  }))

  return new Response(
    JSON.stringify({
      message: 'Market items grouped and calculated successfully',
      groups: result
    }),
    { status: 200 }
  )
}
