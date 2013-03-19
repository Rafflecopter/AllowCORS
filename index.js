var exports = module.exports = {}
  , url = require('url')

function _extractOrigin(req) {
  if (req.headers.origin)
    return req.headers.origin;

  // So... old versions of chrome (and possibly other old browsers?) don't
  // send along an Origin header, but will accept the header in response.
  // So we'll fall back to the referrer

  var rurl = req.headers.referer

  // sanity check
  if (! rurl)
    return false;

  rurl = url.parse(rurl)

  return rurl.protocol + '//' + rurl.host
}

exports.CORS = function(options) {
    var options = options || {}
      , origins = options.origins || '*'
      , cred = options.credentials || true
      , methods = options.methods || ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE']
      , headers = options.headers || ['X-CSRF-Token',
                                      'X-Requested-With',
                                      'Accept',
                                      'Accept-Version',
                                      'Content-Length',
                                      'Content-MD5',
                                      'Content-Type',
                                      'Date',
                                      'X-Api-Version',
                                      'Authorization']

    if (!~ methods.indexOf('OPTIONS'))
        methods.push('OPTIONS')

    return function(req, resp, $next) {
        var origin = _extractOrigin(req)

        if (origin && origins !== '*' && !~ origins.indexOf(origin))
          return resp.send(403);

        resp.header('Access-Control-Allow-Origin', origin)
        resp.header('Access-Control-Allow-Credentials', cred)
        resp.header('Access-Control-Allow-Methods', methods.join(','))
        resp.header('Access-Control-Allow-Headers', headers.join(', '))

        // Intercept OPTIONS method
        if (req.method == 'OPTIONS')
          return resp.send(200);

        $next()
    }
}
