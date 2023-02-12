export class Group {
  id: string;
  groupName: string;
  groupDescription: string;
  leaderId: string;
  leaderName: string;
  assistantId: string;
  assistantName: string;
  constructor(props: any = {}) {
    this.id = props.id;
    this.groupName = props.groupName;
    this.groupDescription = props.groupDescription;
    this.leaderId = props.leaderId;
    this.leaderName = props.leaderName;
    this.assistantId = props.assistantId;
    this.assistantName = props.assistantName;
  }
}
