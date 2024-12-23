"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaCalendarWeek, FaChevronDown, FaCalendarAlt } from "react-icons/fa";
import AutoSearch from "./AutoSearch";
import TravellerDropdown from "./TravellerDropdown";
import Link from "next/link";
import "react-day-picker/style.css";
import { useDispatch, useSelector } from "react-redux";
import { getTopAirPorts } from "../Store/slices/topPortsSlice";
import { useRouter } from "next/navigation";
// import { Calendar, toggle } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { getip } from "../Store/slices/ipslice";
import { toast, Bounce } from "react-toastify";
import { useTranslations } from "next-intl";
import Navbar from "./Navbar";
import { IoIosArrowDown, IoIosCheckmark } from "react-icons/io";

import { getCalendarFare } from "../Store/slices/calenderData";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { IoLocationSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { FaArrowRightLong, FaUserLarge } from "react-icons/fa6";
import TypeWriterHeaderEffect from "../AllComponent/TypeWriterHeaderEffect";

const Header = () => {
  const dispatch = useDispatch();
  // const { fares, isLoading, isError } = useSelector((state) => state.calendar);

  const localTimeZone = getLocalTimeZone();
  const [currentDateComponents, setCurrentDateComponents] = useState({});
  const currentDate = today(localTimeZone);
  const [futureDateComponents, setFutureDateComponents] = useState({});

  const [selected, setSelected] = useState(new Date());

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getCurrentDateTime = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = `0${today.getMonth() + 1}`.slice(-2); // Add leading zero if month is single digit
    const day = `0${today.getDate()}`.slice(-2); // Add leading zero if day is single digit

    // Set the time to "00:00:00"
    return `${year}-${month}-${day}T00:00:00`; // "YYYY-MM-DDT00:00:00"
  };

  const [dateOfJourney, setDateOfJourney] = useState(getCurrentDateTime());

  const datePrices = {
    "2024-12-20": "$50",
    "2024-12-21": "$60",
    "2024-12-22": "$40",
  };
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {

    setSelectedDate(date);
    setSelected(date)

    setIsVisible(false)
  };

  



  const [selectedReturn, setSelectedReturn] = useState();
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [isGroup, setIsGroup] = useState(false);
  const [selectedClass, setSelectedClass] = useState(1);
  const [activeTab, setActiveTab] = useState(1);

  const ipstate = useSelector((state) => state.ipslice);
  const route = useRouter();
  const defaultFromCity = {
    id: 26555,
    ident: "VIDP",
    type: "large_airport",
    name: "Indira Gandhi International Airport",
    latitude_deg: "28.55563",
    longitude_deg: "77.09519",
    elevation_ft: "777",
    continent: "AS",
    iso_country: "IN",
    iso_region: "IN-DL",
    municipality: "New Delhi",
    scheduled_service: "yes",
    gps_code: "VIDP",
    iata: "DEL",
    local_code: "",
    home_link: "http://www.newdelhiairport.in/",
    wikipedia_link:
      "https://en.wikipedia.org/wiki/Indira_Gandhi_International_Airport",
    keywords: "Palam Air Force Station",
  };

  const defaultToCity = {
    id: 26434,
    ident: "VABB",
    type: "large_airport",
    name: "Chhatrapati Shivaji International Airport",
    latitude_deg: "19.0886993408",
    longitude_deg: "72.8678970337",
    elevation_ft: "39",
    continent: "AS",
    iso_country: "IN",
    iso_region: "IN-MM",
    municipality: "Mumbai",
    scheduled_service: "yes",
    gps_code: "VABB",
    iata: "BOM",
    local_code: "",
    home_link: "http://www.csia.in/",
    wikipedia_link:
      "https://en.wikipedia.org/wiki/Chhatrapati_Shivaji_International_Airport",
    keywords: "Bombay, Sahar International Airport",
  };
  const [fromCity, setFromCity] = useState(defaultFromCity);
  const [toCity, setToCity] = useState(defaultToCity);
  const [JourneyType, setjurnytype] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  const [selectedOption, setSelectedOption] = useState("");

  const handleTabClick = (tabIndex) => {
    setjurnytype(tabIndex);
  };
  const handleCheckboxChange = (event) => {};
  useEffect(() => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30); // Add 30 days (example)

    setFutureDateComponents({
      day: futureDate.getDate(),
      month: futureDate.getMonth(), // Month is 0-indexed (0 = January)
      year: futureDate.getFullYear(),
    });
  }, []);

  useEffect(() => {
    const today = new Date();
    setCurrentDateComponents({
      day: today.getDate(),
      month: today.toLocaleString("default", { month: "long" }),
      year: today.getFullYear(),
    });
  }, []);


  useEffect(() => {
    if (typeof window !== "undefined") {
      const getedate = localStorage.getItem("defaultflight");

      if (getedate) {
        try {
          const parsedDate = JSON.parse(getedate).timeDate;
          const parsedDate2 = JSON.parse(getedate).retuntime;

          const storedDate = new Date(parsedDate);
          const storedDate2 = new Date(parsedDate2);

          if (!isNaN(storedDate)) {
            setSelected(storedDate);
            if (!isNaN(storedDate2)) {
              setSelectedReturn(storedDate2);
            }
          }
        } catch (error) {}
      }
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFlight = localStorage.getItem("defaultflight");

      if (storedFlight) {
        try {
          const flightData = JSON.parse(storedFlight);

          if (flightData?.from) {
            setFromCity(flightData.from);
          }
          if (flightData?.to) {
            setToCity(flightData.to);
          }

          if (flightData?.journytype) {
            setjurnytype(flightData.journytype);
          }
        } catch (error) {}
      }
    }
  }, []);



  const handleCitySelect = (city) => {
    if (selectedOption === "from") {
      setFromCity(city.properties);
    } else if (selectedOption === "to") {
      setToCity(city.properties);
    }
    setIsVisible(false);
  };



  const handleVisibilityChange = (value) => {
    setIsVisible(value);
  };



  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  useEffect(() => {
    dispatch(getTopAirPorts());
    dispatch(getip());
  }, []);



  const handleClick = (option) => {
    setSelectedOption(option);
    setIsVisible(true);

    // switch (option) {
    //   case "from":
    //     handleFromClick();
    //     break;
    //   case "to":
    //     handleToClick();
    //     break;
    //   case "traveller":
    //     handleToClick(); // Add the appropriate handler for traveller
    //     break;
    //   default:
    //
    // }
  };



  const dropdownRef = useRef(null);



  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };



  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  

  const handelSearch = () => {
    localStorage.setItem(
      "defaultflight",
      JSON.stringify({
        from: fromCity,
        to: toCity,
        timeDate: selected,
        retuntime: selectedReturn,
        journytype: JourneyType,
      })
    );

    const date = new Date(selected);

    const offset = 6 * 60 * 55 * 1000;

    const localDate = new Date(date.getTime() + offset);
    const localFormattedDate = localDate.toISOString().slice(0, 19);
    let searchUrl;
    if (JourneyType == 1) {
      searchUrl = `/flightto=${fromCity.iata}&from=${toCity.iata}&date=${localFormattedDate}&prfdate=${localFormattedDate}&JourneyType=${JourneyType}&adultcount=${adultCount}&childCount=${childCount}&infantCount=${infantCount}&selectedClass=${selectedClass}`;
    } else if (JourneyType == 2) {
      if (!selectedReturn) {
        toast.warn("Select Return Date", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        const retundate = new Date(selectedReturn);

        const r_localDate = new Date(retundate.getTime() + offset);
        const r_localFormattedDate = r_localDate.toISOString().slice(0, 19);
        searchUrl = `/flightto=${fromCity.iata}&from=${toCity.iata}&date=${localFormattedDate}&prfdate=${localFormattedDate}&JourneyType=${JourneyType}&adultcount=${adultCount}&childCount=${childCount}&infantCount=${infantCount}&selectedClass=${selectedClass}&returndate=${r_localFormattedDate}`;
      }
    }

    route.push(searchUrl);
  };



  const handleRangeChange = (newRange) => {
    const date = new Date(newRange.year, newRange.month - 1, newRange.day);

    setSelected(date);
    handleClick("");
  };



  const handelreturn = (newRange) => {
    const date = new Date(newRange.year, newRange.month - 1, newRange.day);

    setSelectedReturn(date);

    handleClick("");
  };
  const t = useTranslations("Navbar2");


  const [dropdowns, setDropdowns] = useState({
    coach: {
      isOpen: false,
      selected: "Coach",
      data: ["Coach", "Premium Economy", "Business", "First"],
    },
    cheapFlight: {
      isOpen: false,
      selected: "Cheap Flights",
      data: ["AirAsia", "EasyJet", "Ryanair", "JetBlue", "Spirit Airlines"],
    },
  });
  const dropCoachandCheap = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropCoachandCheap.current &&
        !dropCoachandCheap.current.contains(event.target)
      ) {
        setDropdowns((prev) => ({
          coach: { ...prev.coach, isOpen: false },
          cheapFlight: { ...prev.cheapFlight, isOpen: false },
        }));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdownToggle = (type) => {
    setDropdowns((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        isOpen: !prev[type].isOpen,
      },
    }));
  };

  const handleSelectOption = (type, value) => {
    setDropdowns((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        isOpen: false,
        selected: value,
      },
    }));
  };

  const [DefnceStudentMore, setDefnceStudentMore] = useState(null);
  const DefnceStudentMoreHandler = (selectedOption) => {
    setDefnceStudentMore((prevVal) =>
      prevVal && prevVal.id === selectedOption.id ? null : selectedOption
    );
  };

  const options = [
    { id: 1, label: "Defence Force" },
    { id: 2, label: "Student" },
    { id: 3, label: "Senior Citizens" },
    { id: 4, label: "Doctors & Nurses" },
  ];

  const topAndBottomDropDown = {
    topFeaturestopDropDown: [
      {
        heading: "List Your Property",
        list: [
          {
            link: "",
            listName: "Benefits of Booking Directly",
          },
          {
            link: "",
            listName: "Custom Travel Guidance with Experts",
          },
          {
            link: "",
            listName: "24-Hour Cancellation",
          },
        ],
      },
      {
        heading: "Business Associates",
        list: [
          {
            link: "",
            listName: "Benefits of Booking Directly",
          },
          {
            link: "",
            listName: "Custom Travel Guidance with Experts",
          },
          {
            link: "",
            listName: "24-Hour Cancellation",
          },
        ],
      },
      {
        heading: "Corporate Travel Desc",
        list: [
          {
            link: "",
            listName: "Benefits of Booking Directly",
          },
          {
            link: "",
            listName: "Custom Travel Guidance with Experts",
          },
          {
            link: "",
            listName: "24-Hour Cancellation",
          },
        ],
      },
    ],
    HomeBookTravelBuinessBottomDropDown: [
      {
        heading: "Home",
        listData: [
          {
            link: "/",
            list: " ApkaTrip.com",
          },
          {
            link: "",
            list: " Our Approach",
          },
          {
            link: "",
            list: " Responsibe Tourism",
          },
          {
            link: "/ATI/loyalty-program/",
            list: "Membership & Loyalty Program",
          },
          {
            link: "",
            list: "News & Updates",
          },
          {
            link: "",
            list: "Careers",
          },
          {
            link: "/condition/privacy-policy",
            list: "Privacy Policy",
          },
          {
            link: "/condition/terms-condition",
            list: "Terms & Conditions",
          },
        ],
      },

      {
        heading: "Book",
        listData: [
          {
            link: "/flight",
            list: " Book Flight",
          },
          {
            link: "/hotels",
            list: " Book Hotels",
          },
          {
            link: "/holidayspackage",
            list: "Holiday Packages",
          },
          {
            link: "/activities",
            list: "Group Tours",
          },
          {
            link: "",
            list: "Car Rental",
          },
          {
            link: "/buses",
            list: "Bus Tickets",
          },
        ],
      },
      {
        heading: "Travel Assistance",
        listData: [
          {
            link: "",
            list: "Customer Support",
          },
          {
            link: "",
            list: "Check Booking Status",
          },
          {
            link: "/web-check",
            list: "Web Check-in",
          },
          {
            link: "",
            list: "Flight Status",
          },
          {
            link: "",
            list: "PNE Status Check",
          },
          {
            link: "",
            list: "Local Guides",
          },
        ],
      },

      {
        heading: "Services",
        listData: [
          {
            link: "/flight",
            list: "Flights",
          },
          {
            link: "/hotels",
            list: "Hotels",
          },
          {
            link: "",
            list: "Apartments",
          },
          {
            link: "",
            list: "Resorts",
          },

          {
            link: "",
            list: "Vilas",
          },

          {
            link: "",
            list: "Homestay",
          },

          {
            link: "",
            list: "Transfers",
          },

          {
            link: "/buses",
            list: "Bus Tickets",
          },
          {
            link: "/cruise",
            list: "Cruises",
          },
          {
            link: "",
            list: "Charter Services",
          },
          {
            link: "/holidayspackage",
            list: "Holiday Packages",
          },
          {
            link: "/atl/atipro",
            list: "Elite Lucuary",
          },
          {
            link: "",
            list: "Visa Services",
          },
          {
            link: "",
            list: "Forex Currency Exchange",
          },
          {
            link: "/train",
            list: "Train Services",
          },
          {
            link: "",
            list: "Seminars & Conferences",
          },
          {
            link: "",
            list: "Advertisments",
          },
        ],
      },

      {
        heading: "Blogs",
        listData: [
          {
            link: "",
            list: "Top 10 Must-Visit Destinations in 2024",
          },
          {
            link: "",
            list: "A Guide to Budget-Friendly Travel",
          },
          {
            link: "",
            list: "How to Plan a Perfect Family Vacation",
          },
          {
            link: "",
            list: "Exploring Offbeat Locations in India",
          },
        ],
      },
      {
        heading: "Business Assistance",
        listData: [
          {
            link: "/user",
            list: "Extranet Login",
          },
          {
            link: "/property-listing",
            list: "List Your Property",
          },
          {
            link: "",
            list: "Become an Affiliate",
          },
          {
            link: "",
            list: "Business Associates Support",
          },
        ],
      },
    ],
  };


  const [topDropdown, setTopDropdown] = useState(null);
  const [bottomDropdown, setBottomDropdown] = useState(null);

  const [toogleBtnn, settoogleBtnn] = useState(false);

  const [fromcity, setfromcity] = useState("FromCity");
  const [AnyWhere, setAnyWhere] = useState("anyWhere");

  const  getCal = useSelector((state) => state.calendar);


  const [calData, setcalData] = useState({
    JourneyType: 1,
    EndUserIp: '223.178.208.151',
    Segments: [
      {
        Origin: fromCity.iata,
        Destination: toCity.iata,
        PreferredDepartureTime: dateOfJourney,
        FlightCabinClass: 1
      },
    ],


  });

  useEffect(() => {
    // Update `calData` dynamically
    const updatedCalData = {
      JourneyType: 1,
      EndUserIp: '223.178.208.151',
      Segments: [
        {
          Origin: fromCity.iata,
          Destination: toCity.iata,
          PreferredDepartureTime: dateOfJourney,
          FlightCabinClass: 1,
        },
      ],
    };
  
    if (fromCity.iata && toCity.iata) {
     
  
      dispatch(getCalendarFare(updatedCalData));
    }
  }, [dispatch, fromCity.iata, toCity.iata, dateOfJourney]); // Add `dateOfJourney` to dependencies if it affects the call
  

  const handelSwap = () => {
    setFromCity(toCity);
    setToCity(fromCity);
    settoogleBtnn(!toogleBtnn);
  };

  const CaldataOrg = getCal?.fares?.Response;

  







 

  const tileContent = ({ date, view }) => {

    if (view === "month") {
      const dateKey = date.toISOString().split("T")[0];

      const getFAreData = CaldataOrg?.SearchResults;
    
      return getFAreData[dateKey] ? (
        <div className="price">{getFAreData[dateKey]}</div>
      ) : null;
    }
  };


  function formatPrice(amount, currency = 'INR', locale = 'en-US') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0, 
    }).format(amount);
  }


  

  const tileContent2 = ({ date, view }) => {
    if (view === "month") {
      const dateKey = date.toISOString().split("T")[0]; 
      const getFAreData = CaldataOrg?.SearchResults; 
      console.log('dwfrefreft4f',CaldataOrg)

  
      if (Array.isArray(getFAreData)) {

        const fareDataForDate = getFAreData.find(
          (item) => item.DepartureDate.split("T")[0] === dateKey
        );


  
        if (fareDataForDate) {
          const { Fare,BaseFare, IsLowestFareOfMonth, AirlineCode } = fareDataForDate;
  
          // Render the content for the date
          return (
            <div className="price">
              <div>{formatPrice(Fare)}</div>
            
            </div>
          );
        }
      }
    }
    return null;
  };
  

  // tileContent2()

  return (
    <>
      <div className="header relative  md:px-5  lg:px-12 xl:px-24">
        <div className=" bg-[#002043] h-[15rem] absolute inset-0  -z-10" />
        <div className="w-full flex md:justify-end	">
        <div className="w-full md:w-fit">
            <ul className="text-black lastNavigation bg-gray-100   px-2 w-full  md:mx-end   md:px-5   text-sm py-2  gap-0 md:gap-3 grid grid-cols-3  md:flex  lg:w-full items-center justify-between shadow-md"
             onMouseLeave={() => setBottomDropdown(null)}>
              {topAndBottomDropDown.HomeBookTravelBuinessBottomDropDown.map(
                (elm, index) => (
                  <li
                    onMouseEnter={() => setBottomDropdown(index)}
                    key={index}
                    className="relative group"
                  >
                    <div>
                      <button className="flex text-[11.5px] md:text-sm text-nowrap items-center md:gap-1 hover:text-blue-500">
                        {elm.heading}
                        <IoIosArrowDown
                          className={`${
                            bottomDropdown === index ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {bottomDropdown === index && (
                        <ul
                          onMouseLeave={() => setBottomDropdown(null)}
                          className={`  absolute  z-40  bg-white border border-gray-300 rounded-lg shadow-md w-max py-2 ${index==0 || index==3?"left-0":" right-0"}  `}
                        >
                          {elm.listData?.map((item, idx) => (
                            <li
                              key={idx}
                              className="px-4 py-2 text-sm hover:bg-gray-100 hover:text-blue-500 cursor-pointer"
                            >
                              <Link href={item.link}>{item.list}</Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <TypeWriterHeaderEffect />

        <div className="flex flex-col   bg-white lg:block rounded-lg  text-white   ">
          <div className="bg-gray-200 rounded-sm shadow ">
            <Navbar />
          </div>

          <div className=" px-4 border-b-2 shadow-sm  space-y-2 py-3 ">
            <div className="tabs 1stTab text-sm text-nowrap  md:text-sm  flex  md:gap-2 font-bold text-black  ">
              <button
                className={`md:px-4 py-1  font-bold rounded-3xl ${
                  JourneyType === 1 ? "bg-white text-[#000]" : ""
                } transition-colors duration-300 ease-in-out`}
                onClick={() => handleTabClick(1)}
              >
                {t("oneway")}
              </button>
              <button
                className={`px-4 py-1 font-bold rounded-3xl ${
                  JourneyType === 2 ? "bg-white text-[#000]" : ""
                } transition-colors duration-300 ease-in-out`}
                onClick={() => handleTabClick(2)}
              >
                {t("roundtrip")}
              </button>
              <button
                className={`md:px-4 py-1  font-bold rounded-3xl ${
                  JourneyType === 3 ? "bg-white text-[#000]" : ""
                } transition-colors duration-300 ease-in-out`}
                onClick={() => handleTabClick(3)}
              >
                {t("multicity")}
              </button>
              <div className="relative" ref={dropCoachandCheap}>
                <button
                  onClick={() => handleDropdownToggle("coach")}
                  className="flex items-center text-[#2F82EC] justify-center gap-1 md:justify-between md:gap-3 w-full px-4 py-2 "
                >
                  {dropdowns.coach.selected}
                  <span>
                    <IoIosArrowDown
                      className={`transition-transform ${
                        dropdowns.coach.isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </span>
                </button>

                {dropdowns.coach.isOpen && (
                  <div className="absolute left-0 z-20 mt-2 md:w-[250px] bg-white border border-gray-200 rounded-lg shadow-lg">
                    {dropdowns.coach.data.map((item, index) => (
                      <button
                        key={index}
                        className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                        onClick={() => handleSelectOption("coach", item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* <div className="tab-content bg-red-400">
              {activeTab === 1 && (
                <>
                  <div className="bg-white custom-shadow grid grid-cols-2 gap-0 border-gray-300">
                  <div className="flex  items-center">
                  <div className="relative">
                  
                      <div
                        onClick={() => handleClick("from")}
                        className="flex flex-col bg-white  h-full px-4 py-2 rounded-tl-lg rounded-bl-lg border-r hover:bg-[#ECF5FE] cursor-pointer"
                      >
                        <p className="text-sm text-[#7E7979] font-medium">
                          {t("From")}
                        </p>
                        <span className="text-3xl py-1 text-black font-bold">
                          {fromCity.municipality}
                        </span>
                        <p className="text-black text-xs truncate">
                          [{fromCity.name}] {fromCity.iata}
                        </p>
                      </div>
                      {isVisible && selectedOption === "from" && (
                        <div>
                          <AutoSearch
                            value="From"
                            Click={setIsVisible}
                            handleClosed={handleVisibilityChange}
                            onSelect={handleCitySelect}
                          />
                        </div>
                      )}
                    </div>
                    <button
                onClick={() => setdirectionChnageToogle(!directionChnageToogle)}
                className={`rounded-full bg-red-400 h-10 w-10  border-2 p-1 text-4xl flex flex-col justify-center  items-center duration-200 ${
                  directionChnageToogle && "rotate-180"
                }`}
              >
                <FaArrowRightLong className="rotate-180" />
                <FaArrowRightLong />
                  </button>
                    <div className="relative">
                      <div
                        onClick={() => handleClick("to")}
                        className="flex flex-col px-4 py-2 h-full  bg-white border-r hover:bg-[#ECF5FE]"
                      >
                        <label className="text-sm text-[#7E7979] font-medium">
                          {t("To")}
                        </label>
                        <span className="text-3xl py-1 text-black font-bold">
                          {toCity.municipality}
                        </span>
                        <p className="text-black text-xs truncate">
                          [{toCity.name}] {toCity.iata}
                        </p>
                      </div>

                      {isVisible && selectedOption === "to" && (
                        <div>
                          <AutoSearch
                            value="To"
                            fromCity={fromCity}
                            Click={setIsVisible}
                            handleClosed={handleVisibilityChange}
                            onSelect={handleCitySelect}
                          />
                        </div>
                      )}
                    </div>
                  </div>


                  <div className="grid grid-cols-4">
                  <div className="relative">
                      <div
                        onClick={() => handleClick("date")}
                        className="flex h-full flex-col  px-4 py-2 bg-white  border-r hover:bg-[#ECF5FE]"
                      >
                        <label className="text-sm text-[#7E7979] font-medium">
                          {t("Departure Date")}
                        </label>
                        {!selected && (
                          <div className="text-black font-bold">
                            Select a Date
                          </div>
                        )}
                        {selected && (
                          <>
                            <div className="flex  items-baseline text-black">
                              <span className="text-3xl py-1 pr-1 text-black font-bold">
                                {" "}
                                {selected.getDate()}
                              </span>
                              <span className="text-sm font-semibold">
                                {selected.toLocaleString("default", {
                                  month: "short",
                                })}
                                '
                              </span>
                              <span className="text-sm font-semibold">
                                {" "}
                                {selected.getFullYear()}
                              </span>
                              <FaCalendarWeek className="text-[#d3cfcf] ml-5 text-xl" />
                            </div>
                            <p className="text-black text-xs">
                              {selected.toLocaleDateString()}
                            </p>
                          </>
                        )}
                      </div>

                      {isVisible && selectedOption === "date" && (
                        <div className="bg-white text-black p-5 shadow-2xl absolute top-full left-0 mt-2 z-10">
                          <Calendar
                            aria-label="Select a date"
                            value={""}
                            onChange={handleRangeChange}
                            minValue={currentDate}
                          />
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <div
                        className="flex h-full flex-col   px-4 py-2 bg-white  border-r hover:bg-[#ECF5FE]"
                        onClick={() => handleClick("return")}
                      >
                        <label className="text-sm text-[#7E7979] font-medium">
                          {t("Return Date")}
                        </label>
                        {!selectedReturn && (
                          <div className="text-black font-bold h-full align-bottom">
                            Select Return Flight
                          </div>
                        )}
                        {selectedReturn && (
                          <>
                            <div className="flex items-baseline text-black">
                              <span className="text-3xl py-1 pr-1 text-black font-bold">
                                {" "}
                                {selectedReturn.getDate()}
                              </span>
                              <span className="text-sm font-semibold">
                                {" "}
                                {selectedReturn.toLocaleString("default", {
                                  month: "short",
                                })}
                                '
                              </span>
                              <span className="text-sm font-semibold">
                                {selectedReturn.toLocaleDateString()}
                              </span>
                              <FaCalendarWeek className="text-[#d3cfcf] ml-5 text-xl" />
                            </div>
                            <p className="text-black text-xs">
                              {selectedReturn.getFullYear()}
                            </p>
                          </>
                        )}
                      </div>
                      {isVisible && selectedOption === "return" && (
                        <div className="bg-white text-black p-5 shadow-2xl absolute top-full left-0 mt-2 z-10">
                          <Calendar
                            aria-label="Select a date"
                            value={""}
                            onChange={handelreturn}
                            minValue={currentDate}
                            disabledDatesClassName=" opacity-50"
                          />
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <div
                        className="flex flex-col   px-4 py-2 bg-white border-r hover:bg-[#ECF5FE]"
                        onClick={() => handleClick("traveller")}
                      >
                        <label className="text-sm text-[#7E7979] font-medium">
                          {t("Travelers")}
                        </label>
                        <div className="flex items-center text-black">
                          <span className="text-3xl py-1 pr-1 text-black font-bold">
                            1
                          </span>
                          <span className="text-sm font-semibold flex items-center gap-1">
                            Traveller(s) <FaChevronDown />
                          </span>
                        </div>
                        <p className="text-black text-xs">Economy</p>
                      </div>
                      {isVisible && selectedOption === "traveller" && (
                        <div ref={dropdownRef}>
                          <TravellerDropdown
                            setIsGroup={setIsGroup}
                            adultCount={adultCount}
                            setAdultCount={setAdultCount}
                            childCount={childCount}
                            setChildCount={setChildCount}
                            infantCount={infantCount}
                            setInfantCount={setInfantCount}
                            isGroup={isGroup}
                            setSelectedClass={setSelectedClass}
                            selectedClass={selectedClass}
                            handleClick={handleClick}
                            value="From"
                          />
                        </div>
                      )}
                    </div>

                    <button
                    onClick={handelSearch}
                    className="text-white flex items-center justify-center text-2xl font-bold p-4 primary-col rounded-br-lg rounded-tr-lg"
                  >
                    Search
                  </button>

                    <button
                      onClick={handelSearch}
                      className="bg-[#0A5EB0] font-bold  text-xl rounded-md  text-white "
                    >
                      Search Flights
                    </button>


                  </div>
             
                  </div>
                </>
              )}
            </div> */}

            <div className="tabs FromDateDeapt grid grid-cols-1 gap-5 xl:grid-cols-2 xl:gap-3">
              <div className="grid relative gap-3 md:grid-cols-2">
                <div className="relative">
                  <div
                    onClick={() => {
                      setSelectedOption("from"), setIsVisible(true);
                    }}
                    className="1stInput relative rounded gap-1 h-[4rem]  flex items-center px-3  border border-slate-400 text-black"
                  >
                    <IoLocationSharp className="text-xl" />

                    <button
                      className="absolute rounded-full text-white  bg-gray-400 right-0 -top-[2px] bg"
                      onClick={() => setfromcity(false)}
                    >
                      {" "}
                      <RxCross2 />
                    </button>
                    <div className="flex flex-col">
                      <span className="text-[22px] lg:text-2xl  text-black font-bold">
                        {fromCity.municipality}
                      </span>
                      <p className="text-black text-xs truncate">
                        [{fromCity.name}] {fromCity.iata}
                      </p>
                    </div>
                  </div>
                  {isVisible && selectedOption === "from" && (
                    <div>
                      <AutoSearch
                        value="From"
                        Click={setIsVisible}
                        handleClosed={handleVisibilityChange}
                        onSelect={handleCitySelect}
                      />
                    </div>
                  )}
                </div>
                <div
                  onClick={handelSwap}
                  className={`absolute z-10 right-[45%] top-14 md:left-[48%] lg:left-[47%] md:top-4 border py-[2px] border-gray-800 bg-white h-8 w-8 lg:h-[34px] lg:w-[34px] rounded-full flex justify-center items-center flex-col text-black transition-transform duration-300 ${
                    toogleBtnn
                      ? "rotate-180 md:rotate-180"
                      : "rotate-90 md:rotate-0"
                  }`}
                >
                  <FaArrowRightLong className="text-lg " />
                  <FaArrowRightLong className="rotate-180 text-lg" />
                </div>

                <div className="relative">
                  <div
                    onClick={() => {
                      setSelectedOption("to"), setIsVisible(true);
                    }}
                    className="2ndtInput relative  rounded gap-1 h-[4rem] flex items-center px-3  border border-slate-400 text-black"
                  >
                    <IoLocationSharp className="text-xl" />

                    <button
                      className="absolute rounded-full text-white  bg-gray-400 right-0 -top-[2px] bg"
                      onClick={() => setAnyWhere(false)}
                    >
                      {" "}
                      <RxCross2 />
                    </button>

                    <div className="flex flex-col">
                      <span className="text-[22px] lg:text-2xl  text-black font-bold">
                        {toCity.municipality}
                      </span>
                      <p className="text-black text-xs truncate">
                        [{toCity.name}] {toCity.iata}
                      </p>
                    </div>
                  </div>
                  {isVisible && selectedOption === "to" && (
                    <div>
                      <AutoSearch
                        value="To"
                        fromCity={fromCity}
                        Click={setIsVisible}
                        handleClosed={handleVisibilityChange}
                        onSelect={handleCitySelect}
                      />
                    </div>
                  )}
                </div>
              </div>



              <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
                <div className="relative">
                  <div
                    onClick={() => {
                      setSelectedOption("date"), setIsVisible(true);
                    }}
                    className="flex items-center h-[4rem] gap-2 px-4 py-1 border-2 text-black border-slate-200  rounded-md"
                  >
                    {/* <FaCalendarAlt className="" /> */}
                    <div className="text-slate-400">
                      {selected && (
                        <>
                          <div className="flex  items-baseline text-black">
                            <span className="text-3xl py-1 pr-1 text-black font-bold">
                              {" "}
                              {selected.getDate()}
                            </span>
                            <span className="text-sm font-semibold">
                              {selected.toLocaleString("default", {
                                month: "short",
                              })}
                              '
                            </span>
                            <span className="text-sm font-semibold">
                              {" "}
                              {selected.getFullYear()}
                            </span>
                            <FaCalendarWeek className="text-[#d3cfcf] ml-5 text-xl" />
                          </div>
                          <p className="text-black text-xs pb-2">
                            {selected.toLocaleDateString()}
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {isVisible && selectedOption === "date" && (
                    <div className="bg-white text-black p-5 shadow-2xl absolute top-full left-0 mt-2 z-10">
                      {/* <Calendar
                            aria-label="Select a date"
                            value={""}
                            onChange={handleRangeChange}
                            minValue={currentDate}
                          /> */}

                      <Calendar
                       
                        onChange={handleDateChange}
                        value={""}
                        minDate={new Date()}
                        tileContent={tileContent2}
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-start gap-2 px-3 py-2 border-2 text-black border-slate-200  rounded-md">
                  <FaCalendarAlt className="text-lg mt-1" />
                  <div className="text-slate-400">
                    <h5>Return</h5>
                    <p className="text-slate-400 text-xs">Date</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 px-3 py-2 border-2 text-black border-slate-200  rounded-md">
                  <FaUserLarge className="text-lg mt-1" />
                  <div className="text-slate-400">
                    <h5 className="font-bold text-lg text-black">1</h5>
                    <p className="text-slate-400 text-xs">Traveller</p>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <button
                    onClick={handelSearch}
                    className="bg-[#0A5EB0] w-full md:w-fit  py-2 px-3  font-semibold  text-lg rounded-md  text-white "
                  >
                    Search Flights
                  </button>
                </div>
              </div>
            </div>

            <div className="tab-content">
              {activeTab === 2 && (
                <div className="bg-white custom-shadow grid grid-cols-6 gap-0 border-gray-300">
                  <div
                    className="flex flex-col bg-white relative px-4 py-2 rounded-tl-lg rounded-bl-lg border-r hover:bg-[#ECF5FE] cursor-pointer"
                    onClick={() => handleClick("from")}
                  >
                    <p className="text-sm text-[#7E7979] font-medium">
                      {t("From")}
                    </p>
                    <span className="text-3xl py-1 text-black font-bold">
                      {fromCity.name}
                    </span>
                    <p className="text-black text-xs truncate">
                      [{fromCity.code}] {fromCity.airport}
                    </p>
                    {isVisible && selectedOption === "from" && (
                      <div ref={dropdownRef}>
                        <AutoSearch
                          Click={setIsVisible}
                          value="From"
                          handleClosed={handleVisibilityChange}
                          onSelect={handleCitySelect}
                        />
                      </div>
                    )}
                  </div>

                  <div
                    className="flex flex-col px-4 py-2 relative bg-white border-r hover:bg-[#ECF5FE]"
                    onClick={() => handleClick("to")}
                  >
                    <label className="text-sm text-[#7E7979] font-medium">
                      {t("To")}
                    </label>
                    <span className="text-3xl py-1 text-black font-bold">
                      {toCity.name}
                    </span>
                    <p className="text-black text-xs truncate">
                      [{toCity.code}] {toCity.airport}
                    </p>
                    {isVisible && selectedOption === "to" && (
                      <div ref={dropdownRef}>
                        <AutoSearch
                          Click={setIsVisible}
                          value="To"
                          handleClosed={handleVisibilityChange}
                          onSelect={handleCitySelect}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col  px-4 py-2 bg-white  border-r hover:bg-[#ECF5FE]">
                    <label className="text-sm text-[#7E7979] font-medium">
                      {t("Departure Date")}
                    </label>

                    <div className="flex items-baseline text-black">
                      <span className="text-3xl py-1 pr-1 text-black font-bold">
                        {" "}
                        {currentDateComponents.day}
                      </span>
                      <span className="text-sm font-semibold">
                        {months[currentDateComponents.month]}'
                      </span>
                      <span className="text-sm font-semibold">
                        {" "}
                        {currentDateComponents.year}
                      </span>
                      <FaCalendarWeek className="text-[#d3cfcf] ml-5 text-xl" />
                    </div>
                    <p className="text-black text-xs">
                      {currentDateComponents.dayOfWeek}
                    </p>
                  </div>
                  <div className="flex flex-col  px-4 py-2 bg-white  border-r hover:bg-[#ECF5FE]">
                    <label className="text-sm text-[#7E7979] font-medium">
                      {t("Return Date")}
                    </label>
                    <div className="flex items-baseline text-black">
                      <span className="text-3xl py-1 pr-1 text-black font-bold">
                        {" "}
                        {futureDateComponents.day}
                      </span>
                      <span className="text-sm font-semibold">
                        {" "}
                        {months[futureDateComponents.month]}'
                      </span>
                      <span className="text-sm font-semibold">
                        {futureDateComponents.year}
                      </span>
                      <FaCalendarWeek className="text-[#d3cfcf] ml-5 text-xl" />
                    </div>
                    <p className="text-black text-xs">
                      {futureDateComponents.dayOfWeek}
                    </p>
                  </div>
                  <div
                    className="flex flex-col relative  px-4 py-2 bg-white border-r hover:bg-[#ECF5FE]"
                    onClick={() => handleClick("traveller")}
                  >
                    <label className="text-sm text-[#7E7979] font-medium">
                      {t("Travelers")}
                    </label>
                    <div className="flex items-center text-black">
                      <span className="text-3xl py-1 pr-1 text-black font-bold">
                        1
                      </span>
                      <span className="text-sm font-semibold flex items-center gap-1">
                        Traveller(s) <FaChevronDown />
                      </span>
                    </div>
                    <p className="text-black text-xs">Economy</p>

                    {isVisible && selectedOption === "traveller" && (
                      <div ref={dropdownRef}>
                        <TravellerDropdown value="From" />
                      </div>
                    )}
                  </div>
                  <Link
                    href=""
                    className="text-white flex items-center justify-center text-2xl font-bold p-4 primary-col  rounded-br-lg rounded-tr-lg"
                  >
                    Search
                  </Link>
                </div>
              )}
            </div>

            <div className="tab-content">
              {activeTab === 3 && (
                <div className="bg-white custom-shadow grid grid-cols-4 gap-0 border-gray-300">
                  <div
                    className="flex flex-col bg-white relative px-4 py-2 rounded-tl-lg rounded-bl-lg border-r border-b hover:bg-[#ECF5FE] cursor-pointer"
                    onClick={() => handleClick("from")}
                  >
                    <p className="text-sm text-[#7E7979] font-medium">
                      {t("From")}
                    </p>
                    <span className="text-3xl py-1 text-black font-bold">
                      {fromCity.municipality}
                    </span>
                    <p className="text-black text-xs truncate">
                      [{fromCity.name}] {fromCity.airport}
                    </p>
                    {isVisible && selectedOption === "from" && (
                      <div ref={dropdownRef}>
                        <AutoSearch
                          Click={setIsVisible}
                          value="From"
                          handleClosed={handleVisibilityChange}
                          onSelect={handleCitySelect}
                        />
                      </div>
                    )}
                  </div>
                  <div
                    className="flex flex-col px-4 py-2 border-b relative bg-white border-r hover:bg-[#ECF5FE]"
                    onClick={() => handleClick("to")}
                  >
                    <label className="text-sm text-[#7E7979] font-medium">
                      {t("To")}
                    </label>
                    <span className="text-3xl py-1 text-black font-bold">
                      {toCity.municipality}
                    </span>
                    <p className="text-black text-xs truncate">
                      [{toCity.name}] {toCity.airport}
                    </p>
                    {isVisible && selectedOption === "to" && (
                      <div ref={dropdownRef}>
                        <AutoSearch
                          Click={setIsVisible}
                          value="To"
                          handleClosed={handleVisibilityChange}
                          onSelect={handleCitySelect}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col  px-4 py-2 bg-white  border-r border-b hover:bg-[#ECF5FE]">
                    <label className="text-sm text-[#7E7979] font-medium">
                      {t("Departure Date")}
                    </label>
                    <div className="flex items-baseline text-black">
                      <span className="text-3xl py-1 pr-1 text-black font-bold">
                        {" "}
                        {currentDateComponents.day}
                      </span>
                      <span className="text-sm font-semibold">
                        {months[currentDateComponents.month]}'
                      </span>
                      <span className="text-sm font-semibold">
                        {" "}
                        {currentDateComponents.year}
                      </span>
                      <FaCalendarWeek className="text-[#d3cfcf] ml-5 text-xl" />
                    </div>
                    <p className="text-black text-xs">
                      {currentDateComponents.dayOfWeek}
                    </p>
                  </div>
                  <div className="flex flex-col  px-4 py-2 bg-white border-b rounded-tr-lg hover:bg-[#ECF5FE]">
                    <label className="text-sm text-[#7E7979] font-medium">
                      {t("Travelers")}
                    </label>
                    <div className="flex items-center text-black">
                      <span className="text-3xl py-1 pr-1 text-black font-bold">
                        1
                      </span>
                      <span className="text-sm font-semibold flex items-center gap-1">
                        Traveller(s) <FaChevronDown />
                      </span>
                    </div>
                    <p className="text-black text-xs">Economy</p>
                  </div>

                  <div
                    className="flex flex-col bg-white relative px-4 py-2 rounded-tl-lg rounded-bl-lg border-r hover:bg-[#ECF5FE] cursor-pointer"
                    onClick={() => handleClick("from")}
                  >
                    <p className="text-sm text-[#7E7979] font-medium">
                      {t("From")}
                    </p>
                    <span className="text-3xl py-1 text-black font-bold">
                      {fromCity.name}
                    </span>
                    <p className="text-black text-xs truncate">
                      [{fromCity.code}] {fromCity.airport}
                    </p>
                    {isVisible && selectedOption === "from" && (
                      <div ref={dropdownRef}>
                        <AutoSearch
                          Click={setIsVisible}
                          value="From"
                          handleClosed={handleVisibilityChange}
                          onSelect={handleCitySelect}
                        />
                      </div>
                    )}
                  </div>

                  <div
                    className="flex flex-col px-4 py-2 relative bg-white border-r hover:bg-[#ECF5FE]"
                    onClick={() => handleClick("to")}
                  >
                    <label className="text-sm text-[#7E7979] font-medium">
                      {t("To")}
                    </label>
                    <span className="text-3xl py-1 text-black font-bold">
                      {toCity.name}
                    </span>
                    <p className="text-black text-xs truncate">
                      [{toCity.code}] {toCity.airport}
                    </p>
                    {isVisible && selectedOption === "to" && (
                      <div ref={dropdownRef}>
                        <AutoSearch
                          Click={setIsVisible}
                          value="To"
                          handleClosed={handleVisibilityChange}
                          onSelect={handleCitySelect}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col  px-4 py-2 bg-white  border-r border-b hover:bg-[#ECF5FE]">
                    <label className="text-sm text-[#7E7979] font-medium">
                      {t("Departure Date")}
                    </label>
                    <div className="flex items-baseline text-black">
                      <span className="text-3xl py-1 pr-1 text-black font-bold">
                        {" "}
                        {currentDateComponents.day}
                      </span>
                      <span className="text-sm font-semibold">
                        {months[currentDateComponents.month]}'
                      </span>
                      <span className="text-sm font-semibold">
                        {" "}
                        {currentDateComponents.year}
                      </span>
                      <FaCalendarWeek className="text-[#d3cfcf] ml-5 text-xl" />
                    </div>
                    <p className="text-black text-xs">
                      {currentDateComponents.dayOfWeek}
                    </p>
                  </div>
                  <div className="flex items-center justify-center p-4 bg-white rounded-lg">
                    <div className="flex items-center justify-center  bg-white rounded-lg col-span-4 gap-3">
                      <button className="primary-col border border-[#ef6614] p-3 rounded-full text-white font-semibold">
                        Search
                      </button>
                      <button className="bg-white p-3  border rounded-full border-blue-500 text-blue-500 font-semibold">
                        + Add City
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex  relative gap-4 flex-col lg:flex-row    mt-3 lg:justify-between lg:items-center">
              <nav
                className="defenceColm flex justify-center md:justify-between"
                id="divFamilyFare"
              >
                <ul className="grid   w grid-cols-2 justify-center md:grid-cols-3 lg:flex md:flex-nowrap md:justify-start  gap-3 lg:gap-2  text-xs items-center  p-0 m-0">
                  {/* <li className="mr-5">
                    <label className="container_df  checkmark_df corp-hidden cscshw flex items-center">
                      {t("defenceforces")}
                      <input
                        name="FF"
                        id="chkArmy"
                        type="checkbox"
                        value=""
                        onChange={handleCheckboxChange}
                        className="ml-2"
                      />
                      <span className="checkmark_df"></span>
                    </label>
                   
                  </li>
                  <li className="mr-5">
                    <label className="container_df corp-hidden cscshw flex items-center">
                    
                      {t("students")}
                      <input
                        name="FF"
                        id="chkArmy"
                        type="checkbox"
                        value=""
                        onChange={handleCheckboxChange}
                        className="ml-2"
                      />
                      <span className="checkmark_df"></span>
                    </label>
                  </li>
                  <li className="mr-5">
                    <label className="container_df corp-hidden cscshw flex items-center">
                     
                      {t("seniorcitizens")}
                      <input
                        name="FF"
                        id="chkArmy"
                        type="checkbox"
                        value=""
                        onChange={handleCheckboxChange}
                        className="ml-2"
                      />
                      <span className="checkmark_df"></span>
                    </label>
                  </li>
                  <li className="mr-5">
                    <label className="container_df corp-hidden cscshw flex items-center">
                      
                      {t("doctorsnurses")}
                      <input
                        name="FF"
                        id="chkArmy"
                        type="checkbox"
                        value=""
                        onChange={handleCheckboxChange}
                        className="ml-2"
                      />
                      <span className="checkmark_df"></span>
                    </label>
                  </li> */}

                  {options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => DefnceStudentMoreHandler(option)}
                      className="flex   items-center gap-2 cursor-pointer"
                    >
                      <div className="border border-gray-900 rounded-full h-4 w-4 flex items-center justify-center bg-white shadow-sm">
                        {DefnceStudentMore?.id === option.id && (
                          <IoIosCheckmark className="text-5xl text-green-500" />
                        )}
                      </div>
                      <p className=" font-medium ">{option.label}</p>
                    </button>
                  ))}

                  <li className="mr-5  w-fit ">
                    {/* Cheap Flight Dropdown */}
                    <div className="relative " ref={dropCoachandCheap}>
                      <button
                        onClick={() => handleDropdownToggle("cheapFlight")}
                        className="flex items-center w-full  h-full px-3 py-2  md:p-0   justify-center gap-2 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white md:px-4 md:py-3 lg:py-[3px] rounded-md shadow-md transition-all duration-300"
                        aria-expanded={
                          dropdowns.cheapFlight.isOpen ? "true" : "false"
                        }
                      >
                        {dropdowns.cheapFlight.selected}
                        <span>
                          <IoIosArrowDown
                            className={`transition-transform   font-extrabold duration-300 ${
                              dropdowns.cheapFlight.isOpen
                                ? "rotate-180"
                                : "rotate-0"
                            }`}
                          />
                        </span>
                      </button>

                      {dropdowns.cheapFlight.isOpen && (
                        <div className="absolute  bg-white left-0 z-50 mt-2 py-2 w-max  border border-gray-200 rounded-lg shadow-lg">
                          {dropdowns.cheapFlight.data.map((airline, index) => (
                            <div
                              key={index}
                              onClick={() =>
                                handleSelectOption("cheapFlight", airline)
                              }
                              className="flex items-center justify-start px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-200"
                            >
                              <span className="text-sm font-semibold text-gray-800">
                                {airline}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </li>

                  <Link
                    href="/web-check"
                    rel="noopener noreferrer"
                    className="flex  lg:hidden py-3 w-fit bg-green-500 items-center space-x-2 p-2 border border-white bg-[blue-500] text-white rounded hover:bg-[#49b2f0] transition"
                  >
                    <img
                      src="/Images/Routes/web-checkin-icon-v1.svg"
                      className="w-5"
                      alt="Copy Code"
                    />
                    <span className="text-sm font-bold">Web Check-In</span>
                  </Link>
                </ul>
              </nav>

              <Link
                href="/web-check"
                rel="noopener noreferrer"
                className="hidden lg:flex  w-fit bg-green-500 items-center space-x-2 px-3 py-2 border border-white bg-[blue-500] text-white rounded-md hover:bg-[#49b2f0] transition"
              >
                <img
                  src="/Images/Routes/web-checkin-icon-v1.svg"
                  className="w-5"
                  alt="Copy Code"
                />
                <span className="text-sm font-bold">Web Check-In</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
