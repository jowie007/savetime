import { CypressLogContent } from "./cypress-log-content";

export class CypressLog {
  file: string;
  content: CypressLogContent[];
  error: string | null;

  constructor(file: string, content?: CypressLogContent[]) {
    this.file = file;
    if (content) {
      this.content = content;
    } else {
      this.content = [];
    }
  }
}
