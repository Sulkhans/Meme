import { MemeObject } from "./Main";

type OptionsProps = {
  memeTemplates: MemeObject[];
  setMeme: React.Dispatch<React.SetStateAction<MemeObject>>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
};

const Options = ({ memeTemplates, setMeme, text, setText }: OptionsProps) => {
  const handleTemplate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = Number(e.target.value);
    setMeme(memeTemplates[index]);
  };
  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
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
      <input value={text} onChange={handleText} />
    </div>
  );
};
export default Options;
