# compressed-allocations

Utilities for generating the PulseChain allocations file.

## Step 1: generate raw data from sacrifice database

This data has already been exported and is included in [raw.csv](raw.csv)

## Step 2: [convert/main.go](convert/main.go)

Converts the [raw.csv](raw.csv) data into a simplified `ACCOUNT,CREDIT` formatted file. This file can be reviewed by the community.

```bash
cd ts && yarn && yarn run build && cd ..
node ./ts/dist/example.js
```

> Omit the fixedpoints flag to use the value column (soon to be a points column)

## Step 3: [compress.go](compress.go)

Small utility to compress the `ACCOUNT,CREDIT` file produced in Step 2 into a minimized binary format.

```bash
go run ./compress.go
```

> **The output `credits.bin` file is what will be embedded in the Go-Pulse binary**

## Auditing: [decompress/main.go](decompress/main.go)
A sample implementation of reading and parsing the minimized binary format produced in Step 2 that can be used to audit and verify the compressed binary data.

```bash
go run ./decompress
```

This allows for easy and direct review of the data in the binary credits file:

```bash
# example output
Addr: 0x9fB29AAc15b9A4B7F17c3385939b007540f4d791 | Credit: 0xb114367f26c1cebf83 (3266.530192 PLS)
Addr: 0xCbe3Eab73F1875CF790d38f7f744096f248744Cc | Credit: 0x0713546e47573efe2a (130.520068 PLS)
```
