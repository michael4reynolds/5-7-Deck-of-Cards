import * as React from "react"
import ReactDOM from "react-dom"
import { Frame, useMotionValue, useTransform, useAnimation } from "framer"

import "./styles.css"

function Card(props) {
  let animControls = useAnimation()
  let mv = useMotionValue(0)
  let rotateMv = useTransform(mv, [-200, 200], [-50, 50])
  let opacityMv = useTransform(mv, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0])
  const style = {
    backgroundImage: `url(${props.image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundColor: props.color,
    boxShadow: "2px 2px 10px 0 rgba(0,0,0,0.25)",
    borderRadius: 10,
    height: 300
  }

  return (
    <Frame
      center
      drag="x"
      x={mv}
      rotate={rotateMv}
      opacity={opacityMv}
      dragConstraints={{ left: -200, right: 200 }}
      style={style}
      animate={animControls}
      onDragEnd={function(_, info) {
        if (Math.abs(info.point.x) < 150) {
          animControls.start({ x: 0 })
        } else {
          animControls.start({ x: info.point.x < 0 ? -200 : 200 })
        }
        //mv.set(0)  //any inertia seems to override this
      }}
    />
  )
}

function App() {
  return (
    <div className="App">
      <Card
        image="https://cdn.glitch.com/071e5391-90f7-476b-b96c-1f51f7106b0c%2Fbird_fat_black_medium.svg?v=1557968629951"
        color="#FF88AA"
      />
      <Card />
      <Card />
      <Card />
    </div>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
