const amqp = require('amqplib');

const queue = "rpc_queue";

const args = process.argv.slice(2);

function fibonacci(n){
  if( n == 0 || n == 1)
  return n;
  else
  return fibonacci(n-1) + fibonacci(n-2);
}


const processTask = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, {durable: false});
  channel.prefetch(1);
  console.log(`Wating for RPC request`)
  channel.consume(queue, msg => {
    const n = parseInt(msg.content.toString())
    console.log(`[x] Requisting fib(%d)`, n)
    const fibNum = fibonacci(n)

    channel.sendToQueue(msg.properties.replyTo, Buffer.from(fibNum.toString()), {
      correlationId: msg.properties.correlationId
    });

    channel.ack(msg);
  }, {noAck:false})
}

processTask()

