/*const { Client, LocalAuth } = require('whatsapp-web.js');
const { MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');



// WhatsApp istemcisini başlat
const client = new Client({
    authStrategy: new LocalAuth()
});

// QR kodu terminalde göster
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('QR Kodunu tarayın.');
});

// WhatsApp Web'e başarılı şekilde bağlanıldığında
client.on('ready', () => {
    console.log('WhatsApp Web bağlantısı kuruldu.');

    // Mesaj göndermek istediğiniz numarayı buraya girin
    const number = '905512582698'; // Numara formatı: +90 123 456 7890 -> 901234567890
	const chatId = number + "@c.us";


    // Mesaj gönderme işlemi
   // const chatId = number.substring(1) + "@c.us"; // Numarayı uygun formata çevir

    const message = "Merhaba, bu bir test mesajıdır!";

    client.sendMessage(chatId, message).then(response => {
        console.log(`Mesaj başarıyla gönderildi: ${response.id.id}`);
    }).catch(err => {
        console.error('Mesaj gönderilemedi:', err);
    });
});
client.on('message_create', message => {
	if (message.body === 'ping') {
		// reply back "pong" directly to the message
		message.reply('pong');
	}
});
client.on('message', async (msg) => {
    if (msg.body === 'media') {
        const media = MessageMedia.fromFilePath('harun.png');
        await client.sendMessage(msg.from, media);
        console.log('media gönderimi başarılı')
    }
    else{
        console.log('media gönderimi başarısız')
    }
});


// İstemciyi başlat
client.initialize();*/
///////////////////////////

const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const bodyParser = require('body-parser');



const app = express();
app.use(bodyParser.json()); // JSON gövdesi kullanmak için body-parser'ı ekliyoruz

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Tüm domainlere izin vermek için
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// WhatsApp istemcisini başlat
const client = new Client({
    authStrategy: new LocalAuth()
});

// QR kodu terminalde göster
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('QR Kodunu tarayın.');
});

// WhatsApp Web'e başarılı şekilde bağlanıldığında
client.on('ready', () => {
    console.log('WhatsApp Web bağlantısı kuruldu.');
});

// POST isteği ile mesaj gönderme
app.post('/send-message', (req, res) => {
    const number = req.body.number; // İstek gövdesinden telefon numarasını alıyoruzz
    const message = req.body.message; // İstek gövdesinden mesajı alıyoruz

    const chatId = number + '@c.us'; // Chat ID'yi oluşturuyoruz

    client.sendMessage(chatId, message).then(response => {
        console.log(`Mesaj başarıyla gönderildi: ${response.id.id}`);
        res.status(200).send('Mesaj başarıyla gönderildi.>');
    }).catch(err => {
        console.error('Mesaj gönderilemedi:', err);
        res.status(500).send('Mesaj gönderilemedi');
    });
});

// Sunucuyu başlat
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Sunucu çalışıyor; port: ${PORT}`);
});

// WhatsApp istemcisini başlat
client.initialize();