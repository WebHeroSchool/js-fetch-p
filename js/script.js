let body = document.body
let url = window.location.href;
let getName = (url) => {
  let a = url.split('=');
  let name = a[1];
  if (name == undefined) {
    name = 'ponomarenko-m';
  }
  return name;
}

fetch(`https://api.github.com/users/${getName(url)}`)
//fetch(`https://api.github.com/users/defunkt`)
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

  .catch(err => console.log(err));