const router = require('express').Router();
const path = require('path');
const fileReader = require('fs');

const usersFilePath = path.join(__dirname, '../data/users.json');

router.get('/', (req, res) => {
  res.set({ 'content-type': 'application/json; charset=utf-8' });
  fileReader.readFile(usersFilePath, (err, data) => {
    if (err) {
      res.status(500).send({ message: `Ошибка сервера при чтении файла: ${usersFilePath}` });
      return;
    }
    res.send(data);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  fileReader.readFile(usersFilePath, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    const objArr = JSON.parse(data);
    //  const obj = findUserById(objArr, id);
    const obj = objArr.find((item) => item._id === id);
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    if (obj) {
      res.send(obj);
    } else {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
  });
});

module.exports = router;
