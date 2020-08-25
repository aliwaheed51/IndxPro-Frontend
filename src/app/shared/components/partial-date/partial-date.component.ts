import { Component, OnInit, forwardRef, Output, EventEmitter, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormGroup, Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

@Component({
  selector: 'partial-date',
  templateUrl: './partial-date.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PartialDateComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PartialDateComponent),
      multi: true
    }
  ]
})
export class PartialDateComponent implements OnInit, ControlValueAccessor, Validator {
  value: string;
  years: any[];
  months: any[];
  days: any[];
  formGroup: FormGroup;
  monthItems = ['UNK', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  @Output() valueChange = new EventEmitter();

  onTouched: () => void;

  @Input()
  disabled: boolean;
  onChange: any = () => {};
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
    this.loadYears();
    this.loadMonths();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      year: [''],
      month: [''],
      day: ['']
    });
  }

  loadYears() {
    this.years = [];
    this.years.push({
      value: 'UKUK'
    });

    for (let i = 1900; i <= 2050; i++) {
      this.years.push({
        value: i.toString()
      });
    }
  }

  loadMonths() {
    this.months = [];
    this.monthItems.forEach((m) => {
      this.months.push({
        value: m
      });
    });
  }

  loadDays() {
    this.days = [];
    this.days.push({
      value: 'UK'
    });

    const values = this.formGroup.value;
    if (!values) {
      return;
    }

    const year = values.year || 0;
    const month = this.monthItems.indexOf(values.month) || 0;
    if (year === 0 || month <= 0) {
      return;
    }

    const numberOfDays = new Date(year, month, 0).getDate();
    for (let i = 1; i <= numberOfDays; i++) {
      let value = i.toString();
      if (i < 10) {
        value = '0' + value.toString();
      }
      this.days.push({
        value: value
      });
    }
  }

  clearData(): void {
    this.formGroup.reset();
    this.value = '';
  }

  setData(): void {
    let year = null,
      month = null,
      day = null;

    if (this.value) {
      const values = this.value.split('-');
      year = values[0];
      month = values[1];
      day = values[2];
    }

    this.formGroup.setValue({
      year: year,
      month: month,
      day: day
    });
    this.loadDays();
  }

  yearChanged() {
    this.days = null;
    this.formGroup.patchValue({
      day: null
    });
    this.loadDays();
    this.propagateChange();
  }

  monthChanged() {
    this.days = null;
    this.formGroup.patchValue({
      day: null
    });
    this.loadDays();
    this.propagateChange();
  }

  dayChanged() {
    this.propagateChange();
  }

  propagateChange() {
    const values = this.formGroup.value;

    const year = values.year || 'UKUK';
    const month = values.month || 'UNK';
    const day = values.day || 'UK';

    this.formGroup.setValue({
      year: year,
      month: month,
      day: day
    });

    this.value = `${year}-${month}-${day}`;
    this.onChange(this.value);
    this.onTouched();
  }

  writeValue(value: string): void {
    this.value = value;
    this.setData();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return null;
  }
}
