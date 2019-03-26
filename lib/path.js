var path = require('path');
var sid = 'S-1-5-21-1549084590-3342327052-631752028-1002';
console.log(path.join('\\HKEY_USERS\\',sid,'\\Software\\VB and VBA Program Settings'));
console.log(path.join('\\HKEY_USERS',sid,'Software\\VB and VBA Program Settings\\CardShareSQL\\clients'));