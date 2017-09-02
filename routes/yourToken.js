var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const {app_id, app_secret, campaign_name} = req.query

  const voucherifyClient = require('voucherify')({
      applicationId: app_id,
      clientSecretKey: app_secret
  })

  voucherifyClient.campaigns.get(campaign_name)
    .then(campaignResponse => {
      if(!campaignResponse.metadata.face2.track) {
        const publishVoucherPromise = voucherifyClient.distributions.publish(campaign_name)

        publishVoucherPromise.then(publishedVoucher => res.render('yourToken', {
          title: `Your ${campaign_name} token`,
          code: publishedVoucher.voucher.code,
          face2: publishedVoucher.voucher.metadata.face2
        }))

        return
      }

      res.render('getYourToken', {
        title: `Receive your ${campaign_name} token here`,
        face2: campaignResponse.metadata.face2
      })
    })
})

router.get('/getCode', (req, res, next) => {
  const {app_id, app_secret, campaign_name, email} = req.query

  const voucherifyClient = require('voucherify')({
      applicationId: app_id,
      clientSecretKey: app_secret
  })

  voucherifyClient.distributions.publish(campaign_name, {
    customer: {
      source_id: email
    }
  }).then(publishedVoucher => res.status(200).json({
    code: publishedVoucher.voucher.code,
    face2: publishedVoucher.voucher.metadata.face2
  }))
})

module.exports = router;
