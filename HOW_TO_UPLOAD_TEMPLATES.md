# How to Upload Your PDF Templates - Step by Step

## 🎯 Where Do Your PDFs Go?

**Simple Answer:** All 6 PDF files go in the **`public/templates/`** folder

**Location:**
```
/Users/rozsagyene/estate-planning-app/public/templates/
```

---

## 📂 Folder Structure (What It Should Look Like)

```
estate-planning-app/
└── public/
    └── templates/
        ├── single_living_trust_template.pdf          ← YOUR PDF #1
        ├── joint_living_trust_template.pdf           ← YOUR PDF #2
        ├── single_irrevocable_trust_template.pdf     ← YOUR PDF #3
        ├── joint_irrevocable_trust_template.pdf      ← YOUR PDF #4
        ├── single_estate_planning_template.pdf       ← YOUR PDF #5
        ├── joint_estate_planning_template.pdf        ← YOUR PDF #6
        ├── README.md                                  ← Already there
        └── TEMPLATE_FILENAMES.md                      ← Already there
```

---

## 📝 The 6 Files You Need to Create

Create these 6 PDF files (with form fields) and place them in `public/templates/`:

### 1️⃣ single_living_trust_template.pdf
- For single person, revocable living trust
- Just the trust document

### 2️⃣ joint_living_trust_template.pdf
- For married couple, revocable living trust
- Just the trust document

### 3️⃣ single_irrevocable_trust_template.pdf
- For single person, irrevocable trust
- Just the trust document

### 4️⃣ joint_irrevocable_trust_template.pdf
- For married couple, irrevocable trust
- Just the trust document

### 5️⃣ single_estate_planning_template.pdf
- For single person
- Complete package (trust + POA + healthcare + all other documents)

### 6️⃣ joint_estate_planning_template.pdf
- For married couple
- Complete package (trust + POA + healthcare + all other documents)

---

## 🖥️ How to Upload - Option 1: Locally

### Step 1: Find the Folder
```bash
cd /Users/rozsagyene/estate-planning-app/public/templates/
```

### Step 2: Copy Your PDFs There
Drag and drop your 6 PDF files into that folder

### Step 3: Verify
```bash
ls -la
```

You should see:
```
single_living_trust_template.pdf
joint_living_trust_template.pdf
single_irrevocable_trust_template.pdf
joint_irrevocable_trust_template.pdf
single_estate_planning_template.pdf
joint_estate_planning_template.pdf
```

### Step 4: Commit to Git
```bash
git add public/templates/*.pdf
git commit -m "Add PDF templates"
git push
```

---

## 🌐 How to Upload - Option 2: Via GitHub Website

### Step 1: Go to Templates Folder on GitHub
https://github.com/rozsagyenelaw/estate-planning-app/tree/main/public/templates

### Step 2: Click "Add file" → "Upload files"

### Step 3: Drag Your 6 PDFs

Drag and drop all 6 PDF files at once

### Step 4: Commit
- Add commit message: "Add PDF templates"
- Click "Commit changes"

---

## ✅ Checklist Before Uploading

Before you upload, make sure:

- [ ] You created 6 PDF files
- [ ] Each PDF has form fields (using Adobe Acrobat or PDFescape)
- [ ] Form fields are named correctly (see TEMPLATE_FIELD_NAMES.md)
- [ ] Filenames match exactly:
  - [ ] single_living_trust_template.pdf
  - [ ] joint_living_trust_template.pdf
  - [ ] single_irrevocable_trust_template.pdf
  - [ ] joint_irrevocable_trust_template.pdf
  - [ ] single_estate_planning_template.pdf
  - [ ] joint_estate_planning_template.pdf
- [ ] All 6 PDFs are in `public/templates/` folder

---

## 🔍 Example: What Your Computer Should Look Like

Open Finder and navigate to:
```
/Users/rozsagyene/estate-planning-app/public/templates/
```

You should see your 6 PDF files there, like this:

```
📁 templates
   📄 single_living_trust_template.pdf          (Your file)
   📄 joint_living_trust_template.pdf           (Your file)
   📄 single_irrevocable_trust_template.pdf     (Your file)
   📄 joint_irrevocable_trust_template.pdf      (Your file)
   📄 single_estate_planning_template.pdf       (Your file)
   📄 joint_estate_planning_template.pdf        (Your file)
   📄 README.md                                  (Already there)
   📄 TEMPLATE_FILENAMES.md                      (Already there)
   📄 .gitkeep                                   (Already there)
```

---

## 🚫 Common Mistakes

❌ **DON'T** create separate folders for each template
❌ **DON'T** put them in `src/templates/` (that's for JavaScript)
❌ **DON'T** rename the files - use exact names above
❌ **DON'T** forget the `.pdf` extension

✅ **DO** put all 6 PDFs directly in `public/templates/`
✅ **DO** use the exact filenames listed above
✅ **DO** make sure they have form fields

---

## 📱 After You Upload

Once you've uploaded all 6 PDFs:

1. **Tell me:** "Templates are uploaded!"
2. **I will:** Update the document generator code
3. **You will:** Test the app
4. **We're done!** 🎉

---

## 🆘 Need Help?

**Q: Where is the public/templates folder?**
A: `/Users/rozsagyene/estate-planning-app/public/templates/`

**Q: Do I need to create folders for each template?**
A: No! All 6 PDFs go in the same folder (`public/templates/`)

**Q: What if I only have some templates ready?**
A: Upload what you have. The app will use them for those types and fall back to the old method for others.

**Q: Can I test one template first?**
A: Yes! Upload 1 PDF (e.g., `single_living_trust_template.pdf`) and we'll integrate it to test.

**Q: What if my filenames are different?**
A: They must match exactly. Rename your PDFs to match the names above.

---

## 🎯 Quick Command Reference

```bash
# Navigate to templates folder
cd /Users/rozsagyene/estate-planning-app/public/templates/

# List files
ls -la

# Add templates to git
git add *.pdf

# Commit
git commit -m "Add PDF templates"

# Push to GitHub
git push origin main
```

---

**Just put your 6 PDFs in the `public/templates/` folder - that's it!**

No separate folders needed. Just 6 files in one folder. Simple! 📁
