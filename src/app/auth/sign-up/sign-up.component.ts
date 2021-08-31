import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branch } from 'src/app/interfaces/branch';
import { BranchResponse } from 'src/app/interfaces/branch-response';
import { RoleResponse } from 'src/app/interfaces/role-response';
import { User } from 'src/app/interfaces/user';
import { UserResponse } from 'src/app/interfaces/userResponse';
import { BranchService } from 'src/app/services/branch.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  show: boolean = false;
  branches: Branch[];
  registerForm: FormGroup;
  response?: BranchResponse;
  private _gec: string = 'GEC';
  selectedBranch: number = -1;
  selectedCategory: string = '';
  branch?: Branch;
  roleResponse?: RoleResponse;
  message: string = '';
  error: boolean = false;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private route: Router,
    private branchService: BranchService
  ) {
    this.branches = [
      {
        branchID: 0,
        branchName: '',
        branchCode: '',
        dateCreated: 0,
        dateUpdated: 0,
      },
    ];

    this.registerForm = this.formBuilder.group({
      title: formBuilder.control('', [Validators.required]),
      //  description: formBuilder.control('', [Validators.required]),
      fullName: formBuilder.control('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      userEmail: formBuilder.control(' ', [
        Validators.required,
        Validators.email,
      ]),
      phoneNumber: formBuilder.control('', [
        Validators.required,
        Validators.minLength(10),
        Validators.minLength(15),
      ]),
      address: formBuilder.control('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      category: formBuilder.control('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  ngOnInit(): void {
    console.log(' Getting branches ');
    this.branchService
      .getBranches()
      .subscribe((httpResponse: BranchResponse) => {
        this.response = httpResponse;

        if (this.response?.statusCode == 200) {
          this.branches = this.response?.data;
          localStorage.setItem('branches', JSON.stringify(this.response?.data));

          console.log(this.response);
        } else {
          this.show = false;
        }
      });

    //Role
    this.roleService.getRole(1).subscribe((httpResponse: RoleResponse) => {
      this.roleResponse = httpResponse;

      if (this.response?.statusCode == 200) {
        this.branches = this.response?.data;
        localStorage.setItem('role', JSON.stringify(this.roleResponse?.data));

        console.log(this.response);
      }
    });
  }

  public control(name: string) {
    // console.log(this.loginForm);
    return this.registerForm.get(name);
  }

  getTitleList() {}

  public onChange(value: any) {
    if (value.target.value == this._gec) {
      console.log('User is GEC- show branches');
      this.show = true;
    } else {
      this.show = false;
      this.selectedBranch = -1;
    }
    this.selectedCategory = value.target.value;
  }

  public selectBranch(value: any) {
    this.selectedBranch = value.target.value;
    console.log('selectBranch ' + value.target.value);
  }

  public onSubmit() {
    //registerForm.invalid
    console.log(this.registerForm);
    this.error = false;
    var userForm = this.registerForm.controls;
    var userBranch;

    if (this.selectedBranch != -1 && this.selectedCategory != '') {
      console.log('Nice ');
      this.branches.forEach((branch) => {
        if (branch.branchID == this.selectedBranch) {
          this.branch = branch;
          console.log('We are here my guy ' + JSON.stringify(this.branch));
          userBranch = branch;
        }
      });
    }
    let user: User = {
      // userID: 0,
      userEmail: this.registerForm.controls.userEmail.value,
      username: 'username',
      password: 'password',
      enable: true,
      title: this.registerForm.controls.title.value,
      phoneNumber: +this.registerForm.controls.phoneNumber.value,
      address: this.registerForm.controls.address.value,
      fullName: this.registerForm.controls.fullName.value,
      userCategory: this.registerForm.controls.category.value,
      roles: this.roleResponse?.data,
      branch: userBranch,
    };

    //register user

    console.log('users ' + JSON.stringify(user));

    this.userService.registerUser(user).subscribe(
      (httpResponse: UserResponse) => {
        console.log('httpResponse ' + httpResponse);
        if (httpResponse.statusCode == 201) {
          localStorage.setItem('user', JSON.stringify(httpResponse.data));
          console.log(JSON.stringify(httpResponse));
          this.route.navigate(['/auth/login']);
        } else {
          this.message = 'Registration was unsuccessful';
          this.error = true;
          console.log('fialed to login  => ' + this.message);
        }
      },
      (error) => {
        this.message = 'Registration was unsuccessful';
        this.error = true;
        console.log('fialed to login  => ' + this.message);
        console.error('error => ' + error);
      }
    );
  }
}
