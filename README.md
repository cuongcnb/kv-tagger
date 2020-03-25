raw-fb-01.txt -> postag-fb-01.txt (raw-to-iob.js)
postag-fb-01.txt -> rawpostag-fb-01.txt (iob2raw.js)
rawpostag-fb-01.txt -> *.tsv (dataturks)
*.tsv -> train-part-xx.txt (file train ) -> Chưa có hàm xử lý
Ghép vào file location-train.txt (copy tay)
Chạy lênh train: node .\location\location-trainer.js