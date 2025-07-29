# Web Services são sistemas que permitem a comunicação entre aplicações via internet.
# Ex.: API de clima, que retorna a previsão do tempo

# JSON é leve e fácil de ler/escrever. XML é mais robusto e adequado para documentos complexos.

# Rota GET/info que retorna "API funcionando".
# Rota GET/soma que recebe e soma dois números.
@app.route("info", methods=['GET'])
def info():
    return jsonify({"API funcionando"})

@app.route("soma", methods=['POST'])
def soma():
    data = request.json
    return jsonify({"soma":data['num1']+data['num2']})

#converter o dicionario {"curso": "Backend", "duração": "4 meses"} em JSON e depois em string
import json

data = {"curso": "Backend", "duração": "4 meses"}
json_data = json.dumps(data)
parsed_data = json.loads(json_data)

print(parsed_data)
print(json_data)

# Crie um XML com as tags curso e duração preencha com os valores "Backend" e "4 meses"
# Leia o arquivo e exiba os valores

import xml.etree.ElementTree as ET

#criar xml
root = ET.Element("curso")
nome = ET.SubElement(root, "nome")
nome.text = "Backend"
duracao = ET.SubElement(root, "duração")
duracao.text = "4 meses"

tree = ET.ElementTree(root)
tree.write("curso.xml")

#Ler XML
tree = ET.parse("curso.xml")
root = tree.getroot()

for child in root:
    print(f"{child.tag}: {child.text}")