## Older node versions (using Node Fetch)

`@createsend/client` uses relies on the native Node implementation of the `fetch` API. Which is only available in Node v18 and later.
If you are stuck on an earlier version of Node, you will need to also install `node-fetch` to your project. So you're install step will look like:

**Yarn**
```
> yarn add @createsend/client node-fetch@^2.6.9
```

**Npm**
```
> npm install @createsend/client node-fetch@^2.6.9
```

This sample shows the `@createsend/client` wrapper operating on Node v16 (without native fetch), and using `node-fetch` to make network calls.