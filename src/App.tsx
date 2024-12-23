import React, { useState } from "react";

const App = () => {
  const [selectedCount, setSelectedCount] = useState<number | null>(null);
  const [results, setResults] = useState<number[]>([]);

  const drawLottery = (count: number) => {
    const probabilities = [20, 25, 25, 25, 5];
    const rewards = [0, 5, 10, 20, 50];

    const getRandomReward = () => {
      const random = Math.random() * 100;
      let accumulated = 0;
      for (let i = 0; i < probabilities.length; i++) {
        accumulated += probabilities[i];
        if (random < accumulated) {
          return rewards[i];
        }
      }
      return 0;
    };

    const newResults = Array.from({ length: count }, getRandomReward);
    setResults(newResults);
  };

  const handleButtonClick = (count: number) => {
    setSelectedCount(count);
    drawLottery(count);
  };

  const totalCertificates = results.reduce((sum, val) => sum + val, 0);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        {/* Header Image */}
        <img
          src={require('./src_assets/popo.png')}
          alt="Header"
          className="mb-4 object-cover h-36 w-36"
        />

        {/* Title */}
        <h1 className="text-2xl font-bold text-center flex items-center justify-center">
          <img src={require('./src_assets/popoto.png')} alt="Left" className="mr-2 object-cover h-6 w-18" />
          어서오세요! 포포-또 구매점입니다!
          <img src={require('./src_assets/popoto.png')} alt="Left" className="mr-2 object-cover h-6 w-18" />
        </h1>

        {/* Description */}
        <p className="text-center text-sm mt-2">
          포포-또 구매 기금은 무스카 시의 빈곤층 지원에 사용됩니다.
        </p>
        <p className="text-center text-xs text-red-600">
          지나친 도박은 건강에 해롭습니다. 도박 중독 상담은 국번없이 XXXX
        </p>

        {/* Buttons */}
        <div className="mt-4 flex flex-col items-center">
          <p className="text-center font-semibold">
            구매하시려는 포포-또의 갯수를 입력하세요.
          </p>
          <div className="flex gap-2 mt-2">
            {[1, 2, 3].map((count) => (
              <button
                key={count}
                onClick={() => handleButtonClick(count)}
                className={`px-4 py-2 border rounded-md text-white transition-colors ${
                  selectedCount === count ? "bg-green-500" : "bg-gray-400"
                }`}
              >
                {count}개
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-xl font-bold">포포-또를 이용해 얻은 증서는...</p>
            {results.map((result, index) => (
              <p key={index} className="text-lg">
                두구 두구 두구... "{result} 증서" 입니다!
              </p>
            ))}
            <p className="mt-4 text-lg font-semibold text-blue-600">
              이번 포포-또를 통해 총 {totalCertificates}개의 증서를 얻으셨습니다!
            </p>
          </div>
        )}

        {/* Footer */}
        {results.length > 0 && (
          <p className="mt-8 text-center text-gray-600">
            마음에 드는 결과셨길 바라요! 그럼 또 포포를 찾아주세요!
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
