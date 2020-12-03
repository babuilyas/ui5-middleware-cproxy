# UI5 corporate proxy middleware

Middleware for [ui5-server](https://github.com/SAP/ui5-server), enabling proxy support.

## Install

```bash
npm install ui5-middleware-cproxy --save-dev
```

## Configuration options (in `$yourapp/ui5.yaml`)

- http_proxy: http|https://host:port

## Usage

1. Define the dependency in `$yourapp/package.json`:

```json
"devDependencies": {
    // ...
    "ui5-middleware-cproxy": "*"
    // ...
},
"ui5": {
  "dependencies": [
    // ...
    "ui5-middleware-cproxy",
    // ...
  ]
}
```

> As the devDependencies are not recognized by the UI5 tooling, they need to be listed in the `ui5 > dependencies` array. In addition, once using the `ui5 > dependencies` array you need to list all UI5 tooling relevant dependencies.

2. configure it in `$yourapp/ui5.yaml`:

```yaml
server:
  customMiddleware:
  - name: ui5-middleware-cproxy
    beforeMiddleware: compression
    mountPath: /
    configuration:
      http_proxy: http://172.16.0.38:808
```

## How it works

The middleware starts a global proxy instance at start of application using https://www.npmjs.com/package/node-global-proxy and it becomes available to most of modules including axios, node-fetch, got, etc.

## License

This work is [dual-licensed](../../LICENSE) under ISC and the Derived Beer-ware License. The official license will be ISC but finally you can choose between one of them if you use this work.