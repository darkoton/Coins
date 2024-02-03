//< " CONNECTING JS COMPONENTS " >=============================================================================================================>//
import isWebp from './modules/webp.js'; //SUPPORT WEBP

import isDevice from './modules/device.js'; //DEFINE DEVICE

// import './modules/preloader.js'; // PRELOADER

import './modules/dynamic_adap.js'; // DYNAMIC ADAPTIVE

// import "./modules/scroll_header.js"  // SCROLL HEADER

// import "./modules/swiper.js"  // SLIDER SWIPER

// import "./modules/animate_scroll.js"  // ANIMATE WITH SCROLL

// import "./modules/tabs.js"  // TABS

// import "./modules/parallax.js"  // PARALLAX EFFECT


if (location.pathname == '/rate.html'){
	import('./modules/rate.js')
}

//< " СКРИПТЫ " >=============================================================================================================>//
isWebp();
isDevice();


