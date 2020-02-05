import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Person } from "@/_models";

@Injectable({ providedIn: "root" })
export class PersonService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Person[]>(`${config.apiUrl}/users`);
  }

  add(user: Person) {
    return this.http.post(`${config.apiUrl}/users/register`, user);
  }

  delete(id: number) {
    return this.http.delete(`${config.apiUrl}/users/${id}`);
  }
}
