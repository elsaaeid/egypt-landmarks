// components/HistorySection.tsx
import React from 'react';

const HistorySection: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">التاريخ المصري</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className='flex flex-col justify-center items-center'>
            <h3 className="text-2xl font-semibold mb-4">العصر القديم</h3>
            <p className="text-gray-700 text-center">
              بدأت الحضارة المصرية القديمة حوالي 3100 قبل الميلاد مع توحيد المملكة العليا والسفلى. شهدت بناء الأهرامات والمعابد الضخمة
            </p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <h3 className="text-2xl font-semibold mb-4">العصر الحديث</h3>
            <p className="text-gray-700 text-center">
              اليوم، تستمر مصر في الحفاظ على تراثها الغني بينما تتطور كدولة حديثة، مع جذب ملايين الزوار سنويا
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;