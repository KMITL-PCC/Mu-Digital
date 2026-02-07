# 🌌 Celestial Zodiac Wheel (MU-DIGITAL)

**Interactive Zodiac Experience** — เว็บแอปพลิเคชันเสี่ยงทายและแสดงผลจักรราศี 3D พัฒนาด้วย **Next.js 16**, **React 19**, **Three.js** และ **Prisma 7**

---

## 🚀 การติดตั้งและใช้งาน (Installation & Usage)

### 1. เริ่มต้นใช้งาน (Setup)
1.  **ติดตั้ง Dependencies:**
    ```bash
    npm install
    ```
2.  **ตั้งค่า Environment (.env):**
    สร้างไฟล์ `.env` ที่ root folder:
    ```env
    # สำหรับ Docker (Service Name):
    # DATABASE_URL="mongodb://root:password@mongo:27017/mu-digital?authSource=admin"

    # สำหรับ Localhost:
    DATABASE_URL="mongodb://root:password@localhost:27017/mu-digital?authSource=admin&directConnection=true"
    ```
3.  **สร้าง Prisma Client (สำคัญ):**
    ทุกครั้งที่แก้ Schema หรือติดตั้งใหม่ ต้องรัน:
    ```bash
    npx prisma generate
    ```

### 2. การรันด้วย Docker (Recommended)
โปรเจกต์นี้ตั้งค่า Docker ไว้พร้อมใช้งาน ผ่านคำสั่ง:

| คำสั่ง | รายละเอียด |
| :--- | :--- |
| **`npm run docker:dev`** | 🛠️ **Dev Mode:** รันแอปคู่กับ MongoDB and Prisma studio (Hot Reload) |
| **`npm run docker:down`** | 🛑 **Stop:** หยุดและลบ Containers |
| **`npm run docker:prod`** | 🚀 **Production:** Build และรันโหมดใช้งานจริง |
| **`npm run docker:stop`** | 🛑 **Stop:** หยุดและลบ **Production  |

---

## 📝 ข้อกำหนดและข้อควรระวัง (Requirements & Notes)

1.  **Prisma & Docker:**
    * ห้ามกำหนด `output` ใน `schema.prisma` ให้ใช้ค่า Default (`node_modules`) เพื่อป้องกันปัญหา Path ใน Docker
    * ต้องรัน `npx prisma generate` เสมอก่อน build หรือ run dev
2.  **Tailwind CSS v4:**
    * ใช้ Engine ตัวใหม่ (Oxygen) ไม่ต้องมีไฟล์ `tailwind.config.js` การตั้งค่า theme อยู่ใน CSS Variables
3.  **3D Assets:**
    * ไฟล์โมเดล (`.glb`, `.gltf`) ให้วางไว้ในโฟลเดอร์ `/public`
4.  **Database:**
    * หากรันแบบ Local ต้องมั่นใจว่า MongoDB ในเครื่องรันอยู่ หรือ Map Port 27017 ออกมาจาก Docker แล้ว

---

## 📂 โครงสร้างโปรเจกต์ (Project Structure)

ใช้รูปแบบ **Clean Architecture** แยก UI, Logic และ Data:

```text
src/
├── app/                  # 🌐 Routing Layer (Next.js App Router)
│   ├── api/              # API Endpoints (External access)
│   ├── access-denied/    # Error Page
│   └── home/             # Main Page
├── components/           # 🎨 UI Components (Presentation Layer)
│   └── CelestialWheel.tsx
├── lib/                  # ⚙️ Infrastructure Layer
│   └── db.ts             # Prisma Client Singleton
├── services/             # 🧠 Business Logic Layer (Connect DB)
│   └── zodiac.service.ts
├── middleware.ts         # 🛡️ Global Gatekeeper (Security)
└── prisma/
    └── schema.prisma     # Database Schema
