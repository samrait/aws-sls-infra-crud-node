'use strict';

var AWS = require('aws-sdk');  
AWS.config.region = 'us-east-1';
var getDocClient = new AWS.DynamoDB.DocumentClient();
const Response = require("../common/response");

module.exports.getMessageList = async event => {
  let sendStatus = new Response();
  console.log("event: "+JSON.stringify(event));
  var params = {
    TableName: process.env.DDB_TABLE,
    ProjectionExpression: "messageType, body",
  };

console.log("params: "+JSON.stringify(params));
// Call DynamoDB to read the item from the table
let response = null;
  try{
    let result  = await getDocClient.scan(params).promise();
    response = sendStatus.setResponse(200, "Retrieved message successfully. "+ JSON.stringify(result));
  } catch(error){
    response = sendStatus.setResponse(400, "ERROR-Could not retrieve the message:"+error);
  }   
  return response;
}


module.exports.getMessageById = async event => {
  let sendStatus = new Response();
  console.log("event: "+JSON.stringify(event));
  var tid = event.pathParameters.id;
  console.log("pathParameter.id+"+tid+"+");
  var params = {
    TableName: process.env.DDB_TABLE,
    KeyConditionExpression: "id=:pid",
    ExpressionAttributeValues: {
        ':pid': tid
        }
    };
  
  console.log("params: "+JSON.stringify(params));
  // Call DynamoDB to read the item from the table
    let response = null;
    try{
      let result = await getDocClient.query(params).promise();
      response = sendStatus.setResponse(200, "Retrieved message successfully. "+ JSON.stringify(result));
    } catch(error){
      response = sendStatus.setResponse(400, "ERROR-Could not retrieve the message:"+error);
    }   
    return response;
  };

  module.exports.getMessageBymessageTpe = async event => {
    let sendStatus = new Response();
    console.log("event: "+JSON.stringify(event));
    var mtype = event.pathParameters.type;
    console.log("pathParameter.id+"+mtype+"+");
      var params = {
        TableName: process.env.DDB_TABLE,
        FilterExpression: 'messageType=:m_type',
        ExpressionAttributeValues: {
          ":m_type": mtype
        }
        };
    
    console.log("params: "+JSON.stringify(params));
    // Call DynamoDB to read the item from the table
      let response = null;
      try{
        let result  = await getDocClient.scan(params).promise();
        response = sendStatus.setResponse(200, "Retrieved message successfully. "+ JSON.stringify(result));
      } catch(error){
        response = sendStatus.setResponse(400, "ERROR-Could not retrieve the message:"+error);
      }   
      return response;
    };