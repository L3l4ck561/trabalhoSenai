#Manipulação de xml com biblioteca xml
#XML (eXtensible Markup Language) é uma linguagem de marcação extensível que permite a criação de documentos

#Ecemplo com python
import xml.etree.ElementTree as ET

#Criar XML
root = ET.Element("pessoa")
name = ET.SubElement(root,"nome")
name.text = "João"
age = ET.SubElement(root,"idade")
age.text = "25"

tree = ET.ElementTree(root)
tree.write("data.xml")

#ler XML
tree = ET.parse("data.xml")
root = tree.getroot()
for child in root:
    print(f"{child.tag}: {child.text}")