import { Component , Input} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {OnInit} from "@angular/core";
import {TfAuthModalService} from "./service/tf-auth-modal.service";

@Component({
  selector: 'app-tf-auth-modal',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe
  ],
  templateUrl:  './tf-auth-modal.component.html',
  styleUrl: './tf-auth-modal.component.css',
})

export class TfAuthModalComponent implements OnInit{
  constructor(public tfAuthModalService: TfAuthModalService) {
  }

  closeModal() {
    this.tfAuthModalService.closeModal();
  }

  ngOnInit() {
  }
}
