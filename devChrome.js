const opn = require('opn');
opn('http://localhost:81', {app: ['chrome', '--disable-web-security', '--user-data-dir=%TEMP%']});