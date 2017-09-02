const documentReady = new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve))

documentReady.then(() => {
  if(window.localStorage.getItem('fbAccessToken')===null){
    var accessToken = window.location.hash.split('&')[0].split('=')[1] //todo: check timestapm and expiration date
    accessToken && window.localStorage.setItem('fbAccessToken', accessToken)
  }
  else{
    window.document.getElementById('fbLogin').style.display='none'
  }
})
