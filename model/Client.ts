export class Client{
  private _clientId:number;
  private _name :string;
  private _mail:string;
  private _adress:string;
  private _phoneNumber:string;
  constructor(clientId:number,adress:string,phoneNumber:string,mail:string,name:string) {
    this._clientId = clientId;
    this._name = name;
    this._mail = mail;
    this._adress = adress
    this._phoneNumber = phoneNumber;
  }

  get clientId():number {
    return this._clientId;
  }

  set clientId(value:number) {
    this._clientId = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get mail(): string {
    return this._mail;
  }

  set mail(value: string) {
    this._mail = value;
  }

  get adress(): string {
    return this._adress;
  }

  set adress(value: string) {
    this._adress = value;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }
}
