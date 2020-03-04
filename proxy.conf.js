const
  bertHost = '0.0.0.0', // <--- change bert host here
  bertPort = '5000', // <--- change bert port here
  bertProtocol = 'http'; // <--- change bert protocol here

const PROXY_CONFIG = {
  "/" : {
    "target": `${bertProtocol}://${bertHost}:${bertPort}`,
    "secure": bertHost === 'https',
    "pathRewrite": {
      '/bert-api/': '/'
    },
    "bypass": function (req, res) {
      req.headers["origin"] = this.target;
      req.headers["host"] = bertHost;
    },
    onProxyRes(proxyRes, req, res) {
      if (proxyRes.headers['set-cookie']) {
        proxyRes.headers['set-cookie'] = proxyRes.headers['set-cookie'].map(setCookie => {
          return setCookie;
        });
      }
    }
  }
};

module.exports = PROXY_CONFIG;
