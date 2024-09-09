'use client'

// External package imports
import * as React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

// MUI component imports
import { Box, ThemeProvider, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

export default function Page() {
  const [category, setCategory] = useState('')

  const handleChange = event => {
    setCategory(event.target.value)
  }

  const createCategory = async e => {
    e.preventDefault()
    try {
      const categoryData = { name: category }

      const { data } = await axios.post('/api/category/new-category', categoryData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      alert('Category created successfully!')
      setCategory('')
    } catch (e) {
      console.error('Error creating category:', e)
    }
  }

  return (
    <ThemeProvider
      theme={{
        palette: {
          primary: {
            main: '#37335e',
            dark: '#25293c'
          }
        }
      }}
    >
      <Box
        component='form'
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete='off'
        onSubmit={createCategory}
      >
        <div>
          <TextField
            required
            id='outlined-required'
            label='Name'
            value={category}
            onChange={handleChange}
            width='50%'
          />
          <div>
            <button type='submit' className='submit-button'>
              Submit
            </button>
          </div>
        </div>
      </Box>
    </ThemeProvider>
  )
}
