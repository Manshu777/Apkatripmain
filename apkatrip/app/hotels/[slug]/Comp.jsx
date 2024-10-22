"use client"
import HotelComp from '@/app/Component/AllComponent/formMaincomp/HotelsComp';
import { getAllhotelsapi } from '@/app/Component/Store/slices/hotelsSlices';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaShareAlt, FaStar, FaFilter, FaTimes } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { FiRefreshCcw } from "react-icons/fi";


import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


const Comp = ({slug}) => {
  const routes=useRouter()

    const decodedSlug =  decodeURIComponent(slug)
    const params = new URLSearchParams(decodedSlug);
const cityCode=params.get("citycode")
const cityName=params.get("cityName")

const checkIn=params.get("checkin")
const checkOut=params.get("checkout")
const adults=Number(params.get("adult"))
const children=Number(params.get("child"))
const roomes=params.get("roomes")
const page=params.get("page")


const dispatch=useDispatch()
const allhoteldata=useSelector((state)=>state.hotelsSlice)
const [allhotel,setallhotels]=useState()
const [hotalbackup,sethotalbackup]=useState()
const [showimg,setshowImg]=useState()
const [seepagination,setpagination]=useState(true)
const renderStars = (rating) => {
  const starCount = Math.round(Number(rating));
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, index) => (
        <FaStar key={index} color={index < starCount ? "gold" : "gray"} />
      ))}
    </div>
  );
};

useEffect(()=>{
dispatch(getAllhotelsapi({cityCode,checkIn,checkOut,adults,children,page}))
},[])
useEffect(()=>{
setallhotels(allhoteldata && !allhoteldata.isLoading && allhoteldata.info && allhoteldata.info.filteredResults
  && allhoteldata.info.filteredResults)
sethotalbackup(allhoteldata)
},[allhoteldata])

const handelRatingFilter=(e)=>{
  // const newdata= hotalbackup.info.hotelDetails.HotelDetails ||     e.target.value;
const newdata=hotalbackup.info.filteredResults.filter((data)=>data.HotelDetails.HotelRating==e.target.value)
setallhotels(newdata)
  setpagination(false)
}

const handelNextPrev=(item)=>{
  if(page==item){}
  else{routes.push(`/hotels/cityName=${cityName}&citycode=${cityCode}&checkin=${checkIn}&checkout=${checkOut}&adult=${adults}&child=${children}&roomes=${roomes}&page=${item}`)
}

}
const handelNextpage=()=>{
  if(page>=hotalbackup.info.len-1){}
  else{  routes.push(`/hotels/cityName=${cityName}&citycode=${cityCode}&checkin=${checkIn}&checkout=${checkOut}&adult=${adults}&child=${children}&roomes=${roomes}&page=${Number(page)+1}`)
}

}
const handelPrevpage=()=>{
  if(page==0){}
  else{  routes.push(`/hotels/cityName=${cityName}&citycode=${cityCode}&checkin=${checkIn}&checkout=${checkOut}&adult=${adults}&child=${children}&roomes=${roomes}&page=${Number(page)-1}`)
}

}
const resetfilter=()=>{
 setallhotels(hotalbackup.info.hotelDetails.HotelDetails)
 setpagination(true)

}

