export class Client {
  id: string;
  communityCode: string;
  communityId: string;
  constructor(props: any = {}) {
    this.id = props.id;
    this.communityCode = props.communityCode;
    this.communityId = props.communityId;
  }
}
