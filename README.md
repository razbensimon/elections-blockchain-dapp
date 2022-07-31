# Overview

Elections DAPP for blockchain course project (HIT project).


## Prerequisites
- Install `Node.js` 16.10.0
- Install `Ganache` v7.3.2
- Install `truffle` (v5.5.23) globally by `npm install -g truffle`

## Installation
Install packages for 3 projects:
- root directory (dev assets, for `prittier` code)
- `client` directory 
- `truffle` directory

```sh
npm i

cd client
npm i
cd ..

cd truffle
npm i
npm run build
truffle migrate --network development --reset
```

## Run dev instance
Open 3 terminals
1. Compile automatically when `sol` files changed
```
cd truffle
npm run build:watch
```
2. Create a http server to serve the compiled contracts to the UI
```
cd truffle
npm start
```
3. Run the UI app
```
cd client
npm start
```