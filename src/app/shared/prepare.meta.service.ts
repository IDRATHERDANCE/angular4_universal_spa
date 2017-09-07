import { Injectable } from '@angular/core';

@Injectable()

export class PrepareMeta {

    removeCharacters(textString) {
        return textString.replace(/<\/?[^>]+(>|$)/g, "").replace(/↵|&nbsp;/g,'').substr(0, 155);
    }

    formatKeywords(keyWordsArray) {

        return keyWordsArray
                .reduce((all, item) => {
                    all += `${item.name}, `
                    return all;
                }, '').slice(0, -2);
    }
}

