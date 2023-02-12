export class Community {
  id: string;
  name: string;
  abbr: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  constructor(props: any = {}) {
    this.id = props.id;
    this.name = props.name;
    this.abbr = props.abbr;
    this.phone = props.phone;
    this.email = props.email;
    this.city = props.city;
    this.state = props.state;
  }
}
