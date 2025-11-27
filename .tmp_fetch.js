(async ()=>{
  try {
    const url = 'http://localhost:3000/krpano/plugins/webvr.js';
    const r = await fetch(url);
    console.log('URL:', url);
    console.log('STATUS', r.status);
    console.log('CONTENT-TYPE', r.headers.get('content-type'));
    const t = await r.text();
    console.log('BODY_PREVIEW:\n', t.slice(0,1000));
    process.exit(0);
  } catch (e) {
    console.error('ERR', e);
    process.exit(2);
  }
})();
