import React, { useState } from 'react';
import LanguagePicker from '../../components/LanguagePicker/LanguagePicker';
import allLanguages from '../../utils/Languages/allLanguages';


export default function CreateTenantView(){
  const [tenantName, setTenantName] = useState('');
  const [adminName, setAdminName] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aggiungi qui il codice per salvare i dati del Tenant nel backend
  };

  return (
    <div>
      <h2>Crea un nuovo Tenant</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="tenant-name">Nome del Tenant:</label>
          <input id="tenant-name" type="text" value={tenantName} onChange={(event) => setTenantName(event.target.value)} />
        </div>
        <div>
          <label htmlFor="admin-name">Nome dell'Admin:</label>
          <input id="admin-name" type="text" value={adminName} onChange={(event) => setAdminName(event.target.value)} />
        </div>
        <div>
          <label htmlFor="language-select">Lingua predefinita:</label>
          <LanguagePicker
            id="language-select"
            value={selectedLanguage}
            onChange={(event)=>setSelectedLanguage(event.target.value)}
            languages={allLanguages}
          />
        </div>
        <button type="submit">Crea Tenant</button>
      </form>
    </div>
  );
};