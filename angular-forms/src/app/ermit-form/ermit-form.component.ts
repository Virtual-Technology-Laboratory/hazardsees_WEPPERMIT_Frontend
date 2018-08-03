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
  static data = {};
  static prettified_data = {};
  public classReference = ErmitFormComponent;

  model = new Ermit(0, 50, 30, 20, 300, "../climates/al010831", 'l', "clay", "forest", ErmitFormComponent.pct_grass, ErmitFormComponent.pct_shrub, ErmitFormComponent.pct_bare);
  ermit_sent = false;
  showSlope = false;
  showPrecipitationOverlay = false;
  showRunoffOverlay = false;
  showWinterRunoffOverlay  = false;
  showVegOverlay  = false;

  onSubmit() {
    this.ermit_sent = true;
      $.ajax({
        type: 'POST',
        url: API_URL,
        data: JSON.stringify(this.model),
        contentType: 'application/json',
        dataType: 'json',
        success: function (result) {
          ErmitFormComponent.prettified_data = JSON.stringify(result, undefined, 2);
          ErmitFormComponent.data = JSON.parse(JSON.stringify(result));
        },
        failure: function (errMsg) {
          console.log(errMsg);
        }
      });

  }

  onEdit() {
    ErmitFormComponent.data = {};
    ErmitFormComponent.prettified_data = {};
    this.ermit_sent = false;
    this.showSlope = false;
    this.showPrecipitationOverlay = false;
    this.showRunoffOverlay = false;
    this.showWinterRunoffOverlay  = false;
    this.showVegOverlay = false;
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

  waterOverlay() {
    var annual_precipitation = ErmitFormComponent.data["annual_precipitation"];
    var percentagePrecipitation = parseFloat(ErmitFormComponent.data["annual_precipitation"])/60;
    var PrecipitationHeight = 150 * percentagePrecipitation;
    document.getElementById("insidePrecipitation").style.height = PrecipitationHeight +"px";
    document.getElementById("insidePrecipitation").style.marginTop = (140 - PrecipitationHeight)+"px";
    document.getElementById("precipitationText").innerHTML = annual_precipitation + " inches annual precipitation";
    if (annual_precipitation < 20) {
      document.getElementById("precipitationText").style.color = "black";
      document.getElementById("precipitationText").style.paddingTop = 10 + PrecipitationHeight+"px";
    } else {
      document.getElementById("precipitationText").style.paddingTop = "5px";
      document.getElementById("precipitationText").style.color = "white";
    }
    if (this.showPrecipitationOverlay) {
      this.showPrecipitationOverlay = false;
    } else {
      this.showPrecipitationOverlay = true;
    }
  }
  runoffOverlay() {
    var annual_runoff_rain = ErmitFormComponent.data["annual_runoff_rain"];
    var percentageRunoff = parseFloat(ErmitFormComponent.data["annual_runoff_rain"])/16.5;
    var runoffHeight = 150 * percentageRunoff;
    document.getElementById("insideRunoff").style.height = runoffHeight +"px";
    document.getElementById("insideRunoff").style.marginTop = (140 - runoffHeight)+"px";
    document.getElementById("runoffText").innerHTML = annual_runoff_rain + " inches annual runoff (rainfall)";
    if (annual_runoff_rain < 5) {
      document.getElementById("runoffText").style.color = "black";
      document.getElementById("runoffText").style.paddingTop = 10 + runoffHeight+"px";
    } else {
      document.getElementById("runoffText").style.paddingTop = "5px";
      document.getElementById("runoffText").style.color = "white";
    }
    if (this.showRunoffOverlay) {
      this.showRunoffOverlay = false;
    } else {
      this.showRunoffOverlay = true;
    }
  }
  winterRunoffOverlay() {
    var annual_runoff_winter = ErmitFormComponent.data["annual_runoff_winter"];
    var percentageWinterRunoff = parseFloat(ErmitFormComponent.data["annual_runoff_winter"])/15;
    var winterRunoffHeight = 150 * percentageWinterRunoff;
    document.getElementById("insideWinterRunoff").style.height = winterRunoffHeight +"px";
    document.getElementById("insideWinterRunoff").style.marginTop = (140 - winterRunoffHeight)+"px";
    document.getElementById("winterRunoffText").innerHTML = annual_runoff_winter + " inches annual runoff (snowmelt)";
    if (annual_runoff_winter < 5) {
      document.getElementById("winterRunoffText").style.color = "black";
      document.getElementById("winterRunoffText").style.paddingTop = 10 + winterRunoffHeight+"px";
    } else {
      document.getElementById("winterRunoffText").style.paddingTop = "5px";
      document.getElementById("winterRunoffText").style.color = "white";
    }
    if (this.showWinterRunoffOverlay) {
      this.showWinterRunoffOverlay = false;
    } else {
      this.showWinterRunoffOverlay = true;
    }
  }
  changeLine() {
    var xInit = ErmitFormComponent.data["x_coord_init"];
    var yInit = ErmitFormComponent.data["y_coord_init"];
    var xTop = ErmitFormComponent.data["x_coord_top"];
    var yTop = ErmitFormComponent.data["y_coord_top"];
    var xAvg = ErmitFormComponent.data["x_coord_avg"];
    var yAvg = ErmitFormComponent.data["y_coord_avg"];
    var xToe = ErmitFormComponent.data["x_coord_toe"];
    var yToe = ErmitFormComponent.data["y_coord_toe"];
    var length = ErmitFormComponent.data["length_ft"];
    var height = ErmitFormComponent.data["height"];
    var sev = ErmitFormComponent.data["severity"];

    const canvas = <HTMLCanvasElement>document.getElementById('line');
    var ctx=canvas.getContext("2d");
    var color;
    var lightcolor;
    var darkcolor;

    canvas.width = (parseInt(length) + 40);
    canvas.height = (height + 40);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch(sev) {
    case "l":
        color = "#5BC85B";
        lightcolor = "#E7FFE7";
        darkcolor = "#137B13";
        document.getElementById("sevText").innerHTML = "Low Severity";
        break;
    case "m":
        color = "#FFFF5C";
        lightcolor = "#FEFEBF";
        darkcolor = " #FF8000";
        document.getElementById("sevText").innerHTML = "Moderate Severity";
        break;
    case "h":
        color = "#FF0000";
        lightcolor = "#FFACAC";
        darkcolor = "#820000";
        document.getElementById("sevText").innerHTML = "High Severity";
        break;
    default:
        color = "#333333";
        lightcolor = "#BDBDBD";
        darkcolor = "black";
        document.getElementById("sevText").innerHTML = "Unburned";
      }

    ctx.shadowColor=darkcolor;
    ctx.beginPath();
    ctx.moveTo(xInit+20,yInit+20);
    ctx.lineTo(xTop+20,-1 * yTop+20);
    ctx.lineTo(xAvg+20,-1 * yAvg+20);
    ctx.lineTo(xToe+20,-1 * yToe+20);
    ctx.shadowBlur=20;
    var gradient=ctx.createLinearGradient(0,0,300,200);
    gradient.addColorStop(0,lightcolor);
    gradient.addColorStop(0.5,color);
    gradient.addColorStop(1.0,darkcolor);
    ctx.strokeStyle=gradient;
    ctx.lineWidth=10;
    ctx.stroke();
    if (this.showSlope) {
      this.showSlope = false;
    } else {
      this.showSlope = true;
    }
  }

  vegetationOverlay() {
    const canvas = <HTMLCanvasElement>document.getElementById('veg');
    var ctx=canvas.getContext("2d");
    var pointSize = 5;
    var pct_grass = parseInt(ErmitFormComponent.data["pct_grass"]);
    var pct_bare = parseInt(ErmitFormComponent.data["pct_bare"]);
    var pct_shrub = parseInt(ErmitFormComponent.data["pct_shrub"]);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (pct_grass > 0) {
      ctx.fillStyle = "#49796B";
      for (var i = pct_grass * 2; i--; i > 0) {
        var x = Math.floor(Math.random() * canvas.width);
        var y = Math.floor(Math.random() * canvas.height);
        ctx.beginPath();
        ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
        ctx.fill();
      }
      document.getElementById("pct_grass_text").innerHTML = pct_grass + "% grass";
    } else {
      document.getElementById("pct_grass_text").innerHTML = "0% grass";
    }
    if (pct_shrub > 0) {
      ctx.fillStyle = "#d2b48c";
      for (var i = pct_shrub * 2; i--; i > 0) {
        var x = Math.floor(Math.random() * canvas.width);
        var y = Math.floor(Math.random() * canvas.height);
        ctx.beginPath();
        ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
        ctx.fill();
      }
      document.getElementById("pct_shrub_text").innerHTML = pct_shrub + "% shrub";
    } else {
        document.getElementById("pct_shrub_text").innerHTML = "0% shrub";
    }
    if (pct_bare > 0) {
      document.getElementById("pct_bare_text").innerHTML = pct_bare + "% bare";
    } else {
      document.getElementById("pct_bare_text").innerHTML = "0% bare";
    }

    if (this.showVegOverlay) {
      this.showVegOverlay = false;
    } else {
      this.showVegOverlay = true;
    }
  }

  constructor() { }

  public ngOnInit()
  { }

}
