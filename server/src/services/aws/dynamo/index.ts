import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput,
} from '@aws-sdk/client-dynamodb';

export const createTable = async (params: PutItemCommandInput) => {
  try {
    const client = new DynamoDBClient({ region: 'us-west-2' });

    const data = await client.send(new PutItemCommand(params));

    console.log(
      'Created table. Table description JSON:',
      JSON.stringify(data, null, 2)
    );
  } catch (error) {
    console.error(
      'Unable to create table. Error JSON:',
      JSON.stringify(error, null, 2)
    );
  }
};

export const init = (): void => {
  console.log('');
};
