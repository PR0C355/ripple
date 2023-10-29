export const storeDataInRedis = async (key: string, value: string) => {
    try {
      const response = await fetch('/api/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key, value }),
      });

      if (response.ok) {
        console.log('Data stored successfully.');
      } else {
        console.error('Error storing data.');
      }
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };

    export const retrieveDataFromRedis = async (key: string) => {   
    try {
      const response = await fetch('/api/retrieve?key='+key);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
}