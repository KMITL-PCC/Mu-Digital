// src/app/access-denied/page.tsx
import Link from "next/link";

export default function AccessDenied() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        {/* Icon กุญแจหรือเครื่องหมายตกใจ */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
          <svg
            className="h-10 w-10 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          ไม่สามารถเข้าถึงเว็บไซต์ได้
        </h1>
        <h2 className="text-sm font-semibold text-red-500 uppercase tracking-wide mb-4">
          Access Denied / Restricted Network
        </h2>

        <p className="text-gray-600 mb-6 leading-relaxed">
          คุณกำลังใช้งานอินเทอร์เน็ตผ่าน <strong>วงแลน (Network) ที่ไม่ได้รับอนุญาต</strong>
          <br />
          ระบบจำกัดการเข้าถึงเฉพาะเครือข่ายภายในที่กำหนดไว้เท่านั้น
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm text-gray-500 border border-gray-100">
          <p>กรุณาตรวจสอบการเชื่อมต่อของคุณ:</p>
          <ul className="list-disc list-inside mt-2 text-left space-y-1">
            <li>ตรวจสอบว่าเชื่อมต่อ Wi-Fi ถูกต้องหรือไม่</li>
            <li>ปิด VPN หรือ Proxy หากมีการเปิดใช้งาน</li>
            <li>ติดต่อผู้ดูแลระบบหากคุณคิดว่านี่คือข้อผิดพลาด</li>
          </ul>
        </div>

        {/* ปุ่มลองใหม่ (Optional) */}
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 w-full"
        >
          ลองเชื่อมต่อใหม่อีกครั้ง
        </Link>
      </div>
      <p className="mt-8 text-xs text-gray-400">
        Error Code: 403 Forbidden | Security by Mu-Digital
      </p>
    </div>
  );
}