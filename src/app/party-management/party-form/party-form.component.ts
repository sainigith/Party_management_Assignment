import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartyService } from '../../services/party.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Party } from '../../model/party.model';

@Component({
  selector: 'app-party-form',
  templateUrl: './party-form.component.html',
  styleUrls: ['./party-form.component.css']
})
export class PartyFormComponent implements OnInit {
  partyForm: FormGroup;
  serverErrors: any = {};
  partyId: number | null = null; 
  isEditMode: boolean = false;    

  constructor(
    private fb: FormBuilder,
    private partyService: PartyService,
    private route: ActivatedRoute,
    private router: Router

  ) {
    this.partyForm = this.fb.group({
      name: ['', Validators.required],
      company_name: ['', Validators.required],
      mobile_no: ['', Validators.required],
      telephone_no: [''],
      whatsapp_no: [''],
      email: ['', [Validators.required, Validators.email]],
      remark: [''],
      login_access: [null, Validators.required],
      date_of_birth: ['', Validators.required],
      anniversary_date: ['', Validators.required],
      gstin: [''],
      pan_no: [''],
      apply_tds: [null, Validators.required],
      credit_limit: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      address: this.fb.array([
        this.fb.group({
          id: [null, Validators.required],
          address_line_1: [''],
          address_line_2: [''],
          country: [''],
          state: [''],
          city: [''],
          pincode: ['']
        }),
        this.fb.group({
          address_line_1: [''],
          address_line_2: [''],
          country: [''],
          state: [''],
          city: [''],
          pincode: ['']
        })
      ]),
      bank: this.fb.array([
        this.fb.group({
          id: [null, Validators.required],
          bank_ifsc_code: [''],
          bank_name: [''],
          branch_name: [''],
          account_no: [''],
          account_holder_name: ['']
        }),
        this.fb.group({
          bank_ifsc_code: [''],
          bank_name: [''],
          branch_name: [''],
          account_no: [''],
          account_holder_name: ['']
        })
      ]),
      image: [null]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    console.log('ID from route:', id); 
    this.isEditMode = !!id;
    this.partyId = id ? +id : null;

    if (this.isEditMode && this.partyId) {
      this.loadPartyData();  // Load data in case of edit mode
    }
  }

  /**
   * Fetch the party details for the edit case
   */
  loadPartyData(): void {
    this.partyService.getParty(this.partyId).subscribe(
      (partyData) => {
        this.partyForm.patchValue(partyData);
        console.log(this.partyForm.value);  // Check if the form is populated correctly
      },
      (error) => {
        console.error('Error loading party data:', error);
        alert('Error loading party data.');
      }
    );
  }

/**
 * This Function used to Create and Update Party
 */
  createOrUpdateParty(): void {
    this.serverErrors = {};
    const partyData: Party = this.partyForm.value;
    if (this.isEditMode && this.partyId) {
      this.partyService.updateParty(partyData, this.partyId).subscribe(
        (result) => { this.router.navigate(['/list']); },
      );
    } else {
      this.partyService.createParty(this.partyForm.value).subscribe(
        (result) => {
          this.partyForm.reset();
          this.router.navigate(['/list']);
        },
        (error) => {
          if (error.status === 400 && error.error) {
            this.serverErrors = error.error;
          } else {
            alert("An unexpected error occurred.");
          }
        }
      );
    }
  }


  /**
   *  Helper method to check if a field has a server-side error
   * @param field 
   * @returns 
   */
  hasServerError(field: string): boolean {
    return !!this.serverErrors[field];
  }

  /**
   * Helper method to get the server error message for a field
   * @param field 
   * @returns 
   */
  getServerErrorMessage(field: string): string {
    return this.serverErrors[field]?.[0] || '';
  }
}



