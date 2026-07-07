"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLanguage } from "@/contexts/language-context";
import { defaultDonationConfig, formatCurrency, validateDonationAmount, getDonationFrequencyLabel, getDonationTypeLabel } from "@/lib/stripe-config";
import { ButtonSystem } from "@/components/ui/button-system";

const stripePromise = loadStripe(defaultDonationConfig.stripe.publishableKey);

export function DonationForm() {
  const { language } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    amount: 50,
    frequency: 'one-time' as 'one-time' | 'monthly' | 'weekly',
    donationType: 'general',
    customAmount: '',
    donorInfo: {
      name: '',
      email: '',
      phone: '',
      address: {
        line1: '',
        city: '',
        state: '',
        postal_code: '',
        country: 'US',
      },
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const donationTypes = [
    { value: 'tithe', icon: '10%', label: getDonationTypeLabel('tithe', language) },
    { value: 'offering', icon: 'gift', label: getDonationTypeLabel('offering', language) },
    { value: 'building_fund', icon: 'building', label: getDonationTypeLabel('building_fund', language) },
    { value: 'missions', icon: 'globe', label: getDonationTypeLabel('missions', language) },
    { value: 'youth', icon: 'users', label: getDonationTypeLabel('youth', language) },
    { value: 'general', icon: 'heart', label: getDonationTypeLabel('general', language) },
  ];

  const frequencies = [
    { value: 'one-time', label: getDonationFrequencyLabel('one-time', language) },
    { value: 'weekly', label: getDonationFrequencyLabel('weekly', language) },
    { value: 'monthly', label: getDonationFrequencyLabel('monthly', language) },
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!validateDonationAmount(formData.amount, defaultDonationConfig)) {
      newErrors.amount = `Amount must be between $${defaultDonationConfig.donation.minAmount} and $${defaultDonationConfig.donation.maxAmount}`;
    }

    if (!formData.donorInfo.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.donorInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.donorInfo.email)) {
      newErrors.email = 'Invalid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch('/api/donations/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: formData.amount,
          currency: 'usd',
          frequency: formData.frequency,
          donationType: formData.donationType,
          donorInfo: formData.donorInfo,
        }),
      });

      const session = await response.json();

      if (response.ok) {
        const stripe = await stripePromise;
        if (stripe) {
          const { error } = await (stripe as any).redirectToCheckout({
            sessionId: session.id,
          });
          if (error) {
            throw new Error(error.message);
          }
        }
      } else {
        throw new Error(session.error || 'Failed to create checkout session');
      }
    } catch (error) {
      console.error('Donation error:', error);
      setErrors({ submit: error instanceof Error ? error.message : 'An error occurred while processing your donation.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAmountChange = (amount: number) => {
    setFormData(prev => ({ ...prev, amount, customAmount: '' }));
    setErrors(prev => ({ ...prev, amount: '' }));
  };

  const handleCustomAmountChange = (value: string) => {
    const numValue = parseInt(value);
    setFormData(prev => ({ ...prev, customAmount: value, amount: numValue || 0 }));
    setErrors(prev => ({ ...prev, amount: '' }));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl text-royal-purple mb-4">
          {language === 'en' ? 'Support Our Ministry' :
           language === 'es' ? 'Apoya Nuestro Ministerio' :
           language === 'fr' ? 'Soutenez Notre Ministère' :
           language === 'nl' ? 'Ondersteun Ons Ministerie' : ''}
        </h2>
        <p className="text-charcoal/80">
          {language === 'en' ? 'Your generous donation helps us continue our mission to serve the community.' :
           language === 'es' ? 'Tu generosa donación nos ayuda a continuar nuestra misión de servir a la comunidad.' :
           language === 'fr' ? 'Votre généreux don nous aide à continuer notre mission de servir la communauté.' :
           language === 'nl' ? 'Uw royale donatie helpt ons om onze missie om de gemeenschap te dienen voort te zetten.' : ''}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Donation Type Selection */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-4">
            {language === 'en' ? 'Donation Type' :
             language === 'es' ? 'Tipo de Donación' :
             language === 'fr' ? 'Type de Don' :
             language === 'nl' ? 'Donatie Type' : ''}
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {donationTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, donationType: type.value }))}
                className={`p-3 rounded-lg border-2 transition-all text-center ${
                  formData.donationType === type.value
                    ? 'border-gold bg-gold/10 text-royal-purple'
                    : 'border-royal-purple/20 hover:border-royal-purple/40'
                }`}
              >
                <div className="text-2xl mb-1">{type.icon}</div>
                <div className="text-sm font-medium">{type.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Amount Selection */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-4">
            {language === 'en' ? 'Donation Amount' :
             language === 'es' ? 'Cantidad de Donación' :
             language === 'fr' ? 'Montant du Don' :
             language === 'nl' ? 'Donatie Bedrag' : ''}
          </label>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
            {defaultDonationConfig.donation.defaultAmounts.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => handleAmountChange(amount)}
                className={`p-3 rounded-lg border-2 transition-all font-semibold ${
                  formData.amount === amount && !formData.customAmount
                    ? 'border-gold bg-gold/10 text-royal-purple'
                    : 'border-royal-purple/20 hover:border-royal-purple/40'
                }`}
              >
                {formatCurrency(amount, 'USD')}
              </button>
            ))}
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              value={formData.customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
              placeholder={language === 'en' ? 'Custom amount' :
                           language === 'es' ? 'Cantidad personalizada' :
                           language === 'fr' ? 'Montant personnalisé' :
                           language === 'nl' ? 'Aangepast bedrag' : ''}
              className="block w-full pl-8 pr-3 py-2 border border-royal-purple/20 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
              min={defaultDonationConfig.donation.minAmount}
              max={defaultDonationConfig.donation.maxAmount}
            />
          </div>
          {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
        </div>

        {/* Frequency Selection */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-4">
            {language === 'en' ? 'Donation Frequency' :
             language === 'es' ? 'Frecuencia de Donación' :
             language === 'fr' ? 'Fréquence de Don' :
             language === 'nl' ? 'Donatie Frequentie' : ''}
          </label>
          <div className="flex gap-3">
            {frequencies.map((freq) => (
              <button
                key={freq.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, frequency: freq.value as any }))}
                className={`flex-1 p-3 rounded-lg border-2 transition-all font-medium ${
                  formData.frequency === freq.value
                    ? 'border-gold bg-gold/10 text-royal-purple'
                    : 'border-royal-purple/20 hover:border-royal-purple/40'
                }`}
              >
                {freq.label}
              </button>
            ))}
          </div>
        </div>

        {/* Donor Information */}
        <div className="border-t pt-6">
          <h3 className="font-semibold text-royal-purple mb-4">
            {language === 'en' ? 'Your Information' :
             language === 'es' ? 'Tu Información' :
             language === 'fr' ? 'Vos Informations' :
             language === 'nl' ? 'Uw Informatie' : ''}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">
                {language === 'en' ? 'Full Name' :
                 language === 'es' ? 'Nombre Completo' :
                 language === 'fr' ? 'Nom Complet' :
                 language === 'nl' ? 'Volledige Naam' : ''} *
              </label>
              <input
                type="text"
                value={formData.donorInfo.name}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  donorInfo: { ...prev.donorInfo, name: e.target.value }
                }))}
                className="block w-full px-3 py-2 border border-royal-purple/20 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                required
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">
                {language === 'en' ? 'Email Address' :
                 language === 'es' ? 'Dirección de Correo' :
                 language === 'fr' ? 'Adresse Email' :
                 language === 'nl' ? 'E-mail Adres' : ''} *
              </label>
              <input
                type="email"
                value={formData.donorInfo.email}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  donorInfo: { ...prev.donorInfo, email: e.target.value }
                }))}
                className="block w-full px-3 py-2 border border-royal-purple/20 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                required
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-charcoal mb-1">
              {language === 'en' ? 'Phone Number (Optional)' :
               language === 'es' ? 'Número de Teléfono (Opcional)' :
               language === 'fr' ? 'Numéro de Téléphone (Optionnel)' :
               language === 'nl' ? 'Telefoonnummer (Optioneel)' : ''}
            </label>
            <input
              type="tel"
              value={formData.donorInfo.phone}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                donorInfo: { ...prev.donorInfo, phone: e.target.value }
              }))}
              className="block w-full px-3 py-2 border border-royal-purple/20 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="border-t pt-6">
          <ButtonSystem
            type="submit"
            disabled={isProcessing}
            loading={isProcessing}
            variant="gradient"
            size="lg"
            fullWidth
            className="py-3 px-6 font-semibold"
          >
            {isProcessing ? '' : (
              <>
                {language === 'en' ? `Donate ${formatCurrency(formData.amount, 'USD')}` :
                 language === 'es' ? `Donar ${formatCurrency(formData.amount, 'USD')}` :
                 language === 'fr' ? `Donner ${formatCurrency(formData.amount, 'USD')}` :
                 language === 'nl' ? `Doneer ${formatCurrency(formData.amount, 'USD')}` : ''}
                {formData.frequency !== 'one-time' && ` ${getDonationFrequencyLabel(formData.frequency, language).toLowerCase()}`}
              </>
            )}
          </ButtonSystem>
          {errors.submit && <p className="mt-2 text-sm text-red-600 text-center">{errors.submit}</p>}
        </div>

        {/* Security Notice */}
        <div className="text-center text-sm text-charcoal/60">
          <p className="mb-2">
            {language === 'en' ? 'Secure payment powered by Stripe' :
             language === 'es' ? 'Pago seguro powered by Stripe' :
             language === 'fr' ? 'Paiement sécurisé powered by Stripe' :
             language === 'nl' ? 'Veilige betaling powered by Stripe' : ''}
          </p>
          <div className="flex justify-center items-center gap-2">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
            </svg>
            <span>{language === 'en' ? 'SSL Encrypted' :
                   language === 'es' ? 'Cifrado SSL' :
                   language === 'fr' ? 'Chiffré SSL' :
                   language === 'nl' ? 'SSL Versleuteld' : ''}</span>
          </div>
        </div>
      </form>
    </div>
  );
}
