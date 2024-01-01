import { useEffect, useState } from "react";
import Canvas from "./Canvas";
import Template from "./Template";
import Text from "./Text";

export type MemeObject = {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
};

export type TextObject = {
  text: string;
  x: number;
  y: number;
  size: string;
  color: string;
};

export const Main = () => {
  const [memeTemplates, setMemeTemplates] = useState<Array<MemeObject>>([]);
  const [meme, setMeme] = useState<MemeObject>({
    id: "",
    name: "",
    url: "",
    width: 0,
    height: 0,
    box_count: 0,
  });
  const [texts, setTexts] = useState<Array<TextObject>>([
    { text: "", x: 250, y: 250, size: "", color: "" },
  ]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const URL = "https://api.imgflip.com/get_memes";
    const options = { method: "GET" };
    fetch(URL, options)
      .then((res) => res.json())
      .then((json) => {
        const { memes } = json.data;
        console.log(json);
        setMemeTemplates(memes);
        setMeme(memes[0]);
        setTexts(
          Array(memes[0].box_count).fill({
            text: "",
            x: 250,
            y: 250,
            size: "32px",
            color: "black",
          })
        );
      })
      .catch((err) => console.error("error:" + err));
  }, []);

  return (
    <main className="flex flex-col items-center py-6 gap-6 bg-[#202020] lg:h-screen lg:flex-row lg:justify-evenly">
      <div className="flex flex-col gap-4">
        <h1 className="text-center text-white text-3xl my-2">Meme</h1>
        <Template
          memeTemplates={memeTemplates}
          setMeme={setMeme}
          setTexts={setTexts}
        />
        <Text
          texts={texts}
          setTexts={setTexts}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </div>
      <Canvas
        width={600}
        height={600}
        meme={meme}
        texts={texts}
        setTexts={setTexts}
        activeIndex={activeIndex}
      />
    </main>
  );
};
