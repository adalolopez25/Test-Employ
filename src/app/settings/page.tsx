'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@/components/layout/header/Container';
import './settings.css'
import '@/app/profile/profile.css'


export default function SettingsPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert('Aquí se actualizarían los datos en Supabase');
  };

  return (
    <Container className="flex justify-center py-10">
      <div className="settings-card">
        <h1 className="settings-title">Configuración de cuenta</h1>

        <form onSubmit={handleSubmit} className="settings-form">
          <label>Username</label>
          <input type="text" name="username" value={form.username} onChange={handleChange} />

          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} />

          <label>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} />

          <button type="submit" className="btn primary">Save Changes</button>
        </form>

        <div className="profile-actions">
            <a href="/dashboard" className="btn secondary">Volver al Dashboard</a>
            <form action="/api/auth/logout" method="POST">
              <button className="btn danger">Logout</button>
            </form>
          </div>
      </div>
    </Container>
  );
}
