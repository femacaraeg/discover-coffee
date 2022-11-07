import {
  table,
  getMinifiedRecords,
  findRecordByFilter,
} from '../../lib/airtable';

const createCoffeeStore = async (req, res) => {
  if (req.method === 'POST') {
    // find a record

    const { id, name, street, address, imgUrl, voting } = req.body;

    try {
      if (id) {
        const records = await findRecordByFilter(id);

        if (records.length !== 0) {
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

            const records = getMinifiedRecords(createRecords);

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
