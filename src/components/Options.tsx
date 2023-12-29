import { MemeObject, TextObject } from "./Main";

type OptionsProps = {
  memeTemplates: MemeObject[];
  meme: MemeObject;
  setMeme: React.Dispatch<React.SetStateAction<MemeObject>>;
  texts: TextObject[];
  setTexts: React.Dispatch<React.SetStateAction<TextObject[]>>;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
};

const Options = ({
  memeTemplates,
  meme,
  setMeme,
  texts,
  setTexts,
  setActiveIndex,
}: OptionsProps) => {
  const handleTemplate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = Number(e.target.value);
    setMeme(memeTemplates[index]);
    setTexts(
      Array(memeTemplates[index].box_count).fill({ text: "", x: 250, y: 250 })
    );
  };
  const handleText = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    console.log(texts);
    setTexts((prevTexts) => {
      const newTexts = [...prevTexts];
      newTexts[i] = { ...newTexts[i], text: e.target.value };
      return newTexts;
    });
  };
  return (
    <div>
      <select onChange={handleTemplate}>
        {memeTemplates.map((meme, i) => (
          <option key={i} value={i}>
            {meme.name}
          </option>
        ))}
      </select>
      {texts.map((obj, i) => (
        <input
          key={i}
          value={obj.text}
          placeholder={`Text ${i + 1}`}
          onChange={(e) => handleText(e, i)}
          onClick={() => setActiveIndex(i)}
        />
      ))}
    </div>
  );
};
export default Options;
