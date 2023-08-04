
from flask import Flask, request, send_file, render_template
from flask_cors import CORS  # CORS eklentisi
import os
from werkzeug.utils import secure_filename


app = Flask(__name__)
CORS(app)  # CORS ayarlarını uygula

# Dosyaların kaydedileceği klasörü belirleyin (örneğin, masaüstünde "uploads" klasörü)
UPLOAD_FOLDER = os.path.join(os.path.expanduser("~"), "Desktop", "uploads")
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/') 
def index():
    
    return render_template('index.html')

@app.route('/dosya-yukle', methods=['POST'])
def dosya_yukle():
    if 'file' not in request.files:
        return "Dosya seçilmedi", 400

    file = request.files['file']

    if file.filename == '':
        return "Dosya seçilmedi", 400

    filename = secure_filename(file.filename)
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    return "Dosya başarıyla yüklendi", 200

@app.route('/dosya-indir/<dosya_adi>', methods=['GET'])
def dosya_indir(dosya_adi):
    return send_file(os.path.join(app.config['UPLOAD_FOLDER'], dosya_adi), as_attachment=True)

if __name__ == '__main__':
    app.run(host='0.0.0.0')
