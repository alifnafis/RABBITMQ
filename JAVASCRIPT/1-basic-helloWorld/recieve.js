const amqp = require('amqplib');

const queue = "hello";

const sendMsg = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, {durable: false});
  console.log(`Wating for message in queue ${queue}`)
  channel.consume(queue, msg => {
    console.log("[X] Recieved", msg.content.toString())
  }, {noAck:true})
}

sendMsg()

