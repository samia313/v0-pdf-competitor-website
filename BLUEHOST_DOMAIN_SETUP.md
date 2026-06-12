# BLUEHOST PE PDFILIO.COM SETUP KAISE KAREN

## STEP 1: BLUEHOST MEIN LOGIN KARO

1. **https://www.bluehost.com/** par jaao
2. Top-right mein **"Login"** click karo
3. Apna email aur password enter karo
4. **"My Hosting"** dashboard mein jaao

---

## STEP 2: DNS SETTINGS ACCESS KARO

### Method A: Bluehost Dashboard Se
1. Dashboard mein **"Domains"** section dhundo
2. **"pdfilio.com"** select karo
3. **"Manage DNS"** ya **"DNS Settings"** click karo
4. Ya **"Advanced DNS"** dhundo

### Method B: Direct Access
1. **https://my.bluehost.com/hosting/dashboard** par jaao
2. Left sidebar mein **"Domains"** dhundo
3. **"pdfilio.com"** ke aage **"Manage"** click karo
4. **"Zone File"** ya **"DNS"** tab mein jaao

---

## STEP 3: NAMESERVERS CHANGE KARO (RECOMMENDED - EASIEST)

Bluehost se Vercel ke nameservers use karo:

### Bluehost Mein Nameservers Change Karne Ke Steps:

1. **"Nameservers"** section mein jaao
2. **"Edit Nameservers"** click karo
3. Ye tino nameservers clear karo aur replace karo:

   **Remove (Bluehost Default):**
   ```
   ns1.bluehost.com
   ns2.bluehost.com
   ns3.bluehost.com
   ```

   **Add (Vercel Nameservers):**
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ns3.vercel-dns.com
   ```

4. **"Save Changes"** click karo
5. **24-48 hours wait karo** (DNS propagation)

---

## STEP 4: VERCEL MEIN DOMAIN ADD KARO

### Vercel Dashboard Mein:

1. **https://vercel.com/dashboard** par jaao
2. Apna **"pdfilio"** project select karo
3. **"Settings"** tab mein jaao
4. Left sidebar mein **"Domains"** click karo
5. **"Add Domain"** button click karo
6. **"pdfilio.com"** type karo
7. **"Add"** click karo

Vercel automatically nameservers add kar dega!

---

## STEP 5: DNS RECORDS MANUALLY ADD KARNA (AGAR NAMESERVERS CHANGE NAHI KAR SAKTE)

Agar aap Bluehost ke nameservers change nahi karna chahte to A Record add karo:

### Bluehost Mein A Record Add Karo:

1. **"Zone File"** ya **"Advanced DNS"** mein jaao
2. **"Add Record"** click karo
3. Choose: **"A Record"**
4. Fill karo:
   - **Host:** `@` (ya blank rakh do)
   - **Points to:** `76.76.19.165` (Vercel ka IP)
   - **TTL:** `3600` (leave default)
5. **"Add Record"** click karo

### CNAME Record Add Karo (WWW Ke Liye):

1. **"Add Record"** again click karo
2. Choose: **"CNAME Record"**
3. Fill karo:
   - **Host:** `www`
   - **Points to:** `cname.vercel-dns.com`
   - **TTL:** `3600`
4. **"Add Record"** click karo

---

## STEP 6: PROPAGATION WAIT KARO

```
24-48 hours:
- DNS servers update honge
- Domain point karega Vercel ke servers par
- Website live ho jayega
```

**Check Karne Ke Liye:**
```bash
# Terminal mein:
nslookup pdfilio.com

