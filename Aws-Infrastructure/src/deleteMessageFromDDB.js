'use strict';

var AWS = require('aws-sdk');  
AWS.config.region = 'us-east-1';
var dynamoDbClient = new AWS.DynamoDB.DocumentClient();
const Response = require("../common/response");

module.exports.deleteMessage = async event => {
  let sendStatus = new Response();
    console.log('event received:', JSON.stringify(event));
    var id= event.pathParameters.id;
    console.log("pathParameter.id+"+id+"+");

    const params = {
        TableName: process.env.DDB_TABLE,
        Key: {
            id
        }
      };
      console.log("params: "+JSON.stringify(params));
      let response = null;

    try{
      let result  = await dynamoDbClient.delete(params).promise();
      response = sendStatus.setResponse(200, "Record deleted successfully.");
    }catch(error){
      response = sendStatus.setResponse(400, "ERROR-Could not delete the post:"+error);
    }
return response;
  };