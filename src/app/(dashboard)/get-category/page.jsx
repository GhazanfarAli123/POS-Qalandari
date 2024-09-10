'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

import Cards from '../../../components/Cards'

import { Box, ThemeProvider, Avatar, CircularProgress } from '@mui/material'

export default function Page() {
  const [category, setCategory] = useState([])

  const categoryData = async () => {
    try {
      const res = await fetch('/api/category/get-categories', { cache: 'no-store', next: { revalidate: 0 } })
      const data = await res.json()
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
