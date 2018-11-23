import { Component } from '@angular/core';
import {LeaseService} from "./services/lease.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LeaseService]
})
export class AppComponent {
}
