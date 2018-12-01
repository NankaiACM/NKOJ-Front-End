const opn = require('opn');
opn('http://localhost', {app: ['chrome', '--disable-web-security', '--user-data-dir=%TEMP%']});