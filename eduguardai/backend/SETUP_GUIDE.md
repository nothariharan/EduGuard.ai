# EduGuard.ai Backend Setup Guide

## ✅ **Complete Setup Status**

Your MySQL database and Flask backend are now fully configured and working! Here's what has been set up:

### 🗄️ **Database Configuration**
- **Database**: `eduguardai` (MySQL 8.0)
- **Host**: localhost
- **Port**: 3306
- **User**: root
- **Password**: 0129

### 📊 **Database Tables**

#### `students` Table
```sql
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_rollno VARCHAR(255) NOT NULL,
    parent_mentor VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### `notifications` Table
```sql
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recipent_id INT NOT NULL,
    student_id INT NOT NULL,
    priority_id INT NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    channel VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id)
);
```

### 🚀 **Backend API Endpoints**

#### 1. Get Students
- **URL**: `GET http://localhost:5000/students`
- **Response**: List of all students with name_rollno and parent_mentor

#### 2. Send Notification
- **URL**: `POST http://localhost:5000/send_notification`
- **Body**:
```json
{
    "recipent_id": 1,
    "student_id": 1,
    "priority_id": 2,
    "subject": "Notification Subject",
    "message": "Notification message content",
    "channel": "email"
}
```

#### 3. Get Notifications
- **URL**: `GET http://localhost:5000/get_notifications`
- **Response**: List of all notifications

### 🔧 **Priority ID Mapping**
- `1` = High Priority
- `2` = Medium Priority  
- `3` = Low Priority

### 👥 **Recipient ID Mapping**
- `1` = Mentor
- `2` = Parent/Guardian
- `3` = Both

### 📝 **Sample Data**
The database includes 7 sample students:
1. Mohan Kumar (CS2021001) - Dr. Rakesh Sharma
2. Arjun Mehta (EE2021045) - Prof. Neha Sharma
3. Aisha Khan (ME2021089) - Dr. Manish Brown
4. Rohan Verma (CS2021156) - Prof. Neha Sharma
5. Neha Sharma (BT2021234) - Dr. Rakesh Sharma
6. Vikram Singh (CE2021078) - Dr. Manish Brown
7. Karan Gupta (EC2021092) - Prof. Neha Sharma

## 🎯 **How to Use**

### Starting the Backend Server
```bash
cd eduguardai/backend
py pysql.py
```
Server will run on: `http://127.0.0.1:5000`

### Testing the Setup
1. **Test Students Endpoint**:
   ```bash
   curl http://127.0.0.1:5000/students
   ```

2. **Test Send Notification**:
   ```bash
   curl -X POST http://127.0.0.1:5000/send_notification \
   -H "Content-Type: application/json" \
   -d '{"recipent_id":1,"student_id":1,"priority_id":2,"subject":"Test","message":"Test message","channel":"email"}'
   ```

3. **Test Get Notifications**:
   ```bash
   curl http://127.0.0.1:5000/get_notifications
   ```

## 🔗 **Frontend Integration**

Your Next.js frontend can now:
- ✅ Fetch students from the backend
- ✅ Send notifications that will be saved to the database
- ✅ Retrieve and display notifications from the database
- ✅ All notifications created in the notification menu will be permanently stored

## 🛠️ **Troubleshooting**

### If MySQL is not accessible:
```bash
# Add MySQL to PATH
$env:PATH += ";C:\Program Files\MySQL\MySQL Server 8.0\bin"

# Test connection
mysql -u root -p0129 -e "SHOW DATABASES;"
```

### If Python packages are missing:
```bash
py -m pip install -r requirements.txt
py -m pip install mysql-connector-python
```

### If backend won't start:
1. Check if MySQL service is running
2. Verify database credentials in `pysql.py`
3. Ensure all Python dependencies are installed

## ✅ **Verification Checklist**

- [x] MySQL Server installed and running
- [x] `eduguardai` database created
- [x] `students` and `notifications` tables created
- [x] Sample student data inserted
- [x] Python dependencies installed
- [x] Flask backend server running on port 5000
- [x] All API endpoints tested and working
- [x] Notifications can be created and retrieved
- [x] Database persistence confirmed

## 🎉 **Success!**

Your EduGuard.ai backend is now fully functional! Notifications created in the notification menu will be:
- ✅ Saved to the MySQL database
- ✅ Persisted permanently
- ✅ Retrievable via API
- ✅ Displayed in the frontend

The system is ready for production use!
