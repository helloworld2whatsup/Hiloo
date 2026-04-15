import https from 'https';

const url = 'https://logo.clearbit.com/ferrari.com';
https.get(url, (res) => {
  console.log('Status Code:', res.statusCode);
});
