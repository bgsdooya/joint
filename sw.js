// 운동교실 서비스워커 — 슬라이드를 바꾸면 VERSION 숫자를 올려주세요
var VERSION = "v3";
var CACHE = "undong-" + VERSION;
var FILES = [
  "./",
  "index.html",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "img/w2-01.jpg",
  "img/w2-02.jpg",
  "img/w2-03.jpg",
  "img/w2-04.jpg",
  "img/w2-05.jpg",
  "img/w2-06.jpg",
  "img/w2-07.jpg",
  "img/w2-08.jpg",
  "img/w2-09.jpg",
  "img/w2-10.jpg",
  "img/w2-11.jpg",
  "img/w2-12.jpg",
  "img/w2-13.jpg",
  "img/w2-14.jpg",
  "img/w2-15.jpg",
  "img/w2-16.jpg",
  "img/w2-17.jpg",
  "img/w2-18.jpg",
  "img/w2-19.jpg",
  "img/w2-20.jpg",
  "img/w2-21.jpg",
  "img/w2-22.jpg",
  "img/w2-23.jpg",
  "img/w2-24.jpg",
  "img/w2-25.jpg",
  "img/w2-26.jpg",
  "img/w3-01.jpg",
  "img/w3-02.jpg",
  "img/w3-03.jpg",
  "img/w3-04.jpg",
  "img/w3-05.jpg",
  "img/w3-06.jpg",
  "img/w3-07.jpg",
  "img/w3-08.jpg",
  "img/w3-09.jpg",
  "img/w3-10.jpg",
  "img/w3-11.jpg",
  "img/w3-12.jpg",
  "img/w3-13.jpg",
  "img/w3-14.jpg",
  "img/w3-15.jpg",
  "img/w3-16.jpg",
  "img/w3-17.jpg",
  "img/w3-18.jpg",
  "img/w3-19.jpg",
  "img/w3-20.jpg",
  "img/w3-21.jpg",
  "img/w3-22.jpg",
  "img/w3-23.jpg",
  "img/w3-24.jpg",
  "img/w3-25.jpg",
  "img/w3-26.jpg",
  "img/w3-27.jpg",
  "img/w3-28.jpg",
  "img/w4-01.jpg",
  "img/w4-02.jpg",
  "img/w4-03.jpg",
  "img/w4-04.jpg",
  "img/w4-05.jpg",
  "img/w4-06.jpg",
  "img/w4-07.jpg",
  "img/w4-08.jpg",
  "img/w4-09.jpg",
  "img/w4-10.jpg",
  "img/w4-11.jpg",
  "img/w4-12.jpg",
  "img/w4-13.jpg",
  "img/w4-14.jpg",
  "img/w4-15.jpg",
  "img/w4-16.jpg",
  "img/w4-17.jpg",
  "img/w4-18.jpg",
  "img/w4-19.jpg",
  "img/w4-20.jpg",
  "img/w4-21.jpg",
  "img/w4-22.jpg",
  "img/w4-23.jpg",
  "img/w4-24.jpg",
  "img/w4-25.jpg",
  "img/w4-27.jpg"
];

// 설치: 전체 파일을 폰에 미리 저장
self.addEventListener("install", function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(FILES); }).then(function(){ return self.skipWaiting(); }));
});

// 활성화: 옛 버전 저장본 삭제
self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});

// 요청 처리: 화면(html)은 인터넷 먼저 → 안 되면 저장본 / 이미지는 저장본 먼저
self.addEventListener("fetch", function(e){
  var req = e.request;
  if (req.method !== "GET") return;
  if (req.mode === "navigate"){
    e.respondWith(
      fetch(req).then(function(res){
        var copy = res.clone(); caches.open(CACHE).then(function(c){ c.put("index.html", copy); });
        return res;
      }).catch(function(){ return caches.match("index.html"); })
    );
    return;
  }
  e.respondWith(
    caches.match(req, {ignoreSearch:true}).then(function(hit){
      return hit || fetch(req).then(function(res){
        if (res.ok){ var copy = res.clone(); caches.open(CACHE).then(function(c){ c.put(req, copy); }); }
        return res;
      });
    })
  );
});
