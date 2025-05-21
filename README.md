# VirtualPet Database Schema

## Overview
VirtualPet là một hệ thống nhận nuôi thú cưng, bao gồm hai loại người dùng chính: **Adopters** (người nhận nuôi) và **Shelters** (trung tâm cứu trợ động vật). Hệ thống hỗ trợ quản lý thú cưng, lịch sử tiêm chủng, tình trạng sức khỏe, quy trình nhận nuôi và các cuộc hẹn Meet & Greet.

---

## Database Tables

### 1. **Adopters** (Bảng Người Nhận Nuôi)
Lưu trữ thông tin của adopters, những người muốn nhận nuôi thú cưng.
|   Column   | DataType | Constraint              |
|------------|---------|-------------------------|
| id         | UNIQUEIDENTIFIER | PRIMARY KEY DEFAULT NEWID() |
| name       | NVARCHAR(255) | NOT NULL |
| email      | NVARCHAR(255) | UNIQUE NOT NULL |
| password   | NVARCHAR(MAX) | NOT NULL |
| phone      | NVARCHAR(20) |  |
| address    | NVARCHAR(255) |  |
| created_at | DATETIME | DEFAULT GETDATE() |


**Thuộc tính:**
- `id`: Khóa chính của adopter
- `name`: Tên adopter
- `email`: Địa chỉ email (duy nhất)
- `password`: Mật khẩu đăng nhập
- `phone`: Số điện thoại
- `address`: Địa chỉ
- `created_at`: Ngày đăng ký

---

### 2. **Shelters** (Bảng Trung Tâm Cứu Trợ)
Lưu trữ thông tin của shelters, các tổ chức cung cấp thú cưng để nhận nuôi.
|   Column   | DataType | Constraint              |
|------------|---------|-------------------------|
| id         | UNIQUEIDENTIFIER | PRIMARY KEY DEFAULT NEWID() |
| name       | NVARCHAR(255) | NOT NULL |
| email      | NVARCHAR(255) | UNIQUE NOT NULL |
| password   | NVARCHAR(MAX) | NOT NULL |
| phone      | NVARCHAR(20) |  |
| address    | NVARCHAR(255) |  |
| business_license | NVARCHAR(100) | NOT NULL |
| verified   | BIT | DEFAULT 0 |
| created_at | DATETIME | DEFAULT GETDATE() |


**Thuộc tính:**
- Giống với `Adopters`, nhưng có thêm `business_license` và `verified` để xác minh tổ chức.

---

### 3. **Pets** (Bảng Thú Cưng)
Lưu thông tin về thú cưng được shelter cung cấp.
|   Column   | DataType | Constraint              |
|------------|---------|-------------------------|
| id         | UNIQUEIDENTIFIER | PRIMARY KEY DEFAULT NEWID() |
| name       | NVARCHAR(255) | NOT NULL |
| type       | NVARCHAR(50) | NOT NULL |
| age        | INT | NOT NULL |
| gender     | NVARCHAR(10) | CHECK (gender IN ('male', 'female')) NOT NULL |
| shelter_id | UNIQUEIDENTIFIER | FOREIGN KEY REFERENCES Shelters(id) |
| status     | NVARCHAR(50) | CHECK (status IN ('available', 'adopted')) NOT NULL |
| price      | DECIMAL(10,2) | NOT NULL |
| vaccinated | BIT | DEFAULT 0 |
| health_condition | NVARCHAR(255) |  |
| child_friendly | BIT | DEFAULT 1 |


**Thuộc tính:**
- `price`: Chi phí để nhận nuôi
- `vaccinated`: Đã tiêm chủng hay chưa
- `health_condition`: Tình trạng sức khỏe
- `child_friendly`: Có an toàn với trẻ nhỏ không

---

### 4. **VaccinationRecords** (Lịch Sử Tiêm Chủng)
Lưu thông tin về lịch sử tiêm chủng của thú cưng.
|   Column   | DataType | Constraint              |
|------------|---------|-------------------------|
| id         | UNIQUEIDENTIFIER | PRIMARY KEY DEFAULT NEWID() |
| pet_id     | UNIQUEIDENTIFIER | FOREIGN KEY REFERENCES Pets(id) |
| vaccine_name | NVARCHAR(255) | NOT NULL |
| vaccination_date | DATE | NOT NULL |
| vet_name   | NVARCHAR(255) |  |

**Thuộc tính:**
- `vaccine_name`: Tên vắc-xin đã tiêm
- `vaccination_date`: Ngày tiêm chủng
- `vet_name`: Bác sĩ thú y thực hiện

---

### 5. **Adoptions** (Bảng Nhận Nuôi)
Lưu trữ lịch sử nhận nuôi giữa adopters và pets.
|   Column   | DataType | Constraint              |
|------------|---------|-------------------------|
| id         | UNIQUEIDENTIFIER | PRIMARY KEY DEFAULT NEWID() |
| adopter_id | UNIQUEIDENTIFIER | FOREIGN KEY REFERENCES Adopters(id) |
| pet_id     | UNIQUEIDENTIFIER | FOREIGN KEY REFERENCES Pets(id) |
| adoption_date | DATETIME | DEFAULT GETDATE() |

**Thuộc tính:**
- `adoption_date`: Ngày nhận nuôi

---

### 6. **Meetings** (Bảng Cuộc Hẹn Meet & Greet)
Quản lý cuộc hẹn giữa adopters và shelters để gặp gỡ thú cưng.
|   Column   | DataType | Constraint              |
|------------|---------|-------------------------|
| id         | UNIQUEIDENTIFIER | PRIMARY KEY DEFAULT NEWID() |
| adopter_id | UNIQUEIDENTIFIER | FOREIGN KEY REFERENCES Adopters(id) |
| shelter_id | UNIQUEIDENTIFIER | FOREIGN KEY REFERENCES Shelters(id) |
| pet_id     | UNIQUEIDENTIFIER | FOREIGN KEY REFERENCES Pets(id) |
| schedule_time | DATETIME | NOT NULL |

**Thuộc tính:**
- `schedule_time`: Ngày giờ hẹn gặp

---

### 7. **Messages** (Bảng Tin Nhắn)
Lưu trữ tin nhắn giữa adopters và shelters.
|   Column   | DataType | Constraint              |
|------------|---------|-------------------------|
| id         | UNIQUEIDENTIFIER | PRIMARY KEY DEFAULT NEWID() |
| sender_id  | UNIQUEIDENTIFIER | FOREIGN KEY REFERENCES Adopters(id) |
| receiver_id | UNIQUEIDENTIFIER | FOREIGN KEY REFERENCES Shelters(id) |
| content    | NVARCHAR(MAX) | NOT NULL |
| sent_at    | DATETIME | DEFAULT GETDATE() |

**Thuộc tính:**
- `content`: Nội dung tin nhắn
- `sent_at`: Thời gian gửi

---

| Table Name            | Description |
|----------------------|-------------|
| `Adopters`          | Người nhận nuôi thú cưng |
| `Shelters`          | Trung tâm cứu trợ thú cưng |
| `Pets`              | Danh sách thú cưng |
| `VaccinationRecords`| Lịch sử tiêm chủng của thú cưng |
| `Adoptions`         | Lưu trữ lịch sử nhận nuôi |
| `Meetings`          | Quản lý các cuộc hẹn Meet & Greet |
| `Messages`          | Lưu tin nhắn giữa adopters và shelters |

