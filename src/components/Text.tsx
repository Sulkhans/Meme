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
    <>
      {texts.map((obj, i) => (
        <div key={i} className="flex items-center justify-between">
          <input
            name="text"
            value={obj.text}
            placeholder={`Text ${i + 1}`}
            onChange={(e) => handleText(e, i)}
            onClick={() => setActiveIndex(i)}
            className={`outline-none border-2 border-[#606060] bg-[#303030] hover:bg-[#404040] rounded-md indent-2 py-2 text-white transition-all
            ${activeIndex === i && "border-white"} `}
          />
          <div
            className={`border-2 w-14 border-[#606060] bg-[#303030] hover:bg-[#404040] rounded-md indent-2 py-2 text-white transition-all
            ${activeIndex === i && "border-white"} flex items-center relative`}
          >
            <input
              id={`size${i}`}
              name="size"
              type="number"
              defaultValue={32}
              onChange={(e) => handleText(e, i)}
              onClick={() => setActiveIndex(i)}
              className="border-0 bg-transparent appearance-none outline-none w-8 indent-2"
            />
            <label
              htmlFor={`size${i}`}
              className="absolute right-2 text-xs select-none"
            >
              px
            </label>
          </div>
          <div
            className={`flex items-center justify-center border-2 border-[#606060] h-11 w-11 rounded-md overflow-hidden transition-all
            ${activeIndex === i && "border-white"}`}
          >
            <input
              name="color"
              type="color"
              onChange={(e) => handleText(e, i)}
              onClick={() => setActiveIndex(i)}
              className="scale-[5]"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Text;
