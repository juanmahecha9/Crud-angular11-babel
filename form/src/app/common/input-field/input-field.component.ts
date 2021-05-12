import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent implements OnInit {
  @Input("label") label!: string;
  @Input("message") message!: string;
  @Input("icon") icon!: string;
  @Input("placeholder") placeholder!: string;
  name!: string;
  @Input("name") set setName(theName: string) {
    this.name = theName;
  }
  @Input("formGroup") formGroup!: FormGroup;
  constructor() { }

  ngOnInit(): void {
    const control = this.formGroup.get(this.name);
    if (control != null) {
      control.valueChanges.subscribe({
        next: value => {
          if (value == null || value == "") {
            return;
          }
        }
      });
    }
  }

}
