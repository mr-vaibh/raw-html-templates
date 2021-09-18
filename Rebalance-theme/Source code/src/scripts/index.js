/* eslint-disable no-undef */
import '../stylesheets/main.scss';
// Locomotive settings
import './controllers/locomotive-config';
//all sliders
import './components/sliders/sliders'
//main components
import Components from './components/index';
//load images
import './controllers/preload-config';
//default components
import Header from './components/header/header';
import Cursor from './components/cursor/cursor';
import Loader from './components/loader/loader';

import isMobile from 'ismobilejs'
import * as eva from 'eva-icons';

window.onload = config;

//initialize loader
new Loader();
new Header();

function config() {
  const indexComponents = new Components();
  indexComponents.init();
  eva.replace();
}

if (isMobile(isMobile.phone).any==false){
  let cursor;
  cursor = new Cursor();
  cursor.init();
};

