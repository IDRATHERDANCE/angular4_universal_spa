import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class PrepareMeta {

    removeCharacters(textString: string) {
        return textString.replace(/<\/?[^>]+(>|$)/g, "").replace(/↵|&nbsp;/g, '').substr(0, 155);
    }

    formatKeywords(keyWordsArray: any[]) {

        return keyWordsArray
            .reduce((all, item) => {
                all += `${item.name}, `
                return all;
            }, '').slice(0, -2);
    }
}

