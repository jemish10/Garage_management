# 🚗 AutoCare Pro — Garage Management System
## ✅ How to Run in Cursor (Step-by-Step Guide)

---

## 📋 PREREQUISITES — Install These First

Before opening Cursor, make sure these are installed on your computer:

| Tool | Download Link | Why You Need It |
|------|---------------|-----------------|
| **Node.js v18+** | https://nodejs.org | Runs the dev server & builds the app |
| **npm** | Comes with Node.js | Installs packages |
| **Cursor Editor** | https://cursor.sh | Your code editor |
| **Git** (optional) | https://git-scm.com | To clone the project |

To verify installations, open your terminal and run:
```bash
node -v     # Should show v18.x.x or higher
npm -v      # Should show 9.x.x or higher
```

---

## 🚀 STEP-BY-STEP: Running in Cursor

### STEP 1 — Open the Project in Cursor

**Option A — If you downloaded a ZIP:**
1. Extract the ZIP file to a folder (e.g., `C:\Projects\autocare-pro`)
2. Open **Cursor**
3. Click `File → Open Folder`
4. Select the extracted project folder

**Option B — If you have Git:**
```bash
git clone <your-repo-url> autocare-pro
cd autocare-pro
```
Then open the `autocare-pro` folder in Cursor.

---

### STEP 2 — Open the Integrated Terminal in Cursor

Inside Cursor, press:
- **Windows/Linux:** `Ctrl + `` ` `` ` (backtick)
- **Mac:** `Cmd + `` ` `` `

Or go to **View → Terminal** from the top menu.

---

### STEP 3 — Install Dependencies

In the terminal, type:
```bash
npm install
```

⏳ Wait for it to finish. You'll see a `node_modules` folder appear in your project.

---

### STEP 4 — Start the Development Server

```bash
npm run dev
```

You'll see output like:
```
  VITE v5.x.x  ready in 300ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

---

### STEP 5 — Open in Browser

Click the link **http://localhost:5173/** in the terminal  
(or `Ctrl+Click` on it to auto-open)

**🎉 Your Garage Website is now running!**

---

## 🔐 Admin Login Credentials

| Field | Value |
|-------|-------|
| **Username** | `admin` |
| **Password** | `admin123` |

---

## 📁 Project File Structure

```
autocare-pro/
│
├── index.html                    ← Main HTML entry point
├── package.json                  ← Project config & dependencies
├── vite.config.ts                ← Vite build configuration
├── tsconfig.json                 ← TypeScript configuration
│
├── src/
│   ├── main.tsx                  ← React app entry point
│   ├── App.tsx                   ← Main app component (routing)
│   ├── index.css                 ← Global styles (Tailwind)
│   ├── types.ts                  ← TypeScript interfaces
│   ├── store.ts                  ← LocalStorage data management
│   │
│   ├── components/
│   │   └── Navbar.tsx            ← Navigation bar
│   │
│   └── pages/
│       ├── HomePage.tsx          ← Public home/landing page
│       ├── LoginPage.tsx         ← Admin login page
│       ├── DashboardPage.tsx     ← Admin dashboard with stats
│       ├── AddServicePage.tsx    ← Add customer + vehicle service
│       ├── RecordsPage.tsx       ← View/search service records
│       ├── BillingPage.tsx       ← Create & manage bills
│       ├── BillingDetailPage.tsx ← Bill preview & print
│       └── SetupGuidePage.tsx    ← This setup guide (in-app)
│
├── CURSOR_SETUP_GUIDE.md         ← This file
└── README.md                     ← Project overview
```

---

## 🛠️ Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install all dependencies |
| `npm run dev` | Start dev server at localhost:5173 |
| `npm run build` | Build for production (creates `/dist`) |
| `npm run preview` | Preview the production build locally |

---

## 📱 Pages & Features

| Page | URL/Route | Description |
|------|-----------|-------------|
| **Home** | `/` | Garage landing page with services |
| **Login** | Admin only | Username: admin / Password: admin123 |
| **Dashboard** | Admin only | Stats: customers, today's jobs, pending |
| **Add Service** | Admin only | Register customer + vehicle + service |
| **Records** | Admin only | Search, filter, update service status |
| **Billing** | Admin only | Create bills, auto-calculate totals |
| **Bill Detail** | Admin only | Print-ready bill preview |

---

## 💾 How Data is Stored

This app uses **localStorage** (browser storage) to save all data:
- No database setup required
- No server backend needed
- Data persists even after closing the browser
- Data is stored per-browser on your computer

**Data Keys in localStorage:**
```
garage_customers  → All customer records
garage_vehicles   → All vehicle & service records
garage_billings   → All billing records
```

To **reset all data**, open browser DevTools → Application → Local Storage → Clear

---

## 🔧 Troubleshooting

### ❌ "npm is not recognized"
→ Node.js is not installed. Download from https://nodejs.org

### ❌ "Port 5173 already in use"
→ Run: `npm run dev -- --port 3000` to use a different port

### ❌ "Cannot find module" errors
→ Run: `npm install` again

### ❌ Page is blank / white screen
→ Open browser DevTools (F12) → Console tab → Check for red errors

### ❌ "node_modules not found"
→ Make sure you ran `npm install` in the correct project folder

### ❌ Build fails
→ Run: `npm run build` and check the error message in the terminal

---

## 🏗️ Building for Production (Deployment)

```bash
npm run build
```

This creates a `/dist` folder with optimized static files.  
You can host it on:
- **Vercel** → `vercel deploy`
- **Netlify** → Drag & drop the `/dist` folder
- **GitHub Pages** → Push `/dist` to gh-pages branch
- **Any static host** → Upload the `/dist` folder

---

## 🌐 Converting to PHP + MySQL (Backend)

This React app **simulates** a PHP+MySQL garage system.  
To convert to a real PHP+MySQL backend:

1. **Set up XAMPP** (https://apachefriends.org)
2. **Start Apache + MySQL** in XAMPP Control Panel
3. **Create the database** in phpMyAdmin:

```sql
CREATE DATABASE garage_db;
USE garage_db;

CREATE TABLE customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  mobile VARCHAR(15),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vehicles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  vehicle_number VARCHAR(20),
  vehicle_model VARCHAR(50),
  service_type VARCHAR(50),
  service_status VARCHAR(20) DEFAULT 'Pending',
  service_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE billing (
  id INT AUTO_INCREMENT PRIMARY KEY,
  vehicle_id INT,
  service_charge DECIMAL(10,2),
  parts_charge DECIMAL(10,2),
  total_amount DECIMAL(10,2),
  bill_date DATE,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);

CREATE TABLE admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin
INSERT INTO admin_users (username, password) VALUES ('admin', MD5('admin123'));
```

4. **Place PHP files** in `C:\xampp\htdocs\garage\`
5. **Visit** http://localhost/garage/

---

## 📞 Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 + TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Icons** | Lucide React |
| **Charts** | Recharts |
| **Build Tool** | Vite 7 |
| **Data Storage** | Browser localStorage |
| **Package Manager** | npm |

---

## ✅ Quick Start Checklist

- [ ] Node.js installed (`node -v`)
- [ ] Project folder opened in Cursor
- [ ] Terminal opened in Cursor (`Ctrl + `` ` ``)
- [ ] `npm install` completed successfully
- [ ] `npm run dev` started the server
- [ ] Opened `http://localhost:5173` in browser
- [ ] Logged in with `admin` / `admin123`
- [ ] Explored Dashboard, Add Service, Records, Billing pages

---

*AutoCare Pro — Garage Management System | Built with React + Vite + Tailwind CSS*
