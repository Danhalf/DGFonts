const API_KEY = import.meta.env.VITE_API_KEY;
import axios from 'axios';
import { useState, useEffect } from 'react';
import { IFont } from './ContentTypes';

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

  return (
    <div className="min-h-screen bg-blue-500">
      {fonts.map((font: IFont) => (
        <ul key={font.family} className="mb-4">
          <li>font-family: {font.family}</li>
          <li>
            font-files:
            {Object.entries(font.files).map((file) => {
              const [fontType, fontLink] = file;
              return (
                <div key={fontLink}>
                  type: {fontType}, <a href={fontLink}>download</a>
                </div>
              );
            })}
          </li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      ))}
    </div>
  );
};

export default Content;
