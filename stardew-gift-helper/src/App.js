import "./App.css";
import React, { useEffect, useState } from "react";
import { parseGameFileContent } from "./parser/parseFile";

export function App() {
  const [fileContent, setFileContent] = useState(null);
  const [socialPoints, setSocialPoints] = useState([]);

  const startGameProcess = () => {
    const parsedFileContent = parseGameFileContent(fileContent);
    setSocialPoints(parsedFileContent.socialPoints);
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
        <p>Upload your save file. Instructions here.</p>
        <input type="file" onChange={onFileChange} />
      </div>
    </div>
  );
}
