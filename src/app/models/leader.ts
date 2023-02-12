export class Leader {
    id: string;
    memberId: string;
    role: string;
    name: string;
    constructor(props: any) {
        this.id = props.id;
        this.memberId = props.memberId;
        this.role = props.role;
        this.name = props.name;
    }
  }
  