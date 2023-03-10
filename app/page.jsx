'use client'
import { useEffect, useRef } from "react"
import Image from "next/image"
import mathsImage from '../images/mathss.jpg'
import cloudImage from '../images/cloudd.jpg'
import cloudImage2 from '../images/cloudd2.jpg'
import frontEndImage from '../images/frontEnd.jpg'
import securityImage from '../images/security.jpg'
import appImage from '../images/app.jpg'
import rustImage from '../images/rust.jpg'
import Overview from "./components/Overview"

export default function Home() {
  let originalPosition = useRef()
  let currentPosition = useRef()
  let snapTime = useRef(true)
  let currentElement = useRef(null)
  let overviewElement = useRef(null)
  let coursesListElement = useRef(null)
  let trigger = useRef(false)
  let firstCourse = useRef(false)
  let course1__image1 = useRef(null)
  let course1__image2 = useRef(null)
  let course1__wrapper1 = useRef(null)
  let course1__wrapper2 = useRef(null)
  let trans = useRef(true)
  const swipeStart = (e) => {
    console.log(coursesListElement.current.scrollTop)
    currentElement.current = e.target 
    originalPosition.current = [e.touches[0].clientX, e.touches[0].clientY]
    currentPosition.current = [e.touches[0].clientX, e.touches[0].clientY]
    snapTime.current = true
    setTimeout(() => {
      snapTime.current = false
    }, 1000)
  }
  const swipeMove = (e) => {
    currentPosition.current = [e.touches[0].clientX, e.touches[0].clientY]
  }
  const swipeEnd = () => {
    if(currentPosition.current[0] === originalPosition.current[0] && currentPosition.current[1] === originalPosition.current[1])return
    if(snapTime.current != true)return
    console.log(currentElement.current, overviewElement.current)
    let lengthX = Math.abs(currentPosition.current[0] - originalPosition.current[0])
    let lengthY = Math.abs(currentPosition.current[1] - originalPosition.current[1])
    let theta = Math.atan(lengthY/lengthX) * (180/Math.PI)
    if(theta > 30 && currentPosition.current[1] - originalPosition.current[1] > 0 && lengthY > 15 && currentElement.current === firstCourse.current){

      // document.body.style.overflow = 'scroll'
      // coursesListElement.current.style.overflow = 'hidden'
      // overviewElement.current.scrollIntoView()
      overviewElement.current.scrollIntoView({behavior: 'smooth'})
      trigger.current = false
    }else if(theta > 30 && currentPosition.current[1] - originalPosition.current[1] < 0 && lengthY > 15 && currentElement.current === overviewElement.current){
      // document.body.style.overflow = 'hidden'
      coursesListElement.current.style.overflow = 'scroll'
      coursesListElement.current.scrollIntoView({behavior: 'smooth'})
    }
  }
  useEffect(() => {
    coursesListElement.current.onscroll = () => {
      if(coursesListElement.current.scrollTop < window.innerHeight - 30 && trigger.current){
        coursesListElement.current.style.overflow = 'hidden'
        firstCourse.current.scrollIntoView({behavior: 'smooth'})
        // firstCourse.current.style.backgroundColor = 'red'
      }
    }
    // const options = {
    //         root: null, // default, use viewport
    //         rootMargin: '-99% 0px -1% 0%'
    //       }
    //     const observer = new IntersectionObserver((entries) => {
    //         entries.forEach((entry) => {
    //             if(entry.isIntersecting && trigger.current == true){
    //                 coursesListElement.current.style.overflow = 'hidden'
    //             }
    //         })
    //     }, options)
    //     observer.observe(firstCourse.current)
  },[firstCourse.current])
  const selected = () => {
    if(trans.current === true){
      console.log('eek', course1__wrapper1.current.style)
      course1__wrapper1.current.style.width = 0
      course1__wrapper2.current.style.width = '100%'
      course1__image1.current.style.scale = 1
      course1__image2.current.style.scale = 1.1
      trans.current = false
    }else{
      course1__wrapper1.current.style.width = '100%'
      course1__wrapper2.current.style.width = 0
      course1__image1.current.style.scale = 1.1
      course1__image2.current.style.scale = 1
      trans.current = true
    }
  }
  return (
    <>
      <header className="fixed w-full top-0 z-50 py-2 flex pl-4 shadow-md items-center justify-center bg-white">
        <div className="flex flex-col gap-[6px]">
          <div className="h-[2px] w-[1.5rem] bg-black"></div>
          <div className="h-[2px] w-[1rem] bg-black"></div>
          <div className="h-[2px] w-[1rem] bg-black"></div>
        </div>
        <div className="mr-4 ml-auto flex items-center gap-1">
          <h3 className="text-xl">Curve Learning</h3>
          <svg className="h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M153.6 29.9l16-21.3C173.6 3.2 180 0 186.7 0C198.4 0 208 9.6 208 21.3V43.5c0 13.1 5.4 25.7 14.9 34.7L307.6 159C356.4 205.6 384 270.2 384 337.7C384 434 306 512 209.7 512H192C86 512 0 426 0 320v-3.8c0-48.8 19.4-95.6 53.9-130.1l3.5-3.5c4.2-4.2 10-6.6 16-6.6C85.9 176 96 186.1 96 198.6V288c0 35.3 28.7 64 64 64s64-28.7 64-64v-3.9c0-18-7.2-35.3-19.9-48l-38.6-38.6c-24-24-37.5-56.7-37.5-90.7c0-27.7 9-54.8 25.6-76.9z"/></svg>
        </div>
      </header>
      <main onTouchStart={e => swipeStart(e)} onTouchMove={e => swipeMove(e)} onTouchEnd={swipeEnd}>
        <Overview overviewElement={overviewElement}/>
        <section ref={coursesListElement} id='courses' className="h-[100lvh] w-full bg-green-300 overflow-y-scroll snap-y snap-mandatory overflow-x-hidden">
          {/* ////////////////////////////////////////////////////////////////////////////// */}
          <div ref={firstCourse} id='course_1' className="h-[100lvh] w-full bg-purple-100 snap-start relative" onClick={() => selected()}>
            <div ref={course1__wrapper2} className="h-full w-[0%] absolute top-0 right-0 duration-[1s]">
              <Image ref={course1__image2} fill alt="brb" src={cloudImage2} className='object-cover duration-[1s] border-l-4 border-white'/>
            </div>
            <div ref={course1__wrapper1} className="h-full w-full absolute top-0 duration-[1s]">
              <Image ref={course1__image1} fill alt="brb" src={cloudImage} className='object-cover scale-110 duration-[1s] border-r-4 border-white'/>
            </div>
            <h3 className="absolute top-[20%] text-center left-[50%] translate-x-[-50%] text-white text-5xl pointer-events-none font-quicksand">Cloud Computing</h3>
            <div className="absolute top-0 w-full h-full bg-black/5"></div>
          </div>
          {/* //////////////////////////////////////////////// */}
          <div id='course_2' className="h-[100lvh] w-full bg-purple-200 snap-start relative">
            <Image fill alt="brb" src={mathsImage} className='object-cover'/>
            <h3 className="absolute top-[20%] text-center left-[50%] translate-x-[-50%] text-white text-5xl pointer-events-none font-quicksand">Backend Development</h3>
          </div>
          <div id='course_3' className="h-[100lvh] w-full bg-purple-300 snap-start relative">
          <Image fill alt="brb" src={frontEndImage} className='object-cover'/>
          <h3 className="absolute top-[20%] text-center left-[50%] translate-x-[-50%] text-white text-5xl pointer-events-none font-quicksand">Frontend Development</h3>
          </div>
          <div id='course_4' className="h-[100lvh] w-full bg-purple-400 snap-start relative">
          <Image fill alt="brb" src={securityImage} className='object-cover'/>
          <h3 className="absolute top-[20%] text-center left-[50%] translate-x-[-50%] text-white text-5xl pointer-events-none font-quicksand">Cyber Security</h3>
          </div>
          <div id='course_5' className="h-[100lvh] w-full bg-purple-500 snap-start relative" onTouchStart={() => {trigger.current = true}}>
          <Image fill alt="brb" src={appImage} className='object-cover'/>
          <h3 className="absolute top-[20%] text-center left-[50%] translate-x-[-50%] text-white text-5xl pointer-events-none font-quicksand">App Development</h3>
          </div>
          <div id='course_6' className="h-[100lvh] w-full bg-purple-600 snap-start relative">
          <Image fill alt="brb" src={rustImage} className='object-cover'/>
          <h3 className="absolute top-[20%] text-center left-[50%] translate-x-[-50%] text-white text-5xl pointer-events-none font-quicksand">Rust Course</h3>
          </div>
        </section>
      </main>
    </>
  )
}
