const amqp = require('amqplib');

const exchange = "headerLogs";
const args = process.argv.slice(2);
const msg = args[0] || "Hello WOrld";

const sendMsg = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertExchange(exchange,'headers',{durable: false});
  channel.publish(exchange, '', Buffer.from(msg), {headers:{account:'new', method:'google'}});
  console.log(`Sent SuccesFully ${msg}`)
  setTimeout(()=> {
    connection.close();
    process.exit(0)
  }, 500)
}

sendMsg()

