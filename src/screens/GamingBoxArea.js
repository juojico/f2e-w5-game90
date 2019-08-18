import React from "react";
import Boxs from "../components/Boxs";
import Tomb from "../components/Tomb";
import Things from "../components/Things";
import Enemies from "../components/Enemies";

const BoxArea = ({
  data,
  type = "things",
  keyName,
  heroPos,
  crash,
  heroHurt,
  test
}) => {
  const types = (item, type) => {
    switch (type) {
      case "things":
        return <Things actor={item.name} />;
      case "enemies":
        return <Enemies actor={item.name} />;
      case "tomb":
        return <Tomb name={item.name} time={item.time} color={item.color} />;
      default:
        break;
    }
  };
  return (
    <>
      {data.map(item => (
        <Boxs
          key={keyName + item.id}
          width={200}
          height={60}
          top={item.top}
          left={1280 + item.game_time * 200}
          actor={item.name}
          heroPos={heroPos}
          crash={crash}
          heroHurt={heroHurt}
          test={test}
        >
          {types(item, type)}
        </Boxs>
      ))}
    </>
  );
};

export default BoxArea;
