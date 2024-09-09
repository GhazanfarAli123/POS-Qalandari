'use client'

import * as React from 'react'
import { Box, ThemeProvider, Avatar, CircularProgress } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Cards from '../../../components/Cards'

export default function Page() {
  const [itemsToGet, setItemsToGet] = useState([])
  const [itemToGet, setItemToGet] = useState([])
  const [groups, setGroups] = useState([])
  const [itemDataLoading, setItemDataLoading] = useState(true)
  const [category, setCategory] = useState([])
  const [categoryItem, setCategoryItem] = useState([])
  const [loading, setLoading] = useState(false)
  const [group, setGroup] = useState([])

  const [showCategroy, setShowCategroy] = useState(true)

  const itemsData = async () => {
    try {
      // setLoading(true)
      const { data } = await axios.get('/api/marketitems/get-mkitm')
      // setLoading(false)
      setItemsToGet(data.marketitems)
    } catch (err) {
      console.error(err)
    }
  }

  const categoryData = async () => {
    try {
      // setLoading(true)
      const { data } = await axios.get('/api/category/get-categories')
      // setLoading(false)
      // console.log(data.category)
      setCategory(data.category)
    } catch (err) {
      console.error(err)
    }
  }

  const itemData = async id => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/marketitems/get-mkitmsi/${id}`)
      setLoading(false)
      setItemToGet(data.marketitems)
    } catch (err) {
      console.error(err)
    }
  }

  const itemDataCategory = async id => {
    try {
      setItemToGet([])
      setLoading(true)
      const { data } = await axios.get(`/api/marketitems/get-mkitmcat/${id}`)
      setLoading(false)
      setItemToGet(data.marketitems)
    } catch (err) {
      console.error(err)
    }
  }

  const groupData = async () => {
    try {
      const { data } = await axios.get('api/group/get-groups')
      setGroups(data.group)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    itemsData()
    groupData()
    categoryData()
  }, [])

  return (
    <>
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
        <div className='market-items'>
          <Box
            sx={{
              width: '75%',
              height: 700,
              borderRadius: 2,
              bgcolor: 'primary.main'
            }}
          >
            <div className='category-buttons'>
              {!showCategroy
                ? category.map(e => (
                    <button className='category-button' onClick={() => itemDataCategory(e._id)} key={e._id}>
                      {e.name}
                    </button>
                  ))
                : groups.map(e => (
                    <button className='category-button' onClick={() => itemData(e._id)} key={e._id}>
                      {e.name}
                    </button>
                  ))}
            </div>
            <div className='item-box'>
              {loading ? <CircularProgress color='success' /> : ''}
              {itemToGet.map(e => (
                <div>
                  <Cards
                    name={e.name}
                    group={e.group.name}
                    user={e.user.name}
                    date={e.time}
                    image={e.image}
                    price={e.price}
                    status={e.itemstatus}
                    id={e._id}
                  />
                </div>
              ))}
              {/* <pre>{JSON.stringify(itemToGet, null, 4)}</pre> */}
            </div>
          </Box>
          <Box
            sx={{
              width: '25%',
              height: 700,
              borderRadius: 2,
              bgcolor: 'primary.dark'
            }}
          >
            {/* {loading ? <CircularProgress color='success' /> : ''}
              {groups.map(e => (
                <div className='avatar-name' key={e._id} onClick={() => itemData(e._id)}>
                  <Avatar>{e.name.charAt(0)}</Avatar>
                  <div className='group-name'>{e.name}</div>
                </div>
              ))} */}
            <div className='avatar-name'>
              <Avatar>G</Avatar>
              <div className='group-name' onClick={() => setShowCategroy(true)}>
                Group
              </div>
            </div>
            <div className='avatar-name'>
              <Avatar>C</Avatar>
              <div className='group-name' onClick={() => setShowCategroy(false)}>
                Category
              </div>
            </div>
          </Box>
        </div>
      </ThemeProvider>
    </>
  )
}
