import csv

with open('example.csv', 'rt') as f:
    reader = csv.reader(f)
    arr = [split(":").(float(v) for v in row) for row in reader]

arr = zip(*arr)  # transpose rows and columns

with open('transposed_numbers.csv', 'wb') as f:
    writer = csv.writer(f)
    writer.writerows(arr)

print('done')