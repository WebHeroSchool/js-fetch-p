let url = window.location.search;
function getUserName(url) {
	let getUrl = url.split('=');
	let name = getUrl[1];
	if(name === null) {
	name = 'ponomarenko-m';
	}
	return name;
}

function responseFetch(name) {
  fetch('https://api.github.com/users/${getUserName(url)}')
  .then(res => res.json())
  .then(json => {
    console.log(json);
    console.log(json.avatar_url);
    console.log(json.location);
    console.log(json.bio);
    console.log(json.name);
    console.log(json.html_url);
    let avatar = document.createElement('img');
      avatar.src = json.avatar_url;
    document.body.append(avatar);
    let link = document.createElement('a');
      link.href = json.html_url;
      link.text = json.name;
    document.body.append(link);
    let description = document.createElement('p');
      description.innerHTML = json.bio;
    document.body.append(description);
    let location = document.createElement('p');
      location.innerHTML = json.location;
    document.body.append(location);
    })
    .catch(err => document.body.innerHTML = ('Информация о пользователе недоступна'));
  }

responseFetch(name);
console.log(window.location.search);