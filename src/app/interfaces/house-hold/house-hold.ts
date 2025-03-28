import {HouseHoldMember}                   from './house-hold-member';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

export interface HouseHold {
  id: string;
  name: string;
  address: string;
  members: HouseHoldMember[];
}

export type HouseHoldForm = {
  id: FormControl<string | null>;
  name: FormControl<string | null>;
  address: FormControl<string | null>;
  members: FormArray<FormGroup>;
};
