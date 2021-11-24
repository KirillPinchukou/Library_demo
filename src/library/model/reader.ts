export const USER_STORAGE_NAME = 'users';

export class Reader {
  public id: number;
  public firstName: string;
  public lastName: string;
  public mail: string;
  public address: string;
  public phoneNumber: string;
  public roles: [
    {
      name: string
    }
  ];

  getId(): number {
    return this.id;
  }

  setId(value: number) {
    this.id = value;
  }

  getFirstName(): string {
    return this.firstName;
  }

  setFirstName(value: string) {
    this.firstName = value;
  }

  getLastName(): string {
    return this.lastName;
  }

  setLastName(value: string) {
    this.lastName = value;
  }


  getMail(): string {
    return this.mail;
  }

  setMail(value: string) {
    this.mail = value;
  }

  getAddress(): string {
    return this.address;
  }

  setAddress(value: string) {
    this.address = value;
  }

  getPhoneNumber(): string {
    return this.phoneNumber;
  }

  setPhoneNumber(value: string) {
    this.phoneNumber = value;
  }

  getRoles(): Array<Object> {
    return this.roles;
  }

  setRoles(value: any) {
    this.roles = value;
  }
}
