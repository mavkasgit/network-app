/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Включаем статическую генерацию
  images: {
    unoptimized: true, // Требуется для статической генерации
  },
  // Отключаем API роуты, так как они не работают в статической версии
  // Вместо этого будем использовать localStorage для хранения данных
  trailingSlash: true, // Нужно для GitHub Pages
};

export default nextConfig;
