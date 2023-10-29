import redis from '../../utils/redis';
export default async (req, res) => {
  const { key, value } = req.body;

  if (!key || !value) {
    return res.status(400).json({ error: 'Both key and value are required.' });
  }

  try {
    await redis.set(key, value);
    res.status(200).json({ message: 'Data stored in Redis.' });
  } catch (error) {
    res.status(500).json({ error: 'Error storing data in Redis.' });
  }
};
