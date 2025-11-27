(async ()=>{
  const url = 'http://localhost:3000/krpano/viewer/examples/depthmap/abu-simbel-tempel-tour/res/bg.mp3';
  console.log('Testing URL:', url);
  // Simple GET
  try{
    let res = await fetch(url);
    console.log('GET status', res.status, 'ct', res.headers.get('content-type'), 'len', res.headers.get('content-length'));
    const buf = await res.arrayBuffer();
    console.log('GET body bytes', buf.byteLength);
  }catch(e){ console.error('GET failed', e.message); }

  // GET with Range header
  try{
    let res = await fetch(url, { headers: { Range: 'bytes=0-' } });
    console.log('RANGE status', res.status, 'ct', res.headers.get('content-type'), 'len', res.headers.get('content-length'));
    const buf = await res.arrayBuffer();
    console.log('RANGE body bytes', buf.byteLength);
  }catch(e){ console.error('RANGE fetch failed', e.message); }

  // HEAD
  try{
    let res = await fetch(url, { method: 'HEAD' });
    console.log('HEAD status', res.status, 'ct', res.headers.get('content-type'), 'len', res.headers.get('content-length'));
  }catch(e){ console.error('HEAD failed', e.message); }

  // conditional GET: If-None-Match and If-Modified-Since (none expected locally)
  try{
    let res = await fetch(url, { headers: { 'If-Modified-Since': new Date().toUTCString() } });
    console.log('COND status', res.status, 'ct', res.headers.get('content-type'), 'len', res.headers.get('content-length'));
    const buf = await res.arrayBuffer();
    console.log('COND body bytes', buf.byteLength);
  }catch(e){ console.error('COND failed', e.message); }
})();