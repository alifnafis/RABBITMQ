const amqp = require('amqplib');

const queue = "hello";
const msg = "HelloWorld";

const sendMsg = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, {durable: false});
  channel.sendToQueue(queue, Buffer.from(msg));
  console.log(`Sent SuccesFully ${msg}`)
  setTimeout(()=> {
    connection.close();
    process.exit(0)
  }, 500)
}

sendMsg()

