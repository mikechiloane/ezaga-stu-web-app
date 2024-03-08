import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-textfield',
  standalone: true,
  imports: [],
  templateUrl: './textfield.component.html',
  styleUrl: './textfield.component.css'
})
export class TextfieldComponent {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() type: string;
  @Input() value: string="";
  @Input() autocomplete: string;


  @Output() inputValueChange: EventEmitter<string> = new EventEmitter<string>();

  onInputChanged(event: any) {
    this.value = event.target.value;
    this.inputValueChange.emit(this.value);
  }
}
