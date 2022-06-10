'use strict';

var AWS = require('aws-sdk');  
AWS.config.region = 'us-east-1';
var dynamoDbClient = new AWS.DynamoDB.DocumentClient();
const Response = require("../common/response");

module.exports.updateMessage = async event => {

  let sendStatus = new Response();
    console.log('event received:', JSON.stringify(event));
    var id= event.pathParameters.id;
    var messageBody = event.body;
    console.log("messageBody>>"+messageBody);

    const bodyP = JSON.parse(event.body);
    var bodyJson = bodyP.body;
    console.log("Actual body>>"+bodyJson);

    const params = {
        TableName: process.env.DDB_TABLE,
        Key: {
            id
        },
        ExpressionAttributeValues: {
          ":body": bodyJson
        },
        UpdateExpression:
          "SET body = :body",
        ReturnValues: "ALL_NEW"
      };
      
      console.log("params: "+JSON.stringify(params));
      let response = null;
      try{
        let result  = await dynamoDbClient.update(params).promise();
        response = sendStatus.setResponse(200, JSON.stringify(result));
      }catch(error){
        response = sendStatus.setResponse(400, "ERROR: "+error);
      }
return response;
};