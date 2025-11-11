import { useState, useEffect } from 'react';
import { Home, Users, ClipboardList, Activity, Calendar, Clock, UserCog, LogOut, Menu, X } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { Participantes } from './components/Participantes';
import { PerfilAtleta } from './components/PerfilAtleta';
import { Asistencia } from './components/Asistencia';
import { Evaluaciones } from './components/Evaluaciones';
import { Planificaciones } from './components/Planificaciones';
import { Horarios } from './components/Horarios';

type View = 'login' | 'dashboard' | 'participantes' | 'perfil' | 'asistencia' | 'evaluaciones' | 'planificaciones' | 'horarios' | 'cuentas';

interface User {
  id: string;
  nombre: string;
  rol: 'Administrador' | 'Docente' | 'Pasante';
  email: string;
}

export default function App() {
  const [currentView, setCurrentView] = useState<View>('login');
  const [user, setUser] = useState<User | null>(null);
  const [selectedAtleta, setSelectedAtleta] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('kallpa_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentView('dashboard');
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('kallpa_user', JSON.stringify(userData));
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('kallpa_user');
    setCurrentView('login');
  };

  const handleViewAtleta = (atletaId: string) => {
    setSelectedAtleta(atletaId);
    setCurrentView('perfil');
  };

  const handleNavClick = (view: View) => {
    setCurrentView(view);
    setMobileMenuOpen(false); // Cierra el menú mobile al navegar
  };

  const menuItems = [
    { id: 'dashboard', label: 'Inicio', icon: Home },
    { id: 'participantes', label: 'Participantes', icon: Users },
    { id: 'asistencia', label: 'Asistencia', icon: ClipboardList },
    { id: 'evaluaciones', label: 'Evaluaciones', icon: Activity },
    { id: 'planificaciones', label: 'Planificaciones', icon: Calendar },
    { id: 'horarios', label: 'Horarios', icon: Clock },
    { id: 'cuentas', label: 'Cuentas', icon: UserCog },
  ];

  if (currentView === 'login') {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="flex h-screen bg-gray-50">
        {/* Desktop Sidebar - Visible only on md+ */}
        <aside className="hidden md:flex w-64 bg-[#c62828] text-white flex-col">
          <div className="p-6 border-b border-white/10">
            <h1 className="text-2xl">Kallpa UNL</h1>
            <p className="text-sm text-white/80 mt-1">Sistema de Gestión Deportiva</p>
          </div>

          <nav className="flex-1 py-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id as View)}
                  className={`w-full flex items-center gap-3 px-6 py-3 transition-colors relative ${
                    isActive 
                      ? 'bg-[#a61b1b] text-white' 
                      : 'text-white/90 hover:bg-[#a61b1b]'
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-white"></div>
                  )}
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/10">
            <div className="px-2 py-2 mb-2">
              <p className="text-sm text-white/80">Sesión activa</p>
              <p className="text-white text-sm">{user?.nombre}</p>
              <p className="text-xs text-white/60">{user?.rol}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-white/90 hover:bg-[#a61b1b] rounded transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Salir</span>
            </button>
          </div>
        </aside>

        {/* Main Content Wrapper */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Header - Visible only on <md */}
          <div className="md:hidden bg-[#c62828] text-white flex items-center justify-between px-4 py-3 shadow-lg">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-[#a61b1b] rounded transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <h1 className="text-lg font-bold">Kallpa UNL</h1>
            <div className="w-10" />
          </div>

          {/* Mobile Menu Overlay */}
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Mobile Sidebar */}
              <nav className="fixed top-0 left-0 w-64 h-screen bg-[#c62828] text-white z-50 md:hidden overflow-y-auto pt-16 shadow-2xl">
                <div className="py-4">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentView === item.id;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id as View)}
                        className={`w-full flex items-center gap-3 px-6 py-3 transition-colors relative ${
                          isActive 
                            ? 'bg-[#a61b1b] text-white' 
                            : 'text-white/90 hover:bg-[#a61b1b]'
                        }`}
                      >
                        {isActive && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-white"></div>
                        )}
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="p-4 border-t border-white/10 mt-auto">
                  <div className="px-2 py-2 mb-2">
                    <p className="text-sm text-white/80">Sesión activa</p>
                    <p className="text-white text-xs truncate">{user?.nombre}</p>
                    <p className="text-xs text-white/60">{user?.rol}</p>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-white/90 hover:bg-[#a61b1b] rounded transition-colors text-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Salir</span>
                  </button>
                </div>
              </nav>
            </>
          )}

          {/* Main Content Area */}
          <main className="flex-1 overflow-auto">
            {currentView === 'dashboard' && <Dashboard user={user} />}
            {currentView === 'participantes' && <Participantes onViewAtleta={handleViewAtleta} />}
            {currentView === 'perfil' && <PerfilAtleta atletaId={selectedAtleta} onBack={() => setCurrentView('participantes')} />}
            {currentView === 'asistencia' && <Asistencia />}
            {currentView === 'evaluaciones' && <Evaluaciones onViewAtleta={handleViewAtleta} />}
            {currentView === 'planificaciones' && <Planificaciones />}
            {currentView === 'horarios' && <Horarios />}
            {currentView === 'cuentas' && (
              <div className="p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl mb-4">Gestión de Cuentas</h2>
                <p className="text-gray-600">Módulo en desarrollo</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}