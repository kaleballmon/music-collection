import csv
import json
import sys

with open(sys.argv[1], 'r') as rf:
    reader = csv.DictReader(rf)
    records = [
        {
            "title": record["Title"].strip(),
            "artist": record["Artist"].strip() if record["Artist"].strip() != "Various" else None,
        }
        for record in reader
    ]

    with open(sys.argv[2], 'w') as wf:
        wf.write(json.dumps(records))