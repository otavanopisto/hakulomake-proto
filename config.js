module.exports = {
  port: 3000,
  server_root: '',
  session_secret: 'ok1h34iou54h198h90fh1q890123f8j902',
  mail: {
    api_key: '',
    domain: '',
    sender: 'kesatyo'
  },
  database: {
    host: 'localhost',
    table: 'hakulomake'
  },
  pyramus: {
    appId: '8df25fa7-2d34-4f0a-8c35-8e60aa753927',
    appSecret: 'aeVt7LUBNcW74Ziji2AfX2ZVFXaATCftl0FpwTMnsEzV6etXtRLFu9hmXarN0i3gC5Gg2MphYnppVAnG',
    pyramusUrl: 'https://dev.pyramus.fi:8443/1/',
    redirectURI: 'http://localhost:3000/auth_code',
    authCode: 'f2f34423cc39021acc6ec884ae935a78'
  },
  defaultUser: {
    name: 'admin',
    pw: 'qwerty'
  }
};