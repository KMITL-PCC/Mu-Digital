"use client";
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function ResultPage() {
  const searchParams = useSearchParams();
  const gender = searchParams.get('gender') || 'ไม่ได้ระบุ';

  // State
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  
  const [submittedData, setSubmittedData] = useState<{
    gender: string, 
    month: string, 
    year: string
  } | null>(null);

  const months = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];

  const currentYearBE = new Date().getFullYear() + 543;
  const years = Array.from({ length: 100 }, (_, i) => currentYearBE - i);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!month || !year) {
      alert("กรุณาเลือกเดือนและปีเกิดให้ครบถ้วน");
      return;
    }
    setSubmittedData({ gender, month, year });
  };

  return (
    <div className="app-container">
      {/* ใช้ style tag แบบนี้ เพื่อให้มั่นใจว่า CSS จะทำงานแน่นอน 100% */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Thai:wght@300;400;600;700&display=swap');
        
        /* Reset พื้นฐาน */
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; }

        /* Style หลัก */
        .app-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          width: 100%;
          /* ธีมมืด 50% ตามที่ขอ */
          background: radial-gradient(circle at center, #1a0b2e 0%, #050508 100%);
          font-family: 'Noto Serif Thai', serif;
          color: #fff;
          padding: 20px;
        }

        .card {
          width: 100%;
          max-width: 600px;
          padding: 60px 50px;
          background-color: rgba(20, 10, 30, 0.7);
          backdrop-filter: blur(15px);
          border-radius: 24px;
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.8), inset 0 0 1px rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.05);
          text-align: center;
          transition: all 0.3s ease;
        }

        .heading {
          color: #FFD700;
          margin: 0 0 15px 0;
          font-size: 42px;
          text-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
          font-weight: 700;
          letter-spacing: 1px;
        }

        .divider {
          height: 2px;
          background: linear-gradient(90deg, transparent, #FFD700, transparent);
          margin: 15px auto 30px;
          width: 70%;
          opacity: 0.5;
        }

        .sub-heading {
          color: #ccc;
          font-size: 22px;
          margin-bottom: 40px;
          font-weight: 300;
        }

        .highlight-text {
          color: #bf5af2;
          font-weight: 600;
          font-size: 24px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .label {
          text-align: left;
          color: #aaa;
          font-size: 18px;
          margin-bottom: 5px;
          padding-left: 5px;
        }

        .inputs-row {
          display: flex;
          gap: 15px;
          width: 100%;
        }

        .custom-select {
          flex: 1;
          padding: 16px 20px;
          border-radius: 12px;
          border: 1px solid #3d2c55;
          background-color: #0f0814;
          color: #eee;
          font-size: 18px;
          font-family: 'Noto Serif Thai', serif;
          outline: none;
          cursor: pointer;
          transition: border-color 0.3s;
          -webkit-appearance: none; /* ลบลูกศรเดิมของ Browser */
        }

        .submit-btn {
          margin-top: 30px;
          padding: 18px;
          background: linear-gradient(45deg, #FFC700, #FF8800);
          color: #2e1a47;
          border: none;
          border-radius: 50px;
          font-size: 22px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Noto Serif Thai', serif;
          box-shadow: 0 5px 20px rgba(255, 136, 0, 0.25);
          transition: transform 0.2s;
          width: 100%;
        }
        
        .submit-btn:active {
          transform: scale(0.98);
        }

        .result-box {
          margin-top: 40px;
          padding: 25px;
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 16px;
          border: 1px solid rgba(191, 90, 242, 0.2);
        }

        .result-title {
          color: #FFD700;
          margin: 0 0 10px 0;
          font-size: 24px;
        }

        .result-text {
          color: #ddd;
          margin: 8px 0;
          font-size: 20px;
        }

        /* --- Responsive Styles (ทำงานแน่นอน) --- */
        
        /* Tablet */
        @media (max-width: 1024px) {
          .card {
            max-width: 90%;
            padding: 50px 40px;
          }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .card {
            padding: 40px 25px;
          }
          .heading {
            font-size: 32px;
          }
          .sub-heading {
            font-size: 18px;
            margin-bottom: 30px;
          }
          .inputs-row {
            flex-direction: column; /* เรียงซ้อนกันแนวตั้งบนมือถือ */
            gap: 15px;
          }
          .custom-select {
            width: 100%;
          }
        }
      `}} />

      <div className="card">
        {/* Header */}
        <h2 className="heading">โชคชะตากำลังรอคุณอยู่</h2>
        <div className="divider"></div>
        
        <h3 className="sub-heading">
          เพศที่เลือก: <span className="highlight-text">{gender}</span>
        </h3>
        
        <form onSubmit={handleSubmit} className="form-group">
          <label className="label">ระบุเดือนและปีเกิดของคุณ:</label>
          
          <div className="inputs-row">
            <select 
              value={month} 
              onChange={(e) => setMonth(e.target.value)} 
              className="custom-select"
              required
            >
              <option value="">เดือนเกิด</option>
              {months.map((m, index) => <option key={index} value={m}>{m}</option>)}
            </select>

            <select 
              value={year} 
              onChange={(e) => setYear(e.target.value)} 
              className="custom-select"
              required
            >
              <option value="">ปี (พ.ศ.)</option>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          <button type="submit" className="submit-btn">
            เปิดคำทำนาย
          </button>
        </form>

        {submittedData && (
          <div className="result-box">
            <h4 className="result-title">ข้อมูลแห่งโชคชะตา</h4>
            <p className="result-text">เพศ: {submittedData.gender}</p>
            <p className="result-text">เกิด: เดือน{submittedData.month} พ.ศ. {submittedData.year}</p>
          </div>
        )}
      </div>
    </div>
  );
}