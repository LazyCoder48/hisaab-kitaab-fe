import {
    FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators
}                          from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {Card}              from 'primeng/card';
import {Button}            from 'primeng/button';
import {InputGroup}        from 'primeng/inputgroup';
import {InputGroupAddon}   from 'primeng/inputgroupaddon';
import {InputText}         from 'primeng/inputtext';

type HouseHoldForm = {
    id: FormControl<string | null>;
    name: FormControl<string | null>;
    address: FormControl<string | null>;
    members: FormArray<FormGroup>;
};

@Component({
               selector   : 'app-create-house-hold',
               imports    : [
                   Card,
                   Button,
                   ReactiveFormsModule,
                   InputGroup,
                   InputGroupAddon,
                   InputText,
                   FormsModule
               ],
               templateUrl: './create-house-hold.component.html',
               styleUrl   : './create-house-hold.component.scss'
           })
export class CreateHouseHoldComponent implements OnInit {

    newHouseHoldForm !: FormGroup<HouseHoldForm>;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.newHouseHoldForm = this.fb.group(
            {
                id     : new FormControl('', {validators: Validators.required}),
                name   : new FormControl('', {validators: Validators.required}),
                address: new FormControl('', {validators: Validators.required}),
                members: this.fb.array<FormGroup>([])
            }
        )
    }

    onSubmit() {

    }

}

// this.fb.group(
//     {
//         name            : new FormControl('', Validators.required),
//         id              : new FormControl('', Validators.required),
//         role            : new FormControl('', Validators.required),
//         age             : new FormControl(0, Validators.required),
//         gender          : new FormControl('', Validators.required),
//         image           : new FormControl(''),
//         isActive        : new FormControl(false, Validators.required),
//         isVerified      : new FormControl(false, Validators.required),
//         isHouseHoldAdmin: new FormControl(false, Validators.required),
//         email           : new FormControl('', Validators.required),
//         phone           : new FormControl('', Validators.required)
//     }
// );