var express = require('express');
var router = express.Router();
const voucherifyClient = require('voucherify');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/campaigns', (req, res, next) => {
  const applicationId = req.body.applicationId;
  const clientSecretKey = req.body.secretKey;
  
  const client = voucherifyClient({
    applicationId: applicationId,
    clientSecretKey: clientSecretKey
  });

  client.campaigns.list()
  .then(data => data.campaigns)
  .then(data => {
    res.render('campaigns', {campaigns: data, keys: [applicationId, clientSecretKey]});
  })
  .catch(() => res.render('index'));
});

router.get('/campaigns/:id', (req, res, next) => {
  res.render('landingPageLayout', {title: req.params.id});
});

// router.post('/landingPageLayout/:id/updateUser', (req, res, next) => {

//   console.log(req.body);
// });

module.exports = router;
