import { Component, OnInit } from '@angular/core';
import { Ermit } from '../ermit';
import { Directive } from '@angular/core';
import * as $ from 'jquery';
import {API_URL} from '../env';

@Component({
  selector: 'app-ermit-form',
  templateUrl: './ermit-form.component.html',
  styleUrls: ['./ermit-form.component.css'],
})

export class ErmitFormComponent implements OnInit {

  objectKeys = Object.keys;

// TODO:      I thought through the job flow of how these programs interface and came up with this:
//            1. X use angular to get info from user,
//            2. X communicate data to back-end to send to ERMIT (flask POST),
//            3. X retrieve processed results from ERMIT (selenium to populate and run ERMIT),
//            4. write to JSON (flask),
//            5. access in WebGL JS file and use to create visual,
//            6. show hillslope graphic after Angular Form gets submitted (and 2-5 happens, I kind of want to make a progress bar),
//            7. option to go back and edit form (restart process)

  // Mapping what the user can select to the values that ERMiT works with
  cli_fn =
    {'BIRMINGHAM WB AP AL': "../climates/al010831",
    'CHARLESTON KAN AP WV': "../climates/wv461570",
    'DENVER WB AP CO': "../climates/co052220",
    'FLAGSTAFF WB AP AZ': "../climates/az023010",
    'MOSCOW U OF I ID': "../climates/id106152",
    'MOUNT SHASTA CA': "../climates/ca045983",
    'SEXTON SUMMIT WB OR': "../climates/or357698"};

  severity =
    {'High': 'h',
    'Moderate': 'm',
    'Low': 'l',
    'Unburned': 'u'};

  soil_type =
    {'Clay Loam': "clay",
    'Silt Loam': "silt",
    'Sandy Loam': "sand",
    'Loam': "loam"};

  vegetation =
    {'Forest': "forest",
    'Range': "range",
    'Chaparral': "chap"};

  // Had to make these member variables so I would be able to access and change them:
  // 1. Depending on what vegetation is selected
  // 2. Customizable to the user regardless of vegetation (but still have % bare = 100% - the other vegetation %)

  static pct_bare = 0;
  static pct_grass = 0;
  static pct_shrub = 0;
  public classReference = ErmitFormComponent;

  model = new Ermit(0, 50, 30, 20, 300, "../climates/al010831", 'l', "clay", "forest", ErmitFormComponent.pct_grass, ErmitFormComponent.pct_shrub, ErmitFormComponent.pct_bare);

  submitted = false;

  onSubmit() {
    this.submitted = true;
      $.ajax({
        type: 'POST',
        url: API_URL,
        data: JSON.stringify(this.model),
        contentType: 'application/json',
        dataType: 'json',
        success: function (result) {
          console.log(result);
        },
        failure: function (errMsg) {
          console.log(errMsg);
        }
      });
  }

  changePctBare() {
    ErmitFormComponent.pct_bare = 100 - (ErmitFormComponent.pct_shrub + ErmitFormComponent.pct_grass);
    this.model.pct_bare = ErmitFormComponent.pct_bare;
    this.model.pct_grass = ErmitFormComponent.pct_grass;
    this.model.pct_shrub = ErmitFormComponent.pct_shrub;
  }

  // Sets the vegetation inputs to a default set of values based on the vegetation selected (e.g. forest, range, etc)

  set_pcts(vegetation) {
    switch(vegetation) {
      case "forest":
        // Updating Angular Display (component class)
        ErmitFormComponent.pct_bare = 0;
        // Updating Ermit class public variables itself
        this.model.pct_bare = 0;

        ErmitFormComponent.pct_grass = 0;
        this.model.pct_grass = 0;

        ErmitFormComponent.pct_shrub = 0;
        this.model.pct_shrub = 0;
        break;
      case "range":
        ErmitFormComponent.pct_grass = 75;
        this.model.pct_grass = 75;

        ErmitFormComponent.pct_shrub = 15;
        this.model.pct_shrub = 15;

        ErmitFormComponent.pct_bare = 10;
        this.model.pct_bare = 10;
        break;
      case "chap":
        ErmitFormComponent.pct_grass = 0;
        this.model.pct_grass = 0;

        ErmitFormComponent.pct_shrub = 80;
        this.model.pct_shrub = 80;

        ErmitFormComponent.pct_bare = 20;
        this.model.pct_bare = 20;
        break;
      default:
        console.log("no range selected");
    }
  }

  // TODO: just JSON and such
  get diagnostic() { return JSON.stringify(this.model); }

  constructor() { }

  public ngOnInit()
  {  }

}
