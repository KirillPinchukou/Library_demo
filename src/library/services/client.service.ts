import {Client} from "../model/client";

export abstract class ClientDataProvider {
  abstract getClients(searchCriteria: ClientSearchCriteria): Array<Client>;

  abstract addClient(client: Client): void;
}

export class ClientSearchCriteria {
  public searchName: string;
  public searchMail: string;

  constructor(searchName: string, searchMail: string) {
    this.searchName = searchName;
    this.searchMail = searchMail;
  }
}
