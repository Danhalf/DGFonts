const API_KEY = import.meta.env.VITE_API_KEY;
import axios from 'axios';
import { useState, useEffect } from 'react';

const url = `https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}`;

const Content = () => {
  const [fonts, setFonts] = useState([]);

  useEffect(() => {
    const fetchFonts = async () => {
      const result = await axios(url);

      const fonts = result.data.items;
      // const fonts = Object.entries(result.data.items);
      // console.log(result.data);
      setFonts(fonts);
    };

    fetchFonts();
  }, []);

  console.log(fonts.map((e) => e.subsets));

  return (
    <div className="min-h-screen bg-blue-500">
      {fonts.map((font) => (
        <div key={font.family}>font: {font.category}</div>
      ))}
    </div>
  );
};

export default Content;
