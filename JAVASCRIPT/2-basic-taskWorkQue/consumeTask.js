const amqp = require('amqplib');

const queue = "task";

const recieveMsg = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, {durable: true});
  // prefetch for JUSTICE !!!!!! 
  channel.prefetch(1)
  console.log(`Wating for message in queue ${queue}`)
  channel.consume(queue, msg => {
    const secs = msg.content.toString().split('.').length - 1;
    console.log("[X] Recieved", msg.content.toString())
    setTimeout(() => {
      console.log("Processing Completed...")
      channel.ack(msg);
    }, secs * 1000)
  }, {noAck:false})
}

recieveMsg()

