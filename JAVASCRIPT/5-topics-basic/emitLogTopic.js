const amqp = require('amqplib');

const exchange = "directLogs";
const args = process.argv.slice(2);
const msg = args[1] || "Hello WOrld";
const logType = args[0]

const sendMsg = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertExchange(exchange,'direct',{durable: false});
  channel.publish(exchange, logType, Buffer.from(msg));
  console.log(`Sent SuccesFully ${msg}`)
  setTimeout(()=> {
    connection.close();
    process.exit(0)
  }, 500)
}

sendMsg()

