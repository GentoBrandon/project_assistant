'''
import cv2
import os
import numpy as np

# Ruta de imágenes y archivo del modelo
model_filename = 'modelo_reconocimiento.yml'
employee_names_filename = 'employee_names.npy'
size = 4
im_width, im_height = (112, 92)

# Función para cargar el modelo entrenado
def cargar_modelo():
    if os.path.exists(model_filename) and os.path.exists(employee_names_filename):
        model = cv2.face.LBPHFaceRecognizer_create()
        model.read(model_filename)
        names = np.load(employee_names_filename, allow_pickle=True).item()  # Cargar nombres de los empleados
        return model, names
    else:
        return None, {}

# Cargar modelo y nombres de empleados
model, names = cargar_modelo()

if model is None:
    print("Error: No se pudo cargar el modelo.")
    exit()

# Inicializar la cámara y el modelo de reconocimiento facial
face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
cap = cv2.VideoCapture(0)
recognition_threshold = 80

recognized_id = None  # Para almacenar el ID del empleado reconocido

while True:
    rval, frame = cap.read()
    if not rval:
        print("Error al acceder a la cámara")
        break

    frame = cv2.flip(frame, 1, 0)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    mini = cv2.resize(gray, (int(gray.shape[1] / size), int(gray.shape[0] / size)))
    faces = face_cascade.detectMultiScale(mini)

    for face_i in faces:
        (x, y, w, h) = [v * size for v in face_i]
        face = gray[y:y + h, x:x + w]
        face_resize = cv2.resize(face, (im_width, im_height))

        # Intentar reconocer la cara
        prediction = model.predict(face_resize)

        if prediction[1] < recognition_threshold:
            employee_id = prediction[0]
            employee_name = names.get(employee_id, 'desconocido')
            id = int(employee_name)
            recognized_id = id
            break
        else:
            print("Persona desconocida")

    if recognized_id is not None:
        break

cap.release()
cv2.destroyAllWindows()

# Devolver el ID del empleado reconocido o "None"
if recognized_id is not None:
    print(recognized_id)
else:
    print("None")
'''
import cv2
import os
import numpy as np
import requests
import time
# Ruta de imágenes y archivo del modelo
model_filename = 'modelo_reconocimiento.yml'
employee_names_filename = 'employee_names.npy'
size = 4
im_width, im_height = (112, 92)
backend_url = 'http://localhost:5000/api/empleado-reconocido'
# Función para cargar el modelo entrenado
def cargar_modelo():
    if os.path.exists(model_filename) and os.path.exists(employee_names_filename):
        model = cv2.face.LBPHFaceRecognizer_create()
        model.read(model_filename)
        names = np.load(employee_names_filename, allow_pickle=True).item()  # Cargar nombres de los empleados
        return model, names
    else:
        return None, {}

# Cargar modelo y nombres de empleados
model, names = cargar_modelo()

if model is None:
    print("Error: No se pudo cargar el modelo.")
    exit()

# Inicializar la cámara y el modelo de reconocimiento facial
face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
cap = cv2.VideoCapture(0)
recognition_threshold = 80

recognized_id = None  # Para almacenar el ID del empleado reconocido

while True:
    rval, frame = cap.read()
    if not rval:
        print("Error al acceder a la cámara")
        break

    frame = cv2.flip(frame, 1, 0)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    mini = cv2.resize(gray, (int(gray.shape[1] / size), int(gray.shape[0] / size)))
    faces = face_cascade.detectMultiScale(mini)

    for face_i in faces:
        (x, y, w, h) = [v * size for v in face_i]
        face = gray[y:y + h, x:x + w]
        face_resize = cv2.resize(face, (im_width, im_height))

        # Intentar reconocer la cara
        prediction = model.predict(face_resize)

        if prediction[1] < recognition_threshold:
            employee_id = prediction[0]
            employee_name = names.get(employee_id, 'desconocido')
            id = int(employee_name)
            recognized_id = id
            try:
                response = requests.post(backend_url, json={'employeeId': recognized_id})
                if response.status_code == 200:
                    print(f"Nombre del empleado: {response.json()['employeeName']}")
                else:
                    print(f"Error en la respuesta del backend: {response.status_code}")
            except requests.exceptions.RequestException as e:
                print(f"Error al conectar con el backend: {e}")
        
        else:
            print("Persona desconocida")

    if recognized_id is not None:
        time.sleep(30)
        recognized_id = None  # Reiniciar para buscar un nuevo empleado

cap.release()
cv2.destroyAllWindows()

