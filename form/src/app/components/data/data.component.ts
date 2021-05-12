import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Country } from 'src/app/lib/country';
import countries from 'src/app/lib/common/countries.data.json';
import { Id } from "src/app/lib/id";
import ids from "src/app/lib/common/id.data.json";
import { ErrorStateMatcher } from '@angular/material/core';
import { DataFormService } from 'src/app/services/data.form.service';
import { dataForm } from 'src/app/biz/data/admin/dataForm';
import { Router } from '@angular/router';

/**
 * @title Input with error messages
 */


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  ccPattern: any = /^((\d{8})|(\d{10})|(\d{11})|(\d{6}-\d{5}))?$/;
  tiPattern: any = /^(([a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ]{3}[0-9]{7}|[0-9]{11}))$/;
  cePattern: any = /^(([1-9][0-9]{3,5}))$/;
  rcPattern: any = /^((([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ|0-9]{3,15})|([1-9][0-9]{9})))$/;
  visaPattern: any = /^(([a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ]{4,30}))$/;
  passportPattern: any = /^[a-zA-Z0-9]{5,10}$/
  nitPattern: any = /^([0-9]+-{1}[0-9]{1})$/;


  formGroup: FormGroup = this._formBuilder.group({});

  public validacion: boolean = false;

  public mode: string = "form"

  public data: dataForm = {
    Name: "",
    LastName: "",
    Country: "",
    City: "",
    Adress: "",
    Telephone: "",
    Email: "",
    IdNumber: "",
    IdType: "",
  }

  public formErrors = {
    Name: "",
    LastName: "",
    Telephone: "",
    Adress: "",
    City: "",
    Country: "",
    Email: "",
    IdNumber: "",
    IdType: "",
  };
  public codePhone: any;
  options: Country[] = countries;
  filteredOptions!: Observable<Country[]>;
  idTypes: Id[] = ids;

  file!: File;
  fileSelected!: string | ArrayBuffer;

  constructor(private _formBuilder: FormBuilder, private dataService: DataFormService, private router: Router) {
  }

  ngOnInit() {

    this.formGroup = new FormGroup({
      Name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      LastName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      Id: new FormControl('', [Validators.required, Validators.minLength(5)]),
      IdType: new FormControl('', [Validators.required, Validators.minLength(5)]),
      Telephone: new FormControl('', [Validators.required, Validators.minLength(5)]),
      Adress: new FormControl('', [Validators.required, Validators.minLength(5)]),
      City: new FormControl('', [Validators.required, Validators.minLength(5)]),
      Country: new FormControl('', [Validators.required, Validators.minLength(5)]),
      Email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)]),
    });

    this.filteredOptions = this.formGroup.get("Country")!.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
    this.subscribirAEntrada("Country", (value: { code: any; }) => {
      this.codePhone = value.code;
    })

    this.subscribirAEntrada("", (value: any) => {
      console.log(value)
    })

  }


  displayFn(country: Country): string {
    return country && country.name ? country.name : '';
  }

  private _filter(name: string): Country[] {
    const filterValue = name.toLowerCase();
    // @ts-ignore: Object is possibly 'null'.
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  subscribirAEntrada(entrada: string, fn: any) {
    const obs = this.formGroup.get(entrada);
    if (obs != null) {
      obs.valueChanges.subscribe({
        next: fn,
      });
    }
  }
  validarRequerido(control: string) {
    const valor = this.formGroup.get(control)!.value;
    switch (control) {
      case "Name":
        if (valor == null || valor == undefined || valor == "" || valor.length < 1) {
          this.formErrors.Name = "error";
          this.validacion = true;
        } else {
          this.formErrors.Name = ""
        }
        break;
      case "LastName":
        if (valor == null || valor == undefined || valor == "" || valor.length < 1) {
          this.formErrors.LastName = "error";
          this.validacion = true;
        } else {
          this.formErrors.LastName = ""
        }
        break;
      case "Telephone":
        if (valor == null || valor == undefined || valor == "" || valor.length < 1) {
          this.formErrors.Telephone = "error"
          this.validacion = true;
        } else {
          this.formErrors.Telephone = ""
        }
        break;
      case "City":
        if (valor == null || valor == undefined || valor == "" || valor.length < 1) {
          this.formErrors.City = "error"
          this.validacion = true;
        } else {
          this.formErrors.City = ""
        }
        break;
      case "Adress":
        if (valor == null || valor == undefined || valor == "" || valor.length < 1) {
          this.formErrors.Adress = "error"
          this.validacion = true;
        } else {
          this.formErrors.Adress = ""
        }
        break;
      case "Country":
        if (valor == null || valor == undefined || valor == "" || valor.length < 1) {
          this.formErrors.Country = "error"
          this.validacion = true;
        } else {
          this.formErrors.Country = ""
        }
        break;
      case "Email":
        if (valor == null || valor == undefined || valor == "" || valor.length < 1) {
          this.formErrors.Email = "error"
          this.validacion = true;
        } else {
          this.formErrors.Email = "";
        }
        break;
      case "IdType":
        if (valor == null || valor == undefined || valor == "" || valor.length < 1) {
          this.formErrors.IdType = "error"
          this.validacion = true;
        } else {
          this.formErrors.IdType = "";
        }
        break;
      case "Id":
        if (valor == null || valor == undefined || valor == "" || valor.length < 1) {
          this.formErrors.IdNumber = "error"
          this.validacion = true;
        } else {
          this.formErrors.IdNumber = "";
        }
        break;
      default:
        break;
    }
  }
  retunData(control: string) {
    return this.formGroup.get(control)!.value;
  }
  dataIsNotNull(name: string, lastName: string, idType: string, id: string, country: string, city: string, adress: string, telephone: string, email: string) {
    if ((this.retunData(name) &&
      this.retunData(lastName) &&
      this.retunData(idType) &&
      this.retunData(id) &&
      this.retunData(country) &&
      this.retunData(city) &&
      this.retunData(adress) &&
      this.retunData(telephone) &&
      this.retunData(email)) != null) {
      this.data.Name = this.retunData(name);
      this.data.LastName = this.retunData(lastName);
      this.data.IdType = this.retunData(idType);
      this.data.IdNumber = this.retunData(id);
      this.data.Country = this.retunData(country).name;
      this.data.City = this.retunData(city);
      this.data.Adress = this.retunData(adress);
      this.data.Telephone = "+" + this.codePhone + this.retunData(telephone);
      this.data.Email = this.retunData(email);
    }
  }
  submit() {

    this.validarRequerido("Name");
    this.validarRequerido("LastName");
    this.validarRequerido("Email");
    this.validarRequerido("Country");
    this.validarRequerido("City");
    this.validarRequerido("Adress");
    this.validarRequerido("Telephone");
    this.validarRequerido("Id");
    this.validarRequerido("IdType");

    if (this.formGroup.valid) {
      this.validacion = true;
      this.dataIsNotNull("Name", "LastName", "IdType", "Id", "Country", "City", "Adress", "Telephone", "Email",)
      this.mode = "preview"
    } else {
      this.validacion = false;
    } 
  }
  onSubmit() {
    this.dataService.indexPost(this.data).subscribe(
      res => {
        console.log(res)
        this.router.navigate(['/lista']);
      },
      err => console.log(err)
    )
  }

  onBack() {
    this.mode = "form"
  }


  onSelectFile(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];

      const reader = new FileReader();
     // reader.onload = e => this.fileSelected = reader.result;
    }
  }
}


