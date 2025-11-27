import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: 'سياسة الخصوصية - معالم مصر',
  description: 'سياسة الخصوصية لموقع معالم مصر',
};

export default function PolicyPage() {
  return (
    <div className="flex flex-col w-full items-center" 
    style={{
        direction: 'rtl'
    }}>
      <Navbar />
      <main className="max-w-4xl w-full my-3 px-5" style={{
        marginTop: "70px"
      }}>
        <h1 className="text-2xl font-bold mb-4">سياسة الخصوصية</h1>
        <p className="mb-4 text-gray-700">
          نحترم خصوصيتك ونلتزم بحماية أي معلومات شخصية قد تجمعها عند استخدام موقعنا.
          توضح هذه الصفحة كيف نقوم بجمع المعلومات، وأغراض استخدامها، وكيفية حمايتها.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">جمع المعلومات</h2>
        <p className="text-gray-700 mb-4">
          قد نقوم بجمع معلومات تحدد هويتك عند تقديمها طواعية (مثل اسمك، بريدك الإلكتروني)،
          وكذلك بيانات الاستخدام غير الشخصية لأغراض تحسين الموقع وتحليل الأداء.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">استخدام المعلومات</h2>
        <p className="text-gray-700 mb-4">
          تُستخدم المعلومات لتحسين تجربة المستخدم، والرد على الاستفسارات، وإرسال تحديثات عند الموافقة.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">حماية المعلومات</h2>
        <p className="text-gray-700 mb-4">
          نتبع ممارسات أمنية معقولة لحماية بياناتك. ومع ذلك، لا يوجد نظام آمن بنسبة 100% على الإنترنت.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">التغييرات على السياسة</h2>
        <p className="text-gray-700 mb-4">
          قد نقوم بتحديث هذه السياسة من حين لآخر. ننصح بمراجعة هذه الصفحة بانتظام.
        </p>
      </main>
      <Footer />
    </div>
  );
}
