import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
        providedIn: 'root'
})

export class HttpgetService {

        constructor(private http: HttpClient) { }

        getApiData(locationPath = 'work') {

                let locString = '';

                if ((locationPath === 'work') || (locationPath === 'exhibitions') || (locationPath === 'news') || (locationPath === 'press')) {
                        locString = 'filter[category_name]=';
                }
                if ((locationPath === 'splash') || (locationPath === 'about') || (locationPath === 'contact')) {
                        locString = 'type=page&filter[pagename]=';
                }

                return this.http.get(`http://media.anarajcevic.com/wp-json/posts?${locString}${locationPath}`);
        }
}
