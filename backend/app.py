from flask import Flask, request, jsonify
import os

app = Flask(__name__)

@app.route("/api/upload", methods=["POST"])
def upload_file():
    if 'files' not in request.files:
        return jsonify({"error": "No files part"}), 400

    files = request.files.getlist('files')
    for file in files:
        if file and file.filename:
            # Save the file or process it with your ML model
            # Here you can add your ML model processing logic

            return jsonify({"message": "File uploaded successfully!"}), 200

    return jsonify({"message": "Files uploaded successfully!"}), 200


if __name__ == "__main__":
    app.run(debug=True)