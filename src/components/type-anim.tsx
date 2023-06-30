"use client";

import { TypeAnimation } from "react-type-animation";

const TypeAnim = () => {
  return (
    <TypeAnimation
      className="inline-block decoration-slice underline decoration-rose-400"
      sequence={[
        "played a boardgame?",
        1000,
        "went to the movies?",
        1000,
        "treated yourself to dinner?",
        1000,
        "got together with friends?",
        1000,
      ]}
      cursor={false}
      repeat={Infinity}
    />
  );
};

export default TypeAnim;
