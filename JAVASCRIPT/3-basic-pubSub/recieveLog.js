const amqp = require('amqplib');

const exchange = "logs";

const recieveMsg = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertExchange(exchange,'fanout',{durable: false});
  const q = await channel.assertQueue('', {exclusive: true});
  console.log(`Wating for message in queue ${q.queue}`)
  channel.bindQueue(q.queue, exchange, '');
  channel.consume(q.queue, msg => {
    if(msg.content){
      console.log("[X] Recieved", msg.content.toString())
    }
  }, {noAck:true})
}

recieveMsg()

