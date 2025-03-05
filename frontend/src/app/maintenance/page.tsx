import { FaCog, FaTools } from 'react-icons/fa';

export default function MaintenancePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white p-6">
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="flex justify-center mb-8">
          <FaTools className="text-7xl animate-pulse text-yellow-300" />
        </div>
        
        <h1 className="text-6xl font-black mb-6 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-300">
            メンテナンス中
          </span>
        </h1>
        
        <p className="text-xl mb-10 text-gray-200 leading-relaxed">
          現在、システムのアップグレードとメンテナンスを行っています。<br />
          より良いサービスを提供するため、しばらくお待ちください。
        </p>
        
        <div className="inline-flex items-center justify-center space-x-2 mb-12 animate-bounce">
          <FaCog className="text-2xl text-blue-300 animate-spin" />
          <span className="text-blue-300">処理中...</span>
          <FaCog className="text-2xl text-blue-300 animate-spin" />
        </div>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
        <div className="absolute w-96 h-96 bg-yellow-400 rounded-full top-10 -left-20 mix-blend-screen"></div>
        <div className="absolute w-96 h-96 bg-purple-400 rounded-full bottom-10 -right-20 mix-blend-screen"></div>
      </div>
    </div>
  );
};

