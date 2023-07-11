import boto3
import json
from boto3.dynamodb.conditions import Key, Attr

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('favorites')

def get_favorites(event):
    body = event['body']
    body_json = json.loads(body)
    user_id = body_json['userId']

    if not user_id:
        raise ValueError('Missing required parameter: userId')

    favorites = table.scan(FilterExpression=Attr('userId').eq(user_id))
    
    if not favorites['Items']:
        return {
            'statusCode': 204,  # No content
            'body': json.dumps({'message': 'Favorites is empty'})
        }

    return {
        'statusCode': 200,
        'body': json.dumps(favorites['Items'])
    }

def lambda_handler(event, context):
    try:
        response = get_favorites(event)
        return response
    except ValueError as e:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': str(e)})
        }