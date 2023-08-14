"use client"

import { TypeAnimation } from "react-type-animation"

const TypeAnim = () => {
  return (
    <TypeAnimation
      className="inline-block decoration-slice underline decoration-primary"
      sequence={[
        "last played a boardgame?",
        1000,
        "last went to the movies?",
        1000,
        "last treated yourself to dinner?",
        1000,
        "last got together with friends?",
        1000,
      ]}
      cursor={false}
      repeat={Infinity}
    />
  )
}

export default TypeAnim
