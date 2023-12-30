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
    <div>
      <select onChange={handleTemplate}>
        {memeTemplates.map((meme, i) => (
          <option key={i} value={i}>
            {meme.name}
          </option>
        ))}
      </select>
    </div>
  );
};
export default Template;
