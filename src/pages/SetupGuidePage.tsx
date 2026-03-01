import { useState } from 'react';
import { Page } from '../types';
import {
  Terminal, Package, Play, FolderOpen, Database,
  CheckCircle, AlertTriangle, ChevronDown, ChevronRight, Copy, Check,
  Wrench, Monitor, Code2, BookOpen, Rocket, HelpCircle, ArrowLeft
} from 'lucide-react';

interface SetupGuidePageProps {
  onNavigate: (page: Page) => void;
}

function CodeBlock({ code, language = 'bash' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-3">
      <div className="flex items-center justify-between bg-gray-900 border border-gray-700 rounded-t-lg px-4 py-2">
        <span className="text-xs text-gray-500 font-mono uppercase tracking-wider">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
        >
          {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="bg-gray-950 border border-gray-700 border-t-0 rounded-b-lg px-4 py-3 overflow-x-auto">
        <code className="text-sm text-green-400 font-mono whitespace-pre">{code}</code>
      </pre>
    </div>
  );
}

function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(number <= 3);

  return (
    <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-gray-700/30 transition-colors"
      >
        <div className="w-10 h-10 rounded-full bg-orange-500 text-white font-black text-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/30">
          {number}
        </div>
        <span className="text-white font-bold text-lg flex-1">{title}</span>
        {open ? <ChevronDown size={20} className="text-gray-400" /> : <ChevronRight size={20} className="text-gray-400" />}
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-gray-700/30 pt-4 space-y-3">
          {children}
        </div>
      )}
    </div>
  );
}

function InfoBox({ type, children }: { type: 'info' | 'warning' | 'success' | 'tip'; children: React.ReactNode }) {
  const styles = {
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
    warning: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300',
    success: 'bg-green-500/10 border-green-500/30 text-green-300',
    tip: 'bg-orange-500/10 border-orange-500/30 text-orange-300',
  };
  const icons = {
    info: <Monitor size={16} className="flex-shrink-0 mt-0.5" />,
    warning: <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />,
    success: <CheckCircle size={16} className="flex-shrink-0 mt-0.5" />,
    tip: <Wrench size={16} className="flex-shrink-0 mt-0.5" />,
  };

  return (
    <div className={`flex gap-3 border rounded-xl px-4 py-3 text-sm ${styles[type]}`}>
      {icons[type]}
      <div>{children}</div>
    </div>
  );
}

const fileStructure = [
  { name: 'autocare-pro/', indent: 0, type: 'folder', desc: 'Root project folder' },
  { name: 'index.html', indent: 1, type: 'file', desc: 'HTML entry point' },
  { name: 'package.json', indent: 1, type: 'file', desc: 'Dependencies & scripts' },
  { name: 'vite.config.ts', indent: 1, type: 'file', desc: 'Vite build config' },
  { name: 'tsconfig.json', indent: 1, type: 'file', desc: 'TypeScript config' },
  { name: 'src/', indent: 1, type: 'folder', desc: '' },
  { name: 'main.tsx', indent: 2, type: 'file', desc: 'React app entry' },
  { name: 'App.tsx', indent: 2, type: 'file', desc: 'Router & layout' },
  { name: 'index.css', indent: 2, type: 'file', desc: 'Tailwind CSS styles' },
  { name: 'types.ts', indent: 2, type: 'file', desc: 'TypeScript interfaces' },
  { name: 'store.ts', indent: 2, type: 'file', desc: 'localStorage data layer' },
  { name: 'components/', indent: 2, type: 'folder', desc: '' },
  { name: 'Navbar.tsx', indent: 3, type: 'file', desc: 'Navigation bar' },
  { name: 'pages/', indent: 2, type: 'folder', desc: '' },
  { name: 'HomePage.tsx', indent: 3, type: 'file', desc: 'Landing page' },
  { name: 'LoginPage.tsx', indent: 3, type: 'file', desc: 'Admin login' },
  { name: 'DashboardPage.tsx', indent: 3, type: 'file', desc: 'Stats dashboard' },
  { name: 'AddServicePage.tsx', indent: 3, type: 'file', desc: 'Add customer/service' },
  { name: 'RecordsPage.tsx', indent: 3, type: 'file', desc: 'View all records' },
  { name: 'BillingPage.tsx', indent: 3, type: 'file', desc: 'Generate bills' },
  { name: 'BillingDetailPage.tsx', indent: 3, type: 'file', desc: 'Print bill' },
  { name: 'SetupGuidePage.tsx', indent: 3, type: 'file', desc: '← You are here!' },
];

