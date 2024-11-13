// import 'core-js/client/shim';
import 'core-js/features/reflect';
import 'reflect-metadata';
import 'web-animations-js';

// require('zone.js/dist/zone');
import 'zone.js';

import 'ts-helpers';

if (process.env.ENV === 'build') {
  // Production

} else {
  // Development

  Error['stackTraceLimit'] = Infinity;

  // require('zone.js/dist/long-stack-trace-zone');
}
