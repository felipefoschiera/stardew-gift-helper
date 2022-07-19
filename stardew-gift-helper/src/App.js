import "./App.css";
import React, { useEffect, useState } from "react";
import { parseGameFileContent } from "./parser/parseFile";
import { getAllFavoriteGifts } from "./gifts/getFavorites";
import { SocialCard } from "./components";
import { getMatchingGifts } from "./gifts/getMatching";

export function App() {
  const [fileContent, setFileContent] = useState(null);
  const [socialPoints, setSocialPoints] = useState([]);
  const [favoriteGifts, setFavoriteGifts] = useState({});
  const [matchingGifts, setMatchingGifts] = useState({});
  const [npcBirthdays, setNpcBirthdays] = useState({});
  const [currentDay, setCurrentDay] = useState({});

  const startGameProcess = () => {
    const parsedFileContent = parseGameFileContent(fileContent);
    setSocialPoints(parsedFileContent.socialPoints);
    setNpcBirthdays(parsedFileContent.npcBirthdays);
    setCurrentDay(parsedFileContent.currentGameDay);
    const allFavoriteGifts = getAllFavoriteGifts();
    setFavoriteGifts(allFavoriteGifts);
    const allMatchingGifts = getMatchingGifts(
      parsedFileContent.items,
      allFavoriteGifts
    );
    setMatchingGifts(allMatchingGifts);
  };

  useEffect(() => {
    if (fileContent !== null) {
      startGameProcess();
    }
  }, [fileContent]);

  const handleUploadedFile = (file) => {
    const fileReader = new FileReader();
    fileReader.addEventListener("load", (event) => {
      setFileContent(event.target.result);
    });
    fileReader.readAsText(file);
  };

  const onFileChange = (event) => {
    const eventTarget = event.target;
    if (eventTarget.files.length) {
      handleUploadedFile(eventTarget.files[0]);
    }
  };

  return (
    <div className="App">
      <div>
        <div className="page-instructions">
          <p>
            Upload your save file. Cards show social information and favorite
            villager gifts that you have available.
          </p>
          <input type="file" onChange={onFileChange} />
        </div>
        <div>
          {socialPoints.map((entry) => (
            <SocialCard
              key={entry.name}
              data={entry}
              gifts={favoriteGifts[entry.name]}
              matching={matchingGifts[entry.name]}
              birthday={npcBirthdays[entry.name]}
              currentDay={currentDay}
            />
          ))}
        </div>
        <div className="page-footer">
          Stardew Gift Helper was created by
          <a href="https://github.com/felipefoschiera"> @felipefoschiera</a>
        </div>
      </div>
    </div>
  );
}
