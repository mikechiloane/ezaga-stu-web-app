import { Injectable } from '@angular/core';
import axios from "axios";
import {API_PATHS} from "../../shared/api-paths";
@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor() { }

  request = axios.create({
    baseURL: API_PATHS.base,
    timeout: 3000,
    headers: {'Authorization': localStorage.getItem('Authorization')}
  })
}
