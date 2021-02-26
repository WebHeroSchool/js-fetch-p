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
  .then(res => res.json())
  .then(json => {
    let callName = document.createElement('h1');
    if (json.name != null) {
      callName.innerHTML = json.name;
    } else {
      callName.innerHTML = 'Данные отсутствуют';
    }
    document.body.append(callName);
    callName.addEventListener('click', () => window.location = json.html_url);

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