'use client';

import { useState, useEffect } from 'react';
import { database } from '@/lib/firebase';
import { ref, set, onValue, off } from 'firebase/database';

export default function Home() {
  const [text, setText] = useState('');
  const [savedText, setSavedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Подписываемся на изменения в базе данных
  useEffect(() => {
    const textRef = ref(database, 'text');
    
    // Функция для получения данных
    const handleData = (snapshot: any) => {
      const data = snapshot.val();
      if (data) {
        setSavedText(data.content || '');
      }
    };

    // Подписываемся на изменения
    onValue(textRef, handleData);

    // Отписываемся при размонтировании
    return () => {
      off(textRef);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Сохраняем текст в Firebase
      await set(ref(database, 'text'), {
        content: text,
        timestamp: Date.now()
      });
      
      setText('');
    } catch (error) {
      console.error('Error saving text:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Мультиплатформенное приложение
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Введите текст..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !text.trim()}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Сохранение...' : 'Сохранить'}
          </button>
        </form>

        {savedText && (
          <div className="mt-8 p-4 bg-gray-50 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Сохраненный текст:</h2>
            <p className="text-gray-700 break-words">{savedText}</p>
          </div>
        )}
      </div>
    </div>
  );
}
