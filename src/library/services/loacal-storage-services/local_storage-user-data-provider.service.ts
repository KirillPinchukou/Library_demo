import {Injectable} from '@angular/core';
import {Client, USER_STORAGE_NAME} from "../../model/client";
import {ClientDataProvider, ClientSearchCriteria} from "../client.service";

type UserPredicate = (client: Client) => boolean;

@Injectable({
  providedIn: 'root'
})
export class LocalStorageUserDataProvider extends ClientDataProvider  {
  private clients: Array<Client>;

  public getClients(searchCriteria: ClientSearchCriteria): Array<Client> {
      this.clients = this.loadClients();
      return this.clients;
    }

 public addClient(client: Client) {
 }
  private getDataFromLocalStorage(): string {
    return localStorage.getItem(USER_STORAGE_NAME);
  }

  private putDataToLocalStorage(data: string): void {
    localStorage.setItem(USER_STORAGE_NAME, data);
  }

  private loadClients(): Array<Client> {
    let tmpClients: Array<any> = JSON.parse(this.getDataFromLocalStorage());
    return tmpClients.map((obj: any) => this.mapClient(obj));
  }

  public mapClient(obj: any): Client {
    let client = new Client();
    client.setId(parseInt(obj['id']));
    client.setName(obj['name']);
    client.setMail(obj['mail']);
    client.setAddress(obj['address']);
    client.setPhoneNumber(obj['phoneNumber']);
    return client;
  }
}
