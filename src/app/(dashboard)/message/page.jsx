'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

import Cards from '../../../components/Cards'

import { Box, ThemeProvider, Avatar, CircularProgress } from '@mui/material'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { TrendingUpRounded } from '@mui/icons-material'
import dayjs from 'dayjs'

export default function Page() {
  const [itemsToGet, setItemsToGet] = useState([])
  const [itemToGet, setItemToGet] = useState([])
  const [groups, setGroups] = useState([])
  const [itemDataLoading, setItemDataLoading] = useState(true)
  const [category, setCategory] = useState([])
  const [categoryItem, setCategoryItem] = useState([])
  const [loading, setLoading] = useState(false)
  const [group, setGroup] = useState([])
  const [showDate, setShowDate] = useState(false)
  const [showGroup, setShowGroup] = useState(false)
  const [selectedDate, setSelectedDate] = useState(dayjs())
  const [date, setDate] = useState(false)
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

  const itemDataDate = async date => {
    try {
      setItemToGet([])
      setLoading(true)
      const formattedDate = date.format('DD-MM-YYYY') // Format the date for API request
      const { data } = await axios.get(`/api/marketitems/get-mkitm-date/${formattedDate}`)
      setLoading(false)
      setItemToGet(data.marketitems)
    } catch (err) {
      console.error(err)
    }
  }

  const groupData = async () => {
    try {
      const { data } = await axios.get('/api/group/get-groups')
      setGroups(data.group)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDateChange = async => {
    if (!showDate) {
      setShowDate(true)
    } else {
      setShowDate(false)
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
              {showCategroy
                ? category.map(e => (
                    <button className='category-button' onClick={() => itemDataCategory(e._id)} key={e._id}>
                      {e.name}
                    </button>
                  ))
                : ''}
              {showGroup
                ? groups.map(e => (
                    <button className='category-button' onClick={() => itemData(e._id)} key={e._id}>
                      {e.name}
                    </button>
                  ))
                : ''}
              {date ? (
                <div>
                  <button className='category-button' onClick={() => handleDateChange()}>
                    Calender
                  </button>
                </div>
              ) : (
                ''
              )}

              {showDate ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    value={selectedDate}
                    onChange={handleDateChange}
                    onClick={() => itemDataDate(selectedDate)}
                  />
                </LocalizationProvider>
              ) : (
                ''
              )}
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
              <div
                className='group-name'
                onClick={() => {
                  setShowCategroy(false)
                  setShowGroup(TrendingUpRounded)
                  setDate(false)
                }}
              >
                Group
              </div>
            </div>
            <div className='avatar-name'>
              <Avatar>C</Avatar>
              <div
                className='group-name'
                onClick={() => {
                  setShowCategroy(true)
                  setShowGroup(false)
                  setDate(false)
                }}
              >
                Category
              </div>
            </div>
            <div className='avatar-name'>
              <Avatar>D</Avatar>
              <div
                className='group-name'
                onClick={() => {
                  setShowCategroy(false)
                  setShowGroup(false)
                  setDate(true)
                }}
              >
                Date
              </div>
            </div>
          </Box>
        </div>
      </ThemeProvider>
    </>
  )
}
