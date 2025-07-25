require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rota de envio de e-mail
app.post('/send-email', async (req, res) => {
  console.log('Recebido:', req.body);

  const { name, email, subject, message, novidades } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Nome, e-mail e mensagem são obrigatórios.' });
  }

  const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


  const mailOptions = {
    from: process.env.EMAIL_USER,
    replyTo: email,
    to: 'InsideLibrasOficial@gmail.com',
    subject: `Contato via site: ${subject || 'Sem assunto'}`,
    text: `
      Nome: ${name}
      E-mail: ${email}
      Opt-in para novidades: ${novidades ? 'Sim' : 'Não'}

      Mensagem:
      ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'E-mail enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error.message);
    res.status(500).json({ success: false, error: 'Erro ao enviar o e-mail.' });
  }
});

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Rota não encontrada' });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
