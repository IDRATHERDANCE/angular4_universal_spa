import { Injectable } from '@angular/core';
// import { Http } from '@angular/common';
import { HttpClient } from '@angular/common/http'

// import 'rxjs/add/operator/map';

// import { map } from 'rxjs/operators';

@Injectable()

export class HttpgetService {

        constructor(private http: HttpClient) { }

        getApiData(locationPath: String = 'work') {

                if (locationPath !== undefined) {

                        let locString: string;

                        if ((locationPath === 'work') || (locationPath === 'exhibitions') || (locationPath === 'news') || (locationPath === 'press')) {
                                locString = 'filter[category_name]=';
                        }
                        if ((locationPath === 'splash') || (locationPath === 'about') || (locationPath === 'contact')) {
                                locString = 'type=page&filter[pagename]=';
                        }

                        return this.http.get(`http://media.anarajcevic.com/wp-json/posts?${locString}${locationPath}`, { responseType: 'json' })

                }
        }
}
