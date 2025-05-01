# 📧 Email Configuration Guide

Questa guida descrive come configurare correttamente l'invio di email tramite Gmail e Aruba utilizzando **Nodemailer**.

---

## 🌐 Provider Supportati

- ✅ Gmail
- ✅ Aruba (SMTP personalizzato)

---

## 📁 Variabili richieste nel file `.env`

```env
# Comuni
EMAIL_PROVIDER=gmail | aruba
EMAIL_SENDER=youremail@provider.com
EMAIL_SENDER_PASSWORD=your-password-or-app-password
SERVER_URI=http://localhost:3000

# Solo per Aruba
EMAIL_HOST=smtp.your-aruba-host.it
EMAIL_PORT=465
EMAIL_SECURE=true
```

> ⚠️ `EMAIL_SENDER` deve corrispondere a un indirizzo autorizzato dal provider (es. `@gmail.com` per Gmail, `@tuodominio.it` per Aruba).

---

## ✉️ Configurazione Gmail

### 🛠️ Requisiti:

1. Account Gmail con **verifica in due passaggi attiva**.
2. Creazione di una **Password per app** (non usare la password standard).

### 🔐 Come generare una Password per App

1. Vai su: [https://myaccount.google.com](https://myaccount.google.com)
2. Vai in `Sicurezza` → **Verifica in due passaggi** e attivala.
3. Dopo l’attivazione, apri `Password per le app`.
4. Seleziona:
   - **App**: Posta
   - **Dispositivo**: Altro → scrivi “Nodemailer”
5. Genera la password (es. `abcd efgh ijkl mnop`)
6. Inseriscila nel file `.env` come `EMAIL_SENDER_PASSWORD`

### ✅ Esempio `.env` Gmail

```env
EMAIL_PROVIDER=gmail
EMAIL_SENDER=yourgmail@gmail.com
EMAIL_SENDER_PASSWORD=abcd efgh ijkl mnop
SERVER_URI=http://localhost:3000
```

---

## 📡 Configurazione Aruba

### 🛠️ Requisiti:

- Account Aruba con servizio SMTP attivo.

### ✅ Esempio `.env` Aruba

```env
EMAIL_PROVIDER=aruba
EMAIL_SENDER=info@tuodominio.it
EMAIL_SENDER_PASSWORD=tuapassword
EMAIL_HOST=smtp.aruba.it
EMAIL_PORT=465
EMAIL_SECURE=true
SERVER_URI=http://localhost:3000
```

> 🔒 Aruba accetta connessioni SMTP sicure (`secure: true`) sulla porta 465 (SSL).

---

## 🚨 Errori Comuni

| Codice      | Messaggio               | Causa                                                   |
| ----------- | ----------------------- | ------------------------------------------------------- |
| 550         | Mittente non consentito | Il campo `from` non coincide con `EMAIL_SENDER`         |
| 535         | Authentication rejected | Password errata o mancante `Password per app` con Gmail |
| ECONNECTION | Connection refused      | Host/porta sbagliata o SMTP Aruba disabilitato          |

---

## 🧪 Esempio di invio email

```ts
await emailService.sendConfirmationEmail(
  "utente@esempio.it",
  "user123",
  "codeABC123"
);
```

---

## ✅ Note Finali

- Usa sempre `EMAIL_SENDER` come mittente (`from`) nelle email inviate.
- Gmail richiede una **password per app**, mai la password standard.
- Aruba può rifiutare connessioni se le impostazioni SMTP sono errate o incomplete.

---
