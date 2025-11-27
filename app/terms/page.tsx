import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: 'الشروط والأحكام - معالم مصر',
  description: 'شروط وأحكام استخدام موقع معالم مصر',
};

export default function TermsPage() {
  return (
    <div className="flex flex-col w-full items-center" 
    style={{
        direction: 'rtl'
    }}>
      <Navbar />
      <main className="max-w-4xl w-full my-3 px-5" style={{
        marginTop: "70px"
      }}>
        <h1 className="text-2xl font-bold mb-4">الشروط والأحكام</h1>
        <p className="mb-4 text-gray-700">
          يرجى قراءة هذه الشروط بعناية قبل استخدام الموقع. باستخدامك للموقع، فإنك توافق على الالتزام بهذه الشروط.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">الاستخدام المقبول</h2>
        <p className="text-gray-700 mb-4">
          يُسمح باستخدام الموقع لأغراض شخصية وغير تجارية فقط. يُمنع نشر أو توزيع محتوى ينتهك القوانين أو حقوق الآخرين.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">حقوق الملكية</h2>
        <p className="text-gray-700 mb-4">
          جميع المحتويات المعروضة على الموقع محمية بحقوق الملكية الفكرية، ولا يجوز إعادة استخدامها بدون إذن صريح.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">حدود المسؤولية</h2>
        <p className="text-gray-700 mb-4">
          نسعى لتقديم معلومات دقيقة لكن لا نضمن اكتمالها أو عدم وجود أخطاء. لا نتحمل مسؤولية الأضرار الناتجة عن استخدام الموقع.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">التواصل</h2>
        <p className="text-gray-700 mb-4">
          لمزيد من المعلومات أو الاستفسارات القانونية، يرجى الاتصال بمالك الموقع عبر المعلومات الواردة في صفحة الاتصال.
        </p>
      </main>
      <Footer />
    </div>
  );
}
