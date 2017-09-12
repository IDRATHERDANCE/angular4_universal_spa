import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import 'rxjs/Rx';
import * as express from 'express';
import { Request, Response } from 'express';
import { platformServer, renderModuleFactory } from '@angular/platform-server';
import { ServerAppModule } from './app/server-app.module';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { enableProdMode } from '@angular/core';
import * as compression from 'compression';
// import * as expressStaticGzip from 'express-static-gzip';
// import * as gzippo from 'gzippo';
// import * as fs from 'fs';
// const fs = require('fs');



enableProdMode();
const app = express();
const port = process.env.PORT || 7000;
const baseUrl = `http://localhost:${port}`;

// fs.readdirSync('dist').forEach(file => {
  
//   if (file.substr(file.length - 3) === '.js') {
    
//     app.get(file, function (req, res, next) {

//       console.log('HEY!', req.url);
//       req.url = req.url + '.gz';
//       res.set('Content-Encoding', 'gzip');
//       next();
//   });
//   };

// });


app.engine('html', ngExpressEngine({
  bootstrap: ServerAppModule
}));

app.set('view engine', 'html');
app.set('views', 'src');

app.use('/', express.static('dist', {index: false}));

// app.use(compression());
// app.use('/', expressStaticGzip('dist'));

// app.use(gzippo.staticGzip('dist'));
// app.use(gzippo.compress());

const knownRoutes =  [ 
'/',
'/work',
'/work/:project',
'/news',
'/news/:single',
'/press',
'/press/:article',
'/exhibitions',
'/exhibitions/:exhibition',
'/about',
'/contact' 
];

knownRoutes.forEach((route) => { 
  app.get(route, (req: Request, res: Response) => { 
    console.time(`GET: ${req.originalUrl}`);
    res.render('../dist/index', { req, res });
    console.timeEnd(`GET: ${req.originalUrl}`);
  });
});

app.listen(port, () => {
	console.log(`Listening at ${baseUrl}`);
});
