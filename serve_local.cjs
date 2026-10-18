const path = require('node:path');
const { createStaticServer } = require('./scripts/static-server.cjs');
createStaticServer(path.join(__dirname,'dist')).listen(4321,'127.0.0.1',()=>console.log('TradeLink QA http://127.0.0.1:4321/tangsel-tradelink/'));
