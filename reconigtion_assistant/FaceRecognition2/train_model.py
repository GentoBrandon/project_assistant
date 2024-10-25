
'''
import cv2
import os
import numpy as np

# Directorio de las fotos y el archivo del modelo
dir_faces = 'att_faces/orl_faces'
model_filename = 'modelo_reconocimiento.yml'

# Dimensiones de las imágenes
im_width, im_height = (112, 92)

# Inicializar las listas de imágenes y etiquetas
(images, labels, names, id) = ([], [], {}, 0)

# Cargar el modelo existente si ya está creado
if os.path.exists(model_filename):
    print(f"Cargando modelo existente {model_filename}")
    model = cv2.face.LBPHFaceRecognizer_create()
    model.read(model_filename)
else:
    # Crear un modelo nuevo si no existe
    print(f"Creando nuevo modelo {model_filename}")
    model = cv2.face.LBPHFaceRecognizer_create()

# Recorrer el directorio de empleados para entrenar el modelo con las imágenes nuevas
for (subdirs, dirs, files) in os.walk(dir_faces):
    for subdir in dirs:
        names[id] = subdir  # Asignar la carpeta al ID del empleado
        subjectpath = os.path.join(dir_faces, subdir)
        for filename in os.listdir(subjectpath):
            path = os.path.join(subjectpath, filename)
            img = cv2.imread(path, cv2.IMREAD_GRAYSCALE)  # Asegurar que se cargue en escala de grises

            if img is not None:
                resized_img = cv2.resize(img, (im_width, im_height))  # Redimensionar la imagen
                images.append(resized_img)
                labels.append(id)  # Usar el ID actual como etiqueta para el empleado
            else:
                print(f"Error al cargar la imagen {path}")
        id += 1

# Verificar si hay imágenes para entrenar
if len(images) == 0 or len(labels) == 0:
    print("No se encontraron imágenes nuevas para entrenar el modelo.")
else:
    # Convertir las listas a arrays de Numpy
    (images, labels) = [np.array(lis) for lis in [images, labels]]

    print(f"Actualizando el modelo con {len(images)} nuevas imágenes.")
    
    # Reentrenar el modelo con las nuevas imágenes
    model.update(images, labels)

    # Guardar el modelo actualizado
    model.save(model_filename)
    print(f'Modelo actualizado y guardado en {model_filename}')
'''
'''import cv2
import os
import numpy as np

# Directorio de las fotos y el archivo del modelo
dir_faces = 'att_faces/orl_faces'
model_filename = 'modelo_reconocimiento.yml'

# Dimensiones de las imágenes
im_width, im_height = (112, 92)

# Inicializar las listas de imágenes y etiquetas
images, labels, names = [], [], {}
id_counter = 0

# Recorrer el directorio de empleados para entrenar el modelo
for (subdirs, dirs, files) in os.walk(dir_faces):
    for subdir in dirs:
        names[id_counter] = subdir  # Asignar la carpeta al ID del empleado
        subjectpath = os.path.join(dir_faces, subdir)
        for filename in os.listdir(subjectpath):
            path = os.path.join(subjectpath, filename)
            img = cv2.imread(path, cv2.IMREAD_GRAYSCALE)  # Asegurar que se cargue en escala de grises

            if img is not None:
                resized_img = cv2.resize(img, (im_width, im_height))  # Redimensionar la imagen
                images.append(resized_img)
                labels.append(id_counter)  # Usar el ID actual como etiqueta para el empleado
            else:
                print(f"Error al cargar la imagen {path}")
        id_counter += 1

# Verificar si hay imágenes para entrenar
if len(images) == 0 or len(labels) == 0:
    print("No se encontraron imágenes para entrenar el modelo.")
    exit()

# Convertir las listas a arrays de Numpy
images, labels = np.array(images), np.array(labels)

# Crear el modelo LBPH y entrenarlo con las imágenes y etiquetas
model = cv2.face.LBPHFaceRecognizer_create()
model.train(images, labels)

# Guardar el modelo entrenado y los nombres de los empleados
model.save(model_filename)
np.save('employee_names.npy', names)  # Guardar el diccionario de nombres
print(f'Modelo actualizado y guardado en {model_filename}')
print(f'Nombres de los empleados guardados en employee_names.npy')
'''

import cv2
import os
import numpy as np

# Ruta base del proyecto
base_path = r'C:\\Users\\KEVIN\\Documents\\Proyectos_Practica\\JavaScript\\Proyecto_analisis_Asistent\\project_assistant\\reconigtion_assistant\\FaceRecognition2'

# Rutas absolutas del directorio de fotos y el archivo del modelo
dir_faces = os.path.join(base_path, 'att_faces', 'orl_faces')
model_filename = os.path.join(base_path, 'modelo_reconocimiento.yml')
names_filename = os.path.join(base_path, 'employee_names.npy')

# Dimensiones de las imágenes
im_width, im_height = (112, 92)

# Inicializar las listas de imágenes y etiquetas
images, labels, names = [], [], {}
id_counter = 0

# Recorrer el directorio de empleados para entrenar el modelo
for (subdirs, dirs, files) in os.walk(dir_faces):
    for subdir in dirs:
        names[id_counter] = subdir  # Asignar la carpeta al ID del empleado
        subjectpath = os.path.join(dir_faces, subdir)
        for filename in os.listdir(subjectpath):
            path = os.path.join(subjectpath, filename)
            img = cv2.imread(path, cv2.IMREAD_GRAYSCALE)  # Asegurar que se cargue en escala de grises

            if img is not None:
                resized_img = cv2.resize(img, (im_width, im_height))  # Redimensionar la imagen
                images.append(resized_img)
                labels.append(id_counter)  # Usar el ID actual como etiqueta para el empleado
            else:
                print(f"Error al cargar la imagen {path}")
        id_counter += 1

# Verificar si hay imágenes para entrenar
if len(images) == 0 or len(labels) == 0:
    print("No se encontraron imágenes para entrenar el modelo.")
    exit()

# Convertir las listas a arrays de Numpy
images, labels = np.array(images), np.array(labels)

# Crear el modelo LBPH y entrenarlo con las imágenes y etiquetas
model = cv2.face.LBPHFaceRecognizer_create()
model.train(images, labels)

# Guardar el modelo entrenado y los nombres de los empleados
model.save(model_filename)
np.save(names_filename, names)  # Guardar el diccionario de nombres
print(f'Modelo actualizado y guardado en {model_filename}')
print(f'Nombres de los empleados guardados en {names_filename}')
