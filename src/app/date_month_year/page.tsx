"use client";
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function ResultPage() {
  // ดึงค่า Query Parameter ชื่อ "gender"
  const searchParams = useSearchParams();
  const gender = searchParams.get('gender') || 'ไม่ได้ระบุ';

  const [name, setName] = useState('');
  const [submittedData, setSubmittedData] = useState<{name: string, gender: string} | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedData({ name, gender });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3>เพศที่เลือกมาคือ: <span style={{color: '#1890ff'}}>{gender}</span></h3>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <label>ป้อนชื่อของคุณ:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="กรอกชื่อที่นี่..."
            style={styles.input}
            required
          />
          <button type="submit" style={styles.submitBtn}>Submit</button>
        </form>

        {submittedData && (
          <div style={styles.resultBox}>
            <h4>แสดงผลลัพธ์:</h4>
            <p>ชื่อ: {submittedData.name}</p>
            <p>เพศ: {submittedData.gender}</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' },
  card: { padding: '30px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '350px' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' },
  input: { padding: '10px', borderRadius: '4px', border: '1px solid #ddd' },
  submitBtn: { padding: '10px', backgroundColor: '#52c41a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  resultBox: { marginTop: '20px', padding: '15px', backgroundColor: '#e6f7ff', borderRadius: '8px', border: '1px solid #91d5ff' }
};