from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os
import uuid
import time
import json

app = Flask(__name__)
CORS(app, origins='*')

# Set the upload folder and allowed extensions
CLOTHING_FILE = '../uploads/clothing.json'
UPLOAD_FOLDER = '../uploads'
ALLOWED_EXTENSIONS = {'jpeg', 'jpg', 'png'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['CLOTHING_FILE'] = CLOTHING_FILE

clothing_items = {}

def load_clothing():
    if os.path.exists(CLOTHING_FILE):
        with open(CLOTHING_FILE, 'r') as file:
            return json.load(file)
    return {}

clothing_data = load_clothing()

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/save-clothing', methods=['POST'])
def save_clothing():
    if 'image' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['image']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        unique_id = str(uuid.uuid4())
        extension = file.filename.rsplit('.', 1)[1].lower()
        filename = secure_filename(f"{unique_id}.{extension}")
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        new_clothing_item = {
            "tags": []
        }
        clothing_data[unique_id] = new_clothing_item

        # Save updated clothing data to the JSON file
        with open(CLOTHING_FILE, 'w') as f:
            json.dump(clothing_data, f)

        return jsonify({"message": "File saved successfully", "id": unique_id}), 200
    else:
        return jsonify({"error": "File type not allowed"}), 400
    

@app.route('/processed-image', methods=['GET'])
def get_processed_image():
    image_id = request.args.get('id')  # Get the image ID from query parameters
    
    if not image_id:
        return jsonify({"error": "No image ID provided"}), 400

    filename = f"{image_id}.jpeg"  # Assuming the filenames are stored as ID.jpeg
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    
    start_time = time.time()
    timeout = 100
    while not os.path.exists(filepath):
        if time.time() - start_time > timeout:
            return jsonify({"error": f"Image {filename} not found"}), 404
        time.sleep(0.1)
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename), 200


@app.route('/get-tags', methods=['GET'])
def get_tags():
    id = request.args.get('id')
    item = clothing_data.get(id)  # Use string keys for JSON compatibility
    if item:
        return jsonify({"tags": item["tags"]})
    else:
        return jsonify({"error": "Item not found"}), 404


@app.route('/save-tag', methods=['POST'])
def save_tag():
    data = request.json
    item_id = data.get("id")
    tags = data.get("tags")
    if item_id in clothing_data:
        clothing_data[item_id]["tags"] = tags
        with open(CLOTHING_FILE, 'w') as f:
            json.dump(clothing_data, f)
        return jsonify({"message": f"Tags {tags} saved successfully"})
    else:
        return jsonify({"error": "Item not found"}), 404
    

@app.route('/get-all-tags', methods=['GET'])
def get_all_tags():
    all_tags = set()
    for clothing in clothing_data.values():
        all_tags |= set(clothing['tags'])
    return jsonify({'tags': sorted(list(all_tags)),
                    'message': 'all tags sent to client successfully'})

@app.route('/get-all-cloth', methods=['GET'])
def get_all_cloth():
    all_clothing = [{"id": key, "path": os.path.join(UPLOAD_FOLDER, f"{key}.jpeg"), "tags": item["tags"]} for key, item in clothing_data.items()]
    return jsonify(all_clothing)


if __name__ == '__main__':
    app.run(debug=True, port=8081)