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

module.exports = router;
