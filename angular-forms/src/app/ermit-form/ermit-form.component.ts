import { Component, OnInit } from '@angular/core';
import { Ermit } from '../ermit';
import { Directive } from '@angular/core';

@Component({
  selector: 'app-ermit-form',
  templateUrl: './ermit-form.component.html',
  styleUrls: ['./ermit-form.component.css']
})

export class ErmitFormComponent implements OnInit {

  cli_fn = ['BIRMINGHAM WB AP AL', 'BIRMINGHAM WB AP AL', 'DENVER WB AP CO', 'FLAGSTAFF WB AP AZ', 'MOSCOW U OF I ID', 'MOUNT SHASTA CA', 'SEXTON SUMMIT WB OR'];
  severity = ['High', 'Moderate', 'Low', 'Unburned'];
  soil_type = ['Clay Loam', 'Silt Loam', 'Sandy Loam', 'Loam'];
  vegetation = ['Forest', 'Range', 'Chaparral'];

  model = new Ermit(0, 30, 50, 20, 300, 'BIRMINGHAM WB AP AL', 'High', "Loam", "Range", 0, 0, 0);

  submitted = false;

  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  constructor() { }

  ngOnInit() {
  }

}
