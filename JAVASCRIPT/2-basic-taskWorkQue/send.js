const amqp = require('amqplib');

const queue = "task";
const msg = process.argv.slice(2).join(' ') || "Hello World";

const sendMsg = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, {durable: true});
  channel.sendToQueue(queue, Buffer.from(msg), {persistent: true});
  console.log(`Sent SuccesFully ${msg}`)
  setTimeout(()=> {
    connection.close();
    process.exit(0)
  }, 500)
}

sendMsg()

