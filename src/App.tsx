import { useState, useEffect } from 'react';
import './styles.css';
import { validateIdea, Scorecard } from './lib/validator';

export default function App() {
  const [idea, setIdea] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [result, setResult] = useState<Scorecard | null>(null);
  const [stage, setStage] = useState(-1);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if API key is in environment variables (Vite uses VITE_ prefix)
    const envKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    if (envKey) {
      setApiKey(envKey);
    }
  }, []);

  const stages = ['Clarifying customer and job-to-be-done…', 'Running devil\'s advocate critique…', 'Estimating market pull…', 'Mapping alternatives and competitors…', 'Scoring execution risk…', 'Generating validation experiment…'];

  async function run() {
    const input = idea.trim() || 'Mjord: one-click installer for agentic AI tools so non-technical users can run agents locally.';
    if (!idea.trim()) setIdea(input);

    if (!apiKey) {
      setError('Please provide an Anthropic API key to run the live validation.');
      return;
    }

    setResult(null);
    setStage(0);
    setRunning(true);
    setError(null);

    // Simulation of progress while calling the real API
    const progressInterval = setInterval(() => {
      setStage(prev => {
        if (prev < stages.length - 2) return prev + 1;
        return prev;
      });
    }, 1500);

    try {
      const scorecard = await validateIdea(input, apiKey);
      clearInterval(progressInterval);
      setStage(stages.length - 1);
      setResult(scorecard);
    } catch (err: any) {
      clearInterval(progressInterval);
      setError(err.message || 'An error occurred during validation.');
      setStage(-1);
    } finally {
      setRunning(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0c10', color: '#e2e8f0', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <header style={{ borderBottom: '1px solid #1e293b', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #334155, #16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🎯</div>
        <span style={{ fontWeight: 700, fontSize: 18 }}>Startup Idea Validator</span>
      </header>
      <main style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 8 }}>Anthropic API Key (required for live validation)</label>
          <input
            type="password"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            placeholder="sk-ant-..."
            style={{ width: '100%', background: '#111827', border: '1px solid #1e293b', borderRadius: 8, padding: 10, color: '#e2e8f0', fontSize: 14 }}
          />
        </div>
        <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 8 }}>Describe your startup idea</label>
        <textarea value={idea} onChange={e => setIdea(e.target.value)} placeholder="Mjord: one-click installer for agentic AI tools…" rows={3} style={{ width: '100%', background: '#111827', border: '1px solid #1e293b', borderRadius: 8, padding: 14, color: '#e2e8f0', fontSize: 14, resize: 'vertical' }} />

        {error && (
          <div style={{ marginTop: 10, padding: '10px', background: '#450a0a', border: '1px solid #991b1b', borderRadius: 8, color: '#fecaca', fontSize: 13 }}>
            ⚠️ {error}
          </div>
        )}

        <button onClick={run} disabled={running} style={{ marginTop: 10, padding: '12px 24px', background: running ? '#334155' : 'linear-gradient(135deg, #334155, #16a34a)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, cursor: running ? 'not-allowed' : 'pointer' }}>
          {running ? 'Validating…' : '🎯 Validate Idea'}
        </button>
        {stage >= 0 && (
          <div style={{ marginTop: 16, background: '#111827', border: '1px solid #1e293b', borderRadius: 8, padding: 14 }}>
            {stages.map((s, i) => <div key={i} style={{ padding: '3px 0', opacity: i <= stage ? 1 : 0.3, fontSize: 13 }}>{i < stage ? '✅' : i === stage ? (running ? '⏳' : '✅') : '⬜'} {s}</div>)}
          </div>
        )}
        {result && (
          <div style={{ marginTop: 20 }}>
            <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
              <div style={{ flex: '0 0 120px', background: '#111827', border: '1px solid #1e293b', borderRadius: 12, padding: 20, textAlign: 'center' }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: result.score >= 80 ? '#22c55e' : result.score >= 65 ? '#f59e0b' : '#ef4444' }}>{result.score}</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>/100</div>
              </div>
              <div style={{ flex: 1, background: '#111827', border: '1px solid #1e293b', borderRadius: 12, padding: 16 }}>
                <h3 style={{ margin: '0 0 6px', fontSize: 14, color: '#16a34a' }}>🧑 Ideal Customer Profile</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>{result.icp}</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: 10, padding: 16 }}>
                <h3 style={{ margin: '0 0 8px', fontSize: 14, color: '#ef4444' }}>😈 Devil's Advocate</h3>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: '#cbd5e1' }}>{result.critique}</p>
              </div>
              <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: 10, padding: 16 }}>
                <h3 style={{ margin: '0 0 8px', fontSize: 14, color: '#3b82f6' }}>📈 Market Pull</h3>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: '#cbd5e1' }}>{result.market}</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: 10, padding: 16 }}>
                <h3 style={{ margin: '0 0 8px', fontSize: 14, color: '#f59e0b' }}>🏢 Competitors</h3>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.8, color: '#cbd5e1' }}>{result.competitors.map((c, i) => <li key={i}>{c}</li>)}</ul>
              </div>
              <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: 10, padding: 16 }}>
                <h3 style={{ margin: '0 0 8px', fontSize: 14, color: '#ef4444' }}>⚠️ Execution Risks</h3>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.8, color: '#cbd5e1' }}>{result.risks.map((r, i) => <li key={i}>{r}</li>)}</ul>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ background: '#0a1f17', border: '1px solid #166534', borderRadius: 10, padding: 16 }}>
                <h3 style={{ margin: '0 0 8px', fontSize: 14, color: '#22c55e' }}>🧪 Next Experiment</h3>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6 }}>{result.experiment}</p>
              </div>
              <div style={{ background: '#0f172a', border: '1px solid #1e3a5f', borderRadius: 10, padding: 16 }}>
                <h3 style={{ margin: '0 0 8px', fontSize: 14, color: '#60a5fa' }}>📍 Positioning</h3>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6 }}>{result.positioning}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
