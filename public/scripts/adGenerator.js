const documentReady = new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve))

documentReady.then(() => {
  if(window.localStorage.getItem('fbAccessToken')){
    var accessToken = window.location.hash.split('&')[0].split('=')[1] //todo: check timestapm and expiration date
    accessToken && window.localStorage.setItem('fbAccessToken', accessToken)
  }
  else{
    window.document.getElementById('fbLogin').style.display='none'
  }
  const campaignName = getParameterByName('campaignName')
  campaignName && window.localStorage.setItem('campaignName', campaignName)
})

const setFbApplicationId = () =>{
  var applicationId = window.document.getElementById('applicationId').value
  window.localStorage.setItem('applicationId', applicationId)
}

const getCampaign = name => Promise.resolve({
  
})

const createAd = () => {
  const name = window.localStorage.getItem('campaignName')
  const accessToken = window.localStorage.getItem('fbAccessToken')
  console.log(name)
  getCampaign(name).then(()=>{
      const myRequest = new Request("https://graph.facebook.com/v2.10/act_103829063043787/campaigns", 
       {
        method: 'POST',
        body:{
          access_token:accessToken,
          name: name,
          objective:'LINK_CLICKS',
          status:'PAUSED'
        }
      });
    fetch(myRequest).then((res)=>{
      console.log(res)
      
      })
  })
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}