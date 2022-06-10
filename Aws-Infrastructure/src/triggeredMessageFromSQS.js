'use strict';

var AWS = require('aws-sdk');  
AWS.config.region = 'us-east-1';
const sns = new AWS.SNS({
    region:'us-east-1'
 });
const Response = require("../common/response");

module.exports.triggeredMessage = async event => {
    let sendStatus = new Response();
    var snsTopicArn = process.env.SNS_TOPIC_URL;
   
    console.log('event: ', JSON.stringify(event));
    var body = event.Records[0].body;
    const messageType = JSON.parse(body).MessageType;
    console.log("text: ", JSON.parse(body).body);

    var params = {
        Message: JSON.stringify(body),
        "MessageAttributes": {
          "MessageType": { "DataType": "String", "StringValue": messageType }
      },
        TopicArn: snsTopicArn
    }
    let response = null;
      
    try{
        let result  = await sns.publish(params).promise();
        response = sendStatus.setResponse(200, "Triggered message successfully. "+ JSON.stringify(result));
      }catch(error){
        response = sendStatus.setResponse(400, "ERROR-Could not triggered the message:"+error);
      }
  return response;
};