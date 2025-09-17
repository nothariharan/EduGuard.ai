from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector as mysql

app = Flask(__name__)
CORS(app)

mycon = mysql.connect(host = "localhost", user = "root", password = "0129", database = "eduguardai")
cursor = mycon.cursor(dictionary = True)

@app.route("/students", methods =["GET"])
def get_students():
    try:
      with mycon.cursor(dictionary = True) as cursor:
        cursor.execute("SELECT name_rollno, parent_mentor FROM students")
        students = cursor.fetchall()
      return jsonify({"students": students}), 200
    except mysql.Error as e:
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
      query = "INSERT INTO notifications (recipent_id, student_id, priority_id, subject, message, channel) VALUES (%s, %s, %s, %s, %s, %s)"
      values = (recipent_id, student_id, priority_id, subject, message, channel)
      with mycon.cursor(dictionary = True) as cursor:
        cursor.execute(query, values)
        mycon.commit()
      return jsonify({"message": "Notification sent successfully"}), 200
    except KeyError as e:
      return jsonify({"error": f"Missing field {e}"}), 400
    except mysql.Error as e:
      return jsonify({"error": str(e)}), 500
@app.route("/get_notifications", methods =["GET"])
def get_notifications():
    with mycon.cursor(dictionary = True) as cursor:
        cursor.execute("SELECT recipent_id, student_id, priority_id, subject, message, channel FROM notifications")
        notifications = cursor.fetchall()
    return jsonify({"notifications": notifications}), 200

if __name__ == "__main__":
    app.run(debug = True)

