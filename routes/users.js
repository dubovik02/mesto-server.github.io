const router = require('express').Router();
const path = require('path');
const fileReader = require('fs');

const usersFilePath = path.join(__dirname, '../data/users.json');

router.get('/', (req, res) => {

  res.set({ 'content-type': 'application/json; charset=utf-8' });
  try {
    const usersList = fileReader.createReadStream(usersFilePath);
    usersList.pipe(res);
  }
  catch(err) {
    console.log(err);
    res.status(500).send({message: err});
  }

})

router.get('/:id', (req, res) => {

  const { id } = req.params;
  fileReader.readFile(usersFilePath, (err, data) => {

    if (err) {
      console.log(err);
      res.status(500).send({message: err});
      return;
    }

    const objArr = JSON.parse(data);
    const obj = findUserById(objArr, id);
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    if (obj) {
      res.send(obj);
    }
    else {
      res.status(404).send({message: `Нет пользователя с таким id`});
    }

  });

})

/**
 * Возвращает пользователя по его id или null при его отсутсвии
 */
function findUserById(usersList, userId) {

  let obj = null;
  usersList.forEach(element => {
    if (element._id === userId) {
      obj = element;
    }
  });
  return obj;

}

module.exports = router;