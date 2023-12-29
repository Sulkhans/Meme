import { TextObject } from "./Main";

type TextProps = {
  texts: TextObject[];
  setTexts: React.Dispatch<React.SetStateAction<TextObject[]>>;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
};

const Text = ({ texts, setTexts, activeIndex, setActiveIndex }: TextProps) => {
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
      {texts.map((obj, i) => (
        <input
          key={i}
          value={obj.text}
          placeholder={`Text ${i + 1}`}
          onChange={(e) => handleText(e, i)}
          onClick={() => setActiveIndex(i)}
          className={`outline-none ${activeIndex === i && ""}`}
        />
      ))}
    </div>
  );
};

export default Text;
