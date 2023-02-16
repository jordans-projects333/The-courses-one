'use client'
import { useRef } from "react"

export default function Home() {
  let originalPosition = useRef()
  let currentPosition = useRef()
  let snapTime = useRef(true)
  const swipeStart = (e) => {
    originalPosition.current = [e.touches[0].clientX, e.touches[0].clientY]
    currentPosition.current = [e.touches[0].clientX, e.touches[0].clientY]
    console.log(originalPosition.current)
    snapTime.current = true
    setTimeout(() => {
      snapTime.current = false
    }, 200)
  }
  const swipeMove = (e) => {
    currentPosition.current = [e.touches[0].clientX, e.touches[0].clientY]
  }
  const swipeEnd = () => {
    if(currentPosition.current[0] === originalPosition.current[0] && currentPosition.current[1] === originalPosition.current[1])return
    if(snapTime.current != true)return
    let lengthX = Math.abs(currentPosition.current[0] - originalPosition.current[0])
    let lengthY = Math.abs(currentPosition.current[1] - originalPosition.current[1])
    let theta = Math.atan(lengthY/lengthX) * (180/Math.PI)
    if(theta > 30 && currentPosition.current[1] - originalPosition.current[1] > 0 && lengthY > 15){
      console.log('wow')
    }else if(theta > 30 && currentPosition.current[1] - originalPosition.current[1] < 0 && lengthY > 15){
      console.log('down')
    }
      // serviceSnap.current.scrollIntoView({behavior: 'smooth'})
      // serviceSnap.current.scrollIntoView()
  }
  const homeSwipeUp = () => {
    console.log('swipeUp')
  }
  const homeSwipeDown = () => {
    console.log('swipeDown')
  }
  return (
    <>
      <main>
        <section id='introduction' className="h-[100svh] w-full bg-green-200" onTouchStart={e => swipeStart(e)} onTouchMove={e => swipeMove(e)} onTouchEnd={swipeEnd}>

        </section>
        <section id='courses' className="h-[100lvh] w-full bg-green-300 overflow-y-scroll snap-y snap-mandatory">
          <div id='course_1' className="h-[100lvh] w-full bg-purple-100 snap-start">

          </div>
          <div id='course_2' className="h-[100lvh] w-full bg-purple-200 snap-start">

          </div>
          <div id='course_3' className="h-[100lvh] w-full bg-purple-300 snap-start">

          </div>
          <div id='course_4' className="h-[100lvh] w-full bg-purple-400 snap-start">

          </div>
          <div id='course_5' className="h-[100lvh] w-full bg-purple-500 snap-start">

          </div>
          <div id='course_6' className="h-[100lvh] w-full bg-purple-600 snap-start">

          </div>
        </section>
      </main>
    </>
  )
}
