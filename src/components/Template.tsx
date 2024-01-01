import { MemeObject, TextObject } from "./Main";

type TemplateProps = {
  memeTemplates: MemeObject[];
  setMeme: React.Dispatch<React.SetStateAction<MemeObject>>;
  setTexts: React.Dispatch<React.SetStateAction<TextObject[]>>;
};

const Template = ({ memeTemplates, setMeme, setTexts }: TemplateProps) => {
  const handleTemplate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = Number(e.target.value);
    setMeme(memeTemplates[index]);
    setTexts(
      Array(memeTemplates[index].box_count).fill({
        text: "",
        x: 250,
        y: 250,
        size: "32px",
        color: "black",
      })
    );
  };

  return (
    <select
      onChange={handleTemplate}
      className="w-80 border-2 border-[#606060] bg-[#303030] hover:bg-[#404040] hover:border-white indent-2 rounded-md py-2 text-white transition-all outline-none appearance-none"
    >
      {memeTemplates.map((meme, i) => (
        <option key={i} value={i}>
          {meme.name}
        </option>
      ))}
    </select>
  );
};
export default Template;
