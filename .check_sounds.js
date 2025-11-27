// Node 18+ provides global fetch; no external package required
const urls = [
  'http://localhost:3000/krpano/viewer/examples/webvr-drone-attack/res/explosion.wav',
  'http://localhost:3000/krpano/viewer/examples/webvr-drone-attack/res/shoot.wav',
  'http://localhost:3000/krpano/viewer/examples/webvr-drone-attack/res/The Dawn - Waiting for the sun.mp3',
  'http://localhost:3000/krpano/viewer/examples/depthmap/abu-simbel-tempel-tour/res/bg.mp3',
  'http://localhost:3000/krpano/viewer/examples/depthmap/abu-simbel-tempel-tour/res/move.mp3',
  'http://localhost:3000/krpano/viewer/examples/directional3dsound/ping.mp3',
  'http://localhost:3000/krpano/viewer/examples/backgroundsound/ding_dong_merrily_on_high.mp3'
];

(async ()=>{
  for (const url of urls) {
    try {
      const res = await fetch(url);
      const ct = res.headers.get('content-type') || '';
      const status = res.status;
      let preview = '';
      if (status === 200 && ct.startsWith('audio')) {
        const buf = await res.arrayBuffer();
        preview = `${buf.byteLength} bytes`;
      } else {
        const txt = await res.text();
        preview = txt.slice(0, 200).replace(/\n/g,' ');
      }
      console.log(url);
      console.log('  STATUS:', status, 'CONTENT-TYPE:', ct);
      console.log('  PREVIEW:', preview);
    } catch (err) {
      console.log(url);
      console.log('  ERROR:', err.message);
    }
  }
})();
