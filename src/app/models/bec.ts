export class Bec {
  id: string;
  name: string;
  leaderId: string;
  assistantId: string;
  constructor(id: string, name: string, leaderId: string, assistantId: string) {
      this.id = id;
      this.name = name;
      this.leaderId = leaderId;
      this.assistantId = assistantId;
  }
}