export default function SetupGuidePage({ onNavigate }: SetupGuidePageProps) {
  const [activeSection, setActiveSection] = useState('quickstart');

  const sections = [
    { id: 'quickstart', label: 'Quick Start', icon: <Rocket size={16} /> },
    { id: 'prerequisites', label: 'Prerequisites', icon: <Package size={16} /> },
    { id: 'steps', label: 'Step-by-Step', icon: <Terminal size={16} /> },
    { id: 'structure', label: 'File Structure', icon: <FolderOpen size={16} /> },
    { id: 'features', label: 'Features', icon: <BookOpen size={16} /> },
    { id: 'database', label: 'PHP + MySQL', icon: <Database size={16} /> },
    { id: 'troubleshoot', label: 'Troubleshoot', icon: <HelpCircle size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-orange-500/30 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-gray-400 hover:text-orange-400 text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Home
          </button>
          <div className="flex items-start gap-4">
            <div className="bg-orange-500 p-3 rounded-xl shadow-2xl shadow-orange-500/30 flex-shrink-0">
              <Code2 size={30} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white mb-2">
                How to Run in <span className="text-orange-400">Cursor</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl">
                Complete setup guide — from installing Node.js to seeing the app live in your browser. Follow these steps to run the AutoCare Pro Garage Management System locally.
              </p>
            </div>
          </div>


          {/* Tech badges */}
          <div className="flex flex-wrap gap-2 mt-6">
            {['React 19', 'TypeScript', 'Vite 7', 'Tailwind CSS v4', 'Node.js 18+', 'npm', 'Cursor Editor'].map(badge => (
              <span key={badge} className="bg-gray-700/70 border border-gray-600/50 text-gray-300 text-xs font-medium px-3 py-1 rounded-full">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar */}
        <div className="hidden lg:block w-52 flex-shrink-0">
          <div className="sticky top-24 space-y-1">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-3 px-3">Contents</p>
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeSection === s.id
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {s.icon}
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile section tabs */}
        <div className="lg:hidden w-full">
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeSection === s.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                {s.icon}
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-6">

          {/* QUICK START */}
          {activeSection === 'quickstart' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white mb-1">⚡ Quick Start</h2>
                <p className="text-gray-400 text-sm">Get running in under 2 minutes if you already have Node.js installed.</p>
              </div>

              <div className="bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-orange-500/30 rounded-2xl p-6">
                <h3 className="font-bold text-orange-400 mb-4 text-lg">3 Commands to Run</h3>
                <CodeBlock code="cd autocare-pro" language="step 1 — navigate to project" />
                <CodeBlock code="npm install" language="step 2 — install dependencies" />
                <CodeBlock code="npm run dev" language="step 3 — start dev server" />
                <InfoBox type="success">
                  Then open <strong>http://localhost:5173</strong> in your browser. Done! 🎉
                </InfoBox>
              </div>

              <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6">
                <h3 className="font-bold text-white mb-4">🔐 Admin Login Credentials</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-900 rounded-xl p-4 text-center border border-gray-700/50">
                    <p className="text-xs text-gray-500 mb-1">Username</p>
                    <p className="text-2xl font-black text-orange-400 font-mono">admin</p>
                  </div>
                  <div className="bg-gray-900 rounded-xl p-4 text-center border border-gray-700/50">
                    <p className="text-xs text-gray-500 mb-1">Password</p>
                    <p className="text-2xl font-black text-orange-400 font-mono">admin123</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6">
                <h3 className="font-bold text-white mb-4">📋 Quick Checklist</h3>
                <div className="space-y-2.5">
                  {[
                    'Node.js v18+ installed on your machine',
                    'Project folder opened in Cursor editor',
                    'Terminal opened inside Cursor (Ctrl + `)',
                    'npm install completed without errors',
                    'npm run dev started successfully',
                    'Opened http://localhost:5173 in browser',
                    'Logged in with admin / admin123',
                    'Explored Dashboard, Records & Billing pages',
                  ].map((item, i) => (
                    <label key={i} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-5 h-5 rounded border border-gray-600 group-hover:border-orange-500 transition-colors flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PREREQUISITES */}
          {activeSection === 'prerequisites' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white mb-1">📦 Prerequisites</h2>
                <p className="text-gray-400 text-sm">Install these tools before opening the project.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    name: 'Node.js v18+',
                    icon: <Terminal size={24} />,
                    color: 'from-green-500 to-emerald-500',
                    desc: 'JavaScript runtime. Required to run the dev server and build the app.',
                    url: 'https://nodejs.org',
                    urlLabel: 'nodejs.org',
                    verify: 'node -v',
                    expected: 'v18.x.x or higher',
                  },
                  {
                    name: 'npm (Node Package Manager)',
                    icon: <Package size={24} />,
                    color: 'from-red-500 to-pink-500',
                    desc: 'Comes bundled with Node.js. Used to install project dependencies.',
                    url: 'https://nodejs.org',
                    urlLabel: 'included with Node.js',
                    verify: 'npm -v',
                    expected: '9.x.x or higher',
                  },
                  {
                    name: 'Cursor Editor',
                    icon: <Code2 size={24} />,
                    color: 'from-blue-500 to-violet-500',
                    desc: 'AI-powered code editor based on VS Code. The primary editor for this project.',
                    url: 'https://cursor.sh',
                    urlLabel: 'cursor.sh',
                    verify: 'Open Cursor → Help → About',
                    expected: 'Any recent version',
                  },
                  {
                    name: 'Git (optional)',
                    icon: <FolderOpen size={24} />,
                    color: 'from-orange-500 to-amber-500',
                    desc: 'Version control. Optional but useful for cloning the project.',
                    url: 'https://git-scm.com',
                    urlLabel: 'git-scm.com',
                    verify: 'git --version',
                    expected: 'git version 2.x.x',
                  },
                ].map((tool, i) => (
                  <div key={i} className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5">
                    <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${tool.color} mb-3`}>
                      {tool.icon}
                    </div>
                    <h3 className="font-bold text-white mb-2">{tool.name}</h3>
                    <p className="text-gray-400 text-sm mb-3">{tool.desc}</p>
                    <a href={tool.url} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-orange-400 hover:text-orange-300 block mb-3">
                      🔗 {tool.urlLabel}
                    </a>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700/50">
                      <p className="text-xs text-gray-500 mb-1">Verify with:</p>
                      <code className="text-xs text-green-400 font-mono">{tool.verify}</code>
                      <p className="text-xs text-gray-500 mt-1">Expected: <span className="text-gray-300">{tool.expected}</span></p>
                    </div>
                  </div>
                ))}
              </div>

              <InfoBox type="tip">
                <strong>Tip:</strong> After installing Node.js, close and reopen your terminal for the PATH to update. Then run <code className="font-mono bg-orange-500/20 px-1 rounded">node -v</code> to confirm.
              </InfoBox>
            </div>
          )}

          {/* STEP-BY-STEP */}
          {activeSection === 'steps' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white mb-1">🪜 Step-by-Step Setup</h2>
                <p className="text-gray-400 text-sm">Click each step to expand. Steps 1–3 are expanded by default.</p>
              </div>

              <Step number={1} title="Open the Project in Cursor">
                <p className="text-gray-400 text-sm">Choose one method:</p>
                <div className="bg-gray-900/60 border border-gray-700/50 rounded-xl p-4 space-y-2">
                  <p className="text-white text-sm font-semibold">Option A — From a ZIP file:</p>
                  <ol className="text-gray-400 text-sm space-y-1 list-decimal list-inside">
                    <li>Extract the ZIP to a folder (e.g., <code className="text-orange-400 font-mono">C:\Projects\autocare-pro</code>)</li>
                    <li>Open <strong className="text-white">Cursor</strong> editor</li>
                    <li>Click <strong className="text-white">File → Open Folder</strong></li>
                    <li>Select the extracted project folder</li>
                  </ol>
                </div>
                <div className="bg-gray-900/60 border border-gray-700/50 rounded-xl p-4 space-y-2">
                  <p className="text-white text-sm font-semibold">Option B — From Git:</p>
                  <CodeBlock code={`git clone <your-repo-url> autocare-pro\ncd autocare-pro`} language="bash" />
                  <p className="text-gray-400 text-sm">Then open the <code className="text-orange-400 font-mono">autocare-pro</code> folder in Cursor.</p>
                </div>
                <InfoBox type="info">
                  Make sure you open the <strong>root folder</strong> (where <code className="font-mono">package.json</code> is located) — not a subfolder.
                </InfoBox>
              </Step>

              <Step number={2} title="Open the Integrated Terminal in Cursor">
                <p className="text-gray-400 text-sm">You need to run commands inside Cursor's terminal.</p>
                <div className="grid md:grid-cols-3 gap-3">
                  {[
                    { os: '🪟 Windows', shortcut: 'Ctrl + `', note: 'backtick key' },
                    { os: '🍎 Mac', shortcut: 'Cmd + `', note: 'backtick key' },
                    { os: '🐧 Linux', shortcut: 'Ctrl + `', note: 'backtick key' },
                  ].map((item, i) => (
                    <div key={i} className="bg-gray-900 rounded-xl p-4 text-center border border-gray-700/50">
                      <p className="text-2xl mb-2">{item.os.split(' ')[0]}</p>
                      <p className="text-orange-400 font-mono font-bold text-lg">{item.shortcut}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.note}</p>
                    </div>
                  ))}
                </div>
                <p className="text-gray-400 text-sm">Or use the menu: <strong className="text-white">View → Terminal</strong></p>
                <InfoBox type="tip">
                  Make sure the terminal path shows your project folder. You should see something like <code className="font-mono text-orange-300">C:\Projects\autocare-pro&gt;</code>
                </InfoBox>
              </Step>

              <Step number={3} title="Install Project Dependencies">
                <p className="text-gray-400 text-sm">This downloads all required packages (React, Vite, Tailwind, etc.)</p>
                <CodeBlock code="npm install" language="terminal" />
                <p className="text-gray-400 text-sm">This will:</p>
                <ul className="text-gray-400 text-sm list-disc list-inside space-y-1">
                  <li>Read <code className="text-orange-400 font-mono">package.json</code> for required packages</li>
                  <li>Create a <code className="text-orange-400 font-mono">node_modules/</code> folder with all dependencies</li>
                  <li>Create a <code className="text-orange-400 font-mono">package-lock.json</code> file</li>
                </ul>
                <InfoBox type="warning">
                  ⏳ This takes 1–3 minutes depending on your internet speed. Wait until you see the cursor blinking again.
                </InfoBox>
              </Step>

              <Step number={4} title="Start the Development Server">
                <CodeBlock code="npm run dev" language="terminal" />
                <p className="text-gray-400 text-sm">Expected output:</p>
                <CodeBlock code={`  VITE v7.x.x  ready in 300ms\n\n  ➜  Local:   http://localhost:5173/\n  ➜  Network: http://192.168.x.x:5173/`} language="output" />
                <InfoBox type="success">
                  The server is now running. Keep this terminal open — closing it stops the server.
                </InfoBox>
              </Step>

              <Step number={5} title="Open in Your Browser">
                <p className="text-gray-400 text-sm">Click the link in the terminal or manually open:</p>
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 text-center">
                  <p className="text-orange-400 font-mono text-2xl font-black">http://localhost:5173</p>
                </div>
                <InfoBox type="tip">
                  <strong>Tip:</strong> In Cursor's terminal, hold <code className="font-mono">Ctrl</code> and click the URL to open it directly.
                </InfoBox>
              </Step>

              <Step number={6} title="Login as Admin">
                <p className="text-gray-400 text-sm">Click <strong className="text-white">Admin Login</strong> in the navigation bar.</p>
                <div className="flex gap-4">
                  <div className="flex-1 bg-gray-900 rounded-xl p-4 text-center border border-gray-700/50">
                    <p className="text-xs text-gray-500 mb-1">Username</p>
                    <p className="text-2xl font-black text-orange-400 font-mono">admin</p>
                  </div>
                  <div className="flex-1 bg-gray-900 rounded-xl p-4 text-center border border-gray-700/50">
                    <p className="text-xs text-gray-500 mb-1">Password</p>
                    <p className="text-2xl font-black text-orange-400 font-mono">admin123</p>
                  </div>
                </div>
              </Step>

              <Step number={7} title="Build for Production (Optional)">
                <p className="text-gray-400 text-sm">When you're ready to deploy:</p>
                <CodeBlock code="npm run build" language="terminal" />
                <p className="text-gray-400 text-sm">This creates a <code className="text-orange-400 font-mono">dist/</code> folder with optimized static files ready to host.</p>
                <CodeBlock code="npm run preview" language="preview production build" />
              </Step>
            </div>
          )}

          {/* FILE STRUCTURE */}
          {activeSection === 'structure' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white mb-1">📁 File Structure</h2>
                <p className="text-gray-400 text-sm">Overview of all project files and their purpose.</p>
              </div>

              <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl overflow-hidden">
                <div className="bg-gray-900 px-4 py-3 border-b border-gray-700/50 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-gray-400 text-xs ml-2 font-mono">project structure</span>
                </div>
                <div className="p-4 font-mono text-sm space-y-1">
                  {fileStructure.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 hover:bg-gray-700/30 rounded-lg px-2 py-1 transition-colors"
                      style={{ paddingLeft: `${item.indent * 20 + 8}px` }}
                    >
                      <span className={item.type === 'folder' ? 'text-yellow-400' : 'text-blue-400'}>
                        {item.type === 'folder' ? '📁' : '📄'}
                      </span>
                      <span className={`${item.type === 'folder' ? 'text-yellow-300 font-bold' : 'text-gray-300'}`}>
                        {item.name}
                      </span>
                      {item.desc && (
                        <span className="text-gray-500 text-xs ml-auto">{item.desc}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { file: 'App.tsx', role: 'Main router — controls which page is shown based on login state' },
                  { file: 'types.ts', role: 'TypeScript interfaces for Customer, Vehicle, Billing data' },
                  { file: 'store.ts', role: 'localStorage CRUD functions — replaces a real database' },
                  { file: 'Navbar.tsx', role: 'Top navigation with auth-protected links' },
                  { file: 'DashboardPage.tsx', role: 'Stats overview with charts using Recharts' },
                  { file: 'AddServicePage.tsx', role: 'Form to add customer + vehicle + service together' },
                  { file: 'RecordsPage.tsx', role: 'Searchable table with status update controls' },
                  { file: 'BillingPage.tsx', role: 'Bill generator with live total calculation' },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-800/40 border border-gray-700/40 rounded-xl p-4">
                    <code className="text-orange-400 font-mono text-sm font-bold">{item.file}</code>
                    <p className="text-gray-400 text-xs mt-1">{item.role}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FEATURES */}
          {activeSection === 'features' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white mb-1">✨ Features Overview</h2>
                <p className="text-gray-400 text-sm">All pages and features available in the app.</p>
              </div>

              {[
                {
                  page: 'Home Page',
                  icon: '🏠',
                  access: 'Public',
                  color: 'border-gray-600',
                  features: [
                    'Garage name, banner, tagline',
                    '6 service cards (Engine, Oil, Brakes, Electrical, Tyres, Body)',
                    'Stats: 5000+ customers, 12000+ services, 15 years',
                    'Customer testimonials & reviews',
                    'Why Choose Us section with checkpoints',
                    'Contact, location & working hours',
                    'CTA banner linking to admin login',
                  ],
                },
                {
                  page: 'Admin Login',
                  icon: '🔐',
                  access: 'Public',
                  color: 'border-blue-500/30',
                  features: [
                    'Username + password form',
                    'Show/hide password toggle',
                    'Session-based auth (React state)',
                    'Demo credentials displayed',
                    'Loading spinner on submit',
                    'Error message on wrong credentials',
                  ],
                },
                {
                  page: 'Dashboard',
                  icon: '📊',
                  access: 'Admin',
                  color: 'border-orange-500/30',
                  features: [
                    'Total customers, vehicles, billing stats',
                    "Today's services counter",
                    'Pending / In Progress / Completed counts',
                    'Revenue summary (today & total)',
                    'Bar chart of service status distribution',
                    'Recent services quick-view list',
                    'Quick action buttons',
                  ],
                },
                {
                  page: 'Add Service',
                  icon: '➕',
                  access: 'Admin',
                  color: 'border-green-500/30',
                  features: [
                    'Customer name, mobile, address form',
                    'Vehicle number & model',
                    'Service type dropdown (10+ options)',
                    'Auto-fills today\'s date',
                    'Real-time form validation',
                    'Success confirmation message',
                    'Reset form option',
                  ],
                },
                {
                  page: 'Service Records',
                  icon: '📋',
                  access: 'Admin',
                  color: 'border-purple-500/30',
                  features: [
                    'Full table of all service records',
                    'Search by vehicle number or customer',
                    'Filter by service status',
                    'Update status (Pending → In Progress → Completed)',
                    'Link to generate bill for each record',
                    'Responsive table with mobile card view',
                  ],
                },
                {
                  page: 'Billing',
                  icon: '💰',
                  access: 'Admin',
                  color: 'border-yellow-500/30',
                  features: [
                    'Select unbilled vehicle from dropdown',
                    'Customer info preview auto-loads',
                    'Service charge input',
                    'Spare parts charge input',
                    'Live auto-calculation of total',
                    'List of all generated bills',
                    'Link to print each bill',
                  ],
                },
                {
                  page: 'Bill Detail / Print',
                  icon: '🖨️',
                  access: 'Admin',
                  color: 'border-cyan-500/30',
                  features: [
                    'Professional bill layout',
                    'Garage name, address, contact',
                    'Customer & vehicle details',
                    'Service charge breakdown',
                    'Parts charge breakdown',
                    'Grand total highlighted',
                    'Print button (browser print dialog)',
                  ],
                },
              ].map((section, i) => (
                <div key={i} className={`bg-gray-800/60 border ${section.color} rounded-2xl p-5`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{section.icon}</span>
                    <div>
                      <h3 className="font-bold text-white">{section.page}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        section.access === 'Admin'
                          ? 'bg-orange-500/20 text-orange-400'
                          : 'bg-gray-600/40 text-gray-400'
                      }`}>{section.access}</span>
                    </div>
                  </div>
                  <ul className="grid sm:grid-cols-2 gap-y-1.5 gap-x-4">
                    {section.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-gray-400 text-sm">
                        <CheckCircle size={13} className="text-green-400 flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* PHP + MYSQL */}
          {activeSection === 'database' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white mb-1">🐘 PHP + MySQL Backend</h2>
                <p className="text-gray-400 text-sm">
                  This React app is a frontend simulation. Here's how to connect a real PHP + MySQL backend using XAMPP.
                </p>
              </div>

              <InfoBox type="info">
                <strong>Current Implementation:</strong> All data is stored in browser localStorage. To convert to a real database, follow the steps below.
              </InfoBox>

              <div className="space-y-4">
                <Step number={1} title="Install & Start XAMPP">
                  <ol className="text-gray-400 text-sm list-decimal list-inside space-y-2">
                    <li>Download XAMPP from <a href="https://apachefriends.org" className="text-orange-400 underline" target="_blank" rel="noopener noreferrer">apachefriends.org</a></li>
                    <li>Install and open XAMPP Control Panel</li>
                    <li>Click <strong className="text-white">Start</strong> next to <strong className="text-white">Apache</strong></li>
                    <li>Click <strong className="text-white">Start</strong> next to <strong className="text-white">MySQL</strong></li>
                  </ol>
                </Step>

                <Step number={2} title="Create the MySQL Database">
                  <p className="text-gray-400 text-sm mb-2">Open <strong className="text-white">phpMyAdmin</strong> at <code className="text-orange-400 font-mono">http://localhost/phpmyadmin</code></p>
                  <CodeBlock code={`CREATE DATABASE garage_db;
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
  password VARCHAR(255)
);

INSERT INTO admin_users (username, password)
VALUES ('admin', MD5('admin123'));`} language="sql" />
                </Step>

                <Step number={3} title="PHP Database Connection File">
                  <CodeBlock code={`<?php
// db.php
$host = 'localhost';
$dbname = 'garage_db';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8",
        $user,
        $pass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    die(json_encode(['error' => $e->getMessage()]));
}
?>`} language="php" />
                </Step>

                <Step number={4} title="Example PHP API Endpoint">
                  <CodeBlock code={`<?php
// api/add_service.php
require '../db.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Insert customer
    $stmt = $pdo->prepare(
        "INSERT INTO customers (name, mobile, address)
         VALUES (?, ?, ?)"
    );
    $stmt->execute([
        $data['name'],
        $data['mobile'],
        $data['address']
    ]);
    $customerId = $pdo->lastInsertId();
    
    // Insert vehicle
    $stmt2 = $pdo->prepare(
        "INSERT INTO vehicles
         (customer_id, vehicle_number, vehicle_model,
          service_type, service_status, service_date)
         VALUES (?, ?, ?, ?, 'Pending', ?)"
    );
    $stmt2->execute([
        $customerId,
        $data['vehicleNumber'],
        $data['vehicleModel'],
        $data['serviceType'],
        $data['serviceDate']
    ]);
    
    echo json_encode(['success' => true,
                      'customerId' => $customerId]);
}`} language="php" />
                </Step>

                <Step number={5} title="Project Folder Location">
                  <p className="text-gray-400 text-sm">Place your PHP files in:</p>
                  <CodeBlock code="C:\\xampp\\htdocs\\garage\\" language="windows path" />
                  <CodeBlock code="/opt/lampp/htdocs/garage/" language="linux path" />
                  <p className="text-gray-400 text-sm mt-2">Then visit: <code className="text-orange-400 font-mono">http://localhost/garage/</code></p>
                </Step>
              </div>
            </div>
          )}

          {/* TROUBLESHOOT */}
          {activeSection === 'troubleshoot' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white mb-1">🔧 Troubleshooting</h2>
                <p className="text-gray-400 text-sm">Common issues and how to fix them.</p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    problem: '"npm" is not recognized as a command',
                    cause: 'Node.js is not installed or not in PATH',
                    fix: 'Download and install Node.js from nodejs.org\nRestart your terminal after installation',
                    severity: 'error',
                  },
                  {
                    problem: 'Port 5173 already in use',
                    cause: 'Another app is using port 5173',
                    fix: 'npm run dev -- --port 3000\n\n# Or kill the process using the port:\nnpx kill-port 5173',
                    severity: 'warning',
                  },
                  {
                    problem: '"Cannot find module" errors after npm install',
                    cause: 'Corrupted or incomplete node_modules',
                    fix: 'rm -rf node_modules package-lock.json\nnpm install',
                    severity: 'error',
                  },
                  {
                    problem: 'Blank white screen in browser',
                    cause: 'JavaScript error preventing render',
                    fix: '1. Open browser DevTools (F12)\n2. Go to Console tab\n3. Look for red error messages\n4. Fix the reported error',
                    severity: 'error',
                  },
                  {
                    problem: 'Changes not appearing in browser',
                    cause: 'Browser cache or Vite HMR issue',
                    fix: 'Hard refresh: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)\n\nOr stop the server (Ctrl+C) and run npm run dev again',
                    severity: 'warning',
                  },
                  {
                    problem: 'TypeScript build errors',
                    cause: 'Type mismatch or unused variable',
                    fix: '# Check exact error:\nnpm run build\n\n# Look at the file:line mentioned in the error\n# Fix the TypeScript issue reported',
                    severity: 'error',
                  },
                  {
                    problem: 'Data not saving between refreshes',
                    cause: 'localStorage is blocked or in private/incognito mode',
                    fix: 'Open the app in a normal (non-private) browser window\n\n# To reset all app data:\nOpen DevTools → Application → Local Storage → Clear All',
                    severity: 'warning',
                  },
                  {
                    problem: '"node_modules not found" after cloning',
                    cause: 'Dependencies not installed yet',
                    fix: '# Make sure you are in the project root folder:\nls  # should show package.json\n\n# Then install:\nnpm install',
                    severity: 'error',
                  },
                ].map((item, i) => (
                  <div key={i} className={`border rounded-2xl overflow-hidden ${
                    item.severity === 'error'
                      ? 'border-red-500/30'
                      : 'border-yellow-500/30'
                  }`}>
                    <div className={`flex items-start gap-3 px-5 py-4 ${
                      item.severity === 'error'
                        ? 'bg-red-500/10'
                        : 'bg-yellow-500/10'
                    }`}>
                      <AlertTriangle size={18} className={item.severity === 'error' ? 'text-red-400 flex-shrink-0 mt-0.5' : 'text-yellow-400 flex-shrink-0 mt-0.5'} />
                      <div>
                        <p className={`font-bold text-sm ${item.severity === 'error' ? 'text-red-300' : 'text-yellow-300'}`}>
                          ❌ {item.problem}
                        </p>
                        <p className="text-gray-400 text-xs mt-1">Cause: {item.cause}</p>
                      </div>
                    </div>
                    <div className="px-5 py-4 bg-gray-800/40">
                      <p className="text-xs text-gray-500 mb-2 font-semibold">✅ FIX:</p>
                      <CodeBlock code={item.fix} language="solution" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Play size={16} className="text-orange-400" /> Useful Commands Reference
                </h3>
                <div className="space-y-2">
                  {[
                    { cmd: 'npm install', desc: 'Install all dependencies' },
                    { cmd: 'npm run dev', desc: 'Start development server (http://localhost:5173)' },
                    { cmd: 'npm run build', desc: 'Build for production → /dist folder' },
                    { cmd: 'npm run preview', desc: 'Preview production build locally' },
                    { cmd: 'node -v', desc: 'Check Node.js version' },
                    { cmd: 'npm -v', desc: 'Check npm version' },
                    { cmd: 'npm run dev -- --port 3000', desc: 'Run on a different port' },
                    { cmd: 'rm -rf node_modules && npm install', desc: 'Clean reinstall (Mac/Linux)' },
                    { cmd: 'npx kill-port 5173', desc: 'Kill process using port 5173' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-700/30 last:border-0">
                      <code className="text-green-400 font-mono text-sm bg-gray-900 px-3 py-1 rounded-lg flex-shrink-0">{item.cmd}</code>
                      <span className="text-gray-400 text-sm pt-1">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 py-8 mt-8">
        <div className="max-w-5xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p className="font-bold text-white mb-1">
            AutoCare<span className="text-orange-400">Pro</span> Setup Guide
          </p>
          <p>React 19 + Vite 7 + Tailwind CSS v4 + TypeScript | © 2025 AutoCare Pro</p>
        </div>
      </div>
    </div>
  );
}
