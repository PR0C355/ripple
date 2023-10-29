import redis from '../../utils/redis'; 


async function getAllSongs() {
  redis.keys('*', async (err, keys) => {
    if (err) {
      console.error('Error fetching keys:', err);
      return;
    }
  
    if (keys.length > 0) {
      const values = await redis.mget(...keys).then((values) => {

        console.log('All values in the Redis database:');

        const ripples = [];

        for (let i = 0; i < keys.length; i++) {
          ripples.push(JSON.parse(values[i]));
        }
        console.log(ripples);
        return ripples;
    });
    } else {
      console.log('No keys found in the Redis database.');
    }
  
  });
}

export default async (req, res) => {
  const { key } = req.query;

  if (!key) {
    return res.status(400).json({ error: 'Key is required.' });
  }


  if (key === 'ALL') {
    try {
      const keys = await getAllSongs().then((values) => {
        res.status(200).json(values);
      });
      
      if (keys) {
        res.status(200).json(keys);
      } else {
        res.status(404).json({ error: 'Data not found in Redis.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving data from Redis.' });
    }
  }


  try {
    const data = await redis.get(key);

    if (data) {
      res.status(200).json(JSON.parse(data));
    } else {
      res.status(404).json({ error: 'Data not found in Redis.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving data from Redis.' });
  }
};
