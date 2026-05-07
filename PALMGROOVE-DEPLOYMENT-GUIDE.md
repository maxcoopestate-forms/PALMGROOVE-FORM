# 🌴 PALMGROOVE AGRIC ESTATE - SUBSCRIPTION FORM
## Complete Deployment Guide

---

## 📁 FILES INCLUDED

You have **4 files** for Palmgroove:

1. **palmgroove-form.html** - Form structure
2. **palmgroove-form.css** - Purple/Maroon styling
3. **palmgroove-form.js** - Form logic
4. **palmgroove-pdf-generator.js** - PDF generation with property info

---

## ✨ NEW FEATURES ADDED

Compared to the original Coop City form, Palmgroove now has:

### ✅ **5 New Fields:**
1. **Office Address** - For subscribers with different work addresses
2. **Next of Kin Relationship** - Select from dropdown (Spouse, Father, Mother, etc.)
3. **One-Off Payment Option** - Pay in full (alongside 3/6 months)
4. **Final Property Confirmation** - Checkbox confirming they've seen the property
5. **Down Payment Note** - Shows "30% down payment required"

### ✅ **Property Information Page:**
Complete page 2 in PDF with:
- Bank details (MAX CONSTRUCTION HOUSING COOP / 5402057281 / Providus Bank)
- Location details
- Ownership information
- Title information
- Additional costs breakdown
- Documents provided
- Crop cultivation and returns (50% annually!)
- Resell terms and refund policy (40% charges)

### ✅ **3 Office Addresses:**
- Onitsha Office
- Awka Office  
- Nnewi Office

All displayed in PDF and in footer!

---

## 🎨 DESIGN THEME

**Palmgroove Purple/Maroon Branding:**
- Primary Purple: #6b2c6b
- Primary Maroon: #8b2252
- Accent Gold: #d4af37
- Palm Green: #4a7c4e
- Background: Light purple gradient

**Visual Elements:**
- Purple-to-maroon gradients
- Gold accents and borders
- Palm tree theme (when you add background image)
- Professional estate branding

---

## 🚀 DEPLOYMENT STEPS

### **Step 1: Upload to GitHub**

```bash
# Navigate to your repository
cd your-repo-name

# Add all Palmgroove files
git add palmgroove-form.html
git add palmgroove-form.css
git add palmgroove-form.js
git add palmgroove-pdf-generator.js

# Commit
git commit -m "Add Palmgroove Agric Estate subscription form"

# Push to GitHub
git push origin main
```

### **Step 2: Enable GitHub Pages**

1. Go to your repo on GitHub.com
2. Click **Settings** → **Pages**
3. Under "Source", select **main** branch
4. Click **Save**
5. Wait 2-3 minutes

### **Step 3: Get Your URL**

Your form will be live at:
```
https://yourusername.github.io/yourrepo/palmgroove-form.html
```

**Example:**
```
https://olystar.github.io/maxcoop-forms/palmgroove-form.html
```

---

## 📂 RECOMMENDED FOLDER STRUCTURE

```
your-repo/
├── palmgroove-form.html
├── palmgroove-form.css
├── palmgroove-form.js
├── palmgroove-pdf-generator.js
├── maxcoop-logo.png              (optional - add your logos)
├── m-logo.png                     (optional)
├── palmgroove-logo.png           (optional)
├── palmgroove-bg.jpg             (optional - palm tree background)
├── maxcoop-form.html             (keep for Coop City later)
├── maxcoop-form.css
├── maxcoop-form.js
└── pdf-generator.js
```

---

## 🖼️ OPTIONAL: ADD IMAGES

The form references these images (currently placeholders):

1. **maxcoop-logo.png** - MAXCOOP logo
2. **m-logo.png** - M logo
3. **palmgroove-logo.png** - Main Palmgroove logo
4. **palmgroove-bg.jpg** - Palm tree background for hero section

**How to add:**
1. Save your images with these exact names
2. Upload to same folder as HTML
3. Images will automatically appear!

**Without images:** Form still works perfectly! Text will show instead.

---

## 🎯 HOW IT WORKS

### **User Experience:**

1. User opens form URL
2. Fills personal information (with new office address field)
3. Uploads passport photo
4. Selects ID type → Upload section appears
5. Uploads ID document
6. Fills next of kin (now with relationship dropdown!)
7. Optional: Adds referral details
8. Checks declaration agreement
9. Selects number of plots (464 SQM)
10. Chooses plot type (Regular or Corner +20%)
11. Selects payment plan (3 months / 6 months / **ONE-OFF**)
12. Checks property confirmation
13. Clicks "GENERATE PDF & SEND"
14. **Beautiful 2-page PDF generates:**
    - Page 1: All subscriber info + photos
    - Page 2: Complete property info + terms
15. Gmail opens (mobile share or desktop compose)
16. User adds maxcoopforms@gmail.com
17. Sends!

---

## 📄 PDF OUTPUT

### **Page 1: Subscription Form**
- Purple/maroon header with Palmgroove branding
- Passport photo in corner
- All personal information
- ID documents (full-size images)
- Next of kin (with relationship)
- Referral details
- Declaration
- Purchase details
- Property confirmation

