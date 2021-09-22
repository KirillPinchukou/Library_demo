export class Client {
  private id: number;
  private name: string;
  private mail: string;
  private address: string;
  private phoneNumber: string;

  constructor(clientId: number, address: string, phoneNumber: string, mail: string, name: string) {
    this.id = clientId;
    this.name = name;
    this.mail = mail;
    this.address = address
    this.phoneNumber = phoneNumber;
  }

  getClientId(): number {
    return this.id;
  }

  setClientId(value: number) {
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
