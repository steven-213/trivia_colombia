from flask import Flask,render_template
import random
app = Flask(__name__)

@app.route('/')
def index():
  questions = {
  "facil": [
    {
      "pregunta": "¿Cuál es la capital de Bolívar?",
      "respuesta": "Cartagena",
      "pistas": [
        "Es una ciudad portuaria con gran historia colonial.",
        "Es famosa por sus murallas y el Castillo de San Felipe."
      ]
    },
    {
      "pregunta": "¿En qué ciudad se celebra la Feria de las Flores?",
      "respuesta": "Medellín",
      "pistas": [
        "Está ubicada en el Valle de Aburrá.",
        "Se le conoce como la ciudad de la eterna primavera."
      ]
    },
    {
      "pregunta": "¿Cuál es la capital del departamento del Valle del Cauca?",
      "respuesta": "Cali",
      "pistas": [
        "Es reconocida por su salsa y cultura afrocolombiana.",
        "Es la tercera ciudad más poblada de Colombia."
      ]
    },
    {
      "pregunta": "¿En qué ciudad está el barrio de La Candelaria?",
      "respuesta": "Bogotá",
      "pistas": [
        "Es una ciudad en el altiplano cundiboyacense.",
        "Es la capital del país."
      ]
    },
    {
      "pregunta": "¿Dónde se celebra el Carnaval de Negros y Blancos?",
      "respuesta": "Pasto",
      "pistas": [
        "Está al suroccidente del país, cerca de la frontera con Ecuador.",
        "Es la capital de Nariño."
      ]
    }
  ],
  "medio": [
    {
      "pregunta": "¿Cuál es la capital del departamento de Santander?",
      "respuesta": "Bucaramanga",
      "pistas": [
        "Se le conoce como la ciudad bonita de Colombia.",
        "Está ubicada en el nororiente del país."
      ]
    },
    {
      "pregunta": "¿En qué ciudad se encuentra la Catedral de Sal de Zipaquirá?",
      "respuesta": "Zipaquirá",
      "pistas": [
        "Es una ciudad cundiboyacense con minas de sal.",
        "Está cerca de Bogotá, y su catedral está bajo tierra."
      ]
    },
    {
      "pregunta": "¿Dónde se celebra el Festival Vallenato?",
      "respuesta": "Valledupar",
      "pistas": [
        "Está ubicada en la región Caribe, cerca de la Sierra Nevada.",
        "Es la capital mundial del vallenato."
      ]
    },
    {
      "pregunta": "¿En qué ciudad está el Cristo Rey que domina el panorama desde una colina?",
      "respuesta": "Cali",
      "pistas": [
        "Es una escultura icónica en el cerro de los Cristales.",
        "Se encuentra en la capital del Valle del Cauca."
      ]
    },
    {
      "pregunta": "¿Cuál es la capital del departamento de Atlántico?",
      "respuesta": "Barranquilla",
      "pistas": [
        "Tiene uno de los carnavales más importantes del país.",
        "Está sobre el mar Caribe, entre Cartagena y Santa Marta."
      ]
    }
  ],
  "dificil": [
    {
      "pregunta": "¿Cuál es la capital del departamento de Guainía?",
      "respuesta": "Inírida",
      "pistas": [
        "Está ubicada en la región amazónica, al oriente del país.",
        "Es conocida por los Cerros de Mavicure."
      ]
    },
    {
      "pregunta": "¿Dónde se celebra el Festival del Bambuco?",
      "respuesta": "Neiva",
      "pistas": [
        "Es una ciudad a orillas del río Magdalena.",
        "Es la capital del Huila."
      ]
    },
    {
      "pregunta": "¿Cuál es la capital del departamento de Vaupés?",
      "respuesta": "Mitú",
      "pistas": [
        "Está en plena selva amazónica.",
        "Es una ciudad de difícil acceso terrestre."
      ]
    },
    {
      "pregunta": "¿En qué ciudad está ubicada la Piedra del Peñol?",
      "respuesta": "Guatapé",
      "pistas": [
        "Está en Antioquia, cerca de un embalse turístico.",
        "Es famosa por sus casas coloridas y el Peñón gigante."
      ]
    },
    {
      "pregunta": "¿Cuál es la capital del departamento de Arauca?",
      "respuesta": "Arauca",
      "pistas": [
        "Es una ciudad ubicada en los Llanos Orientales.",
        "Está en la frontera con Venezuela."
      ]
    },
    {
      "pregunta": "¿Dónde se encuentra el Parque Nacional El Tuparro?",
      "respuesta": "Puerto Carreño",
      "pistas": [
        "Es un municipio en la región de la Orinoquía.",
        "Es la capital del departamento del Vichada."
      ]
    },
    {
      "pregunta": "¿Cuál es la capital del departamento de Caquetá?",
      "respuesta": "Florencia",
      "pistas": [
        "Está ubicada en la Amazonía colombiana.",
        "No confundir con una ciudad italiana con el mismo nombre."
      ]
    },
    {
      "pregunta": "¿Dónde se ubica el Parque Natural Serranía de Chiribiquete?",
      "respuesta": "San José del Guaviare",
      "pistas": [
        "Está al límite entre la Amazonía y la Orinoquía.",
        "Es la capital del departamento de Guaviare."
      ]
    }
  ]
}


  datos={
        'title': 'Welcome to Flask',
        'message': 'This is a simple Flask application.',   
        'random_questions_easy': random.sample(questions["facil"], 3) ,
        'random_questions_medium': random.sample(questions["medio"], 3) ,
        'random_questions_hard': random.sample(questions["dificil"], 3) 
        
    }
  return render_template('index.html', datos=datos)

if __name__ == "__main__":
    app.run(debug=True)


"""for i in range(1):
    question=random.sample(questions["facil"],3)
    print(question)
    for i in question:
        print(i["pregunta"])
        print(i["respuesta"])
"""
