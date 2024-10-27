import { Component } from '@angular/core';
import { PartyService } from '../../services/party.service';

@Component({
  selector: 'app-party-list',
  templateUrl: './party-list.component.html',
  styleUrls: ['./party-list.component.css']
})
export class PartyListComponent {
  parties: any[] = [];
  collection: any=[];

  constructor(private partyService: PartyService,
    private party:PartyService) { }

  ngOnInit(): void {
    this.fetchPartyList();
  }


  fetchPartyList(): void {
    this.partyService.getPartyList().subscribe(
      (data) => {
        this.parties= data;
      },
      (error) => {
        console.error('Error fetching party list:', error);
      }
    );
  }

  deleteParty(id: number): void {
    this.partyService.deleteParty(id).subscribe(
      (data) => {
        console.log('Party deleted:', data);
        window.location.reload();  // This will refresh the page
      },
      (error) => {
        console.error('Error deleting party:', error);
      }
    );
  }
  

  editParty() {

  }

}
