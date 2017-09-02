const documentReady = new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve))

documentReady.then(() => {
  if(!window.localStorage.getItem('fbAccessToken')){
    var accessToken = window.location.hash.split('&')[0].split('=')[1] //todo: check timestapm and expiration date
    accessToken && window.localStorage.setItem('fbAccessToken', accessToken)
  }
  else{
    window.document.getElementById('fbLogin').style.display='none'
  }
})

const setFbApplicationId = () =>{
  var applicationId = window.document.getElementById('applicationId').value
  window.localStorage.setItem('applicationId', applicationId)
}

const createAdLink = () => {
  const campaignName = localStorage.getItem('campaignName');
  const clientSecretKey = localStorage.getItem('clientSecretKey');
  const applicationId = localStorage.getItem('applicationId');

  return `${location.origin}/yourToken?app_id=${applicationId}&app_secret=${clientSecretKey}&campaign_name=${campaignName}`;

const createAd = () => {
  const name = window.localStorage.getItem('campaignName')
  const accessToken = window.localStorage.getItem('fbAccessToken')
      const myRequest = new Request(`https://graph.facebook.com/v2.10/act_103829063043787/campaigns?access_token=${accessToken}&name=${name}&objective=LINK_CLICKS&status=PAUSED`, {method: 'POST'});
    fetch(myRequest).then(res => res.json()).then((res)=>{
      console.log(res)
      const adSetRequest = new Request(`https://graph.facebook.com/v2.10/act_103829063043787/campaigns?access_token=${accessToken}&name=${name}&ptimization_goal=REACH&billing_event=IMPRESSIONS&bid_amount=2daily_budget=1campaign_id={}`, {method: 'POST'});
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