import { TextObject } from "./Main";

type TextProps = {
  texts: TextObject[];
  setTexts: React.Dispatch<React.SetStateAction<TextObject[]>>;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
};

const Text = ({ texts, setTexts, activeIndex, setActiveIndex }: TextProps) => {
  const handleText = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const { name, value } = e.target;
    setTexts((prevTexts) => {
      const newTexts = [...prevTexts];
      if (name === "size") {
        newTexts[i] = { ...newTexts[i], [name]: `${value}px` };
      } else newTexts[i] = { ...newTexts[i], [name]: value };
      return newTexts;
    });
  };
  return (
    <div>
      {texts.map((obj, i) => (
        <div key={i}>
          <input
            name="text"
            value={obj.text}
            placeholder={`Text ${i + 1}`}
            onChange={(e) => handleText(e, i)}
            onClick={() => setActiveIndex(i)}
            className={`outline-none ${activeIndex === i && ""}`}
          />
          <input
            name="size"
            type="range"
            defaultValue={32}
            min={20}
            max={64}
            onChange={(e) => handleText(e, i)}
            onClick={() => setActiveIndex(i)}
          />
          <input
            name="color"
            type="color"
            onChange={(e) => handleText(e, i)}
            onClick={() => setActiveIndex(i)}
          />
        </div>
      ))}
    </div>
  );
};

export default Text;
