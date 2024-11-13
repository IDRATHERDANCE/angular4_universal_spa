// import 'zone.js/dist/zone-node';
// import 'zone.js';
// import 'reflect-metadata';
// import 'rxjs';
import * as express from 'express';
import { Request, Response } from 'express';
// import { platformServer } from '@angular/platform-server';
import { bootstrapApplication } from "@angular/platform-browser";
import { ServerAppModule } from './app/server-app.module';
// import { AppComponent } from './app/app.component';
// import { ngExpressEngine } from '@nguniversal/express-engine';
// import { enableProdMode } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
// import * as compression from 'compression';
// import "@angular/compiler"

import { CommonEngine, CommonEngineRenderOptions } from '@angular/ssr';

// the standalone bootstrapper
const _app = () => bootstrapApplication(ServerAppModule, {
  providers: [
    // this new line from @angular/platform-server
    provideServerRendering()
    // provide what we need for our multilingual build
    // ... providers array
  ],
});

const engine = new CommonEngine({ bootstrap: _app });

function crExpressEgine(
  filePath: string,
  options: object,
  callback: (err?: Error | null, html?: string) => void,
) {
  try {
    // grab the options passed in our Express server
    const renderOptions = { ...options } as CommonEngineRenderOptions;

    // set documentFilePath to the first arugment of render
    renderOptions.documentFilePath = filePath;

    // the options contain settings.view value
    // which is set by app.set('views', './client') in Express server
    // assign it to publicPath
    renderOptions.publicPath = (options as any).settings?.views;

    // then render
    engine
      .render(renderOptions)
      .then((html) => callback(null, html))
      .catch(callback);
  } catch (err) {
    callback(err);
  }
};
function run() {

  // enableProdMode();
  const app = express();
  const port = process.env.PORT || 3000;
  const baseUrl = `http://localhost:${port}`;

  // app.use(compression());

  // app.engine('html', ngExpressEngine({
  //   bootstrap: ServerAppModule
  // }));

  app.engine('html', crExpressEgine);

  // app.set('view engine', 'html');
  // app.set('views', 'src');

  // app.use('/', express.static('dist', { index: false }));


  const knownRoutes = [
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

  // knownRoutes.forEach((route) => {
  //   // app.get(route, (req: Request, res: Response) => {
  //   //   console.time(`GET: ${req.originalUrl}`);
  //   //   res.render('../dist/index', { req, res });
  //   //   console.timeEnd(`GET: ${req.originalUrl}`);
  //   // });
  //   app.get('*'), (req, res) => {
  //     const { protocol, originalUrl, headers } = req;

  //     // serve the main index file
  //     // res.render(`client/index.html`, {
  //     res.render('../dist/index.html', {
  //       // set the URL here
  //       url: `${protocol}://${headers.host}${originalUrl}`,
  //       // pass providers here, if any, for example "serverUrl"
  //       providers: [
  //         {
  //           provide: 'serverUrl',
  //           useValue: res.locals.serverUrl // something already saved
  //         }
  //       ],
  //       // we can also pass other options
  //       // document: use this to generate different DOM content
  //       // turn off inlinecriticalcss
  //       // inlineCriticalCss: false
  //     });
  //   };
  // });


  app.listen(3000, () => {
    console.log(`Listening to port ${port} at ${baseUrl}`);
  });
}

run();
