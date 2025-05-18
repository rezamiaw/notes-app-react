import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{textAlign: 'center', marginTop: '4em'}}>
      <h1>404</h1>
      <h2>Halaman tidak ditemukan</h2>
      <p>Maaf, halaman yang Anda cari tidak tersedia.</p>
      <Link to="/">Kembali ke Beranda</Link>
    </div>
  );
}

export default NotFound; 