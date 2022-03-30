import { Component, OnInit } from '@angular/core';

import { Option } from "src/app/models/option.model";
//import * as options  from "../../../assets/options.json";

import { StyleManagerService } from "src/app/service/style-manager.service"; 
@Component( {
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
} )
export class HeaderComponent implements OnInit {

    options: Array<Option> = [
  {
    "backgroundColor": "#fff",
    "buttonColor": "#ffc107",
    "headingColor": "#673ab7",
    "label": "Deep Purple & Amber",
    "value": "deeppurple-amber"
  },
  {
    "backgroundColor": "#fff",
    "buttonColor": "#ff4081",
    "headingColor": "#3f51b5",
    "label": "Indigo & Pink",
    "value": "indigo-pink"
  },
  {
    "backgroundColor": "#303030",
    "buttonColor": "#607d8b",
    "headingColor": "#e91e63",
    "label": "Pink & Blue Grey",
    "value": "pink-bluegrey"
  },
  {
    "backgroundColor": "#303030",
    "buttonColor": "#4caf50",
    "headingColor": "#9c27b0",
    "label": "Purple & Green",
    "value": "purple-green"
  }
];
    selectedTheme!: Option;
    private readonly stylesBasePath = `node_modules/@angular/material/prebuilt-themes/`;

    constructor( private readonly styleManager: StyleManagerService ) { }

    ngOnInit() {
        this.styleManager.setStyle( `${this.stylesBasePath}deeppurple-amber.css` );
    }

    themeChangeHandler( themeToSet: Option ) {
        this.selectedTheme = themeToSet;
        console.log( themeToSet );
        this.styleManager.setStyle( `${this.stylesBasePath}${themeToSet.value}.css` );
    }
}
