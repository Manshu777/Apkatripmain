"use client"
import axios from 'axios'
import React, { useEffect, useTransition } from 'react'
import { apilink } from '../../Component/common'

const HolidayCompo = ({slug}) => {

const [ispanding,startTransition]=useTransition();

    useEffect(()=>{
const fetchapi=async()=>{
const data=await axios.get(`${apilink}/search-holidays-package/${slug}`);
console.log(data.data)
}
fetchapi();

    },[])

  return (
    <div>
      {slug}
    </div>
  )
}

export default HolidayCompo
