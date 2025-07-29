import json

#converter dicionario para json
data = {"nome": "Helder", "idade": 42}
json_data = json.dumps(data)
print(json_data)

#converter JSON para dicionario
parsed_dada = json.loads(json_data)
print(parsed_dada)