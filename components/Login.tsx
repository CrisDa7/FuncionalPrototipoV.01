import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface LoginProps {
  onLogin: (user: any) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Mock authentication
    const users = [
      { id: '1', nombre: 'Cristian Ajila', rol: 'Docente' as const, email: 'cristian.ajila@unl.edu.ec', password: 'docente123' },
      { id: '2', nombre: 'Admin Sistema', rol: 'Administrador' as const, email: 'admin@unl.edu.ec', password: 'admin123' },
      { id: '3', nombre: 'Pasante UNL', rol: 'Pasante' as const, email: 'pasante@unl.edu.ec', password: 'pasante123' },
    ];

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      const { password, ...userData } = user;
      onLogin(userData);
    } else {
      setError('Credenciales incorrectas. Intenta de nuevo.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-block bg-[#c62828] text-white w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-3xl text-gray-900 mb-2">Kallpa UNL</h1>
            <p className="text-gray-600">Sistema de Gestión Deportiva</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu.correo@unl.edu.ec"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="mt-1"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded text-sm">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full bg-[#c62828] hover:bg-[#a61b1b]">
              Iniciar sesión
            </Button>

            <div className="text-center">
              <a href="#" className="text-sm text-[#c62828] hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded text-sm text-gray-600">
            <p className="mb-2">Credenciales de prueba:</p>
            <p>• Docente: cristian.ajila@unl.edu.ec / docente123</p>
            <p>• Admin: admin@unl.edu.ec / admin123</p>
            <p>• Pasante: pasante@unl.edu.ec / pasante123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
