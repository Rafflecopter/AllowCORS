A node.js express middleware for allowing cross-origin requests

    var allowCORS = require('allow-cors').CORS({
        origins: ['http://google.com', ...]   // defaults to '*' (all origins)
        credentials: true // defaults to true
        methods: ['GET'] // ensures OPTIONS defaults to all methods
        headers: ['X-CSRF-Token', ...] // defaults to ['X-CSRF-Token',
                                                       'X-Requested-With',
                                                       'Accept',
                                                       'Accept-Version',
                                                       'Content-Length',
                                                       'Content-MD5',
                                                       'Content-Type',
                                                       'Date',
                                                       'X-Api-Version',
                                                       'Authorization']
    })

    var WWW = express()

    WWW.use(allowCORS)
