import { useEffect, useState } from "react";
import Canvas from "./Canvas";
import Options from "./Options";

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
    { text: "", x: 250, y: 250 },
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
          })
        );
      })
      .catch((err) => console.error("error:" + err));
  }, []);

  return (
    <main>
      <Canvas
        width={500}
        height={500}
        meme={meme}
        texts={texts}
        setTexts={setTexts}
        activeIndex={activeIndex}
      />
      <Options
        memeTemplates={memeTemplates}
        meme={meme}
        setMeme={setMeme}
        texts={texts}
        setTexts={setTexts}
        setActiveIndex={setActiveIndex}
      />
    </main>
  );
};
