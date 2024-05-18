## Module Federate - enfoque Monorepo
En este proyecto se esta usando angular 16.2.12 - node 16.17.0

Comando para correr el proyecto
```console
npm run all
```
## Pasos para crear los microfrontends

1. Crear espacio de trabajo
```console
ng new workspace --create-application=false
```
2. Crear los mf
```console
ng generate application host --style=scss --routing=true
```
4. Crear proyecto de tipo libreria (solo si se requiere)
```console
ng generate library nombre-libreria
```

6. Activar de la federación de módulos (https://www.npmjs.com/package/@angular-architects/module-federation)

   Nota: instalar version de la libreria que sea compatible con la version de angular
```console
npm i -D @angular-architects/module-federation
```

5. Agregar el uso de modulos federados a cada mf
```console
ng add @angular-architects/module-federation --project mf-shell --port 4200 --type host (para la aplicacion contenedora)
ng add @angular-architects/module-federation --project mf-shopping --port 4201 --type remote (para los mf)
```

6. Configuración para el host en el webpack.config.js
```javascript
const { 
  shareAll, 
  withModuleFederationPlugin 
} = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  remotes: {   
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
```

7. Configuración para el mf en el webpack.config.js
```javascript
const { 
  shareAll, 
  withModuleFederationPlugin 
} = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'mfPayment',
  exposes: {
    './PaymentComponent': './projects/mf-payment/src/app/payment/payment.component.ts',
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
```
8. Instalar libreria para ejecutar los proyectos en paralelo
```console
npm i -D npm-run-all
```

9. Agregamos lo siguientes scripts en nuestro archivo package.json
```javascript
"mf-shell": "ng s mf-shell",
"mf-shopping": "ng s mf-shopping",
"mf-payment": "ng s mf-payment",
"all": "npm-run-all --parallel mf-shell mf-shopping mf-payment"
```
