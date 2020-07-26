const router = require('express').Router();
const path = require('path');
const fileReader = require('fs');

const cardsFilePath = path.join(__dirname, '../data/cards.json');

router.get('/', (req, res) => {

  res.set({ 'content-type': 'application/json; charset=utf-8' });
  try {
    const cardsList = fileReader.createReadStream(cardsFilePath);
    cardsList.pipe(res);
  }
  catch(err) {
    console.log(err);
    res.status(500).send({message: err});
  }


});

module.exports = router;