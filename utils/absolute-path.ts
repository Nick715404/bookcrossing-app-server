import * as path from 'path';

// Для уровня server
export const serverDir = path.resolve(__dirname, '..', '..');

// Путь к папке uploads относительно корня сервера
// export const uploadsDir = path.join(serverDir, 'uploads', 'images');

export const uploadsDir = path.join(__dirname, '..', '..', 'uploads', 'images');