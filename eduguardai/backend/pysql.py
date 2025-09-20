from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector as mysql
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["*"])  # Allow all origins for production

# Database configuration from environment variables
DB_HOST = os.getenv('DB_HOST', 'localhost')
DB_USER = os.getenv('DB_USER', 'root')
DB_PASSWORD = os.getenv('DB_PASSWORD', '0129')
DB_NAME = os.getenv('DB_NAME', 'eduguardai')

# Database connection function
def get_db_connection():
    try:
        connection = mysql.connect(
            host=DB_HOST, 
            user=DB_USER, 
            password=DB_PASSWORD, 
            database=DB_NAME,
            autocommit=True
        )
        return connection
    except mysql.Error as e:
        print(f"Database connection error: {e}")
        return None

# Initialize connection
mycon = get_db_connection()

@app.route("/", methods =["GET"])
def health_check():
    return jsonify({"status": "Backend is working!", "message": "EduGuard.ai API is running"}), 200

@app.route("/students", methods =["GET"])
def get_students():
    try:
      print(f"Connecting to database: {DB_HOST}, {DB_USER}, {DB_NAME}")
      connection = get_db_connection()
      if not connection:
        return jsonify({"error": "Database connection failed"}), 500
      
      with connection.cursor(dictionary = True) as cursor:
        cursor.execute("SELECT id, name_rollno, parent_mentor FROM students")
        students = cursor.fetchall()
        print(f"Found {len(students)} students")
      return jsonify({"students": students}), 200
    except mysql.Error as e:
      print(f"Database error: {e}")
      return jsonify({"error": str(e)}), 500
    except Exception as e:
      print(f"General error: {e}")
      return jsonify({"error": str(e)}), 500

@app.route("/send_notification", methods =["POST"])
def send_notification():
    try:
      data = request.get_json()
      recipent_id = int(data.get("recipent_id"))
      # Accept either student_id or student_name
      student_id_value = data.get("student_id")
      student_name = data.get("student_name")
      if student_id_value is not None:
        student_id = int(student_id_value)
      else:
        if not student_name:
          return jsonify({"error": "student_name or student_id is required"}), 400
        with mycon.cursor(dictionary = True) as cursor:
          cursor.execute("SELECT id FROM students WHERE name_rollno = %s", (student_name,))
          row = cursor.fetchone()
          if not row:
            return jsonify({"error": "student not found"}), 404
          student_id = int(row["id"]) if isinstance(row, dict) else int(row[0])

      priority_id = int(data.get("priority_id"))
      subject = data.get("subject")
      message = data.get("message")
      channel = data.get("channel")
      connection = get_db_connection()
      if not connection:
        return jsonify({"error": "Database connection failed"}), 500
      
      query = "INSERT INTO notifications (recipent_id, student_id, priority_id, subject, message, channel) VALUES (%s, %s, %s, %s, %s, %s)"
      values = (recipent_id, student_id, priority_id, subject, message, channel)
      with connection.cursor(dictionary = True) as cursor:
        cursor.execute(query, values)
        connection.commit()
      return jsonify({"message": "Notification sent successfully"}), 200
    except KeyError as e:
      return jsonify({"error": f"Missing field {e}"}), 400
    except mysql.Error as e:
      return jsonify({"error": str(e)}), 500
@app.route("/get_notifications", methods =["GET"])
def get_notifications():
    try:
      connection = get_db_connection()
      if not connection:
        return jsonify({"error": "Database connection failed"}), 500
      
      with connection.cursor(dictionary = True) as cursor:
        cursor.execute("SELECT recipent_id, student_id, priority_id, subject, message, channel, created_at FROM notifications")
        notifications = cursor.fetchall()
      return jsonify({"notifications": notifications}), 200
    except mysql.Error as e:
      return jsonify({"error": str(e)}), 500

# Vercel requires this for serverless functions
app = app

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))

