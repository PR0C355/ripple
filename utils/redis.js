const Redis = require('ioredis');

const redis = new Redis({
  host: 'redis-15762.c1.us-east1-2.gce.cloud.redislabs.com', 
  port: 15762,
  password: 'Ya7XvevdJhT31jU87yjrUnDD0qryA2Br'
});

module.exports = redis;