'use client'

import * as React from 'react'
import { Box, ThemeProvider, Avatar, CircularProgress } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Cards from '../../../components/Cards'

export default function Page() {
  const [category, setCategory] = useState([])

  const categoryData = async () => {
    try {
      const { data } = await axios.get('/api/category/get-categories')
      setCategory(data.category)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    categoryData()
  }, [])

  return (
    <>
      <div className='category-items'>
        {category.map(e => (
          <div>
            {e.name}
            <a href={`/update-category/${e._id}`}>Edit</a>
          </div>
        ))}
      </div>
    </>
  )
}
