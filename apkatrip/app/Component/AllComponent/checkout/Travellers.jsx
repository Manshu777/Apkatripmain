"use client";

import React, { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { GiAirplaneDeparture } from "react-icons/gi";
import { IoAirplaneSharp } from "react-icons/io5";
import { IoIosThumbsUp } from "react-icons/io";
import { MdOutlineSecurity } from "react-icons/md";
import { FaArrowDown, FaRupeeSign } from "react-icons/fa";
import { RiArrowDropDownLine, RiHospitalLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { FaArrowDown19, FaCheck } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import Image from "next/image";

const page = ({ setActiveTab,fdatas }) => {
  // const [inuranceShowMOre,setInuranceShowMOre]=useState(false)
  const [insuranceHide, setInsurance] = useState(false);

  console.log('fdatas',fdatas)

  const [cardDetailsError, setCardDetailsError] = useState(false);

  const validateCard = () => {
    // Validation logic here
    setCardDetailsError(true); // Example: set error
  };

  const paymentOptions = [
    {
      id: 'cards',
      icon: '/Images/payment/cards-ico.svg',
      title: 'Credit/Debit/ATM Cards',
      description: 'Use VISA, Mastercard, American Express etc.',
    },
    {
      id: 'netbanking',
      icon: '/Images/payment/netbanking-ico.svg',
      title: 'Net Banking',
      description: 'All Major banks are supported',
    },
    {
      id: 'wallets',
      icon: '/Images/payment/wallet-ico.svg',
      title: 'Wallets',
      description: 'Choose Mobikwik, Payzapp, PhonePe or Amazon',
    },
    {
      id: 'upi',
      icon: '/Images/payment/upi-ico.svg',
      title: 'UPI',
      description: 'Make Online Payments Directly from Bank',
    },
    {
      id: 'emi',
      icon: '/Images/payment/emi-ico.svg',
      title: 'EMI',
      description: 'HSBC, RBL, ICICI, Yes and others bank for EMI',
    },
    {
      id: 'rewards',
      icon: '/Images/payment/twidsquare-ico.svg',
      title: 'Pay With Rewards',
      description: 'Check Your Rewards',
    },
    {
      id: 'giftcard',
      icon: '/Images/payment/giftcard-ico.svg',
      title: 'GiftCard',
      description: 'Pay with GiftCard',
    },
    {
      id: 'paylater',
      icon: '/Images/payment/paylater-ico.svg',
      title: 'PayLater',
      description: 'Simpl, ICICI Bank Pay later and Mobikwik Zip Available',
    },
    {
      id: 'googlepay',
      icon: '/Images/payment/googlepay-ico.svg',
      title: 'GooglePay',
      description: 'Pay Easily with Google Pay',
    },
  ];

  const offers = [
    {
      id: 1,
      title: "DELIGHT",
      description:
        "Win a flight, hotel stay, and holidays and get assured voucher worth INR 4000",
      terms: "T&C apply",
    },
    {
      id: 2,
      title: "UPIPAY",
      description:
        "Get up to Rs. 750 Off on Flights and holidays and get assured voucher ",
      terms: "T&C apply",
    },
    {
      id: 3,
      title: "HSBCEMI",
      description:
        "Use this coupon and get up to Rs 4000 off holidays and get assured voucher",
      terms: "T&C apply",
    },
    {
      id: 1,
      title: "AUEMI",
      description:
        "Use this coupon get Rs 4005 OFF For  payments holidays and get assured voucher",
      terms: "T&C apply",
    },
    {
      id: 2,
      title: "UPIPAY",
      description: "Get up to Rs. 750 Off on Flights",
      terms: "T&C apply",
    },
  ];

  const hospitalizationData = [
    { id: 1, title: "Hospitalization", sumInsured: "INR 1,00,000" },
    { id: 2, title: "Hospitalization", sumInsured: "INR 1,00,000" },
    { id: 3, title: "Hospitalization", sumInsured: "INR 1,00,000" },
    { id: 4, title: "Hospitalization", sumInsured: "INR 1,00,000" },
    { id: 5, title: "Hospitalization", sumInsured: "INR 1,00,000" },
    { id: 6, title: "Hospitalization", sumInsured: "INR 1,00,000" },
    { id: 7, title: "Hospitalization", sumInsured: "INR 1,00,000" },
  ];

  const [showAdult, setShowAdult] = useState(false)
  const handleAdultDropdown = () => {
 
    setShowAdult(!showAdult)
   

  }

  const [activeOption, setActiveOption] = useState('cards');

  const handleClick = (id) => {
    setActiveOption(id);
  };


  console.log(fdatas)
  return (
    <div className="">
      <div className="md:grid md:grid-cols-6 gap-5 mt-3">
        <div className=" col-span-4 leftSide space-y-6">
          <div className="FirstChild border rounded-lg shadow-lg">
            <div className="bg-[#D5EEFE] py-3 px-4 rounded-t-lg">
              <div className="flex items-center gap-3 ">
                <div className="border-4 bg-white border-orange-100  h-10 w-10 flex justify-center items-center text-2xl rounded-full">
                  <GiAirplaneDeparture />
                </div>
                <span className="text-sm md:text-xl font-medium">
                  Flight Detail
                </span>
              </div>
            </div>
            <div className=" ">
              <div className=" rounded-sm border  px-3 py-4 relative space-y-5">
                <h3 className="bg-gray-600 text-white text-xs w-fit px-3 font-bold rounded-br-xl absolute top-0 left-0">
                  Depart
                </h3>
                <div className="flex items-center gap-3 text-md md:text-xl">
                  <IoAirplaneSharp className=" font-bold -rotate-45" />
                  <div className="flex items-center gap-1">
                    <h4 className="">Delhi   -Mumabi</h4>
                    <p className="border-s-2 border-black px-2  text-sm">
                      Fri-20Sept2024
                    </p>
                  </div>
                </div>
                <div className="flex  gap-5 flex-col  md:flex-row items-start  justify-between space-y-4 lg:space-y-0 lg:space-x-4">
                  <div className="flex items-center gap-4 ">
                    <img
                      src="/Images/checkout/Indigo.webp"
                      alt=""
                      className="h-10 w-10 rounded-lg"
                    />
                    <div>
                      <p className="text-sm md:text-lg">Indigo</p>
                      <p className="text-xs">6E-6022</p>
                      <p className="text-xs">ECONOMY</p>
                    </div>
                  </div>

                  <div className="flex  w-full  gap-2 justify-between md:w-[70%] md:px-3">
                    <div className="flex flex-col gap-1  items-start">
                      <h4 className="font-extrabold text-md md:text-xl">
                        15:10
                      </h4>
                      <div className="flex flex-col text-xs ">
                        <span className="font-bold text-nowrap">
                          Delhi (DEL)
                        </span>
                        <span>Fri-20 Sep 2024</span>
                        <span>Terminal -1</span>
                      </div>
                    </div>

                    <div className="flex  flex-col gap-4 items-center">
                      <p className="text-xs">02h 10m</p>
                      <div className="border-t-2 border-black border-dotted w-full flex justify-center relative">
                        <div className="absolute -top-3 bg-white text-lg rounded-full">
                          <GiAirplaneDeparture />
                        </div>
                      </div>
                      <span className="border border-green-400 px-6 md:px-8 m-0 py-1 rounded-full font-bold text-[0.5rem]">
                        REFUNDABLE
                      </span>
                    </div>

                    <div className="flex flex-col gap-1 items-start">
                      <h4 className="font-extrabold text-sm md:text-xl">
                        17:40
                      </h4>
                      <div className="flex flex-col text-xs ">
                        <span className="text-nowrap font-bold">
                          Mumbai (BOM)
                        </span>
                        <span>Fri-20 Sep 2024</span>
                        <span>Terminal -2</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-start gap-5">
                  <h3 className="bg-gray-200  font-bold w-fit text-gray-800 rounded-full px-5 text-xs py-1">
                    saver
                  </h3>
                  <p className="text-xs text-gray-400">Fare Rules Baggage</p>
                </div>
                {/* payment page part */}
                <div className="border-2 ">
                  <div className="p-2 bg-gray-50">
                    <div className="flex justify-between items-center mx-20  text-sm font-semibold">
                      <p className="text-gray-400">Airline</p>
                      <p className="text-gray-400">Check-in-Baggage</p>
                      <p className="text-gray-400">Cabin Baggage</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-start p-2">
                    <div className="flex justify-start items-center w-[35%] gap-6">
                      <div className="flex  items-center   md:bg-transparent px-3 rounded-t-lg md:rounded-t-none py-4 md:py-0">
                        <img
                          src="/Images/checkout/Indigo.webp"
                          alt="refund policy"
                          className="h-7 w-h-7 rounded-lg"
                        />
                      </div>
                      <div className="">
                        <h6 className=" text-black text-sm font-semibold capitalize">
                          Indigo
                        </h6>
                        <p className="text-gray-500 text-[12px] font-semibold">
                          6E-2766
                        </p>
                      </div>
                    </div>
                    <div className="text-black text-sm font-semibold capitalize  w-[28%]">
                      15 kgs
                    </div>
                    <div className="text-black text-sm font-semibold capitalize w-[20%]">
                      7 kgs
                    </div>
                  </div>
                </div>
                {/* payment page part */}
              </div>
            </div>
          </div>

          <div className="FirstChild border rounded-lg shadow-lg">
            <div className="bg-[#D5EEFE] py-3 px-4 rounded-t-lg">
              <div className="flex items-center gap-3 ">
                <div className="border-4 bg-white border-orange-100  h-10 w-10 flex justify-center items-center text-2xl rounded-full">
                  <GiAirplaneDeparture />
                </div>
                <span className="text-sm md:text-xl font-medium">
                  Travellers Details
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">ADULT</h3>
              <div className="m-4  rounded-lg shadow-lg border-2 ">
                <div >
                  <div className="flex items-center justify-between p-4">
                    <div className="flex gap-4 items-center">
                      <input type="checkbox" className="bg-blue-600 h-6 w-6" />
                      <h3 className="text-lg font-semibold">Mr Himanshu Mehra</h3>
                    </div>




                    <div>
                      <button onClick={() => { handleAdultDropdown() }}>
                        <RiArrowDropDownLine className="text-4xl" />

                      </button>
                    </div>
                  </div>




                  {showAdult && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border rounded-md shadow-lg">
                      {/* Title */}
                      <div>
                        <label className="block text-[10px] font-bold text-gray-900 mb-1">Title</label>
                        <select
                          className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="">Title</option>
                          <option value="Mr">MR</option>
                          <option value="Ms">MS</option>
                          <option value="Mrs">Mrs.</option>
                        </select>
                      </div>

                      {/* First Name */}
                      <div>
                        <label className="block text-[10px] font-bold text-gray-900 mb-1">
                          First Name &amp; Middle Name (if any)
                        </label>
                        <input
                          type="text"
                          placeholder="Enter First Name"
                          className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      {/* Last Name */}
                      <div>
                        <label className="block text-[10px] font-bold text-gray-900 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Last Name"
                          className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-[10px] font-bold text-gray-900 mb-1">
                          Email ID <small className="text-gray-500">(Optional)</small>
                        </label>
                        <input
                          type="email"
                          placeholder="Enter Email ID"
                          className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      {/* Contact Number */}
                      <div>
                        <label className="block text-[10px] font-bold text-gray-900 mb-1">
                          Contact Number <small className="text-gray-500">(Optional)</small>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Contact Number"
                          className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      {/* Frequent Flyer */}
                      <div>
                        <label className="block text-[10px] font-bold text-gray-900 mb-1">
                          Frequent Flyer No.
                        </label>
                        <input
                          type="text"
                          placeholder="Frequent Flyer Number"
                          className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      {/* Airline */}
                      <div>
                        <label className="block text-[10px] font-bold text-gray-900 mb-1">
                          Airline
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Airline Name"
                          className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      {/* Meal Preference */}
                      <div>
                        <label className="block text-[10px] font-bold text-gray-900 mb-1">
                          Meal Preference
                        </label>
                        <select
                          className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select Meal Preference</option>
                          <option value="Vegetarian Hindu Meal">Vegetarian Hindu Meal</option>
                          <option value="Baby Meal">Baby Meal</option>
                          <option value="Hindu (Non Vegetarian) Meal">
                            Hindu (Non Vegetarian) Meal
                          </option>
                          <option value="Kosher Meal">Kosher Meal</option>
                          <option value="Moslem Meal">Moslem Meal</option>
                          <option value="Vegetarian Jain Meal">Vegetarian Jain Meal</option>
                        </select>
                      </div>
                    </div>

                  )}






                  <div className="p-6 bg-gray-100 border-t">
                    <p className="text-xs text-gray-600 font-medium ">Adds-On (Optional)</p>
                    <p className="text-xs text-gray-600 font-medium ">Pre-booked meals, Seats and Baggage are 30% cheaper than on-board price.</p>
                  </div>

                </div>
              </div>
              <h3 className="text-blue-600 text-md font-semibold ">+ Add Adult</h3>

            </div>
          </div>
          {/* payment */}
          <div>
            <div className="bg-[#D5EEFE] py-3 px-4 rounded-t-lg">
              <div className="flex items-center gap-3 ">
                <div className="border-4 bg-white border-orange-100  h-10 w-10 flex justify-center items-center text-2xl rounded-full">
                  <GiAirplaneDeparture />
                </div>
                <span className="text-sm md:text-xl font-medium">
                  PAYMENT MODE
                </span>
              </div>
            </div>
            <div className="lg:flex items-center gap-6">
              <div className="w-full lg:w-[35%] ">
                {paymentOptions.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleClick(option.id)}
                    className={`flex items-center gap-3 py-4 border 
            ${activeOption === option.id
                        ? ' border-l-[3px] border-l-blue-500 px-4'
                        : 'bg-slate-100 border-slate-300 px-6'
                      } 
            cursor-pointer transition`}
                  >
                    <Image
                      src={option.icon}
                      width={500}
                      height={500}
                      className={` ${activeOption === option.id ? 'bg-slate-200 p-2 w-10 h-10 rounded-md' : 'w-7 h-7'}`}
                      alt={option.title}
                    />
                    <div className="flex flex-col">
                      <span className={`font-bold text-sm ${activeOption === option.id ? 'text-blue-500' : ''}`}>{option.title}</span>
                      <span className="text-xs">{option.description}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-full border border-slate-100 rounded-md shadow-md p-4 mt-4 max-w-lg mx-auto">
                {/* Error Message */}
                {cardDetailsError && (
                  <div className="flex items-center gap-2 bg-red-100 text-red-700 p-3 mb-4 border border-red-300 rounded-md">
                    <img src="/Content/img/error-icon.png" alt="Error" className="w-5 h-5" />
                    <span>Please enter valid card details.</span>
                    <button
                      className="ml-auto text-red-500 hover:text-red-700"
                      onClick={() => setCardDetailsError(false)}
                    >
                      ×
                    </button>
                  </div>
                )}

                {/* Card Number */}
                <div className="mb-4">
                  <label htmlFor="CC" className="block text-sm font-medium text-gray-700">
                    Enter Your Card Number
                  </label>
                  <input
                    id="CC"
                    type="text"
                    maxLength="19"
                    className="w-full mt-2 p-2 border rounded-md focus:outline-none"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                  />
                  <div id="divCCMasterVisa" className="mt-1"></div>
                </div>

                {/* Card Holder Name */}
                <div className="mb-4">
                  <label htmlFor="CCN" className="block text-sm font-medium text-gray-700">
                    Enter Card Holder Name
                  </label>
                  <input
                    id="CCN"
                    type="text"
                    className="w-full mt-2 p-2 border rounded-md focus:outline-none"
                    placeholder="Card Holder Name"
                  />
                </div>

                {/* Card Expiry */}
                <div className="mb-4 grid grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="ccMMYY" className="block text-sm font-medium text-gray-700">
                      Valid Through (MM/YY)
                    </label>
                    <input
                      id="ccMMYY"
                      type="text"
                      className="w-full mt-2 p-2 border rounded-md focus:outline-none"
                      placeholder="MM/YY"
                    />
                    <span className="text-red-500 text-xs mt-1 block">Please enter valid card expiry details.</span>
                  </div>



                  <div >
                    <label htmlFor="CCCVV" className="block text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <input
                      id="CCCVV"
                      type="password"
                      maxLength="4"
                      className="w-full mt-2 p-2 border rounded-md focus:outline-none"
                      placeholder="Enter CVV"
                    />
                  </div>
                </div>

                {/* Save Card Checkbox */}
                <div className="mb-6 flex items-center">
                  <input
                    id="chkSave"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="chkSave" className="ml-2 text-sm text-gray-700">
                    Save this card for faster checkout
                  </label>
                </div>

                {/* Total Fare */}
                <div className="mb-6 flex justify-between items-center text-lg font-semibold">
                  <div className="flex items-center gap-2">
                  <span>Total Fare : </span>
                  <span className="text-xl text-[#DA5200]"> ₹ 13,617</span>
                  </div>
                  <button
                  onClick={validateCard}
                  className="w-[30%] md:w-[25%] bg-[#DA5200] text-[13px] text-white py-1 rounded-full text-center transition"
                >
                  Make Payment
                </button>
                </div>

                {/* Make Payment Button */}
                

                {/* Security Notice */}
                <span className="mt-4 text-[13px] text-gray-500 flex items-start gap-1">
                  <FaLock className="mt-1" />We use 128-bit secure encryption, providing you a SAFE payment environment.
                </span>
                <div>
                <span className="text-gray-500 font-normal text-xs">By Continuing, you agree to the Rules,<span className="text-blue-600"> Privacy Policy</span>,<span className="text-blue-600"> User Agreement</span>,<span className="text-blue-600">Terms & Conditions</span> of ApkaTrip </span>
                </div>
              </div>


            </div>
          </div>
        </div>

        <div className=" w-full md:col-span-2 rightSide space-y-4 md:px-4  ">
          <div className="sticky top-0">
            <div className="priceBoxAndDetails border rounded shadow-lg">
              <div className="border rounded-t flex items-center px-3 py-2 bg-[#D1EAFF]">
                <h3>Price Summary</h3>
              </div>
              <div className="flex justify-between px-3 py-3 text-sm border-b">
                <p>Adult x 1</p>
                <p className="flex  items-center font-bold text-xs">
                  <FaRupeeSign />
                  4516
                </p>
              </div>
              <div className="flex justify-between px-3 py-3 text-xs border-b">
                <p>Total Taxes +</p>
                <p className="flex  items-center font-bold">
                  <FaRupeeSign />
                  4516
                </p>
              </div>
              <div className="flex justify-between px-3 py-3 t border-b">
                <p>Medical Refund Policy </p>
                <div className="flex items-center gap-2 text-xs">
                  <p className="flex  items-center font-bold line-through">
                    <FaRupeeSign />
                    4516
                  </p>
                  <span className="font-bold text-green-500">Free</span>
                </div>
              </div>
              <div className="flex justify-between items-center px-3 py-3 font-bold text-lg text-red-600">
                <p>Grand Total</p>
                <p className="flex items-center">
                  <FaRupeeSign />
                  5,235
                </p>
              </div>
            </div>
            <div className="offersAndPromoCode border rounded shadow-lg">
              <div className="bg-[#2196F3] px-3 py-2 text-white ">
                Offers and Promo Codes
              </div>
              <div className="border-b py-3 px-3 flex justify-center lg:justify-beween flex-wrap gap-2 lg:gap-0">
                <input
                  type="text"
                  placeholder="ENTER COUPON CODE"
                  className="border-b outline-none text-gray-600 uppercase font-semibold text-sm w-fit"
                />
                <div>
                  <button className="bg-[#2196F3] px-16 lg:px-8 py-3 lg:py-1 rounded-full text-sm font-bold text-white">
                    apply
                  </button>
                </div>
              </div>

              <div className="applyOffers  max-h-[300px] overflow-hidden overflow-y-scroll ">
                {offers.map((offer) => (
                  <div
                    key={offer.id}
                    className="flex items-start gap-2 border-b py-4 px-3"
                  >
                    <div className="rounded-full w-[22px] flex items-center justify-center h-[18px] border hover:bg-gray-700">
                      <FaCheck className="text-xs text-white" />
                    </div>
                    <div>
                      <h6 className="font-bold text-xs">{offer.title}</h6>
                      <p className="text-xs">{offer.description}</p>
                      <p className="text-[10px] font-bold uppercase text-[#2196F3]">
                        {offer.terms}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="booking  flex justify-center items-center mt-3">
              <button
                className="bg-[#DA5200] text-sm lg:text-lg tracking-normal text-white rounded-full w-1/2 md:w-[80%] py-2"
                onClick={() => {
                  setActiveTab(3);
                }}
              >
                Continue Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