# Ya online tool:
# https://www.whatsmydns.net/
# pdfilio.com enter karo
```

---

## STEP 7: SSL CERTIFICATE (AUTOMATIC)

Vercel automatically HTTPS enable karega:
- Green lock icon show hoga
- 1-2 days lag sakte hain
- Manual action nahi chahiye

---

## STEP 8: WWW REDIRECT SETUP (OPTIONAL)

### Bluehost Mein WWW Redirect:

1. **"Redirect"** section mein jaao
2. **"New Redirect"** click karo
3. From: `www.pdfilio.com`
4. To: `pdfilio.com`
5. **"Save"** click karo

Ya Vercel mein automatically handle hoga.

---

## STEP 9: EMAIL SETUP (OPTIONAL)

### Bluehost Par Email Create Karo:

1. Bluehost dashboard mein **"Email"** section jaao
2. **"Create Email Account"** click karo
3. Details fill karo:
   - Email: `info@pdfilio.com`
   - Password: strong password set karo
4. **"Create"** click karo

### Gmail Se Email Bhejne Ke Liye:

1. Gmail mein jaao
2. **Settings** → **Accounts and Import**
3. **"Send mail as"** section mein jaao
4. **"Add another email"** click karo
5. Email: `info@pdfilio.com`
6. SMTP Settings add karo:
   - Server: `mail.bluehost.com`
   - Port: `587` (TLS) ya `465` (SSL)
   - Username: `info@pdfilio.com`
   - Password: [jo tune banaya tha]

---

## COMPLETE CHECKLIST

- [ ] Bluehost mein login kiya
- [ ] Nameservers change kiye (ya A/CNAME Records add kiye)
- [ ] Vercel mein domain add kiya
- [ ] 24-48 hours wait kiya
- [ ] Browser mein `pdfilio.com` check kiya
- [ ] Green lock icon (HTTPS) verify kiya
- [ ] Admin panel `pdfilio.com/admin` check kiya
- [ ] All tools working hain verify kiye
- [ ] Email setup kiya (optional)

---

## BLUEHOST-SPECIFIC ISSUES & SOLUTIONS

### Issue 1: Domain Still 404 De Raha Hai

**Solutions:**
1. DNS propagation wait karo (24-48 hours)
2. Browser cache clear karo:
   ```
   Ctrl+Shift+Delete (Chrome)
   Cmd+Shift+Delete (Mac)
   ```
3. Incognito window mein check karo
4. Different device se check karo

### Issue 2: Nameservers Change Nahi Ho Raha

**Solution:**
- Bluehost support se contact karo
- Ya A/CNAME Records manually add karo

### Issue 3: SSL Certificate Issue

**Solution:**
1. Vercel dashboard mein jaao
2. **"Settings"** → **"Domains"**
3. Domain ke aage "Renew Certificate" click karo
4. 1-2 hours wait karo

### Issue 4: Email Nahi Chal Raha

**Solution:**
1. Bluehost par email account properly create kiya hai verify karo
2. MX Records check karo:
   ```
   Priority: 10
   Value: aspmx.l.google.com
   (ya Bluehost's mail server)
   ```

---

## QUICK REFERENCE: DNS RECORDS

### Bluehost Mein Add Karne Ke Records:

**A Record (Root Domain):**
- Host: `@`
- Type: `A`
- Value: `76.76.19.165`
- TTL: `3600`

**CNAME Record (WWW):**
- Host: `www`
- Type: `CNAME`
- Value: `cname.vercel-dns.com`
- TTL: `3600`

**MX Records (Email):**
- Host: `@`
- Type: `MX`
- Value: `mail.bluehost.com` (priority 10)
- TTL: `3600`

---

## FINAL STEPS

1. **GitHub par code push karo:**
   ```bash
   git add .
   git commit -m "PDFilio ready for production"
   git push origin main
   ```

2. **Vercel par deploy karo** (auto-deploy setup karo)

3. **Domain Bluehost mein point karo** (step 3)

4. **Vercel mein domain add karo** (step 4)

5. **24-48 hours wait karo**

6. **pdfilio.com open karo browser mein** ✅

---

## SUPPORT CONTACTS

- **Bluehost Support:** https://www.bluehost.com/help
- **Vercel Support:** https://vercel.com/support
- **Nameserver Issues:** Bluehost support team
- **SSL Issues:** Vercel dashboard par report karo

---

## SUCCESS INDICATORS

✅ Browser mein `pdfilio.com` fully load ho raha hai
✅ Green lock icon (HTTPS) show ho raha hai
✅ `/admin` page accessible hai
✅ All tools working hain
✅ Ads show ho rahe hain (AdSense ke liye ready)
✅ Analytics tracked ho raha hai

---

**Website successfully live ho jayega! Badhaai!**
