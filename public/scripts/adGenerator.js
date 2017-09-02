const documentReady = new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve))

documentReady.then(() => {
  if(!window.localStorage.getItem('fbAccessToken')){
    var accessToken = window.location.hash.split('&')[0].split('=')[1] //todo: check timesta mpand expiration date
    accessToken && window.localStorage.setItem('fbAccessToken', accessToken)
    window.document.getElementById('fbLogin').innerHTML = "You are already logged in to facebook"
    window.document.getElementById('fbLogin').setAttribute('disabled', true)
    setFbApplicationId()
  }
  else
  {
    window.document.getElementById('fbLogin').innerHTML = "You are already logged in to facebook"
    window.document.getElementById('fbLogin').setAttribute('disabled', true)
    setFbApplicationId()
  }
})

const setFbApplicationId = () => {
  window.localStorage.setItem('marketingApplicationId', '103829063043787')
}

const createAdLink = () => {
  const campaignName = localStorage.getItem('campaignName');
  const clientSecretKey = localStorage.getItem('clientSecretKey');
  const applicationId = localStorage.getItem('applicationId');

  return `${location.origin}/yourToken?app_id=${applicationId}&app_secret=${clientSecretKey}&campaign_name=${campaignName}`;
}

const createAd = () => {
  const name = window.localStorage.getItem('campaignName')
  const accessToken = window.localStorage.getItem('fbAccessToken')
  const applicationId =  window.localStorage.getItem('marketingApplicationId')
      const myRequest = new Request(`https://graph.facebook.com/v2.10/act_${applicationId}/campaigns?access_token=${accessToken}&name=${name}&objective=LINK_CLICKS&status=PAUSED&fields=id`, {method: 'POST'});
    fetch(myRequest).then(res => res.json()).then((res)=>{
      console.log(res)
      const campaignId = res.id
      console.log(createAdLink())
      const adSetRequest = new Request(`https://graph.facebook.com/v2.10/act_${applicationId}/adsets?access_token=${accessToken}&name=${name}-1&ptimization_goal=REACH&billing_event=IMPRESSIONS&bid_amount=2&daily_budget=2000&campaign_id=${campaignId}&start_time=2017-09-22T16:59:37&end_time=2017-10-29T16:59:37&status=PAUSED&targeting=%7B%22geo_locations%22%3A%7B%22countries%22%3A%5B%22PL%22%5D%7D%7D&fields=id`, {method: 'POST'});
      fetch(adSetRequest).then(res => res.json()).then((res)=>{ console.log(res)
              const adRequest = new Request(`https://graph.facebook.com/v2.10/act_${applicationId}/adsets?access_token=${accessToken}&name=${name}-1&ptimization_goal=REACH&billing_event=IMPRESSIONS&bid_amount=2&daily_budget=2000&campaign_id=${campaignId}&start_time=2017-09-22T16:59:37&end_time=2017-10-29T16:59:37&status=PAUSED&targeting=%7B%22geo_locations%22%3A%7B%22countries%22%3A%5B%22PL%22%5D%7D%7D&fields=id`, {method: 'POST'});

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
