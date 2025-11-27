(async ()=>{
  const urls = [
    'http://localhost:3000/krpano/plugins/webvr.js',
    'http://localhost:3000/krpano/plugins/soundinterface.js',
    'http://localhost:3000/krpano/plugins/pp_blur.js',
    'http://localhost:3000/krpano/plugins/pp_sharpen.js',
    'http://localhost:3000/krpano/plugins/threejs_krpanoplugin.js',
    'http://localhost:3000/krpano/plugins/contextmenu.xml',
    'http://localhost:3000/krpano/plugins/webvr.xml'
  ];
  for (const url of urls) {
    try {
      const r = await fetch(url);
      console.log(url, r.status, r.headers.get('content-type'));
    } catch (e) {
      console.error(url, 'ERR', e.message || e);
    }
  }
})();
