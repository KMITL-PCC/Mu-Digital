"use client";
import { useRouter } from 'next/navigation';

export default function SelectionPage() {
  const router = useRouter();

  // ฟังก์ชันส่งค่าไปหน้า 2 ผ่าน URL เช่น /result-page?gender=Male
  const selectGender = (gender: string) => {
    router.push(`/date_month_year?gender=${gender}`);
  };

  return (
    <div style={styles.container}>
      <h2>กรุณาเลือกเพศ</h2>
      <div style={styles.buttonGroup}>
        <button onClick={() => selectGender('ชาย')} style={{...styles.button, backgroundColor: '#1890ff'}}>ชาย</button>
        <button onClick={() => selectGender('หญิง')} style={{...styles.button, backgroundColor: '#eb2f96'}}>หญิง</button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '20px' },
  buttonGroup: { display: 'flex', gap: '15px' },
  button: { padding: '15px 30px', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1.2rem' }
};