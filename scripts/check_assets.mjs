import http from 'http';

const urls = [
    '/tangsel-tradelink/brand/raja-freeze-dried-favicon.svg',
    '/tangsel-tradelink/brand/raja-freeze-dried-favicon.png',
    '/tangsel-tradelink/brand/raja-freeze-dried-favicon.ico',
    '/tangsel-tradelink/brand/samara-from-home-favicon.svg',
    '/tangsel-tradelink/brand/samara-from-home-favicon.png',
    '/tangsel-tradelink/brand/samara-favicon.ico',
    '/tangsel-tradelink/brand/my-aicustom-favicon.svg',
    '/tangsel-tradelink/brand/my-aicustom-favicon.png',
    '/tangsel-tradelink/brand/bumina-eenk-favicon.png'
];

async function check() {
    for (const p of urls) {
        await new Promise(resolve => {
            http.get({ host: 'localhost', port: 4321, path: p }, res => {
                console.log(`${p.split('/').pop()}: ${res.statusCode} ${res.headers['content-type']}`);
                resolve();
            }).on('error', err => {
                console.log(`${p}: ERROR ${err.message}`);
                resolve();
            });
        });
    }
}
await check();
