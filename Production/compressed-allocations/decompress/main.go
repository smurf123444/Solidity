package main

import (
	"compressed-allocations/utils"
	_ "embed"
	"fmt"
	"math/big"
)

//go:embed credits.bin
var data []byte

func main() {
	fmt.Println("Reading", len(data), "bytes...")

	for ptr := 0; ptr < len(data); {
		byteCount := int(data[ptr])
		ptr++

		record := data[ptr : ptr+byteCount]
		ptr += byteCount

		addr := record[:20]
		credit := record[20:]

		plsCredit := utils.WeiToEther(new(big.Int).SetBytes(credit))
		fmt.Println("Addr:", utils.ToHex(addr), "| Credit:", utils.ToHex(credit), fmt.Sprintf("(%s PLS)", plsCredit.String()))
	}
}
