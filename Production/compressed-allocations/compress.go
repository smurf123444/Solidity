package main

import (
	"bytes"
	"compressed-allocations/utils"
	_ "embed"
	"encoding/csv"
	"fmt"
	"os"
)

//go:embed credits.csv
var data []byte
var outFile = "decompress/credits.bin"

func panicFail(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	file, err := os.Create(outFile)
	panicFail(err)
	defer file.Close()

	reader := csv.NewReader(bytes.NewReader(data))
	records, err := reader.ReadAll()
	panicFail(err)

	// then write each record, with the balance bytes normalized to length requiredBalanceBytes
	for _, record := range records {
		addrBytes := utils.FromHex(record[0])
		creditBytes := utils.FromHex(record[1])
		recordBytes := append(addrBytes, creditBytes...)
		recordLen := len(recordBytes)

		// first write a single byte to represent the length of the encoded record
		file.Write([]byte{uint8(recordLen)})

		// then write our record bytes
		file.Write(recordBytes)
	}

	fmt.Println("Wrote compressed file:", outFile)
}
