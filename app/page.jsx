'use client'
import { useEffect, useRef } from "react"

export default function Home() {
  let originalPosition = useRef()
  let currentPosition = useRef()
  let snapTime = useRef(true)
  let currentElement = useRef(null)
  let overviewElement = useRef(null)
  let coursesListElement = useRef(null)
  let trigger = useRef(false)
  let firstCourse = useRef(false)
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
    }else if(theta > 30 && currentPosition.current[1] - originalPosition.current[1] < 0 && lengthY > 15 && currentElement.current === overviewElement.current){
      // document.body.style.overflow = 'hidden'
      // coursesListElement.current.style.overflow = 'scroll'
      coursesListElement.current.scrollIntoView({behavior: 'smooth'})
    }
  }
  useEffect(() => {
    coursesListElement.onscroll = () => {
      if(coursesListElement.current.scrollTop < 30 && trigger.current)coursesListElement.current.style.overflow = 'hidden'
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
  return (
    <>
      <main onTouchStart={e => swipeStart(e)} onTouchMove={e => swipeMove(e)} onTouchEnd={swipeEnd}>
        <section ref={overviewElement} id='introduction' className="h-[100svh] w-full bg-green-200">

        </section>
        <section ref={coursesListElement} id='courses' className="h-[100lvh] w-full bg-green-300 overflow-y-scroll snap-y snap-mandatory">
          <div ref={firstCourse} id='course_1' className="h-[100lvh] w-full bg-purple-100 snap-start">

          </div>
          <div id='course_2' className="h-[100lvh] w-full bg-purple-200 snap-start">

          </div>
          <div id='course_3' className="h-[100lvh] w-full bg-purple-300 snap-start">

          </div>
          <div id='course_4' className="h-[100lvh] w-full bg-purple-400 snap-start">

          </div>
          <div id='course_5' className="h-[100lvh] w-full bg-purple-500 snap-start" onTouchStart={() => {trigger.current = true}}>

          </div>
          <div id='course_6' className="h-[100lvh] w-full bg-purple-600 snap-start">

          </div>
        </section>
      </main>
    </>
  )
}
