const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base('coffee-stores');

console.log('table', { table });

const createCoffeeStore = async (req, res) => {
  console.log('query', req.query);
  if (req.method === 'POST') {
    // find a record

    const { id, name, street, address, imgUrl, voting } = req.body;

    try {
      if (id) {
        const findCoffeeStoreRecords = await table
          .select({
            filterByFormula: `id=${id}`,
          })
          .firstPage();

        console.log({ findCoffeeStoreRecords });

        if (findCoffeeStoreRecords.length !== 0) {
          const records = findCoffeeStoreRecords.map((record) => {
            return {
              ...record.fields,
            };
          });
          res.json(records);
        } else {
          // create a record
          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  street,
                  voting,
                  imgUrl,
                },
              },
            ]);

            const records = createRecords.map((record) => {
              return {
                ...record.fields,
              };
            });

            res.json({ message: 'create a record', records });
          } else {
            res.status(400);
            res.json({ message: 'Name is missing.' });
          }
        }
      } else {
        res.json({ message: 'Id is missing' });
      }
    } catch (error) {
      console.error('Error creating or finding astore', err);
      res.status(500);
      res.json({ message: 'Error creating or finding a store', err });
    }
  } else {
    res.json({ message: 'method is GET' });
  }
};

export default createCoffeeStore;
