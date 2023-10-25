const productsTableParams = {
  // In an AWS account, table names must be unique within each Region.
  // That is, you can have two tables with same name if you create the tables
  // in different Regions.
  TableName: 'Products',
  KeySchema: [
    { AttributeName: 'year', KeyType: 'HASH' }, // Partition key
    { AttributeName: 'title', KeyType: 'RANGE' }, // Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: 'year', AttributeType: 'N' },
    { AttributeName: 'title', AttributeType: 'S' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

export default productsTableParams;
