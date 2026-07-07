"use client";

import { DonationForm } from "@/components/donation/donation-form";
import { useLanguage } from "@/contexts/language-context";
import Link from "next/link";
import { ButtonSystem } from "@/components/ui/button-system";

export default function DonationPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-royal-purple to-gold text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl mb-6">
            {language === 'en' ? 'Give & Support Our Ministry' :
             language === 'es' ? 'Dona y Apoya Nuestro Ministerio' :
             language === 'fr' ? 'Donner et Soutenir Notre Ministère' :
             language === 'nl' ? 'Geef en Ondersteun Ons Ministerie' : ''}
          </h1>
          <p className="text-xl mb-8 opacity-90">
            {language === 'en' ? 'Your generous partnership enables us to share God\'s love and serve our community.' :
             language === 'es' ? 'Tu generosa asociación nos permite compartir el amor de Dios y servir a nuestra comunidad.' :
             language === 'fr' ? 'Votre généreux partenariat nous permet de partager l\'amour de Dieu et de servir notre communauté.' :
             language === 'nl' ? 'Uw royale partnerschap stelt ons in staat om Gods liefde te delen en onze gemeenschap te dienen.' : ''}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <ButtonSystem 
              href="#donate"
              variant="secondary"
              size="md"
              className="px-8 py-3 font-semibold"
            >
              {language === 'en' ? 'Give Now' :
               language === 'es' ? 'Donar Ahora' :
               language === 'fr' ? 'Donner Maintenant' :
               language === 'nl' ? 'Geef Nu' : ''}
            </ButtonSystem>
            <ButtonSystem 
              href="/about"
              variant="outline"
              size="md"
              className="px-8 py-3 font-semibold border-white text-white hover:bg-white hover:text-royal-purple"
            >
              {language === 'en' ? 'Learn More' :
               language === 'es' ? 'Aprende Más' :
               language === 'fr' ? 'En Savoir Plus' :
               language === 'nl' ? 'Meer Leren' : ''}
            </ButtonSystem>
          </div>
        </div>
      </div>

      {/* Donation Form */}
      <div id="donate" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <DonationForm />
        </div>
      </div>

      {/* Impact Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl text-royal-purple mb-4">
              {language === 'en' ? 'Your Impact' :
               language === 'es' ? 'Tu Impacto' :
               language === 'fr' ? 'Votre Impact' :
               language === 'nl' ? 'Uw Impact' : ''}
            </h2>
            <p className="text-lg text-charcoal/80">
              {language === 'en' ? 'See how your generosity transforms lives and strengthens our community.' :
               language === 'es' ? 'Ve cómo tu generosidad transforma vidas y fortalece nuestra comunidad.' :
               language === 'fr' ? 'Voyez comment votre générosité transforme des vies et renforce notre communauté.' :
               language === 'nl' ? 'Zie hoe uw vrijgevigheid levens transformeert en onze gemeenschap versterkt.' : ''}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⛪</span>
              </div>
              <h3 className="font-semibold text-royal-purple mb-2">
                {language === 'en' ? 'Worship Services' :
                 language === 'es' ? 'Servicios de Adoración' :
                 language === 'fr' ? 'Services de Culte' :
                 language === 'nl' ? 'Erediensten' : ''}
              </h3>
              <p className="text-charcoal/80">
                {language === 'en' ? 'Support our weekly services and spiritual growth programs.' :
                 language === 'es' ? 'Apoya nuestros servicios semanales y programas de crecimiento espiritual.' :
                 language === 'fr' ? 'Soutenez nos services hebdomadaires et nos programmes de croissance spirituelle.' :
                 language === 'nl' ? 'Ondersteun onze wekelijkse diensten en programma\'s voor geestelijke groei.' : ''}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="font-semibold text-royal-purple mb-2">
                {language === 'en' ? 'Community Outreach' :
                 language === 'es' ? 'Alcance Comunitario' :
                 language === 'fr' ? 'Action Communautaire' :
                 language === 'nl' ? 'Gemeenschapsbereik' : ''}
              </h3>
              <p className="text-charcoal/80">
                {language === 'en' ? 'Help us serve families in need through our outreach programs.' :
                 language === 'es' ? 'Ayúdanos a servir a familias necesitadas a través de nuestros programas de alcance.' :
                 language === 'fr' ? 'Aidez-nous à servir les familles dans le besoin grâce à nos programmes d\'action communautaire.' :
                 language === 'nl' ? 'Help ons gezinnen in nood te dienen via onze outreach programma\'s.' : ''}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="font-semibold text-royal-purple mb-2">
                {language === 'en' ? 'Youth & Education' :
                 language === 'es' ? 'Juventud y Educación' :
                 language === 'fr' ? 'Jeunesse et Éducation' :
                 language === 'nl' ? 'Jeugd en Onderwijs' : ''}
              </h3>
              <p className="text-charcoal/80">
                {language === 'en' ? 'Invest in the next generation through our youth programs and education initiatives.' :
                 language === 'es' ? 'Invierte en la próxima generación a través de nuestros programas juveniles e iniciativas educativas.' :
                 language === 'fr' ? 'Investissez dans la prochaine génération grâce à nos programmes pour les jeunes et nos initiatives éducatives.' :
                 language === 'nl' ? 'Investeer in de volgende generatie via onze jeugdprogramma\'s en educatieve initiatieven.' : ''}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ways to Give Section */}
      <div className="bg-royal-purple/5 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl text-royal-purple mb-4">
              {language === 'en' ? 'Other Ways to Give' :
               language === 'es' ? 'Otras Formas de Donar' :
               language === 'fr' ? 'Autres Façons de Donner' :
               language === 'nl' ? 'Andere Manieren om te Geven' : ''}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-semibold text-royal-purple mb-3">
                {language === 'en' ? 'Bank Transfer' :
                 language === 'es' ? 'Transferencia Bancaria' :
                 language === 'fr' ? 'Virement Bancaire' :
                 language === 'nl' ? 'Bankoverschrijving' : ''}
              </h3>
              <p className="text-charcoal/80 mb-4">
                {language === 'en' ? 'Make a direct transfer to our church account.' :
                 language === 'es' ? 'Haz una transferencia directa a nuestra cuenta de la iglesia.' :
                 language === 'fr' ? 'Faites un virement direct sur notre compte d\'église.' :
                 language === 'nl' ? 'Maak een directe overdracht naar onze kerkrekening.' : ''}
              </p>
              <div className="bg-royal-purple/5 rounded-lg p-4 text-sm">
                <p className="font-mono">Bank: Maranatha Christian Church</p>
                <p className="font-mono">Account: 1234-5678-9012</p>
                <p className="font-mano">Routing: 021000021</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-semibold text-royal-purple mb-3">
                {language === 'en' ? 'Text to Give' :
                 language === 'es' ? 'Donar por Texto' :
                 language === 'fr' ? 'Donner par SMS' :
                 language === 'nl' ? 'Geven via SMS' : ''}
              </h3>
              <p className="text-charcoal/80 mb-4">
                {language === 'en' ? 'Text "GIVE" to 555-123-4567 to make a quick donation.' :
                 language === 'es' ? 'Envía "DONAR" al 555-123-4567 para hacer una donación rápida.' :
                 language === 'fr' ? 'Envoyez "DONNER" au 555-123-4567 pour faire un don rapide.' :
                 language === 'nl' ? 'Stuur "GEEF" naar 555-123-4567 voor een snelle donatie.' : ''}
              </p>
              <button className="w-full px-4 py-2 bg-gold text-royal-purple rounded-lg hover:bg-gold/90 transition-colors font-medium">
                {language === 'en' ? 'Text to Give' :
                 language === 'es' ? 'Donar por Texto' :
                 language === 'fr' ? 'Donner par SMS' :
                 language === 'nl' ? 'Geven via SMS' : ''}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl text-royal-purple mb-4">
            {language === 'en' ? 'Questions About Giving?' :
             language === 'es' ? '¿Preguntas sobre Donar?' :
             language === 'fr' ? 'Questions sur les Dons?' :
             language === 'nl' ? 'Vragen over Geven?' : ''}
          </h2>
          <p className="text-lg text-charcoal/80 mb-8">
            {language === 'en' ? 'We\'re here to help with any questions about donations, tithes, or supporting our ministry.' :
             language === 'es' ? 'Estamos aquí para ayudar con cualquier pregunta sobre donaciones, diezmos o apoyar nuestro ministerio.' :
             language === 'fr' ? 'Nous sommes là pour aider avec toutes les questions concernant les dons, la dîme ou le soutien de notre ministère.' :
             language === 'nl' ? 'Wij zijn hier om te helpen met vragen over donaties, tienden of het ondersteunen van ons ministerie.' : ''}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="px-6 py-3 bg-royal-purple text-white rounded-lg hover:bg-royal-purple/90 transition-colors font-medium"
            >
              {language === 'en' ? 'Contact Us' :
               language === 'es' ? 'Contáctanos' :
               language === 'fr' ? 'Contactez-nous' :
               language === 'nl' ? 'Neem Contact Op' : ''}
            </Link>
            <a 
              href="mailto:finance@maranathachurch.org"
              className="px-6 py-3 border-2 border-royal-purple text-royal-purple rounded-lg hover:bg-royal-purple/10 transition-colors font-medium"
            >
              {language === 'en' ? 'Email Finance Team' :
               language === 'es' ? 'Email Equipo Financiero' :
               language === 'fr' ? 'Email l\'Équipe Financière' :
               language === 'nl' ? 'E-mail Financieel Team' : ''}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
