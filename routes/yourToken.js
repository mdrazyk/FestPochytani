var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const {app_id, app_secret, campaign_name} = req.query

  const voucherifyClient = require('voucherify')({
      applicationId: app_id,
      clientSecretKey: app_secret
  })

  const publishVoucherPromise = voucherifyClient.distributions.publish(campaign_name)

  publishVoucherPromise.then(publishedVoucher => console.log(JSON.stringify(publishedVoucher, null, 2)) || res.render('yourToken', {
    title: `Your ${campaign_name} token`,
    code: publishedVoucher.voucher.code,
    face2: publishedVoucher.voucher.metadata.face2
  }))
})

module.exports = router;
