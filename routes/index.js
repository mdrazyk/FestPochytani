var express = require('express');
var router = express.Router();
const voucherifyClient = require('voucherify');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/campaigns', (req, res, next) => {
  const client = voucherifyClient({
    applicationId: req.body.applicationId,
    clientSecretKey: req.body.secretKey
  });

  client.campaigns.list()
  .then(data => data.campaigns)
  .then(data => {
    res.render('campaigns', {campaigns: data});
  })
  .catch(() => res.render('index'));
});

router.get('/adgenerator', (req, res, next) => {
  const campaign = {
    name: 'redemption-limit',
    type: 'AUTO_UPDATE',
    description: null,
    start_date: null,
    expiration_date: null,
    metadata: null,
    vouchers_generation_status: 'DONE',
    voucher:
    {
      type: 'DISCOUNT_VOUCHER',
      is_referral_code: false
    },
    object: 'campaign'
  }

  res.render('adgenerator')

})

module.exports = router;
