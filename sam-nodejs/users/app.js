'use strict';
let response;

const AWS=require('aws-sdk');
const uuid=require('uuid');
const dynamoDB=new AWS.DynamoDB.DocumentClient();

const params = {
    TableName: 'UsersDBNodeJS',
};

module.exports.FetchAllUsers = (event, context, callback) => {
    // fetch all users from the database
    dynamoDB.scan(params, (error, result) => {
      // handle potential errors
      if (error) {
        console.error(error);
        callback(new Error('Couldn\'t fetch the users.'));
        return;
      }
  
      // create a response
      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Items),
      };
      callback(null, response);
    });
  };

  module.exports.CreateUser=(event,context,callback)=>{
    const data=JSON.parse(event.body);
    if (typeof data.firstName!=='string' || typeof data.lastName!=='string'){
        console.error('Validation failed!!!');
        callback(new Error('Couldn\'t create the user item.'));
        return;
    }

    const params = {
        TableName: 'UsersDBNodeJS',
        Item: {
          id: uuid.v1(),
          firstName: data.firstName,
          lastName: data.lastName,
        },
    };

    // put
    dynamoDB.put(params,(error)=>{
        if(error){
            console.error(error);
            callback(new Error('Could not create the user item....'));
            return;
        }

        //create a response
        const response={
            statusCode: 200,
            body: JSON.stringify(params.Item),
        };

        callback(null,response);

    });


};

module.exports.DeleteUser=(event,context,callback)=>{
    const params={
        TableName: 'UsersDBNodeJS',
        Key:{
            id: event.pathParameters.id,
        },
    };

    dynamoDB.delete(params,(error)=>{
        if (error){
            console.error(error);
            callback(new Error('Couldn\'t remove the user item.'));
            return;
        }

        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify({}),
      };
        callback(null, response);
    });


};

module.exports.UpdateUser = (event, context, callback) => {
    const data = JSON.parse(event.body);
  
    // validation
    if (typeof data.firstName !== 'string' || typeof data.lastName !== 'string') {
      console.error('Validation Failed');
      callback(new Error('Couldn\'t update the user item.'));
      return;
    }
    
    const params = {
      TableName: 'UsersDBNodeJS',
      Key: {
        id: event.pathParameters.id,
      },
      ExpressionAttributeValues: {
        ':firstName': data.firstName,
        ':lastName': data.lastName,
      },
      UpdateExpression: 'SET firstName = :firstName, lastName = :lastName',
      ReturnValues: 'ALL_NEW',
    };
  
    // update the todo in the database
    dynamoDB.update(params, (error, result) => {
      // handle potential errors
      if (error) {
        console.error(error);
        callback(new Error('Couldn\'t update the user item.'));
        return;
      }
  
      // create a response
      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Attributes),
      };
      callback(null, response);
    });
  };