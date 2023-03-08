const amqp = require('amqplib');

const exchange = "logs";
const msg = process.argv.slice(2).join(' ') || "Hello WOrld";

const sendMsg = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertExchange(exchange,'fanout',{durable: false});
  channel.publish(exchange,'',Buffer.from(msg));
  console.log(`Sent SuccesFully ${msg}`)
  setTimeout(()=> {
    connection.close();
    process.exit(0)
  }, 500)
}

sendMsg()

