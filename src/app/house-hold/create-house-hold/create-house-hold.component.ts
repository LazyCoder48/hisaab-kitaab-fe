import {
  FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators
}                          from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {Card}              from 'primeng/card';
import {Button}            from 'primeng/button';
import {InputText}         from 'primeng/inputtext';
import {FloatLabel}        from 'primeng/floatlabel';
import {HouseHoldForm}     from '../../interfaces/house-hold/house-hold';
import {NgForOf}           from '@angular/common';
import {FileUpload}        from 'primeng/fileupload';
import {Checkbox}          from 'primeng/checkbox';

@Component({
             selector   : 'app-create-house-hold',
             imports    : [
               Card,
               Button,
               ReactiveFormsModule,
               InputText,
               FormsModule,
               FloatLabel,
               NgForOf,
               FileUpload,
               Checkbox
             ],
             templateUrl: './create-house-hold.component.html',
             styleUrl   : './create-house-hold.component.scss'
           })
export class CreateHouseHoldComponent implements OnInit {

  newHouseHoldForm !: FormGroup<HouseHoldForm>;

  constructor(private fb: FormBuilder) {}

  get members() {
    return this.newHouseHoldForm.get('members') as FormArray;

  }

  ngOnInit(): void {
    this.newHouseHoldForm = this.fb.group(
      {
        id     : new FormControl('', {validators: Validators.required}),
        name   : new FormControl('', {validators: Validators.required}),
        address: new FormControl('', {validators: Validators.required}),
        members: this.fb.array<FormGroup>([])
      }
    )
    this.addMember();
  }

  addMember() {
    this.members.push(this.newMember());
    console.log(this.members.length);
  }

  removeMember(index: number) {
    if (this.members.length > 1) {
      this.members.removeAt(index);
    }
    console.log({length: this.members.length, index: index});
  }

  newMember() {
    return this.fb.group(
      {
        id              : new FormControl('', {validators: Validators.required}),
        name            : new FormControl('', {validators: Validators.required}),
        role            : new FormControl('', {validators: Validators.required}),
        age             : new FormControl(null, {validators: Validators.required}),
        gender          : new FormControl('', {validators: Validators.required}),
        image           : new FormControl(''),
        isActive        : new FormControl(false, {validators: Validators.required}),
        isVerified      : new FormControl(false, {validators: Validators.required}),
        isHouseHoldAdmin: new FormControl(false, {validators: Validators.required}),
        email           : new FormControl('', {validators: Validators.required}),
        phone           : new FormControl('', {validators: Validators.required})
      }
    )
  }

}
