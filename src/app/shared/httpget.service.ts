import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class HttpgetService {

constructor(private http: Http) {}

    getApiData(locationPath: String = 'work') { 

        if (locationPath !== undefined) {

        let locString: string;

        if ((locationPath === 'work') || (locationPath === 'exhibitions') || (locationPath === 'news') || (locationPath === 'press')) {
                locString = 'filter[category_name]=';
        }
        if ((locationPath === 'splash') || (locationPath === 'about') || (locationPath === 'contact')) {
                locString = 'type=page&filter[pagename]=';
        }

        return this.http.get(`http://media.anarajcevic.com/wp-json/posts?${locString}${locationPath}`)
                .map(response => response.json());

        }
    }
}
