import https from 'https';

https.get('https://organic-md.com/id/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const imgMatches = [...data.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)];
    console.log(`Found ${imgMatches.length} images:`);
    const unique = [...new Set(imgMatches.map(m => m[1]))];
    unique.forEach(src => console.log(src));
  });
}).on('error', err => {
  console.error("Error:", err.message);
});
