const amqp = require('amqplib');

const args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: recieve_logs_direct.js [info] [error] [warning]")
}

const exchange = "headerLogs";

const recieveMsg = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertExchange(exchange, 'headers', { durable: false });
  const q = await channel.assertQueue('', { exclusive: true });
  console.log(`Wating for message in queue ${q.queue}`)
  channel.bindQueue(q.queue, exchange, '', { 'account': 'new', 'method': 'facebook', 'x-match': 'all' });
  channel.consume(q.queue, msg => {
    if (msg.content) {
      console.log(`Routing Key : ${JSON.stringify(msg.properties.headers)}, Message : ${msg.content.toString()}`)
    }
  }, { noAck: true })
}

recieveMsg()

alghany

