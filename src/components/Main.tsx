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
  const [text, setText] = useState<string>("text");

  useEffect(() => {
    const URL = "https://api.imgflip.com/get_memes";
    const options = { method: "GET" };
    fetch(URL, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setMemeTemplates(json.data.memes);
        setMeme(json.data.memes[0]);
      })
      .catch((err) => console.error("error:" + err));
  }, []);

  return (
    <main>
      <Canvas width={500} height={500} meme={meme} text={text} />
      <Options
        memeTemplates={memeTemplates}
        setMeme={setMeme}
        text={text}
        setText={setText}
      />
    </main>
  );
};
