const documentReady = new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve))

documentReady.then(() => {
  if(window.localStorage.getItem('fbAccessToken')===null){
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

const createAdLink = () => {
  const campaignName = localStorage.getItem('campaignName');
  const clientSecretKey = localStorage.getItem('clientSecretKey');
  const applicationId = localStorage.getItem('applicationId');

  return `${location.origin}/yourToken?app_id=${applicationId}&app_secret=${clientSecretKey}&campaign_name=${campaignName}`;
}
const createAd = () => {
  const name = window.localStorage.getItem('campaignName')
  console.log(name)
  getCampaign(name).then(()=>{
      const myRequest = new Request('https://graph.facebook.com/v2.10/act_103829063043787/campaigns?access_token=EAABnIXd5q08BAJBVTHX3SzzZCS2mAmFhzW2nU5mMAghtSatOSLW8AxeIONZCp7wvJpcD1tSvVYVshyjDi5dZC5yWFzLLGFvcUjmHYSMYb2oSj29jfsLglJ7Qsir9C8qIbrNgMOqXJBtD5qb2x3YaJYYPXddrxYEKdSoVRWDAV6JPT10KudZA8mqqqgkgxgndzFYdCsW1qAZDZD&name=My fdsfadf&objective=LINK_CLICKS&status=PAUSED', {method: 'GET'});
    fetch(myRequest).then((res)=>{console.log(res)})
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