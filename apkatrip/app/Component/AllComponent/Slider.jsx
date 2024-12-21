"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Autoplay} from 'swiper/modules';
import {useTranslations} from 'next-intl';
const allData = [
  {
    title: "Exclusive Offer",
    subtitle: "New User",
    offer: "First Flight",
    code: "apkatrip",
    imageUrl: "/Images/apka trip6 (1).webp",
    description:
      "Get an exclusive discount on your first flight booking. Use the code below to avail the offer.",
    category: "TopOffer",
    bg: "#ECF5FE",
    link: "/holidayspackage",
  },
  {
    title: "Flights Offer",
    subtitle: "New User",
    offer: "First Flight",
    code: "apkatrip",
    imageUrl: "/Images/apka trip1.webp",
    description:
      "Get an exclusive discount on your first flight booking. Use the code below to avail the offer.",
    category: "FlightsOffer",
    bg: "#ECF5FE",
    link: "/holidayspackage",
  },
  {
    title: "Hotel Offer",
    subtitle: "New User",
    offer: "First Flight",
    code: "apkatrip",
    imageUrl: "/Images/apka trip2.webp",
    description:
      "Get an exclusive discount on your first flight booking. Use the code below to avail the offer.",
    category: "HotelsOffer",
    bg: "#ECF5FE",
    link: "/holidayspackage",
  },
  {
    title: "Holiday Offer",
    subtitle: "New User",
    offer: "First Flight",
    code: "apkatrip",
    imageUrl: "/Images/apka trip3.webp",
    description:
      "Get an exclusive discount on your first flight booking. Use the code below to avail the offer.",
    category: "HolidayOffer",
    bg: "#ECF5FE",
    link: "/holidayspackage",
  },
  {
    title: "Bank Offers",
    subtitle: "New User",
    offer: "First Flight",
    code: "apkatrip",
    imageUrl: "/Images/apka trip4.webp",
    description:
      "Get an exclusive discount on your first flight booking. Use the code below to avail the offer.",
    category: "BankOffer",
    bg: "#ECF5FE",
    link: "/holidayspackage",
  },
  {
    title: "Bus Offers",
    subtitle: "New User",
    offer: "First Flight",
    code: "apkatrip",
    imageUrl: "/Images/apka trip7.webp",
    description:
      "Get an exclusive discount on your first flight booking. Use the code below to avail the offer.",
    category: "BusOffer",
    bg: "#ECF5FE",
    link: "/holidayspackage",
  },
  {
    title: "Cabs",
    subtitle: "New User",
    offer: "First Flight",
    code: "apkatrip",
    imageUrl: "/Images/apka trip8.webp",
    description:
      "Get an exclusive discount on your first flight booking. Use the code below to avail the offer.",
    category: "CabOffer",
    bg: "#ECF5FE",
    link: "/holidayspackage",
  },
];

const CustomSlider = ({ isLoading, children }) => {
  const t = useTranslations('HomePage');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("TopOffer");

  

  

  const filteredData =
    activeTab === "TopOffer"
      ? allData
      : allData.filter((item) => item.category === activeTab);
const filteredData2=["/Images/flight-slide2.png","/Images/flight-slide1.png","/Images/flight-slide3.png"]

  const handleClick = (id) => {
    setActiveTab(id);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the timeout duration as needed

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div className="my-6">
        {/* Tabs Section */}
        <div className="relative  pt-0 lg:pt-10 text-lg md:text-xl lg:text-3xl font-bold text-gray-900 flex justify-center items-center gap-2 my-5">
        {t('title')}
        </div>
        

        {/* Swiper Component */}
        <div className=" flex  flex-col lg:flex-row px-4 lg:px-36 justify-end gap-4 w-full ">
        <Swiper
            className=" w-full  lg:w-3/6 h-[200px] lg:h-[300px] "
      
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
           
            
              modules={[Autoplay]}

            >
              {filteredData2.map((item, index) => (
                <SwiperSlide
                  key={index}
                  className="flex flex-col   rounded-2xl overflow-hidden  bg-white-900"
                >
                  <img src={item} alt=""  className="w-full  h-full"/>
                 
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="flex  lg:gap-4  lg:w-3/6 justify-around">
            {filteredData.slice(0,3).map((item)=>(
              <div className="rounded-2xl overflow-hidden   h-[100px]   md:h-[250px]  lg:h-full">
                <img src={item.imageUrl} alt="" className="h-full w-full" />
              </div>
            ))}
            </div>
        </div>

      </div>
    </>
  );
};

export default CustomSlider;
