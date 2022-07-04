import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import { parseGameFileContent } from "./parser/parseFile";

export function App() {
  const [fileContent, setFileContent] = useState(null);

  const startGameProcess = () => {
    const parsedFileContent = parseGameFileContent(fileContent);
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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Upload your save file. Instructions here.</p>
        <div>
          <input type="file" onChange={onFileChange} />
        </div>
        <div>

        </div>
      </header>
    </div>
  );
}
