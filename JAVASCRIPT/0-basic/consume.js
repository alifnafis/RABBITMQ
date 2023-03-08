const amqp = require("amqplib")
async function connect() {
  try{
    const connection = await amqp.connect("amqp://localhost:5672")
    const channel = await connection.createChannel();
    const result = await channel.assertQueue("jobs");

    channel.consume("jobs", message => {
      input = JSON.parse(message.content.toString());
      console.log(`Recieve job with input ${input.number}`)
      if ( input.number == 8){
        channel.ack(message);
      }
    })

    console.log("waiting for messages....")
  }catch(err){
    console.error(err)
  }
}
connect();