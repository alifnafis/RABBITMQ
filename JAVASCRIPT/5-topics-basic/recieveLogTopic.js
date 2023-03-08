const amqp = require('amqplib');

const args = process.argv.slice(2);

if(args.length == 0)
{
  console.log("Usage: recieve_logs_direct.js [info] [error] [warning]")
}

const exchange = "topicLogs";

const recieveMsg = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertExchange(exchange,'topic',{durable: false});
  const q = await channel.assertQueue('', {exclusive: true});
  console.log(`Wating for message in queue ${q.queue}`)
  args.forEach(function(key) {
    channel.bindQueue(q.queue, exchange, key);
  })
  channel.consume(q.queue, msg => {
    if(msg.content){
      console.log(`Routing Key : ${msg.fields.routingKey}, Message : ${msg.content.toString()}`)
    }
  }, {noAck:true})
}

recieveMsg()

alghany

