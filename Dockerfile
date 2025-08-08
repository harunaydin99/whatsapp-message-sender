# Node 20, Debian bookworm tabanlı
FROM node:20-bookworm

# Chromium ve gerekli kütüphaneler
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Bazı paketler chromium ikili dosyasını /usr/bin/chromium olarak kurar.
# Kodunda chromium-browser beklenirse sorun olmasın diye symlink ekliyoruz:
RUN ln -sf /usr/bin/chromium /usr/bin/chromium-browser || true

WORKDIR /app

# Bağımlılıkları cache’ten faydalanarak kur
COPY package*.json ./
RUN npm ci --omit=dev || npm install --omit=dev

# Uygulama kodunu kopyala
COPY . .

# Chrome path ve prod env
ENV CHROME_PATH=/usr/bin/chromium
ENV NODE_ENV=production

# Uygulaman varsayılan olarak 3000 dinleyecek (Coolify PORT’u override edebilir)
EXPOSE 3000

# Uygulamayı başlat
CMD ["node", "index.js"]