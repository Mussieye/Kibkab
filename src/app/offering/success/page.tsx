"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/language-context";
import Link from "next/link";
import { ButtonSystem } from "@/components/ui/button-system";

function DonationSuccessContent() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const [donationDetails, setDonationDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (sessionId) {
      fetchDonationDetails(sessionId);
    } else {
      setIsLoading(false);
    }
  }, [searchParams]);

  const fetchDonationDetails = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/donations/session/${sessionId}`);
      if (response.ok) {
        const details = await response.json();
        setDonationDetails(details);
      }
    } catch (error) {
      console.error("Error fetching donation details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-charcoal">
            {language === 'en' ? 'Loading your donation details...' :
             language === 'es' ? 'Cargando los detalles de tu donación...' :
             language === 'fr' ? 'Chargement des détails de votre don...' :
             language === 'nl' ? 'Uw donatiegegevens laden...' : ''}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-serif text-4xl text-royal-purple mb-4">
            {language === 'en' ? 'Thank You for Your Donation!' :
             language === 'es' ? '¡Gracias por tu Donación!' :
             language === 'fr' ? 'Merci pour votre Don !' :
             language === 'nl' ? 'Bedankt voor uw Donatie!' : ''}
          </h1>
          <p className="text-xl text-charcoal/80">
            {language === 'en' ? 'Your generous support helps us continue our ministry and serve our community.' :
             language === 'es' ? 'Tu generoso apoyo nos ayuda a continuar nuestro ministerio y servir a nuestra comunidad.' :
             language === 'fr' ? 'Votre généreux soutien nous aide à continuer notre ministère et servir notre communauté.' :
             language === 'nl' ? 'Uw royale steun helpt ons om ons ministerie voort te zetten en onze gemeenschap te dienen.' : ''}
          </p>
        </div>

        {/* Donation Details */}
        {donationDetails && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="font-serif text-2xl text-royal-purple mb-6">
              {language === 'en' ? 'Donation Details' :
               language === 'es' ? 'Detalles de la Donación' :
               language === 'fr' ? 'Détails du Don' :
               language === 'nl' ? 'Donatie Details' : ''}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-royal-purple mb-4">
                  {language === 'en' ? 'Donation Information' :
                   language === 'es' ? 'Información de la Donación' :
                   language === 'fr' ? 'Informations sur le Don' :
                   language === 'nl' ? 'Donatie Informatie' : ''}
                </h3>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-charcoal/60">
                      {language === 'en' ? 'Amount' :
                       language === 'es' ? 'Cantidad' :
                       language === 'fr' ? 'Montant' :
                       language === 'nl' ? 'Bedrag' : ''}
                    </dt>
                    <dd className="font-semibold text-royal-purple">
                      ${donationDetails.amount?.toFixed(2) || '0.00'}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-charcoal/60">
                      {language === 'en' ? 'Frequency' :
                       language === 'es' ? 'Frecuencia' :
                       language === 'fr' ? 'Fréquence' :
                       language === 'nl' ? 'Frequentie' : ''}
                    </dt>
                    <dd className="font-medium">
                      {donationDetails.frequency === 'one-time' ? 
                        (language === 'en' ? 'One-time' :
                         language === 'es' ? 'Único' :
                         language === 'fr' ? 'Unique' :
                         language === 'nl' ? 'Eenmalig' : '') :
                        donationDetails.frequency === 'monthly' ?
                        (language === 'en' ? 'Monthly' :
                         language === 'es' ? 'Mensual' :
                         language === 'fr' ? 'Mensuel' :
                         language === 'nl' ? 'Maandelijks' : '') :
                        (language === 'en' ? 'Weekly' :
                         language === 'es' ? 'Semanal' :
                         language === 'fr' ? 'Hebdomadaire' :
                         language === 'nl' ? 'Wekelijks' : '')
                      }
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-charcoal/60">
                      {language === 'en' ? 'Donation Type' :
                       language === 'es' ? 'Tipo de Donación' :
                       language === 'fr' ? 'Type de Don' :
                       language === 'nl' ? 'Donatie Type' : ''}
                    </dt>
                    <dd className="font-medium">
                      {donationDetails.donationType?.replace('_', ' ').charAt(0).toUpperCase() + 
                       donationDetails.donationType?.replace('_', ' ').slice(1) || 'General'}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-charcoal/60">
                      {language === 'en' ? 'Transaction ID' :
                       language === 'es' ? 'ID de Transacción' :
                       language === 'fr' ? 'ID de Transaction' :
                       language === 'nl' ? 'Transactie ID' : ''}
                    </dt>
                    <dd className="font-mono text-sm">
                      {donationDetails.sessionId?.slice(0, 8) || 'N/A'}...
                    </dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="font-semibold text-royal-purple mb-4">
                  {language === 'en' ? 'Donor Information' :
                   language === 'es' ? 'Información del Donante' :
                   language === 'fr' ? 'Informations sur le Donateur' :
                   language === 'nl' ? 'Donateur Informatie' : ''}
                </h3>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-charcoal/60">
                      {language === 'en' ? 'Name' :
                       language === 'es' ? 'Nombre' :
                       language === 'fr' ? 'Nom' :
                       language === 'nl' ? 'Naam' : ''}
                    </dt>
                    <dd className="font-medium">
                      {donationDetails.donorName || 'Anonymous'}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-charcoal/60">
                      {language === 'en' ? 'Email' :
                       language === 'es' ? 'Correo' :
                       language === 'fr' ? 'Email' :
                       language === 'nl' ? 'E-mail' : ''}
                    </dt>
                    <dd className="font-medium">
                      {donationDetails.donorEmail || 'Not provided'}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-charcoal/60">
                      {language === 'en' ? 'Date' :
                       language === 'es' ? 'Fecha' :
                       language === 'fr' ? 'Date' :
                       language === 'nl' ? 'Datum' : ''}
                    </dt>
                    <dd className="font-medium">
                      {new Date().toLocaleDateString()}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}

        {/* Tax Receipt Information */}
        <div className="bg-royal-purple/5 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-royal-purple mb-3">
            {language === 'en' ? 'Tax Receipt Information' :
             language === 'es' ? 'Información del Recibo de Impuestos' :
             language === 'fr' ? 'Informations sur le Reçu Fiscal' :
             language === 'nl' ? 'Belasting Aftrek Informatie' : ''}
          </h3>
          <p className="text-charcoal/80 mb-3">
            {language === 'en' ? 'A tax receipt has been sent to your email address. Maranatha Christian Church is a registered 501(c)(3) non-profit organization, and your donation is tax-deductible to the extent allowed by law.' :
             language === 'es' ? 'Un recibo de impuestos ha sido enviado a tu dirección de correo. Maranatha Christian Church es una organización sin fines de lucro registrada 501(c)(3), y tu donación es deducible de impuestos según lo permita la ley.' :
             language === 'fr' ? 'Un reçu fiscal a été envoyé à votre adresse email. Maranatha Christian Church est une organisation à but non lucratif enregistrée 501(c)(3), et votre don est déductible d\'impôts dans la limite permise par la loi.' :
             language === 'nl' ? 'Een belastingaftrek is naar uw e-mailadres gestuurd. Maranatha Christian Church is een geregistreerde 501(c)(3) non-profitorganisatie, en uw donatie is belastingaftrekbaar voor zover de wet dit toestaat.' : ''}
          </p>
          <p className="text-sm text-charcoal/60">
            {language === 'en' ? 'Tax ID: 12-3456789 | Please keep this receipt for your records.' :
             language === 'es' ? 'ID Fiscal: 12-3456789 | Por favor guarde este recibo para sus registros.' :
             language === 'fr' ? 'ID Fiscal: 12-3456789 | Veuillez conserver ce reçu pour vos dossiers.' :
             language === 'nl' ? 'Belasting ID: 12-3456789 | Bewaar dit bonnetje voor uw administratie.' : ''}
          </p>
        </div>

        {/* Next Steps */}
        <div className="text-center">
          <h3 className="font-serif text-2xl text-royal-purple mb-4">
            {language === 'en' ? 'What\'s Next?' :
             language === 'es' ? '¿Qué Sigue?' :
             language === 'fr' ? 'Quoi de Suite ?' :
             language === 'nl' ? 'Wat Volgt?' : ''}
          </h3>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-3"> prayer </div>
              <h4 className="font-semibold text-royal-purple mb-2">
                {language === 'en' ? 'Prayer Requests' :
                 language === 'es' ? 'Peticiones de Oración' :
                 language === 'fr' ? 'Demandes de Prière' :
                 language === 'nl' ? 'Gebedsverzoeken' : ''}
              </h4>
              <p className="text-sm text-charcoal/80 mb-4">
                {language === 'en' ? 'Submit your prayer requests and join our community in prayer.' :
                 language === 'es' ? 'Envía tus peticiones de oración y únete a nuestra comunidad en oración.' :
                 language === 'fr' ? 'Soumettez vos demandes de prière et rejoignez notre communauté dans la prière.' :
                 language === 'nl' ? 'Dien uw gebedsverzoeken in en sluit u aan bij uw gemeenschap in gebed.' : ''}
              </p>
              <ButtonSystem 
                href="/prayer"
                variant="primary"
                size="sm"
                className="px-4 py-2 font-medium"
              >
                {language === 'en' ? 'Submit Request' :
                 language === 'es' ? 'Enviar Petición' :
                 language === 'fr' ? 'Soumettre une Demande' :
                 language === 'nl' ? 'Verzoek Indienen' : ''}
              </ButtonSystem>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-3"> calendar </div>
              <h4 className="font-semibold text-royal-purple mb-2">
                {language === 'en' ? 'Upcoming Events' :
                 language === 'es' ? 'Próximos Eventos' :
                 language === 'fr' ? 'Événements à Venir' :
                 language === 'nl' ? 'Aankomende Evenementen' : ''}
              </h4>
              <p className="text-sm text-charcoal/80 mb-4">
                {language === 'en' ? 'Join us for worship services, Bible studies, and community events.' :
                 language === 'es' ? 'Únete a nosotros para servicios de adoración, estudios bíblicos y eventos comunitarios.' :
                 language === 'fr' ? 'Rejoignez-nous pour les services de culte, les études bibliques et les événements communautaires.' :
                 language === 'nl' ? 'Sluit u aan bij ons voor erediensten, bijbelstudies en gemeenschapsevenementen.' : ''}
              </p>
              <ButtonSystem 
                href="/events"
                variant="primary"
                size="sm"
                className="px-4 py-2 font-medium"
              >
                {language === 'en' ? 'View Events' :
                 language === 'es' ? 'Ver Eventos' :
                 language === 'fr' ? 'Voir les Événements' :
                 language === 'nl' ? 'Bekijk Evenementen' : ''}
              </ButtonSystem>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-3"> users </div>
              <h4 className="font-semibold text-royal-purple mb-2">
                {language === 'en' ? 'Get Involved' :
                 language === 'es' ? 'Involúcrate' :
                 language === 'fr' ? 'Impliquez-vous' :
                 language === 'nl' ? 'Raak Betrokken' : ''}
              </h4>
              <p className="text-sm text-charcoal/80 mb-4">
                {language === 'en' ? 'Discover ways to serve and use your gifts to bless others.' :
                 language === 'es' ? 'Descubre maneras de servir y usar tus dones para bendecir a otros.' :
                 language === 'fr' ? 'Découvrez des moyens de servir et d\'utiliser vos dons pour bénir les autres.' :
                 language === 'nl' ? 'Ontdek manieren om te dienen en uw gaven te gebruiken om anderen te zegenen.' : ''}
              </p>
              <ButtonSystem 
                href="/about"
                variant="primary"
                size="sm"
                className="px-4 py-2 font-medium"
              >
                {language === 'en' ? 'Learn More' :
                 language === 'es' ? 'Aprende Más' :
                 language === 'fr' ? 'En Savoir Plus' :
                 language === 'nl' ? 'Meer Leren' : ''}
              </ButtonSystem>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonSystem
              href="/"
              variant="gradient"
              size="md"
              className="px-6 py-3 font-medium"
            >
              {language === 'en' ? 'Return Home' :
               language === 'es' ? 'Volver al Inicio' :
               language === 'fr' ? 'Retour à l\'Accueil' :
               language === 'nl' ? 'Terug naar Home' : ''}
            </ButtonSystem>
            <ButtonSystem
              href="/offering"
              variant="outline"
              size="md"
              className="px-6 py-3 font-medium"
            >
              {language === 'en' ? 'Another Donation' :
               language === 'es' ? 'Otra Donación' :
               language === 'fr' ? 'Autre Don' :
               language === 'nl' ? 'Nog een Donatie' : ''}
            </ButtonSystem>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DonationSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold" />
      </div>
    }>
      <DonationSuccessContent />
    </Suspense>
  );
}
