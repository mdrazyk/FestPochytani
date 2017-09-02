const documentReady = new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve))

documentReady.then(() => {
  if(!window.localStorage.getItem('fbAccessToken')){
    var accessToken = window.location.hash.split('&')[0].split('=')[1] //todo: check timesta mpand expiration date
    accessToken && window.localStorage.setItem('fbAccessToken', accessToken)
    accessToken && (() => { window.document.getElementById('fbLogin').innerHTML = "You are already logged in to facebook" })()
    accessToken && setFbApplicationId()
  }
  else
  {
    window.document.getElementById('fbLogin').innerHTML = "You are already logged in to facebook"
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

  return encodeURIComponent(`${location.origin}/yourToken?app_id=${applicationId}&app_secret=${clientSecretKey}&campaign_name=${campaignName}`);
}

const createAd = () => {
  const name = window.localStorage.getItem('campaignName')
  const accessToken = window.localStorage.getItem('fbAccessToken')
  let adSetId 
  const applicationId =  window.localStorage.getItem('marketingApplicationId')
      const myRequest = new Request(`https://graph.facebook.com/v2.10/act_${applicationId}/campaigns?access_token=${accessToken}&name=${name}&objective=LINK_CLICKS&status=PAUSED&fields=id`, {method: 'POST'});
    fetch(myRequest)
      .then(res => res.json())
      .then((res)=>{
        console.log(res)
        const campaignId = res.id
        console.log(createAdLink())
        const adSetRequest = new Request(`https://graph.facebook.com/v2.10/act_${applicationId}/adsets?access_token=${accessToken}&name=${name}-1&ptimization_goal=REACH&billing_event=IMPRESSIONS&bid_amount=2&daily_budget=2000&campaign_id=${campaignId}&start_time=2017-09-22T16:59:37&end_time=2017-10-29T16:59:37&status=PAUSED&targeting=%7B%22geo_locations%22%3A%7B%22countries%22%3A%5B%22PL%22%5D%7D%7D&fields=id`, {method: 'POST'});
        return fetch(adSetRequest).then(res => res.json()).then((res)=>{ console.log(res)
          adSetId = res.id
            const adCreativeRequest = new Request(`https://graph.facebook.com/v2.10/act_${applicationId}/adcreatives?access_token=${accessToken}&campaign_id=${res.id}&name=Sample%20Creative&title=Get%20Your%20Coupon%20Now&body=Get%20Your%20Discount%20Here&object_url=${createAdLink()}&link_url=${createAdLink()}&image_hash=bfaecadfc8422ef80069bd3d2a5960e3&status=PAUSED&fields=id`, {method: 'POST'});

                                                                        //const adCreativeRequest = new Request(`https://graph.facebook.com/v2.10/act_${applicationId}/adcreatives?access_token=${accessToken}&campaign_id=${res.id}&name=Sample%20Creative&title=my%20title&body=mybody&object_url=https://www.link.com/&link_url=https://www.link.com&image_hash=bfaecadfc8422ef80069bd3d2a5960e3&status=PAUSED&fields=id`, {method: 'POST'});
            return fetch(adCreativeRequest).then(res => res.json()).then((res)=>{ 
              console.log(adSetId)
              const parameters = {"creative_id":res.id}
              const encodedUrl = encodeURIComponent(JSON.stringify(parameters))
              
            console.log(encodedUrl)
              const adRequest = new Request(`https://graph.facebook.com/v2.10/act_${applicationId}/ads?access_token=${accessToken}&name=MyAd&adset_id=${adSetId}&creative=${encodedUrl}&status=PAUSED`, {method: 'POST'});
              fetch(adRequest).then(res => res.json()).then((res)=>{ console.log(res)
                                                                      
                                                                      })
                                                                                
            
            })
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
