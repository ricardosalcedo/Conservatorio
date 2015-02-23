cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.oauthio.plugins.oauthio/www/dist/oauth.js",
        "id": "com.oauthio.plugins.oauthio.OAuth",
        "merges": [
            "OAuth"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.oauthio.plugins.oauthio": "0.2.4"
}
// BOTTOM OF METADATA
});