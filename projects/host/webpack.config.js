const { 
  shareAll, 
  withModuleFederationPlugin 
} = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  remotes: {
    mfShopping: "http://localhost:5001/remoteEntry.js",    
    mfPayment: "http://localhost:5002/remoteEntry.js",    
  },

  shared: {
    ...shareAll({ 
      singleton: true, 
      strictVersion: true, 
      requiredVersion: 'auto' 
    }),
  },
  sharedMappings: ["@commons-lib"],

});
