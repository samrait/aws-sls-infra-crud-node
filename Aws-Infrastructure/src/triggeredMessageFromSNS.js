'use strict';

var AWS = require('aws-sdk');  
AWS.config.region = 'us-east-1';
// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const Response = require("../common/response");

module.exports.triggeredMessageFromSNS = async event => {
  let sendStatus = new Response();
    console.log('event received:', JSON.stringify(event));
    var body = event.Records[0].Sns;
    const message = JSON.parse(body.Message);
    console.log("Message body>> "+JSON.parse(message).body);

    var params = {
      TableName: process.env.DDB_TABLE,
      Item: {
        'id' : {S: JSON.parse(message).id},
        'name' : {S: JSON.parse(message).name},
        'body' : {S: JSON.parse(message).body},
        'messageType' : {S: JSON.parse(message).MessageType}
      }
    };
    console.log("NEW PARAMS "+JSON.stringify(params));
    // Call DynamoDB to add the item to the table
  let response = null;
  try{
    let result = await ddb.putItem(params).promise();
    response = sendStatus.setResponse(200, "Post message successfully. "+ JSON.stringify(result)); 
  }catch(error){
    response = sendStatus.setResponse(400, "ERROR-Could not post the message:"+error);
  }
  return response;
};