import requests
import json

def get_weather_data():
    try:
        response = requests.get('https://jsonplaceholder.typicode.com/posts/1/comments')
        for email in response.json():
            print(email['email'])

        if response.status_code != 200:
            print(f"erro na requisição {response.status_code}")
            return None
    
        return response.json()

    except:

        print("requisição GET obteve um resultado diferente do status de 200")
        return None
get_weather_data()