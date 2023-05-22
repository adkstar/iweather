import { XMLParser } from "fast-xml-parser";

export function parseForecast(xmlText: any) {
  const raw = parseToJsObj(xmlText);
  const nice = extractParameters(raw);
  return nice;
}

export function parseToJsObj(xmlText: any) {
  let parseOptions = {
    ignoreAttributes: false,
    parseAttributeValue: true,
    attributesGroupName: "@",
    attributeNamePrefix: "",
  };
  const parser = new XMLParser(parseOptions);
  const jsObj = parser.parse(xmlText);
  return jsObj;
}

export function extractParameters(forecast: any) {
  const startTimes = forecast.dwml.data["time-layout"]["start-valid-time"];
  const endTimes = forecast.dwml.data["time-layout"]["end-valid-time"];
  let output: any[] = [];

  for (let index = 0; index < startTimes.length; index++) {
    output.push({
      startTime: new Date(startTimes[index]),
      endTime: new Date(endTimes[index]),
    });
  }

  for (const key in forecast.dwml.data.parameters) {
    const values = forecast.dwml.data.parameters[key];
    const category = key;

    for (let ii = 0; ii < values.length; ii++) {
      const item = values[ii];
      const itemValues = item.value;
      const itemAttributes = item["@"];
      const metric = itemAttributes.type;

      for (let jj = 0; jj < itemValues.length; jj++) {
        const measurement = itemValues[jj];
        if (typeof measurement === "object") {
          if (measurement["@"]["xsi:nil"]) {
            output[jj][metric] = null;
          } else {
            throw new Error("Unexpected element");
          }
        } else {
          output[jj][metric] = measurement;
        }
      }
    }
  }

  return output;
}
