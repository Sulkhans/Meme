import { useEffect, useState } from "react";

export const Main = () => {
  const [memeTemplates, setMemeTemplates] = useState([]);
  useEffect(() => {
    const options = {
      method: "GET",
    };
    const URL = "https://api.imgflip.com/get_memes";
    fetch(URL, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setMemeTemplates(json.data.memes);
      })
      .catch((err) => console.error("error:" + err));
  }, []);
  return <div>Main</div>;
};
