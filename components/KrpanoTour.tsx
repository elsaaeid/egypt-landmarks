"use client";

import { useEffect, useRef } from "react";

type KrpanoTourProps = {
  xml?: string;
};

export default function KrpanoTour({ xml }: KrpanoTourProps) {
  const panoRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  // Inject lightweight diagnostics to capture audio fetches and decodeAudioData errors
  // This helps us identify which audio URL / response triggers the decoding failure.
  const diag = document.createElement("script");
  diag.async = false;
  diag.text = `(function(){
    try{
      // state to help retry/diagnose audio loads (store on window to avoid closure/loader issues)
      window.__krpano_audio_diag = window.__krpano_audio_diag || { lastUrl: null, urlBytes: new Map() };
      const AUDIO_RX = /\\.(mp3|wav|ogg)(\\?|$)/i;
      const origFetch = window.fetch;
      if(origFetch){
        window.fetch = async function(input, init){
          let url;
          try{ url = typeof input === 'string' ? input : (input && input.url); if(url && AUDIO_RX.test(url)) console.log('krpano-debug: fetch-start', url); }catch(e){}
          const res = await origFetch.apply(this, arguments);
          try{
            const ct = res.headers.get('content-type')||'';
            const isAudio = ct.startsWith('audio') || (res.url && AUDIO_RX.test(res.url));
            if(isAudio){
              const rurl = res.url || url;
              diagState.lastUrl = rurl;
              console.log('krpano-debug: fetched', rurl, res.status, ct);
              try{
                const clone = res.clone();
                const buf = await clone.arrayBuffer();
                diagState.urlBytes.set(rurl, buf.byteLength);
                console.log('krpano-debug: fetch responseBytes', rurl, buf.byteLength);
              }catch(e){ console.warn('krpano-debug: fetch body-read failed', rurl, e && e.message); }
              if(!res.ok) console.error('krpano-debug: audio fetch failed', rurl, res.status);
            }
          }catch(e){}
          return res;
        };
      }
    }catch(e){console.error('krpano-debug: fetch-wrap failed', e)}
    try{
      const origOpen = XMLHttpRequest.prototype.open;
      const origSend = XMLHttpRequest.prototype.send;
      XMLHttpRequest.prototype.open = function(method, url){ this._krpano_url = url; this._krpano_method = method; return origOpen.apply(this, arguments); };
      XMLHttpRequest.prototype.send = function(){
        this.addEventListener('loadend', function(){
          try{
            const ct = this.getResponseHeader && this.getResponseHeader('content-type')||'';
            if(this._krpano_url && AUDIO_RX.test(this._krpano_url)) {
              diagState.lastUrl = this._krpano_url;
              console.log('krpano-debug: XHR', this._krpano_method || 'GET', this._krpano_url, this.status, ct);
              if(this.status!==200) console.error('krpano-debug: XHR audio failed', this._krpano_method || 'GET', this._krpano_url, this.status);
              try{
                const headers = this.getAllResponseHeaders && this.getAllResponseHeaders();
                if(headers) console.log('krpano-debug: XHR headers', this._krpano_url, headers.replace(/\\r\\n/g,' | '));
              }catch(e){}
              try{
                if(this.response && this.response.byteLength !== undefined) {
                  diagState.urlBytes.set(this._krpano_url, this.response.byteLength);
                  console.log('krpano-debug: XHR responseBytes', this._krpano_url, this.response.byteLength);
                } else if(this.responseText) {
                  diagState.urlBytes.set(this._krpano_url, this.responseText.length);
                  console.log('krpano-debug: XHR responseTextLength', this._krpano_url, this.responseText.length);
                }
              }catch(e){}
              // if we got a 204 No Content, attempt a direct GET to check real content
              if(this.status===204){
                try{
                  fetch(this._krpano_url).then(r=>{
                    const ct = r.headers.get('content-type')||'';
                    r.arrayBuffer().then(b=>{
                      diagState.urlBytes.set(this._krpano_url, b.byteLength);
                      console.warn('krpano-debug: followup GET', this._krpano_url, r.status, ct, 'bytes', b.byteLength);
                    }).catch(e=>console.warn('krpano-debug: followup GET read failed', e && e.message));
                  }).catch(e=>console.warn('krpano-debug: followup GET failed', e && e.message));
                }catch(e){}
              }
            }
          }catch(e){}
        });
        return origSend.apply(this, arguments);
      };
    }catch(e){console.error('krpano-debug: XHR-wrap failed', e)}
    try{
      const AC = window.AudioContext || window.webkitAudioContext;
      if(AC && AC.prototype){
        const origDecode = AC.prototype.decodeAudioData;
        if(origDecode){
          AC.prototype.decodeAudioData = function(buffer, success, error){
            // support both callback-style and Promise-style usages
            function tryDecode(buf, onSuccess, onError){
              try{
                return origDecode.call(this, buf, onSuccess, onError);
              }catch(ex){
                console.error('krpano-debug: decodeAudioData thrown', ex, 'bufferBytes', buf && buf.byteLength);
                throw ex;
              }
            }
            const wrappedSuccess = function(decoded){ if(success) success(decoded); };
            const wrappedError = async function(err){
              try{
                console.error('krpano-debug: decodeAudioData error', err, 'bufferBytes', buffer && buffer.byteLength);
                // if we have an empty buffer, try to refetch the last seen audio URL and retry
                const diagState = window.__krpano_audio_diag || { lastUrl: null, urlBytes: new Map() };
                if(buffer && buffer.byteLength === 0 && diagState.lastUrl){
                  try{
                    console.warn('krpano-debug: decode retry fetching', diagState.lastUrl);
                    const r = await fetch(diagState.lastUrl);
                    const ct = r.headers.get('content-type')||'';
                    const ab = await r.arrayBuffer();
                    diagState.urlBytes.set(diagState.lastUrl, ab.byteLength);
                    console.warn('krpano-debug: decode retry fetched', diagState.lastUrl, r.status, ct, 'bytes', ab.byteLength);
                    return tryDecode.call(this, ab, success, error);
                  }catch(fetchErr){
                    console.error('krpano-debug: decode retry failed', fetchErr && fetchErr.message);
                  }
                }
              }catch(inner){ console.error('krpano-debug: decode retry thrown', inner && inner.message); }
              if(error) error(err);
            };
            // Promise-style: no callbacks provided
            if(typeof success !== 'function' && typeof error !== 'function'){
              try{
                return tryDecode.call(this, buffer).catch(async (err)=>{
                  console.error('krpano-debug: decodeAudioData promise reject', err, 'bufferBytes', buffer && buffer.byteLength);
                  const diagState = window.__krpano_audio_diag || { lastUrl: null, urlBytes: new Map() };
                  if(buffer && buffer.byteLength === 0 && diagState.lastUrl){
                    try{
                      console.warn('krpano-debug: promise-style decode retry fetching', diagState.lastUrl);
                      const r = await fetch(diagState.lastUrl);
                      const ab = await r.arrayBuffer();
                      diagState.urlBytes.set(diagState.lastUrl, ab.byteLength);
                      console.warn('krpano-debug: promise-style retry fetched', diagState.lastUrl, 'bytes', ab.byteLength);
                      return origDecode.call(this, ab);
                    }catch(fetchErr){ console.error('krpano-debug: promise-style retry failed', fetchErr && fetchErr.message); }
                  }
                  throw err;
                });
              }catch(e){ console.error('krpano-debug: decodeAudioData promise-wrap thrown', e && e.message); throw e; }
            }
            // callback-style
            return tryDecode.call(this, buffer, wrappedSuccess, wrappedError);
          };
        }
      }
    }catch(e){console.error('krpano-debug: AudioContext-wrap failed', e)}
  })();`;
  document.head.appendChild(diag);

  const script = document.createElement("script");
  script.src = "/krpano/viewer/krpano.js";
  script.async = true;
  document.body.appendChild(script);

  script.onload = () => {
    if (window.embedpano) {
      window.embedpano({
        swf: "/krpano/krpano.swf",
        xml: xml,
        target: panoRef.current,
        html5: "prefer",
      });
    }
  };

  return () => {
    if (panoRef.current) panoRef.current.innerHTML = "";
    try{ document.body.removeChild(script); }catch(e){}
    try{ document.head.removeChild(diag); }catch(e){}
  };
}, []);

  return (
    <div
      ref={panoRef}
      style={{
        width: "90%",
        height: "370px",
        maxWidth: "900px",
        margin: "14px auto",
        borderRadius: "15px",
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      }}
      aria-label="Krpano virtual tour viewer"
    />
  );
}
