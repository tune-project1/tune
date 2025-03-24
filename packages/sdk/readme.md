# Tune node.js sdk

Tune's node.js sdk relies on axios internally.

## How to build

Clone this package and run `npm install` to install dependencies.

Then run `npm run build` inside the package to generate build files.

This will generate /build/index.es.js and /build/index.umd.js

## How to install

Open terminal and run `npm install --save @tune/sdk` inside your node.js project.

## How to use

```
import Tune from "@tune/sdk";

const ops = new Tune("API_KEY");

await ops.events.ingest({
	name : "user signed up",
	avatar : "😀"
});
```

## API docs

For docs, refer to https://tune/api
