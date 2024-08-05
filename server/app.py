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
CANVAS_FILE = '../uploads/canvas.json'
UPLOAD_FOLDER = '../uploads'
ALLOWED_EXTENSIONS = {'jpeg', 'jpg', 'png'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['CLOTHING_FILE'] = CLOTHING_FILE

clothing_items = {}
canvas_data = {}

def load_clothing():
    if os.path.exists(CLOTHING_FILE):
        with open(CLOTHING_FILE, 'r') as file:
            return json.load(file)
    return {}

def load_canvas():
    if os.path.exists(CANVAS_FILE):
        with open(CANVAS_FILE, 'r') as file:
            return json.load(file)

clothing_data = load_clothing()
canvas_data = load_canvas()


# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/save-clothing', methods=['POST'])
def save_clothing():
    try:
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
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

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

@app.route('/get-all-cloth-tags', methods=['GET'])
def get_all_cloth():
    all_clothing = [{"id": key, "path": f"http://localhost:8081/uploads/{key}.jpeg", "tags": item["tags"]} for key, item in clothing_data.items()]
    return jsonify(all_clothing)

@app.route('/uploads/<path:filename>', methods=['GET'])
def download_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/delete-clothing')
def delete_clothing():
    data = request.get_json()
    clothing_id = data.get('id')

    if not clothing_id or clothing_id not in clothing_data:
        return jsonify({"error": "Clothing item not found"}), 404

    # Delete the image file
    filename = f'{clothing_data[clothing_id]}.jpeg'
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    if os.path.exists(filepath):
        os.remove(filepath)

    # Remove the item from clothing_data
    del clothing_data[clothing_id]
    # Save updated clothing data to the JSON file
    with open(CLOTHING_FILE, 'w') as f:
        json.dump(clothing_data, f)

    return jsonify({"message": "Clothing item deleted successfully"}), 200


@app.route('/save-canvas', methods=['POST'])
def save_canvas():
    try:
        canvas_data = request.json  # This will be a list of dictionaries
        with open(CANVAS_FILE, 'w') as f:
            json.dump(canvas_data, f, indent=4)  # Save the list of dictionaries to a file
        return jsonify({"message": "Canvas data saved successfully"}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 404
    
@app.route('/get-canvas', methods=['GET'])
def get_canvas():
    try:
        return jsonify(canvas_data), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 404
    

if __name__ == '__main__':
    app.run(debug=True, port=8081)