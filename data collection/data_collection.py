import csv

data = {}

with open('messages.csv', 'w', newline='') as csvfile:
    fieldnames = ['text', 'label']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

    writer.writeheader()

    for message in data['messages']:
        text = message['text']
        
        text = ''.join(c for c in text if c <= '\uFFFF')

        writer.writerow({'text': text, 'label': '_class_neutral'})
