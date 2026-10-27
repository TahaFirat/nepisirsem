import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

class GlobalErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.error('Uygulama çalışma hatası yakalandı:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            textAlign: 'center',
            background: '#FFFDF9',
            color: '#1E1B18',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🍲</div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>
            Sayfa Yenileniyor
          </h2>
          <p style={{ fontSize: '14px', color: '#6E655F', marginBottom: '18px' }}>
            Kaldığınız yerden devam etmek için aşağıdaki butona dokunun.
          </p>
          <button
            type="button"
            onClick={() => {
              this.setState({ hasError: false })
              window.location.reload()
            }}
            style={{
              background: '#D9381E',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 24px',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Uygulamaya Dön
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <App />
    </GlobalErrorBoundary>
  </StrictMode>,
)
