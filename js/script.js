let body = document.body
let url = window.location.toString();
let date = new Date();

let getUserName = (url) => {
  let getUrl = url.split('=');
  let name = getUrl[1];
  if(name == undefined) {
    name = 'ponomarenko-m';
  }
  return name;
}
let userName = getUserName(url)

setTimeout(() => {
  const preloader = document.getElementById('preloader');
  preloader.classList.add('stop');
}, 3000);

let getDate = new Promise((resolve, reject) => {
  setTimeout(() => date ? resolve(document.body.append(date)) : reject('Ошибка.'), 2000)
});

let getUser = new Promise((resolve, reject) => {
  setTimeout(() => userName ? resolve(userName) : reject('Ссылка не найдена.'), 2000)
});

Promise.all([getUser, getDate])
  .then(([userName, date]) => fetch(`https://api.github.com/users/${getUserName(url)}`))
  .then(res => res.json())
  .then(json => {
    let name = document.createElement('h1');
    if (json.name != null) {
      name.innerHTML = json.name;
    } else {
      name.innerHTML = 'Данные отсутствуют';
    }
    document.body.append(name);
    name.addEventListener('click', () => window.location = json.html_url);

    let description = document.createElement('p');
    if(json.bio != null) {
      description.innerHTML = json.bio;
    } else {
      description.innerHTML = 'Данные отсутствуют';
    }
    document.body.append(description);

    let image = new Image();
    image.src = json.avatar_url;
    document.body.append(image);
   })
   .catch(err => document.body.append('Информация о пользователе не доступна.'));