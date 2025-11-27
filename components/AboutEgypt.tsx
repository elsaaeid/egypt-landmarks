// components/AboutEgypt.tsx
import React from 'react';

const AboutEgypt: React.FC = () => {
  return (
    <section id='about' className="py-12 bg-gray-100 w-full">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">عن مصر</h2>
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-lg text-gray-700 mb-4">
            مصر هي مهد الحضارة، حيث يعود تاريخها إلى آلاف السنين. من النيل إلى الصحراء، تروي مصر قصصاً عن الفراعنة والآلهة والإنجازات العلمية.
          </p>
          <p className="text-lg text-gray-700">
            اكتشف الكنوز الأثرية التي جعلت مصر وجهة سياحية عالمية.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutEgypt;