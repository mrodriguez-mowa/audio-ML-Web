import re
from pydub import AudioSegment
import os
import requests as req


# Read the audio file
audio_list = os.listdir('./audios')

for audio in audio_list:
  current_audio = AudioSegment.from_file('./audios/' + audio, format="wav")
  if current_audio.duration_seconds <= 15:
    print('AUDIO MUY CORTO')
  else:
    print('SE PROCESARÁ POR WHISPER Y GENERARÁ UN ARCHIVO DE TEXTO')
    # SE LEE EL ARCHIVO DE TEXTO #
    transcript_file = f'./txt/{audio[:-4]}.txt'
    valid_transcript = []
    with open(transcript_file, 'r', encoding='utf-8') as file:
      transcript = file.read()
    
    # SE QUITAN LOS TIMESTAMPS Y SPEAKERS #
    new_transcript = ""
    text = transcript.split('\n')
    for line in text:
      if not line.upper().__contains__('SPEAKER'):
          valid_transcript.append(line)
      new_transcript = ' '.join(valid_transcript)
    
    if (len(new_transcript) <= 20):
      print('NO ES UN AUDIO VÁLIDO PARA PROCESAR')
    else:
      print('ES UN AUDIO VÁLIDO PARA PROCESAR')
      # SE HACE LA PETICION AL NLP #
      url = 'http://localhost:7000/sentiment'
      data = {'text': transcript}
      response = req.post(url, data=data)
      print(response.json())
      
"""


# Read the transcript file
filename = './txt/transcript.txt'
with open(filename, 'r', encoding='utf-8') as file:
    transcript = file.read()
    
# Remove timestamps and speakers
valid_transcript = []

text = transcript.split('\n')

for line in text:
    if not line.upper().__contains__('SPEAKER'):
        valid_transcript.append(line)

new_transcript = ' '.join(valid_transcript)

# Count the number of words

words = new_transcript.split(' ')

if (len(words) <= 20):
  print('NO ES UN AUDIO VÁLIDO PARA PROCESAR')
else:
  print('ES UN AUDIO VÁLIDO PARA PROCESAR')


1. Validar Longitud de Audio
2. Procesar por whisper
3. Obtener el texto
4. Validar Longitud de texto
5. Procesar cada línea de texto por NLP
6. Obtener un promedio 
"""

def remove_timestamps_speakers(text):
    # Remove timestamps and speakers
    text = re.sub(r'\d{2}:\d{2}:\d{2}\s\w+\s', '', text)
    return text