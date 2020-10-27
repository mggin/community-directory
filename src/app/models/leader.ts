export class Leader {
    id: string;
    memberId: string;
    role: string;
    name: string; 
    
    set(id: string, memberId: string, role: string, name: string) {
        this.id = id;
        this.memberId = memberId;
        this.role = role;
        this.name = name;
    }
  }
  