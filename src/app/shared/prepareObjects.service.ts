import { Injectable } from '@angular/core';


@Injectable()

export class PrepareObj {

constructor() {}

    htmlObj(clickedCurrent, page, content) {
        return {
            content,
            itemClicked: clickedCurrent,
            page
        };
    }

    formateText(item, newsOrNot) {
        const newsAddedStuff = newsOrNot ? `<h1>${item.title}</h1><h2>${item.acf.news_short_description}</h2>` : ''; 
            return  newsAddedStuff + item.content;
    }

    formateTitle(item) {
        return item.title.replace(/\s+/g, '-').toLowerCase();
    }

    newsObjPrep(item, page, pop) { 
        const popOrNot = pop ? `${page}_popup_photo` : `${page}_photo`,
            video = `${page}_video`;
      return  {
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

    prepObj(res, page) { 
        return res.reduce((all, item) => {
                if (item.acf[`${page}_popup_photo`]) {
                    all.push(this.newsObjPrep(item, page, true));
                    } else {
                    all.push(this.newsObjPrep(item, page, false));
                    }
                return all;
        }, []);
    }

    getClicked(res, routeSegment) {
        return res.reduce((all, item, index) => {
        if (item.title.replace(/\s+/g, '-').toLowerCase() === routeSegment) {
                all = index;
            }
            return all;
        }, 0);
    }

    prepareSeoObj(seoResponse, _routeSegment, _url, _urlCorr?) {
        
        if (_routeSegment) {

            const  clicked = this.getClicked(seoResponse, _routeSegment),
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
        };

    }

}
