const API_KEY = import.meta.env.VITE_API_KEY;
import axios from 'axios';
import { FC, PropsWithChildren, useState, useEffect } from 'react';
import { debounce } from '../../assets/helpers/helpers';
import { IFont } from './ContentTypes';
import { Accordeon } from './Accordeon';

const url = `https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}&sort=popularity`;

const Content: FC<PropsWithChildren> = ({ children }) => {
  const [fonts, setFonts] = useState([]);
  const [currentFonts, setCurrentFonts] = useState(fonts);

  useEffect(() => {
    const fetchFonts = async () => {
      const result = await axios(url);

      const fonts = result.data.items;
      setFonts(fonts);
      setCurrentFonts(fonts);
    };

    fetchFonts();
  }, []);

  const findFont = debounce(({ target }) => {
    setCurrentFonts(
      fonts.filter((font: IFont) =>
        font.family.toLowerCase().includes(target.value.toLowerCase())
      )
    );
  });

  return (
    <div className="min-h-screen bg-blue-500">
      <div>
        <input type="text" onInput={findFont} />
      </div>
      <ul>
        {currentFonts.map((font: IFont, index) => (
          <li key={font.family as string} className="mb-5">
            <Accordeon
              index={index}
              title={font.family}
              body={Object.entries(font.files).map((file) => {
                const [fontType, fontLink] = file;
                return (
                  <div key={fontLink as string}>
                    type: {fontType}, <a href={fontLink as string}>download</a>
                  </div>
                );
              })}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Content;