console.log(allhoteldata)


  return (
   <>
   <HotelComp />
   <div className='p-2 flex gap-2 relative '>
    <div className='w-1/5 sticky top-28 left-2 h-[60vh] bg-red-300'>
 <div>
  <p className='font-bold'>By Rating.</p>
  <div className='flex flex-col gap-1 px-5 py-2'>
    <div className='flex items-center gap-1' ><input type="radio" name="rating" id="rating1" value="1"   onChange={(e)=>handelRatingFilter(e)} /> <label htmlFor="rating1" className='flex items-center gap-1'><FaStar className='text-orange-500' /> 1 Star </label></div>
    <div className='flex items-center gap-1'><input type="radio" name="rating" id="rating2" value="2" onChange={(e)=>handelRatingFilter(e)}/> <label htmlFor="rating2" className='flex items-center gap-1'><FaStar className='text-orange-500' /> 2 Star </label></div>
    <div className='flex items-center gap-1'><input type="radio" name="rating" id="rating3" value="3" onChange={(e)=>handelRatingFilter(e)}/> <label htmlFor="rating3" className='flex items-center gap-1'><FaStar className='text-orange-500' /> 3 Star </label></div>
    <div className='flex items-center gap-1'><input type="radio" name="rating" id="rating4" value="4" onChange={(e)=>handelRatingFilter(e)}/> <label htmlFor="rating4" className='flex items-center gap-1'><FaStar className='text-orange-500' /> 4 Star </label></div>
    <div className='flex items-center gap-1'><input type="radio" name="rating" id="rating5" value="5" onChange={(e)=>handelRatingFilter(e)}/> <label htmlFor="rating5" className='flex items-center gap-1'><FaStar className='text-orange-500' /> 5 Star </label></div>

  </div>
<div className='flex justify-end '>
<button onClick={resetfilter} className='flex gap-2 px-4 py-2 text-white bg-[#42A6EF] items-center rounded-md'>Refresh <FiRefreshCcw /></button>

</div>

 </div>
    </div>
   <div className='w-4/5'>
{allhoteldata && allhoteldata.isLoading && <div className='h-[70vh] flex justify-center items-center'>
  
  <h4>Loading... </h4>
  </div>}

<div className='p-4 flex flex-col gap-3'>
  {allhotel &&!allhoteldata.isLoading&&  !allhotel.length && <div className='text-center text-4xl p-10 '>
      Hotels not <span className='text-red-800'>Found !</span>
    </div>}
{allhotel && !allhoteldata.isLoading && allhotel.map((hotel,index_num)=>{
  
  return(
  <div
    key={hotel.id}
    className="myshadow bg-white border hover:border-blue-600  mb-5"
  >
    {showimg==index_num &&
      <div className='fixed top-16  left-0 z-40 w-full  h-[90vh] border-8 border-white bg-white overflow-scroll grid grid-cols-3 gap-2'>
<MdOutlineCancel onClick={()=>setshowImg(null)} className='fixed top-24 cursor-pointer right-10 text-orange-500 text-5xl' />
{hotel.HotelDetails.Images.map((imgs)=>{
  return(
<img src={imgs}  className='h-[25rem] w-full'/>
  )
})}
</div>}

    <div className="block md:flex relative p-5">
        <div className="relative">
          <div className="relative">
            <img
              src={hotel.HotelDetails.Images ?(hotel.HotelDetails.Images[0] || "/Images/not_found_img.png"):"/Images/not_found_img.png"}
              alt="hotelImg"
             
              className="object-cover w-[35rem] h-[15rem] rounded-md"
            />
            <div className="absolute bottom-2 right-2">
              <button className="bg-blue-600 text-white rounded-full w-20 h-8 flex items-center justify-center">
                <span className="text-xs flex items-center gap-2">
                  Share <FaShareAlt />{" "}
                </span>
              </button>
            </div>
          </div>

          <div className="flex justify-center md:justify-start mt-2 space-x-2">
            {hotel.HotelDetails.Images && hotel.HotelDetails.Images.slice(1, 5).map((image, index) => (
              <div key={index} className="relative rounded-sm">
                <img
                  src={image}
                  alt={`hotel_image_${index + 1}`}
                
                  className="object-cover rounded-sm h-[3rem] w-[5rem]"
                />
                {index === 3 && (
                  <span onClick={()=>setshowImg(index_num)}  className= " cursor-pointer absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center text-xs rounded-sm">
                    View All
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

      <div className="flex-1 pl-0 md:pl-5">
        <div className=" my-5 md:my-0 flex justify-between items-center">
          <p className="text-base md:text-2xl font-black">{hotel.HotelDetails.HotelName}</p>
          <div>
            <div className="flex items-center">
              <span className="bg-blue-500 text-white px-2 text-sm rounded-full">
                {hotel.HotelDetails.HotelRating} 
              </span>
              <span className=" ml-2 text-blue-600">
                {hotel.HotelDetails.HotelRating}
              </span>
            </div>
            <div className="hidden md:flex items-center justify-center mt-2">
              {renderStars(hotel.HotelDetails.HotelRating)}
            </div>
          </div>
        </div>

        <div className="text-gray-500">
          <span className="text-blue-600">{hotel.HotelDetails.Address}</span> |{" "}
          {hotel.HotelDetails.distance}
        </div>

        <div className="mt-2 hidden md:flex space-x-4 text-gray-500">
          {/* {hotel.perks.map((perk, index) => (
            <span
              key={index}
              className="bg-gray-200 px-2 py-1 text-sm rounded-full"
            >
              {perk}
            </span>
          ))} */}
        </div>
       
        {hotel.Rooms.map((items_price)=>{
  return(
    <>
     <div className="flex items-end justify-between">
        <div className="mt-4 ">
          <p className="text-xl font-black">{Math.floor(items_price.TotalFare-items_price.TotalTax)}</p>
          <p className="text-gray-500">
            + {items_price.TotalTax} taxes & fees
          </p>
          <p className="text-sm text-gray-500 mt-2">Per Night</p>
        </div>
        <Link href={`/hotelSearchCheckin/cityName=${cityName}&checkin=${checkIn}&checkout=${checkOut}&adult=${adults}&child=${children}&roomes=${roomes}&hotelcode=${hotel.HotelCode}`} className="bg-orange-600 text-white rounded-full w-28 h-8 flex items-center justify-center">
                <span className="text-xs flex items-center gap-2">
                  View Room
                </span>
              </Link>
        </div>
        <div className="hidden md:block  bg-[#ECF5FE] px-5 py-2 text-sm shadow-lg">
      <span className="text-gray-700">
        Exclusive offer on Canara Bank Credit Cards. Get INR 241 off
      </span>
    </div>
    </>
  )
}) }
       
       
        </div>

        </div>

      
    
   
   
  
    
    
</div>)
})
}
{  hotalbackup && hotalbackup.info&& seepagination && hotalbackup.info.len &&
<div className='flex  gap-2 overflow-x-auto'>
  <div className={` text-white p-1 px-2 rounded-lg  ${page==0?"bg-gray-600":"bg-black cursor-pointer"}`} onClick={handelPrevpage}>Prev</div>
{Array.from({ length: hotalbackup.info.len }, (_, index) =>{
  return(
    <div className={` text-white p-1 px-3 rounded-lg cursor-pointer ${page==index?"bg-green-700":"bg-black cursor-pointer"}`} onClick={()=>handelNextPrev(index)}>
      {index+1}
    </div>
  )
} )   }
  <div className={` text-white p-1 px-2 rounded-lg  ${page==hotalbackup.info.len-1?"bg-gray-600":"bg-black cursor-pointer"}`} onClick={handelNextpage} >Next</div>

</div>} 
</div> 


   </div>


   </div>
   
   </>
  )
}

export default Comp
