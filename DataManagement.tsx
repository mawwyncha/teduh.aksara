import React from 'react';
import { getData, clearStore } from '../services/dbService';

export const DataManagement: React.FC = () => {
  const handleExportData = async () => {
    try {
      const history = await getData('history', 'history_list');
      const settings = await getData('settings', 'pref_style');
      
      const exportData = {
        exported_at: new Date().toISOString(),
        history: history || [],
        settings: settings || {},
        note: 'Data ekspor dari Tara - Teduh Aksara'
      };
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tara-data-export-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      
      alert('✅ Data Anda berhasil diekspor!');
    } catch (error) {
      alert('❌ Gagal mengekspor data: ' + error);
    }
  };

  const handleDeleteAllData = async () => {
    if (confirm('⚠️ PERINGATAN: Ini akan menghapus SEMUA data Anda secara permanen. Lanjutkan?')) {
      if (confirm('Apakah Anda benar-benar yakin? Tindakan ini tidak dapat dibatalkan.')) {
        try {
          await clearStore('draft');
          await clearStore('history');
          await clearStore('settings');
          alert('✅ Semua data Anda telah dihapus.');
          window.location.reload();
        } catch (error) {
          alert('❌ Gagal menghapus data: ' + error);
        }
      }
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-emerald-900 dark:text-emerald-100">Kelola Data Anda</h3>
      <button
        onClick={handleExportData}
        className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
      >
        📥 Ekspor Data Saya (JSON)
      </button>
      <button
        onClick={handleDeleteAllData}
        className="w-full py-3 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition-all"
      >
        🗑️ Hapus Semua Data Saya
      </button>
    </div>
  );
};