"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/language-context";
import { ButtonSystem } from "@/components/ui/button-system";
import { User } from "@/lib/auth-config";

interface MemberStatistics {
  totalMembers: number;
  activeMembers: number;
  inactiveMembers: number;
  adminCount: number;
  editorCount: number;
  memberCount: number;
  newMembersLast30Days: number;
  totalFiltered: number;
  currentPage: number;
  totalPages: number;
}

interface MemberDashboardProps {
  className?: string;
}

export function MemberDashboardSimple({ className = "" }: MemberDashboardProps) {
  const { language } = useLanguage();
  const [statistics, setStatistics] = useState<MemberStatistics | null>(null);
  const [members, setMembers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterActive, setFilterActive] = useState<string>('all');

  const fetchMembers = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10'
      });

      if (filterRole !== 'all') {
        params.append('role', filterRole);
      }

      if (filterActive !== 'all') {
        params.append('isActive', filterActive);
      }

      const response = await fetch(`/api/admin/members?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch members');
      }

      const data = await response.json();
      
      if (data.success) {
        setStatistics(data.data.statistics);
        setMembers(data.data.members);
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load member data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [currentPage, filterRole, filterActive]);

  const getText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      title: {
        en: 'Member Dashboard',
        es: 'Panel de Miembros',
        fr: 'Tableau de Bord des Membres',
        nl: 'Leden Dashboard'
      },
      totalMembers: {
        en: 'Total Members',
        es: 'Total de Miembros',
        fr: 'Total des Membres',
        nl: 'Totaal Leden'
      },
      activeMembers: {
        en: 'Active Members',
        es: 'Miembros Activos',
        fr: 'Membres Actifs',
        nl: 'Actieve Leden'
      },
      newMembers30Days: {
        en: 'New Members (30 Days)',
        es: 'Nuevos Miembros (30 Días)',
        fr: 'Nouveaux Membres (30 Jours)',
        nl: 'Nieuwe Leden (30 Dagen)'
      },
      regularMembers: {
        en: 'Regular Members',
        es: 'Miembros Regulares',
        fr: 'Membres Réguliers',
        nl: 'Reguliere Leden'
      },
      memberList: {
        en: 'Member List',
        es: 'Lista de Miembros',
        fr: 'Liste des Membres',
        nl: 'Ledenlijst'
      },
      name: {
        en: 'Name',
        es: 'Nombre',
        fr: 'Nom',
        nl: 'Naam'
      },
      email: {
        en: 'Email',
        es: 'Correo Electrónico',
        fr: 'Email',
        nl: 'Email'
      },
      role: {
        en: 'Role',
        es: 'Rol',
        fr: 'Rôle',
        nl: 'Rol'
      },
      joinDate: {
        en: 'Join Date',
        es: 'Fecha de Ingreso',
        fr: 'Date d\'Inscription',
        nl: 'Aanmelddatum'
      },
      status: {
        en: 'Status',
        es: 'Estado',
        fr: 'Statut',
        nl: 'Status'
      },
      active: {
        en: 'Active',
        es: 'Activo',
        fr: 'Actif',
        nl: 'Actief'
      },
      inactive: {
        en: 'Inactive',
        es: 'Inactivo',
        fr: 'Inactif',
        nl: 'Inactief'
      },
      allRoles: {
        en: 'All Roles',
        es: 'Todos los Roles',
        fr: 'Tous les Rôles',
        nl: 'Alle Rollen'
      },
      allStatuses: {
        en: 'All Statuses',
        es: 'Todos los Estados',
        fr: 'Tous les Statuts',
        nl: 'Alle Statussen'
      },
      refresh: {
        en: 'Refresh Data',
        es: 'Actualizar Datos',
        fr: 'Actualiser les Données',
        nl: 'Vernieuw Data'
      },
      loading: {
        en: 'Loading...',
        es: 'Cargando...',
        fr: 'Chargement...',
        nl: 'Laden...'
      },
      error: {
        en: 'Error loading member data',
        es: 'Error al cargar datos de miembros',
        fr: 'Erreur lors du chargement des données des membres',
        nl: 'Fout bij het laden van ledengegevens'
      }
    };

    return translations[key]?.[language] || translations[key]?.en || key;
  };

  if (isLoading) {
    return (
      <div className={`bg-white rounded-xl border border-royal-purple/20 p-8 ${className}`}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white rounded-xl border border-royal-purple/20 p-8 ${className}`}>
        <div className="text-center">
          <div className="text-red-600 mb-4">{getText('error')}: {error}</div>
          <ButtonSystem onClick={fetchMembers} variant="primary" size="md">
            {getText('refresh')}
          </ButtonSystem>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="bg-white rounded-xl border border-royal-purple/20 p-6">
        <h2 className="text-2xl font-bold text-royal-purple mb-2">
          {getText('title')}
        </h2>
        <p className="text-charcoal/80">
          {language === 'en' ? 'View and manage church member registrations' :
           language === 'es' ? 'Ver y gestionar registros de miembros de la iglesia' :
           language === 'fr' ? 'Voir et gérer les inscriptions des membres de l\'église' :
           language === 'nl' ? 'Bekijk en beheer kerklidregistraties' : 'View and manage church member registrations'}
        </p>
      </div>

      {/* Statistics Cards */}
      {statistics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-royal-purple/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-charcoal/60 mb-1">{getText('totalMembers')}</p>
                <p className="text-3xl font-bold text-royal-purple">{statistics.totalMembers}</p>
              </div>
              <div className="w-12 h-12 bg-royal-purple/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-royal-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-royal-purple/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-charcoal/60 mb-1">{getText('activeMembers')}</p>
                <p className="text-3xl font-bold text-green-600">{statistics.activeMembers}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-royal-purple/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-charcoal/60 mb-1">{getText('newMembers30Days')}</p>
                <p className="text-3xl font-bold text-gold">{statistics.newMembersLast30Days}</p>
              </div>
              <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-royal-purple/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-charcoal/60 mb-1">{getText('regularMembers')}</p>
                <p className="text-3xl font-bold text-burgundy">{statistics.memberCount}</p>
              </div>
              <div className="w-12 h-12 bg-burgundy/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl border border-royal-purple/20 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-charcoal mb-2">
              {getText('allRoles')}
            </label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full px-3 py-2 border border-royal-purple/20 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            >
              <option value="all">{getText('allRoles')}</option>
              <option value="admin">Administrators</option>
              <option value="editor">Content Editors</option>
              <option value="member">{getText('regularMembers')}</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-charcoal mb-2">
              {getText('allStatuses')}
            </label>
            <select
              value={filterActive}
              onChange={(e) => setFilterActive(e.target.value)}
              className="w-full px-3 py-2 border border-royal-purple/20 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            >
              <option value="all">{getText('allStatuses')}</option>
              <option value="true">{getText('active')}</option>
              <option value="false">{getText('inactive')}</option>
            </select>
          </div>

          <div className="flex items-end">
            <ButtonSystem onClick={fetchMembers} variant="outline" size="md">
              {getText('refresh')}
            </ButtonSystem>
          </div>
        </div>
      </div>

      {/* Member List */}
      <div className="bg-white rounded-xl border border-royal-purple/20 p-6">
        <h3 className="text-xl font-semibold text-royal-purple mb-4">
          {getText('memberList')}
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-royal-purple/20">
                <th className="text-left py-3 px-4 text-sm font-medium text-charcoal">{getText('name')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-charcoal">{getText('email')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-charcoal">{getText('role')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-charcoal">{getText('joinDate')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-charcoal">{getText('status')}</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id} className="border-b border-royal-purple/10 hover:bg-royal-purple/5">
                  <td className="py-3 px-4">
                    <div className="font-medium text-charcoal">{member.name}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-charcoal/80">{member.email}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      member.role === 'admin' ? 'bg-royal-purple text-white' :
                      member.role === 'editor' ? 'bg-gold text-royal-purple' :
                      'bg-gray-100 text-charcoal'
                    }`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-charcoal/80">
                      {new Date(member.membershipDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      member.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {member.isActive ? getText('active') : getText('inactive')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {statistics && statistics.totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-charcoal/60">
              {language === 'en' ? `Page ${statistics.currentPage} of ${statistics.totalPages}` :
               language === 'es' ? `Página ${statistics.currentPage} de ${statistics.totalPages}` :
               language === 'fr' ? `Page ${statistics.currentPage} sur ${statistics.totalPages}` :
               language === 'nl' ? `Pagina ${statistics.currentPage} van ${statistics.totalPages}` : 
               `Page ${statistics.currentPage} of ${statistics.totalPages}`}
            </div>
            <div className="flex gap-2">
              <ButtonSystem
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                variant="outline"
                size="sm"
              >
                {language === 'en' ? 'Previous' :
                 language === 'es' ? 'Anterior' :
                 language === 'fr' ? 'Précédent' :
                 language === 'nl' ? 'Vorige' : 'Previous'}
              </ButtonSystem>
              <ButtonSystem
                onClick={() => setCurrentPage(prev => Math.min(statistics.totalPages, prev + 1))}
                disabled={currentPage === statistics.totalPages}
                variant="outline"
                size="sm"
              >
                {language === 'en' ? 'Next' :
                 language === 'es' ? 'Siguiente' :
                 language === 'fr' ? 'Suivant' :
                 language === 'nl' ? 'Volgende' : 'Next'}
              </ButtonSystem>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
