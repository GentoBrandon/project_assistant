'''
import cv2
import os
import sys

# Obtener el ID del empleado desde los argumentos
employee_id = sys.argv[1]

# Directorio donde se guardarán las fotos
dir_faces = 'att_faces/orl_faces'
path = os.path.join(dir_faces, employee_id)

# Si no hay una carpeta con el ID del empleado, se crea
if not os.path.isdir(path):
    os.makedirs(path)

# Inicializar la cámara y el modelo de reconocimiento facial
face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
cap = cv2.VideoCapture(0)

# Comprobar si la cámara se abrió correctamente
if not cap.isOpened():
    print("No se pudo abrir la cámara.")
    exit()

# Tamaño para reducir a miniaturas las fotografías
size = 4
img_width, img_height = 112, 92

# Ciclo para tomar fotografías
count = 0
while count < 100:
    rval, img = cap.read()
    if not rval:
        print("No se pudo capturar imagen.")
        break

    img = cv2.flip(img, 1, 0)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    mini = cv2.resize(gray, (int(gray.shape[1] / size), int(gray.shape[0] / size)))

    faces = face_cascade.detectMultiScale(mini)
    faces = sorted(faces, key=lambda x: x[3])

    if faces:
        face_i = faces[0]
        (x, y, w, h) = [v * size for v in face_i]
        face = gray[y:y + h, x:x + w]
        face_resize = cv2.resize(face, (img_width, img_height))

        # Dibujar un rectángulo y guardar las fotos
        cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 3)
        cv2.putText(img, employee_id, (x - 10, y - 10), cv2.FONT_HERSHEY_PLAIN, 1, (0, 255, 0))

        pin = len(os.listdir(path)) + 1  # Incrementar el número de imagen
        cv2.imwrite(f'{path}/{pin}.png', face_resize)

        count += 1

    # Mostrar la imagen capturada
    cv2.imshow(f'Capturando fotos de {employee_id}', img)

    if cv2.waitKey(10) == 27:
        break

cap.release()
cv2.destroyAllWindows()
'''
import cv2
import os
import sys

# Obtener el ID del empleado desde los argumentos
employee_id = sys.argv[1]

# Rutas absolutas
base_path = r'C:\\Proyectos\\project_assistant\\reconigtion_assistant\\FaceRecognition2'
dir_faces = os.path.join(base_path, 'att_faces', 'orl_faces')
path = os.path.join(dir_faces, employee_id)

# Si no hay una carpeta con el ID del empleado, se crea
if not os.path.isdir(path):
    os.makedirs(path)

# Ruta absoluta para el archivo Haar Cascade XML
cascade_path = os.path.join(base_path, 'haarcascade_frontalface_default.xml')
face_cascade = cv2.CascadeClassifier(cascade_path)

# Inicializar la cámara y el modelo de reconocimiento facial
cap = cv2.VideoCapture(0)
# Comprobar si la cámara se abrió correctamente
if not cap.isOpened():
    print("No se pudo abrir la cámara.")
    exit()

# Tamaño para reducir a miniaturas las fotografías
size = 4
img_width, img_height = 112, 92

# Ciclo para tomar fotografías
count = 0
while count < 100:
    rval, img = cap.read()
    if not rval:
        print("No se pudo capturar imagen.")
        break

    img = cv2.flip(img, 1, 0)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    mini = cv2.resize(gray, (int(gray.shape[1] / size), int(gray.shape[0] / size)))

    faces = face_cascade.detectMultiScale(mini)
    faces = sorted(faces, key=lambda x: x[3])

    if faces:
        face_i = faces[0]
        (x, y, w, h) = [v * size for v in face_i]
        face = gray[y:y + h, x:x + w]
        face_resize = cv2.resize(face, (img_width, img_height))

        # Dibujar un rectángulo y guardar las fotos
        cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 3)
        cv2.putText(img, employee_id, (x - 10, y - 10), cv2.FONT_HERSHEY_PLAIN, 1, (0, 255, 0))

        pin = len(os.listdir(path)) + 1  # Incrementar el número de imagen
        cv2.imwrite(os.path.join(path, f'{pin}.png'), face_resize)

        count += 1

    # Mostrar la imagen capturada
    cv2.imshow(f'Capturando fotos de {employee_id}', img)

    if cv2.waitKey(10) == 27:
        break

cap.release()
cv2.destroyAllWindows()
