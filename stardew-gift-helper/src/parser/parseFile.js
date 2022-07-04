export const parseGameFileContent = (fileContent) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(fileContent, "text/xml");
    console.log(xmlDoc);    
}