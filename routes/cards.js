const router = require('express').Router();
const path = require('path');
const fileReader = require('fs');

const cardsFilePath = path.join(__dirname, '../data/cards.json');

router.get('/', (req, res) => {

  res.set({ 'content-type': 'application/json; charset=utf-8' });
  fileReader.readFile(cardsFilePath, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send({message: `Ошибка сервера при чтении файла: ${cardsFilePath}`});
      return;
    }
    res.send(data);

  });

});

module.exports = router;