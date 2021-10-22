export const USER_STORAGE_NAME = 'users';

export class Client {
  public id: number;
  public name: string;
  public mail: string;
  public address: string;
  public phoneNumber: string;

  getId(): number {
    return this.id;
  }

  setId(value: number) {
    this.id = value;
  }

  getName(): string {
    return this.name;
  }

  setName(value: string) {
    this.name = value;
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
}
