import ApiDebug from '@/components/debug/ApiDebug';

export default function DebugPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">API Debug Page</h1>
        <ApiDebug />
      </div>
    </div>
  );
}