### **Page 2: Property Information**
- Bank details prominently displayed
- Location: Atani, Ozubulu-Atani road
- Ownership: FARM COUNTRY INT. / MAXCOOP
- Title information
- Additional costs breakdown
- Documents provided
- Crop information (Rice + Palm trees, 50% returns!)
- Resell and refund policy
- 3 office addresses

**Professional, complete, ready to submit!**

---

## 🎨 CUSTOMIZATION

### **To Change PDF Colors:**

Edit **palmgroove-pdf-generator.js** (around line 10):

```javascript
const colors = {
    primaryPurple: [107, 44, 107],     // Change these RGB values
    primaryMaroon: [139, 34, 82],      // 0-255 for each color
    accentGold: [212, 175, 55],
    // etc...
};
```

### **To Change Form Colors:**

Edit **palmgroove-form.css** (line 8-20):

```css
:root {
    --primary-purple: #6b2c6b;
    --primary-maroon: #8b2252;
    --accent-gold: #d4af37;
    /* Change these hex values */
}
```

### **To Add/Edit Property Info:**

Edit **palmgroove-pdf-generator.js** (around line 285):

Find the `propertyInfo` array and edit the text!

---

## ✅ TESTING CHECKLIST

Before going live, test:

- [ ] Form loads without errors
- [ ] Purple/maroon branding displays correctly
- [ ] Passport photo upload works
- [ ] Office address field saves
- [ ] ID type selection shows upload section
- [ ] ID documents upload and preview
- [ ] Next of kin relationship dropdown works
- [ ] One-off payment option available
- [ ] Property confirmation checkbox works
- [ ] PDF generates successfully
- [ ] PDF has 2 pages
- [ ] Page 1 has all subscriber info
- [ ] Page 2 has all property info
- [ ] All 3 office addresses show
- [ ] Gmail opens with pre-filled content
- [ ] Mobile share menu works (on phone)

---

## 🐛 TROUBLESHOOTING

### **"generatePDF is not defined" Error**

**Fix:**
1. Make sure palmgroove-pdf-generator.js loads BEFORE palmgroove-form.js
2. Check HTML has correct script order (already set up correctly)
3. Clear browser cache
4. Hard refresh (Ctrl + Shift + R)

### **PDF Only Shows 1 Page**

**Cause:** Property info section not loading

**Fix:**
1. Check palmgroove-pdf-generator.js uploaded correctly
2. Look at browser console (F12) for errors
3. Make sure jsPDF library loaded

### **Images Not Showing**

**Cause:** Image files not uploaded or wrong names

**Fix:**
1. Upload images with exact names: `palmgroove-logo.png`, etc.
2. Check images are in same folder as HTML
3. Form works fine without images! Text shows instead

### **Form Not Updating on GitHub Pages**

**Fix:**
1. Wait 5-10 minutes (GitHub Pages can be slow)
2. Clear browser cache completely
3. Try incognito/private window
4. Verify commit pushed: `git log`

---

## 💰 COST: $0 FOREVER!

- GitHub Pages hosting: **FREE**
- PDF generation: **FREE**
- Gmail integration: **FREE**
- Unlimited forms: **FREE**
- No monthly fees: **FREE**

**Total cost: ₦0 / $0 / €0**

---

## 📊 WHAT'S DIFFERENT FROM COOP CITY?

| Feature | Coop City | Palmgroove | Status |
|---------|-----------|------------|--------|
| Office Address | ❌ No | ✅ Yes | NEW! |
| Next of Kin Relationship | ❌ No | ✅ Yes | NEW! |
| One-Off Payment | ❌ No | ✅ Yes | NEW! |
| Property Confirmation | ❌ No | ✅ Yes | NEW! |
| Property Info Page | ❌ No | ✅ Yes | NEW! |
| Down Payment Note | ❌ No | ✅ Yes (30%) | NEW! |
| Branding | Blue/Gold | Purple/Maroon | Different |
| Location | Coop City | Atani | Different |

**Palmgroove has 6 major upgrades!**

---

## 🔥 QUICK DEPLOY

**One-command deployment:**

```bash
git add palmgroove-form.html palmgroove-form.css palmgroove-form.js palmgroove-pdf-generator.js && git commit -m "Deploy Palmgroove form" && git push
```

Then wait 3 minutes and test!

---

## 🎉 YOU'RE READY!

Your Palmgroove form is **complete** and **ready to deploy**!

**What you have:**
✅ Professional purple/maroon branding
✅ All 5 new fields added
✅ Complete 2-page PDF with property info
✅ All office addresses included
✅ Mobile-responsive design
✅ Email integration working
✅ $0 hosting cost

**Upload to GitHub and go live!** 🚀

---

## 📞 SUPPORT

If you need help:
1. Check browser console (F12) for errors
2. Review this guide
3. Test on different browsers
4. Clear cache and retry

---

## 🌴 PALMGROOVE AGRIC ESTATE

**Location:** Atani, Anambra State
**Plot Size:** 464 SQM
**Crops:** Rice + Palm Trees
**Returns:** Up to 50% annually!

**Let's get those subscriptions flowing!** 💜💰
