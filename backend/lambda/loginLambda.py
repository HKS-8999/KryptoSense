import json
import boto3
from base64 import b64decode


def lambda_handler(event, context):
    # Create a DynamoDB resource
    dynamodb = boto3.resource('dynamodb')
    kms_client = boto3.client('kms')


    # Get the table
    table = dynamodb.Table('users')

    # Get the key from the event
    body = event['body']
    body_json = json.loads(body)
    email = body_json['email']
    password = body_json['password']
    
   
    
    # Retrieve the item from DynamoDB
    response = table.get_item(
        Key={
            'id': email
        }
    )
 
    
  # Check if the item was found
    if 'Item' not in response:
        return json.dumps({
            'statusCode': 404,
            'message': 'Item not found'
        })
    
    decrypted_password = kms_client.decrypt(CiphertextBlob=bytes(response['Item']['password'].value))['Plaintext'].decode('utf-8')

    # Check if the decrypted password matches the received password
    if decrypted_password != password:
        return json.dumps({
            'statusCode': 401,
            'message': 'Incorrect password'
        })

    # Send the item as a response
    return {
        'statusCode': 200,
        'body': json.dumps({'message':'Success'})
    }