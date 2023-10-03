import Navbar from "../components/navbar";
import Carousel from "react-multi-carousel";
import Footer from "../components/footer";
import News from "../components/news";
import React from "react";
import { useState } from "react";
import "./home.css";
import "react-multi-carousel/lib/styles.css";

const p1 = require("../images/1.jpg");
const p2 = require("../images/2.jpg");
const p4 = require("../images/4.jpg");
const p5 = require("../images/5.jpg");
const p6 = require("../images/VID.jpg");
// const p7 = require("../images/7.jpg");

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function Home() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className=" ">
        <Navbar />

        {/* Carousel */}

        <section className="relative">
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

          <Carousel
            swipeable={false}
            draggable={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={2000}
            keyBoardControl={true}
            customTransition="transform 100ms ease-in-out"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            <div className=" ">
              <img className="  h-[70vh] w-[100vw]  mx-auto " src={p1} alt="" />
            </div>
            <div className=" ">
              <img className="  h-[70vh] w-[100vw]  mx-auto " src={p2} alt="" />
            </div>

            <div className=" ">
              <img className="  h-[70vh] w-[100vw]  mx-auto " src={p4} alt="" />
            </div>
            <div className="">
              <img className="h-[70vh] w-[100vw]  mx-auto" src={p5} alt="" />
            </div>
            <div className="">
              <img className="h-[70vh] w-[100vw]  mx-auto " src={p6} alt="" />
            </div>
            {/* <div className="">
            <img className="  h-[70vh] w-[100vw]  mx-auto" src={p7} alt="" />
          </div> */}
          </Carousel>
          <div className="absolute inset-0 z-20 flex items-center justify-center text-[#f2c744] text-3xl font-bold">
            Uniting Heroes
            <br /> in times of crisis.
          </div>
          <button
            className="absolute bottom-4  w-36 h-36 text-bold right-4 z-20 text-slate-800 rounded-full md:w-48 md:h-48 flex items-center justify-center hover:bg-red-400  bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium text-lg px-5 py-2.5 text-center mr-2 mb-2"
            onClick={() => setShowModal(true)}
          >
            Report a Disaster
          </button>

          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">Report</h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <form>
                        <div className="mb-4">
                          <label
                            htmlFor="disasterType"
                            className="block font-medium mb-2"
                          >
                            Type of Disaster
                          </label>
                          <select
                            id="disasterType"
                            name="disasterType"
                            className="w-full px-4 py-2 border rounded-md"
                          >
                            <option value="earthquake">Earthquake</option>
                            <option value="floods">Floods</option>
                            <option value="hurricane">Hurricane</option>
                            <option value="fire">Fire</option>
                            <option value="tornado">Tornado</option>
                            <option value="tsunami">Tsunami</option>
                            <option value="volcano">
                              Volcano Eruption
                            </option>{" "}
                            <option value="earthquake">Earthquake</option>
                            <option value="floods">Floods</option>
                            <option value="hurricane">Hurricane</option>
                            <option value="fire">Fire</option>
                          </select>
                        </div>

                        <div className="mb-4">
                          <label className="block font-medium mb-2">
                            Severity of Disaster
                          </label>
                          <div className="flex space-x-4">
                            <label>
                              <input
                                type="radio"
                                name="severity"
                                value="green"
                                className="mr-2 hidden"
                              />
                              <div className="w-12 h-12 bg-green-500 rounded-full cursor-pointer"></div>
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="severity"
                                value="yellow"
                                className="mr-2 hidden"
                              />
                              <div className="w-12 h-12 bg-yellow-500 rounded-full cursor-pointer"></div>
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="severity"
                                value="red"
                                className="mr-2 hidden"
                              />
                              <div className="w-12 h-12 bg-red-500 rounded-full cursor-pointer"></div>
                            </label>
                          </div>
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="contactDetails"
                            className="block font-medium mb-2"
                          >
                            Contact Details
                          </label>
                          <input
                            type="text"
                            id="contactDetails"
                            name="contactDetails"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Enter contact details"
                          />
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor="location"
                            className="block font-medium mb-2"
                          >
                            Location
                          </label>
                          <input
                            type="text"
                            id="location"
                            name="location"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Enter location"
                          />
                        </div>
                      </form>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </section>

        <div className="lg:px-20 md:bg-yellow-100">
          <News />
        </div>
      </div>
      <div className="w-full lg:relative fixed bottom-0">
        <Footer />
      </div>
    </>
  );
}

export default Home;
