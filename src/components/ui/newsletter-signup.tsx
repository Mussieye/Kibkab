"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";

export function NewsletterSignup() {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Basic email validation
    if (!email || !email.includes("@")) {
      setError(language === 'en' ? "Please enter a valid email address" :
             language === 'es' ? "Por favor ingrese una dirección de correo válida" :
             language === 'fr' ? "Veuillez entrer une adresse e-mail valide" : "Voer een geldig e-mailadres in");
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call to newsletter service
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, this would call your newsletter API
      // const response = await fetch('/api/newsletter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });
      
      setIsSubscribed(true);
      setEmail("");
    } catch (err) {
      setError(language === 'en' ? "Something went wrong. Please try again." :
             language === 'es' ? "Algo salió mal. Por favor inténtelo de nuevo." :
             language === 'fr' ? "Une erreur s'est produite. Veuillez réessayer." : "Er is iets misgegaan. Probeer het opnieuw.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="bg-gradient-to-br from-royal-purple/10 to-burgundy/10 rounded-xl p-6 text-center">
        <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-royal-purple" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        </div>
        <h3 className="font-serif text-xl text-royal-purple mb-2">
          {language === 'en' ? "Thank You for Subscribing!" :
           language === 'es' ? "¡Gracias por Suscribirte!" :
           language === 'fr' ? "Merci de vous être abonné !" : "Bedankt voor het Abonneren!"}
        </h3>
        <p className="text-charcoal/80">
          {language === 'en' ? "You'll receive our latest updates and spiritual content in your inbox." :
           language === 'es' ? "Recibirás nuestras últimas actualizaciones y contenido espiritual en tu bandeja de entrada." :
           language === 'fr' ? "Vous recevrez nos dernières mises à jour et contenu spirituel dans votre boîte de réception." :
           language === 'nl' ? "Je ontvangt onze laatste updates en spirituele inhoud in je inbox." : ""}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-royal-purple/10 to-burgundy/10 rounded-xl p-6">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-royal-purple" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
        </div>
        <h3 className="font-serif text-xl text-royal-purple mb-2">
          {language === 'en' ? "Stay Connected" :
           language === 'es' ? "Mantente Conectado" :
           language === 'fr' ? "Restez Connecté" : "Blijf Verbonden"}
        </h3>
        <p className="text-charcoal/80">
          {language === 'en' ? "Get weekly sermons, events, and spiritual encouragement delivered to your inbox." :
           language === 'es' ? "Recibe sermones semanales, eventos y aliento espiritual en tu bandeja de entrada." :
           language === 'fr' ? "Recevez des sermons hebdomadaires, des événements et un encouragement spirituel dans votre boîte de réception." :
           language === 'nl' ? "Krijg wekelijkse preken, evenementen en spirituele bemoediging in je inbox." : ""}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={
              language === 'en' ? "Enter your email address" :
              language === 'es' ? "Ingresa tu dirección de correo" :
              language === 'fr' ? "Entrez votre adresse e-mail" : language === 'nl' ? "Voer uw e-mailadres in" : ""
            }
            className="w-full px-4 py-3 rounded-lg border border-royal-purple/20 focus:outline-none focus:ring-2 focus:ring-royal-purple/50 focus:border-transparent"
            disabled={isSubmitting}
            required
          />
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-royal-purple text-white py-3 rounded-lg font-medium hover:bg-royal-purple/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="31.416" strokeDashoffset="31.416"/>
              </svg>
              {language === 'en' ? "Subscribing..." :
               language === 'es' ? "Suscribiendo..." :
               language === 'fr' ? "Abonnement..." : language === 'nl' ? "Abonneren..." : ""}
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              {language === 'en' ? "Subscribe to Newsletter" :
               language === 'es' ? "Suscribirse al Boletín" :
               language === 'fr' ? "S'abonner à la Newsletter" : language === 'nl' ? "Abonneer op Nieuwsbrief" : ""}
            </>
          )}
        </button>
      </form>

      <p className="mt-4 text-xs text-charcoal/60 text-center">
        {language === 'en' ? "We respect your privacy. Unsubscribe at any time." :
         language === 'es' ? "Respetamos tu privacidad. Cancela la suscripción en cualquier momento." :
         language === 'fr' ? "Nous respectons votre vie privée. Désabonnez-vous à tout moment." :
         language === 'nl' ? "We respecteren uw privacy. U kunt zich op elk moment afmelden." : ""}
      </p>
    </div>
  );
}
