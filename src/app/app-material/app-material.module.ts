import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from "@angular/material/menu"; 

@NgModule( {
    declarations: [],
    imports: [ 
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatMenuModule
    ],
    exports:[
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatMenuModule
    ]
} )
export class AppMaterialModule { }
