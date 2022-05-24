# Serverless deployment

## Execute the below commands:
``` 
    cd serverless-demo/

    # to deploy the service
    serverless deploy
```
## Testing the API:

- Open postman application and create a new request, choose GET method and paste the URL that was prompted on the screen.
Below is an example:
>   https://ovtie00ya4.execute-api.us-east-2.amazonaws.com/dev/users

- Similarly test the POST request as shown below and choose Body, then click on raw. Next select JSON type and paste the data to be inserted as shown below.
>   https://ovtie00ya4.execute-api.us-east-2.amazonaws.com/dev/users

```
# In the request body:
    {
    "firstName": "Tom",
    "lastName": "Doe"
    }
```

- PUT request to update the data and append the id at the end of the URL. Also provide the data to be updated in the body.
>   https://ovtie00ya4.execute-api.us-east-2.amazonaws.com/dev/update/0eb1b4c0-daac-11ec-a9f6-0f7efcb1c522

- DELETE request. 
>   https://ovtie00ya4.execute-api.us-east-2.amazonaws.com/dev/delete/0eb1b4c0-daac-11ec-a9f6-0f7efcb1c522

# AWS Serverless Application Model

## Execute the below command:
```
    cd sam-nodejs

    sam build

    sam deploy --guided
```

## To test the API:
- GET request:
>   https://ntngil77kh.execute-api.us-east-2.amazonaws.com/Prod/FetchAllUsers

- POST request:
>   https://8go42wsxj6.execute-api.us-east-2.amazonaws.com/Prod/CreateUser

```
# In the request body:
    {
    "firstName": "Tom",
    "lastName": "Doe"
    }
```

- PUT request to update the data and append the id at the end of the URL. Also provide the data to be updated in the body.
>   https://8go42wsxj6.execute-api.us-east-2.amazonaws.com/Prod/UpdateUser/a0ff69c0-d733-11ec-a176-e359b0d72261

- DELETE request:
>   https://7w6e93t09e.execute-api.us-east-2.amazonaws.com/Prod/DeleteUser/7da503b0-d6af-11ec-bbf4-a93ed8af3389