import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable( {
    providedIn: 'root'
} )
export class MessageService {
    messages: string[] = []; 
    constructor( private snackBar: MatSnackBar ) { }
    clear() {
        this.messages = [];
    }

    add( message: string ) {
        this.snackBar.open( message, 'Close', {
            duration: 5000, horizontalPosition: 'right', verticalPosition:
            'bottom', panelClass: 'snackbar-style'
        } );
    }
}
