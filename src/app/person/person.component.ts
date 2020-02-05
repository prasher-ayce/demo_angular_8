import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { IDropdownSettings } from "ng-multiselect-dropdown";

import { AlertService, PersonService } from "@/_services";

class ImageSnippet {
  pending: boolean = false;
  status: string = "init";

  constructor(public src: string, public file: File) {}
}

@Component({ templateUrl: "person.component.html" })
export class PersonComponent implements OnInit {
  personForm: FormGroup;
  loading = false;
  submitted = false;
  selectedhobbies = [];
  dropdownSettings: IDropdownSettings = {};
  selectedFile: ImageSnippet;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private personService: PersonService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
  }

  ngOnInit() {
    this.personForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      image: ["", Validators.required],
      hobbies: [[], Validators.required],
      birthDate: ["", [Validators.required]]
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: "id",
      textField: "text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 5,
      allowSearchFilter: false
    };
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.personForm.controls;
  }

  get allHobbies() {
    return [
      { id: 1, text: "Singing" },
      { id: 2, text: "Dancing" },
      { id: 3, text: "Sports" },
      { id: 4, text: "Surfing" },
      { id: 5, text: "Traveling" }
    ];
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
    });

    reader.readAsDataURL(file);
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.personForm.invalid) {
      return;
    }

    this.loading = true;
    this.personService
      .add(this.personForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success("Add successful", true);
          this.router.navigate(["/persons"]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
