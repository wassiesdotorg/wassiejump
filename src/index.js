import Game from './Game';
import config from './config';
import { isProd } from './utils';

import './index.css';

// eslint-disable-next-line no-new
new Game(config);