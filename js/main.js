document.querySelector('#buttonCharacter').addEventListener('click', getCharacter)



function getCharacter(){
  let choice = document.querySelector('#characterName').value
  choice = capitalizeFirstLetter(choice)
  let url = `https://ghibliapi.herokuapp.com/people?name=${choice}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.querySelector('#name').innerText = data[0].name
        document.querySelector('#age').innerText = data[0].age
        document.querySelector('#eyeColor').innerText = data[0].eye_color
        document.querySelector('#gender').innerText = data[0].gender
        fetch(data[0].species)
            .then(res => res.json()) // parse response as JSON
            .then(data => {
              document.querySelector('#species').innerText = data.name
            })
            .catch(err => {
             console.log(`error ${err}`)
          })
        fetch(data[0].films[0])
            .then(res => res.json()) // parse response as JSON
            .then(data => {
              console.log(data)
              document.querySelector('#movieTitle').innerText = data.title
            })
            .catch(err => {
             console.log(`error ${err}`)
            })
        
        })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

//Special Function

function capitalizeFirstLetter(str){
    let result = str.toLowerCase().split(' ')
    let final = result.map(x => x.charAt(0).toUpperCase() + x.slice(1))
    final = final.join(' ')
    return final
}