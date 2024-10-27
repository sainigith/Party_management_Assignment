import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { Party } from '../model/party.model';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  private apiUrl = 'https://ap.greatfuturetechno.com/party/';
  private authToken = 'd343c5e246bff4205e32879ede474d863367553c' // Token without 'Token' prefix

  constructor(private http: HttpClient) { }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Token ${this.authToken}`,
      'Content-Type': 'multipart/form-data'
    });
  }

  updateParty(partyData:Party,id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.authToken}`
    });
  
    // Ensure the id is passed as a number and not a string with trailing '/'
    const numericId = parseInt(id, 10); // Convert id to number if necessary
  
    if (isNaN(numericId)) {
      return throwError('Invalid ID format');  // Now throwError is properly imported
    }
  
    return this.http.put(`${this.apiUrl}?id=${numericId}`, partyData, { headers });
  }

  // Get Party List
  getPartyList(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.authToken}`  // Token is properly formatted
    });

    return this.http.get(this.apiUrl, { headers });
  }

  getParty(id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.authToken}`  // Token is properly formatted
    });
    return this.http.get(`${this.apiUrl}?id=${id}`,{headers});
  }

  createParty(party: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.authToken}`  // Token is properly formatted
    });

    return this.http.post(this.apiUrl,party, { headers });
  }

  deleteParty(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.authToken}`  // Token is properly formatted
    });

    return this.http.delete(`${this.apiUrl}?id=${id}`, { headers });  // Pass headers here
  }
  
}
