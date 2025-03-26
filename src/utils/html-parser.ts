import { Parser } from "html-to-react";

export function HTMLParser(htmlString: string): any {
  const htmlParser = Parser();
  return htmlParser.parse(htmlString);
}
