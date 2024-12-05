import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})

export class PrepareObj {

    htmlObj(clickedCurrent: any, page: any, content: any, pop: any, project?: any) {
        const itemClicked = pop ? content.findIndex((item: any) => item.title === pop) : clickedCurrent;
        return {
            content,
            itemClicked,
            page,
            project
        };
    }

    formateText(item: any, newsOrNot: any) {
        const newsAddedStuff = newsOrNot ? `<h1>${item.title}</h1><h2>${item.acf.news_short_description}</h2>` : '';
        return newsAddedStuff + item.content;
    }

    formateTitle(item: any) {
        return item.title.replace(/\s+/g, '-').toLowerCase();
    }

    newsObjPrep(item: any, page: any, pop: any) {
        const popOrNot = pop ? `${page}_popup_photo` : `${page}_photo`,
            video = `${page}_video`;
        return {
            photo: {
                url: item.acf[popOrNot].url,
                aspect: item.acf[popOrNot].width / item.acf[popOrNot].height,
                width: item.acf[popOrNot].width,
                height: item.acf[popOrNot].height,
                alt: item.acf[popOrNot].caption
            },
            video: page === ('exhibition') ? '' : item.acf[video].html,
            text: page === ('news') ? this.formateText(item, true) : this.formateText(item, false),
            title: this.formateTitle(item),
            newPop: pop,
            keywords: item.terms.post_tag,
            fullTitle: item.title
        }

    }

    prepObj(res: any, page: any) {
        return res.reduce((all: any, item: any) => {
            if (item.acf[`${page}_popup_photo`]) {
                all.push(this.newsObjPrep(item, page, true));
            } else {
                all.push(this.newsObjPrep(item, page, false));
            }
            return all;
        }, []);
    }

    getClicked(res: any, routeSegment: any) {
        return res.reduce((all: any, item: any, index: number) => {
            if (item.title.replace(/\s+/g, '-').toLowerCase() === routeSegment) {
                all = index;
            }
            return all;
        }, 0);
    }

    prepareSeoObj(seoResponse: any, _routeSegment: string, _url: string, _urlCorr?: any) {

        if (_routeSegment) {

            const clicked = this.getClicked(seoResponse, _routeSegment),
                wholeContent = this.prepObj(seoResponse, _urlCorr || _url),
                singleObj = wholeContent[clicked];

            return {
                title: `Ana Rajecvic - ${singleObj.fullTitle}`,
                description: singleObj.text,
                image: singleObj.photo.url,
                type: 'article',
                keywords: singleObj.keywords,
                url: `${_url}/${_routeSegment}`
            };

        } else {

            const pageName = _url.charAt(0).toUpperCase() + _url.slice(1);

            return {
                title: `Ana Rajecvic - ${pageName}`,
                description: `${pageName} page of the artist Ana Rajecvic`,
                image: seoResponse[0].acf[`${_urlCorr || _url}_popup_photo`].url || seoResponse[0].acf[`${_urlCorr || _url}_photo`].url,
                type: `${pageName} page`,
                keywords: [],
                url: _url
            };
        }

    }

}
