import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { UtilsService } from '../services/utils.service';

const paymentAmountValidator: ValidatorFn = (fg: FormGroup) => {
  const defaultAccountBalance = fg.get('defaultAccountBalance').value;
  const paymentAmount = fg.get('paymentAmount').value;
  return paymentAmount <= defaultAccountBalance ? null : { 'payment': true };
};

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Output() onSubmitForm: EventEmitter<any> = new EventEmitter();

  paymentForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")),
    accountNumber: new FormControl(null, [Validators.required, Validators.max(99999999999999999999)]),
    paymentAmount: new FormControl(null, [Validators.required]),
    defaultAccountBalance: new FormControl(500),
    newAccountBalance: new FormControl(0)
  }, { validators: [paymentAmountValidator] })

  constructor(private utilsService: UtilsService) { }

  ngOnInit() { }

  submitForm() {
    this.paymentForm.patchValue({
      newAccountBalance: this.paymentForm.value.defaultAccountBalance - this.paymentForm.value.paymentAmount
    });
    this.onSubmitForm.emit(this.paymentForm.value);
    this.paymentForm.reset({ defaultAccountBalance: 500 });
  }

  allowOnlyNumbers(event: any) {
    this.utilsService.allowOnlyNumbers(event);
  }

}
