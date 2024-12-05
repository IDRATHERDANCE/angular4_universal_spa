import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class RemoveEmptyLines {

    removeLines(textString: string) {
        return textString.replace(/&nbsp;/g, '').replace(/<p><\/p>/g, '')
    }

}

