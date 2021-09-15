export class Client {
  private _clientId: number;
  private _name: string;
  private _mail: string;
  private _adress: string;
  private _phoneNumber: string;

  constructor(clientId: number, adress: string, phoneNumber: string, mail: string, name: string) {
    this._clientId = clientId;
    this._name = name;
    this._mail = mail;
    this._adress = adress
    this._phoneNumber = phoneNumber;
  }

  getClientId(): number {
    return this._clientId;
  }

  setClientId(value: number) {
    this._clientId = value;
  }

  getName(): string {
    return this._name;
  }

  setName(value: string) {
    this._name = value;
  }

  getMail(): string {
    return this._mail;
  }

  setMail(value: string) {
    this._mail = value;
  }

  getAdress(): string {
    return this._adress;
  }

  setAdress(value: string) {
    this._adress = value;
  }

  getPhoneNumber(): string {
    return this._phoneNumber;
  }

  setPhoneNumber(value: string) {
    this._phoneNumber = value;
  }
}
