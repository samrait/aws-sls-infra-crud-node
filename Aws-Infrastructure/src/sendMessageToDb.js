'use strict';

var AWS = require('aws-sdk');  
AWS.config.region = 'us-east-1';
var sqs = new AWS.SQS({
    region: 'us-east-1'
});
const Response = require("../common/response");

module.exports.sendMessage = async event => {
  let sendStatus = new Response();
    var queueUrl = process.env.SQS_QUEUE_URL;
    
    var messageBody = event.body;
    console.log("messageBody>>"+messageBody);

    // SQS message parameters
    var params = {
        DelaySeconds: 2,
        MessageAttributes: {
          "Author": {
            DataType: "String",
            StringValue: "Shishir Meshram"
          },
        },
        MessageBody: event.body,
        QueueUrl: queueUrl
      };
      
      let response = null;
      try{
        let result = await sqs.sendMessage(params).promise();
        response = sendStatus.setResponse(200, "Post message successfully. "+ JSON.stringify(result)); 
      }catch(error){
        response = sendStatus.setResponse(400, "ERROR-Could not post the message:"+error);
      }
      return response;
};