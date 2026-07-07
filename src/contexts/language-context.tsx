'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'es' | 'fr' | 'nl' | 'am' | 'ti';

export interface Translations {
  [key: string]: { [key: string]: string };
}

const defaultTranslations: Translations = {
  en: {
    // ── Navigation ──
    navHome: 'Home',
    navAbout: 'About',
    navMinistries: 'Ministries',
    navMedia: 'Media',
    navEvents: 'Events',
    navDevotionals: 'Devotionals',
    navContact: 'Contact',
    navGiveOnline: 'Give Online',

    // ── Homepage Hero ──
    heroChurchBadge: 'Maranatha Christian Church',
    heroLine1: 'Where Faith',
    heroLine2: 'Comes Alive',
    heroScripture: '"For where two or three gather in my name, there am I with them."',
    heroScriptureRef: 'Matthew 18:20',
    heroJoinUs: 'Join Us Sunday',
    heroWatchOnline: 'Watch Online',
    heroScroll: 'Scroll',

    // ── Stats ──
    statsYears: 'Years of Ministry',
    statsMembers: 'Church Members',
    statsServices: 'Weekly Services',
    statsMinistries: 'Active Ministries',

    // ── Feature Cards ──
    featConnectLabel: 'Connect With Us',
    featTitle: 'How We Can Serve You',
    card1Title: 'Prayer & Intercession',
    card1Body: 'Submit your prayer requests to our dedicated pastoral team for spiritual support and intercession around the clock.',
    card1Cta: 'Submit a Request',
    card2Title: 'Sermon Archive',
    card2Body: 'Explore scripture-rich teaching and revisit powerful messages from our preaching ministry to deepen your faith.',
    card2Cta: 'Browse Sermons',
    card3Title: 'Give Online',
    card3Body: 'Partner with us in ministry through secure online tithes and offerings, supporting our mission to spread the Gospel.',
    card3Cta: 'Give a Gift',

    // ── Ministries ──
    ministriesLabel: 'Our Ministries',
    ministriesTitle1: 'Life-Giving',
    ministriesTitle2: 'Communities',
    ministriesTitle3: 'for Every Season',
    ministriesBody: 'Our ministries serve every generation through discipleship, worship, and practical care. Find your place and grow alongside people who share your faith.',
    ministriesExplore: 'Explore All Ministries',
    min1Title: 'Youth & Family',
    min1Body: 'Nurturing the next generation in faith and leadership.',
    min2Title: 'Worship Arts',
    min2Body: 'Expressing faith through music, arts, and creative ministry.',
    min3Title: 'Outreach & Service',
    min3Body: 'Serving our community and sharing God\'s love in action.',
    min4Title: 'Small Groups',
    min4Body: 'Building community through fellowship and discipleship.',

    // ── Events ──
    eventsLabel: 'Upcoming Events',
    eventsTitle1: 'Join Us in',
    eventsTitle2: 'Person',
    eventsAllLink: 'All Events',
    event1Title: 'Sunday Morning Worship',
    event1Time: '9:00 AM & 11:00 AM',
    event1Tag: 'Weekly',
    event2Title: 'Midweek Bible Study',
    event2Time: '7:00 PM',
    event2Tag: 'Wednesday',
    event3Title: 'Youth Night',
    event3Time: '6:30 PM',
    event3Tag: 'Youth',

    // ── CTA ──
    ctaLabel: 'You Are Welcome Here',
    ctaTitle1: 'Ready to Find Your',
    ctaTitle2: 'Community?',
    ctaBody: "Whether you're visiting for the first time or looking to go deeper in faith — there is a place for you at Maranatha.",
    ctaPlanVisit: 'Plan Your Visit',
    ctaContact: 'Get in Touch',

    // ── Sermons Page ──
    sermonArchive: 'Sermon Archive',
    sermonDescription: 'Revisit recent messages and share biblical teaching with others.',
    speaker: 'Speaker:',
    date: 'Date:',
    watchSermon: 'Watch sermon',
    uploadSermon: 'Upload New Sermon',
    sermonTitle: 'Sermon Title',
    sermonTags: 'Tags',
    sermonVideo: 'Sermon Video',
    sermonThumbnail: 'Thumbnail Image',
    sermonPhotos: 'Sermon Photos',
    uploading: 'Uploading...',
    uploadSuccess: 'Sermon uploaded successfully!',
    viewDetails: 'View Details',
    viewPhotos: 'View Photos',
    photoGallery: 'Photo Gallery',

    // ── Common ──
    loading: 'Loading...',
    error: 'Error',
    retry: 'Retry',
    close: 'Close',
    save: 'Save',
    cancel: 'Cancel',
    submit: 'Submit',
    learnMore: 'Learn More',
    watchLive: 'Watch Live',
  },

  es: {
    // ── Navigation ──
    navHome: 'Inicio',
    navAbout: 'Nosotros',
    navMinistries: 'Ministerios',
    navMedia: 'Medios',
    navEvents: 'Eventos',
    navDevotionals: 'Devocionales',
    navContact: 'Contacto',
    navGiveOnline: 'Ofrendar',

    // ── Homepage Hero ──
    heroChurchBadge: 'Iglesia Cristiana Maranatha',
    heroLine1: 'Donde la Fe',
    heroLine2: 'Cobra Vida',
    heroScripture: '"Porque donde dos o tres se reúnen en mi nombre, allí estoy yo en medio de ellos."',
    heroScriptureRef: 'Mateo 18:20',
    heroJoinUs: 'Únase al Domingo',
    heroWatchOnline: 'Ver en Línea',
    heroScroll: 'Desplazar',

    // ── Stats ──
    statsYears: 'Años de Ministerio',
    statsMembers: 'Miembros de la Iglesia',
    statsServices: 'Servicios Semanales',
    statsMinistries: 'Ministerios Activos',

    // ── Feature Cards ──
    featConnectLabel: 'Conéctese con Nosotros',
    featTitle: 'Cómo Podemos Servirle',
    card1Title: 'Oración e Intercesión',
    card1Body: 'Envíe sus solicitudes de oración a nuestro equipo pastoral dedicado para apoyo espiritual e intercesión.',
    card1Cta: 'Enviar Solicitud',
    card2Title: 'Archivo de Predicaciones',
    card2Body: 'Explore enseñanzas bíblicas y revisit mensajes poderosos de nuestro ministerio de predicación.',
    card2Cta: 'Ver Predicaciones',
    card3Title: 'Dar en Línea',
    card3Body: 'Asóciese con nosotros en el ministerio a través de diezmos y ofrendas en línea seguros.',
    card3Cta: 'Dar una Ofrenda',

    // ── Ministries ──
    ministriesLabel: 'Nuestros Ministerios',
    ministriesTitle1: 'Comunidades',
    ministriesTitle2: 'que Dan Vida',
    ministriesTitle3: 'para Cada Temporada',
    ministriesBody: 'Nuestros ministerios sirven a cada generación a través del discipulado, la adoración y el cuidado práctico.',
    ministriesExplore: 'Explorar Todos los Ministerios',
    min1Title: 'Jóvenes y Familia',
    min1Body: 'Nutriendo a la próxima generación en la fe y el liderazgo.',
    min2Title: 'Artes de Adoración',
    min2Body: 'Expresando la fe a través de música, artes y ministerio creativo.',
    min3Title: 'Alcance y Servicio',
    min3Body: 'Sirviendo a nuestra comunidad y compartiendo el amor de Dios en acción.',
    min4Title: 'Grupos Pequeños',
    min4Body: 'Construyendo comunidad a través de la comunión y el discipulado.',

    // ── Events ──
    eventsLabel: 'Próximos Eventos',
    eventsTitle1: 'Únase en',
    eventsTitle2: 'Persona',
    eventsAllLink: 'Todos los Eventos',
    event1Title: 'Culto del Domingo por la Mañana',
    event1Time: '9:00 AM y 11:00 AM',
    event1Tag: 'Semanal',
    event2Title: 'Estudio Bíblico entre Semana',
    event2Time: '7:00 PM',
    event2Tag: 'Miércoles',
    event3Title: 'Noche de Jóvenes',
    event3Time: '6:30 PM',
    event3Tag: 'Jóvenes',

    // ── CTA ──
    ctaLabel: 'Usted es Bienvenido Aquí',
    ctaTitle1: '¿Listo para Encontrar su',
    ctaTitle2: 'Comunidad?',
    ctaBody: 'Ya sea que visite por primera vez o quiera crecer más en la fe, hay un lugar para usted en Maranatha.',
    ctaPlanVisit: 'Planifique su Visita',
    ctaContact: 'Contáctenos',

    // ── Sermons Page ──
    sermonArchive: 'Archivo de Predicaciones',
    sermonDescription: 'Vuelva a visitar mensajes recientes y comparta enseñanzas bíblicas con otros.',
    speaker: 'Predicador:',
    date: 'Fecha:',
    watchSermon: 'Ver predicación',
    uploadSermon: 'Subir Nueva Predicación',
    sermonTitle: 'Título de la Predicación',
    sermonTags: 'Etiquetas',
    sermonVideo: 'Video de la Predicación',
    sermonThumbnail: 'Imagen Miniatura',
    sermonPhotos: 'Fotos de la Predicación',
    uploading: 'Subiendo...',
    uploadSuccess: '¡Predicación subida exitosamente!',
    viewDetails: 'Ver Detalles',
    viewPhotos: 'Ver Fotos',
    photoGallery: 'Galería de Fotos',

    // ── Common ──
    loading: 'Cargando...',
    error: 'Error',
    retry: 'Reintentar',
    close: 'Cerrar',
    save: 'Guardar',
    cancel: 'Cancelar',
    submit: 'Enviar',
    learnMore: 'Conocer Más',
    watchLive: 'Ver en Vivo',
  },

  fr: {
    // ── Navigation ──
    navHome: 'Accueil',
    navAbout: 'À Propos',
    navMinistries: 'Ministères',
    navMedia: 'Médias',
    navEvents: 'Événements',
    navDevotionals: 'Dévotionnels',
    navContact: 'Contact',
    navGiveOnline: 'Faire un Don',

    // ── Homepage Hero ──
    heroChurchBadge: 'Église Chrétienne Maranatha',
    heroLine1: 'Où la Foi',
    heroLine2: 'Prend Vie',
    heroScripture: '"Car là où deux ou trois sont réunis en mon nom, je suis au milieu d\'eux."',
    heroScriptureRef: 'Matthieu 18:20',
    heroJoinUs: 'Rejoignez-nous Dimanche',
    heroWatchOnline: 'Regarder en Ligne',
    heroScroll: 'Défiler',

    // ── Stats ──
    statsYears: 'Années de Ministère',
    statsMembers: 'Membres de l\'Église',
    statsServices: 'Services Hebdomadaires',
    statsMinistries: 'Ministères Actifs',

    // ── Feature Cards ──
    featConnectLabel: 'Connectez-vous avec Nous',
    featTitle: 'Comment Nous Pouvons Vous Servir',
    card1Title: 'Prière et Intercession',
    card1Body: 'Soumettez vos demandes de prière à notre équipe pastorale dédiée pour un soutien spirituel.',
    card1Cta: 'Soumettre une Demande',
    card2Title: 'Archive des Prédications',
    card2Body: 'Explorez l\'enseignement biblique et revisitez de puissants messages de notre ministère.',
    card2Cta: 'Parcourir les Prédications',
    card3Title: 'Donner en Ligne',
    card3Body: 'Partenaire avec nous dans le ministère à travers des dîmes et offrandes sécurisées en ligne.',
    card3Cta: 'Faire un Don',

    // ── Ministries ──
    ministriesLabel: 'Nos Ministères',
    ministriesTitle1: 'Communautés',
    ministriesTitle2: 'Vivifiantes',
    ministriesTitle3: 'pour Chaque Saison',
    ministriesBody: 'Nos ministères servent chaque génération à travers le discipulat, l\'adoration et des soins pratiques.',
    ministriesExplore: 'Explorer Tous les Ministères',
    min1Title: 'Jeunesse et Famille',
    min1Body: 'Nourrir la prochaine génération dans la foi et le leadership.',
    min2Title: 'Arts d\'Adoration',
    min2Body: 'Exprimer la foi à travers la musique, les arts et le ministère créatif.',
    min3Title: 'Sensibilisation et Service',
    min3Body: 'Servir notre communauté et partager l\'amour de Dieu en action.',
    min4Title: 'Petits Groupes',
    min4Body: 'Construire la communauté à travers la communion et le discipulat.',

    // ── Events ──
    eventsLabel: 'Événements à Venir',
    eventsTitle1: 'Rejoignez-nous en',
    eventsTitle2: 'Personne',
    eventsAllLink: 'Tous les Événements',
    event1Title: 'Culte du Dimanche Matin',
    event1Time: '9h00 et 11h00',
    event1Tag: 'Hebdomadaire',
    event2Title: 'Étude Biblique de Semaine',
    event2Time: '19h00',
    event2Tag: 'Mercredi',
    event3Title: 'Soirée Jeunesse',
    event3Time: '18h30',
    event3Tag: 'Jeunesse',

    // ── CTA ──
    ctaLabel: 'Vous Êtes le Bienvenu Ici',
    ctaTitle1: 'Prêt à Trouver votre',
    ctaTitle2: 'Communauté?',
    ctaBody: 'Que vous visitiez pour la première fois ou que vous souhaitiez approfondir votre foi — il y a une place pour vous à Maranatha.',
    ctaPlanVisit: 'Planifier votre Visite',
    ctaContact: 'Nous Contacter',

    // ── Sermons Page ──
    sermonArchive: 'Archives des Prédications',
    sermonDescription: 'Revisitez les messages récents et partagez l\'enseignement biblique avec d\'autres.',
    speaker: 'Prédicateur:',
    date: 'Date:',
    watchSermon: 'Regarder la prédication',
    uploadSermon: 'Télécharger Nouvelle Prédication',
    sermonTitle: 'Titre de la Prédication',
    sermonTags: 'Étiquettes',
    sermonVideo: 'Vidéo de la Prédication',
    sermonThumbnail: 'Image Miniature',
    sermonPhotos: 'Photos de la Prédication',
    uploading: 'Téléchargement...',
    uploadSuccess: 'Prédication téléchargée avec succès!',
    viewDetails: 'Voir les Détails',
    viewPhotos: 'Voir les Photos',
    photoGallery: 'Galerie de Photos',

    // ── Common ──
    loading: 'Chargement...',
    error: 'Erreur',
    retry: 'Réessayer',
    close: 'Fermer',
    save: 'Sauvegarder',
    cancel: 'Annuler',
    submit: 'Soumettre',
    learnMore: 'En Savoir Plus',
    watchLive: 'Regarder en Direct',
  },

  nl: {
    // ── Navigation ──
    navHome: 'Home',
    navAbout: 'Over Ons',
    navMinistries: 'Bedieningen',
    navMedia: 'Media',
    navEvents: 'Evenementen',
    navDevotionals: 'Overdenkingen',
    navContact: 'Contact',
    navGiveOnline: 'Online Geven',

    // ── Homepage Hero ──
    heroChurchBadge: 'Maranatha Christelijke Kerk',
    heroLine1: 'Waar Geloof',
    heroLine2: 'Tot Leven Komt',
    heroScripture: '"Want waar twee of drie in mijn naam bijeen zijn, daar ben ik in hun midden."',
    heroScriptureRef: 'Mattheüs 18:20',
    heroJoinUs: 'Kom op Zondag',
    heroWatchOnline: 'Online Kijken',
    heroScroll: 'Scrollen',

    // ── Stats ──
    statsYears: 'Jaar Bediening',
    statsMembers: 'Kerkleden',
    statsServices: 'Wekelijkse Diensten',
    statsMinistries: 'Actieve Bedieningen',

    // ── Feature Cards ──
    featConnectLabel: 'Verbind met Ons',
    featTitle: 'Hoe Wij U Kunnen Dienen',
    card1Title: 'Gebed en Voorbede',
    card1Body: 'Dien uw gebedverzoeken in bij ons toegewijde pastorale team voor geestelijke ondersteuning.',
    card1Cta: 'Verzoek Indienen',
    card2Title: 'Preek Archief',
    card2Body: 'Verken bijbelse leer en herbezoek krachtige boodschappen van ons predikingsbediening.',
    card2Cta: 'Preken Bekijken',
    card3Title: 'Online Geven',
    card3Body: 'Partner met ons in bediening via veilige online tienden en offeranden.',
    card3Cta: 'Een Gift Geven',

    // ── Ministries ──
    ministriesLabel: 'Onze Bedieningen',
    ministriesTitle1: 'Levengevende',
    ministriesTitle2: 'Gemeenschappen',
    ministriesTitle3: 'voor Elk Seizoen',
    ministriesBody: 'Onze bedieningen dienen elke generatie door discipelschap, aanbidding en praktische zorg.',
    ministriesExplore: 'Alle Bedieningen Verkennen',
    min1Title: 'Jeugd en Gezin',
    min1Body: 'De volgende generatie voeden in geloof en leiderschap.',
    min2Title: 'Aanbiddingskunsten',
    min2Body: 'Geloof uitdrukken door muziek, kunsten en creatieve bediening.',
    min3Title: 'Bereik en Dienst',
    min3Body: 'Onze gemeenschap dienen en Gods liefde in actie delen.',
    min4Title: 'Kleine Groepen',
    min4Body: 'Gemeenschap opbouwen door gemeenschap en discipelschap.',

    // ── Events ──
    eventsLabel: 'Aankomende Evenementen',
    eventsTitle1: 'Kom bij Ons in',
    eventsTitle2: 'Persoon',
    eventsAllLink: 'Alle Evenementen',
    event1Title: 'Zondagochtend Eredienst',
    event1Time: '9:00 en 11:00',
    event1Tag: 'Wekelijks',
    event2Title: 'Bijbelstudie Doordeweeks',
    event2Time: '19:00',
    event2Tag: 'Woensdag',
    event3Title: 'JongerenAvond',
    event3Time: '18:30',
    event3Tag: 'Jongeren',

    // ── CTA ──
    ctaLabel: 'U Bent Hier Welkom',
    ctaTitle1: 'Klaar om uw',
    ctaTitle2: 'Gemeenschap te Vinden?',
    ctaBody: 'Of u nu voor het eerst op bezoek bent of dieper in geloof wilt groeien — er is een plek voor u bij Maranatha.',
    ctaPlanVisit: 'Plan uw Bezoek',
    ctaContact: 'Neem Contact Op',

    // ── Sermons Page ──
    sermonArchive: 'Preek Archief',
    sermonDescription: 'Bekijk recente preken en deel bijbelse onderwijs met anderen.',
    speaker: 'Voorganger:',
    date: 'Datum:',
    watchSermon: 'Bekijk preek',
    uploadSermon: 'Upload Nieuwe Preek',
    sermonTitle: 'Preek Titel',
    sermonTags: 'Tags',
    sermonVideo: 'Preek Video',
    sermonThumbnail: 'Miniatuur Afbeelding',
    sermonPhotos: "Preek Foto's",
    uploading: 'Uploaden...',
    uploadSuccess: 'Preek succesvol geüpload!',
    viewDetails: 'Bekijk Details',
    viewPhotos: "Bekijk Foto's",
    photoGallery: 'Foto Galerij',

    // ── Common ──
    loading: 'Laden...',
    error: 'Fout',
    retry: 'Opnieuw proberen',
    close: 'Sluiten',
    save: 'Opslaan',
    cancel: 'Annuleren',
    submit: 'Verzenden',
    learnMore: 'Meer Leren',
    watchLive: 'Live Kijken',
  },

  // ── አማርኛ (Amharic) ──
  am: {
    navHome: 'መነሻ',
    navAbout: 'ስለ እኛ',
    navMinistries: 'አገልግሎቶች',
    navMedia: 'ሚዲያ',
    navEvents: 'ዝግጅቶች',
    navDevotionals: 'ትምህርቶች',
    navContact: 'ያግኙን',
    navGiveOnline: 'ምጽዋት ስጡ',

    heroChurchBadge: 'ማራናታ ክርስቲያን ቤተ ክርስቲያን',
    heroLine1: 'እምነት',
    heroLine2: 'ሕያው ይሆናል',
    heroScripture: '"ሁለት ወይም ሦስት ሰዎች በስሜ ሲሰበሰቡ፥ ከእነርሱ ጋር ነኝ።"',
    heroScriptureRef: 'ማቴዎስ 18፡20',
    heroJoinUs: 'እሁድ ይቀላቀሉን',
    heroWatchOnline: 'ኦንላይን ይመልከቱ',
    heroScroll: 'ወደ ታች',

    statsYears: 'ዓመታት አገልግሎት',
    statsMembers: 'የቤተ ክርስቲያን አባላት',
    statsServices: 'ሳምንታዊ አገልግሎቶች',
    statsMinistries: 'ንቁ አገልግሎቶች',

    featConnectLabel: 'ከእኛ ጋር ይቀላቀሉ',
    featTitle: 'እንዴት ልናገለግልዎ እንችላለን',
    card1Title: 'ጸሎት እና ምልጃ',
    card1Body: 'የጸሎት ጥያቄዎችዎን ለፓስቶሬሽናችን ቡድን ይላኩ።',
    card1Cta: 'ጥያቄ ያስገቡ',
    card2Title: 'የስብከት ማህደር',
    card2Body: 'ከስብከት አገልግሎታችን ኃያል መልዕክቶችን ያዳምጡ።',
    card2Cta: 'ስብከቶችን ይመልከቱ',
    card3Title: 'ኦንላይን ይስጡ',
    card3Body: 'ወንጌልን ለማስፋፋት ካለን ተልዕኮ ጋር ይተባበሩ።',
    card3Cta: 'ስጦታ ይስጡ',

    ministriesLabel: 'አገልግሎቶቻችን',
    ministriesTitle1: 'ሕይወት ሰጪ',
    ministriesTitle2: 'ማህበረሰቦች',
    ministriesTitle3: 'ለእያንዳንዱ ዘመን',
    ministriesBody: 'አገልግሎቶቻችን እያንዳንዱን ትውልድ በደቀ መዝሙርነት፥ አምልኮ እና ተግባራዊ እንክብካቤ ያገለግላሉ።',
    ministriesExplore: 'ሁሉንም አገልግሎቶች ያስሱ',
    min1Title: 'ወጣቶች እና ቤተሰብ',
    min1Body: 'ቀጣዩን ትውልድ በእምነት እና አመራር ያሳድጉ።',
    min2Title: 'የአምልኮ ጥበቦች',
    min2Body: 'በሙዚቃ፥ ጥበቦች እና ፈጠራዊ አገልግሎት እምነትን ይግለጹ።',
    min3Title: 'ምስጋና እና አገልግሎት',
    min3Body: 'ማህበረሰባችንን አገልግለን የእግዚአብሔርን ፍቅር ካፍሉ።',
    min4Title: 'ትናንሽ ቡድኖች',
    min4Body: 'በኅብረት እና ደቀ መዝሙርነት ማህበረሰብ ይገንቡ።',

    eventsLabel: 'መጪ ዝግጅቶች',
    eventsTitle1: 'ከእኛ ጋር',
    eventsTitle2: 'ይቀላቀሉ',
    eventsAllLink: 'ሁሉም ዝግጅቶች',
    event1Title: 'የእሁድ ጠዋት አምልኮ',
    event1Time: 'ጥዋት 9:00 እና 11:00',
    event1Tag: 'ሳምንታዊ',
    event2Title: 'አጋማሽ ሳምንት የቅዱስ ጽሑፍ ጥናት',
    event2Time: 'ምሽት 7:00',
    event2Tag: 'ረቡዕ',
    event3Title: 'የወጣቶች ምሽት',
    event3Time: 'ምሽት 6:30',
    event3Tag: 'ወጣቶች',

    ctaLabel: 'እዚህ እንኳን ደህና መጡ',
    ctaTitle1: 'ማህበረሰብዎን ለማግኘት',
    ctaTitle2: 'ዝግጁ ነዎት?',
    ctaBody: 'ለመጀመሪያ ጊዜ ጎብኚ ወይም በእምነት ለማደግ ፈላጊ — በማራናታ ለእርስዎ ቦታ አለ።',
    ctaPlanVisit: 'ጉብኝትዎን ያቅዱ',
    ctaContact: 'ያግኙን',

    sermonArchive: 'የስብከት ማህደር',
    sermonDescription: 'የቅርብ ጊዜ መልዕክቶችን ያስሱ እና ከሌሎች ጋር ያካፍሉ።',
    speaker: 'ሰባኪ:',
    date: 'ቀን:',
    watchSermon: 'ስብከቱን ይመልከቱ',
    uploadSermon: 'አዲስ ስብከት ያስገቡ',
    sermonTitle: 'የስብከቱ ርዕስ',
    sermonTags: 'መለያዎች',
    sermonVideo: 'የስብከት ቪዲዮ',
    sermonThumbnail: 'የሽፋን ምስል',
    sermonPhotos: 'የስብከት ፎቶዎች',
    uploading: 'በማስገባት ላይ...',
    uploadSuccess: 'ስብከቱ ተሳክቷል!',
    viewDetails: 'ዝርዝሩን ይመልከቱ',
    viewPhotos: 'ፎቶዎችን ይመልከቱ',
    photoGallery: 'የፎቶ ማዕድ',

    loading: 'በመጫን ላይ...',
    error: 'ስህተት',
    retry: 'እንደገና ሞክሩ',
    close: 'ዝጉ',
    save: 'አስቀምጡ',
    cancel: 'ይቅር',
    submit: 'ያስገቡ',
    learnMore: 'ተጨማሪ ይወቁ',
    watchLive: 'ቀጥታ ይመልከቱ',
  },

  // ── ትግርኛ (Tigrinya) ──
  ti: {
    navHome: 'ቀዳማይ',
    navAbout: 'ብዛዕባና',
    navMinistries: 'አገልግሎታት',
    navMedia: 'ሚዲያ',
    navEvents: 'ምርኢታት',
    navDevotionals: 'ናይ ኣምልኾ ትምህርቲ',
    navContact: 'ተወከሱና',
    navGiveOnline: 'ኦንላይን ሀቡ',

    heroChurchBadge: 'ማራናታ ክርስቲያን ቤተ ክርስቲያን',
    heroLine1: 'እምነት',
    heroLine2: 'ሕያው ዝኾነሉ',
    heroScripture: '"ክልተ ወይ ሰለስተ ሰባት ብስመይ ኣብ ዝእከቡሉ ኣነ ኣብ ማእከሎም ኣለኹ።"',
    heroScriptureRef: 'ማቴዎስ 18:20',
    heroJoinUs: 'ሰንበት ሓቡኑ',
    heroWatchOnline: 'ኦንላይን ርኣዩ',
    heroScroll: 'ቀጽሉ',

    statsYears: 'ዓመታት ኣምልኾ',
    statsMembers: 'ኣባላት ቤተ ክርስቲያን',
    statsServices: 'ሳምንታዊ ኣምልኾታት',
    statsMinistries: 'ናይ ኣምልኾ ኣገልግሎታት',

    featConnectLabel: 'ምሳና ተወሃሃዱ',
    featTitle: 'ብኸመይ ከነገለግለኩም ንኽእል',
    card1Title: 'ጸሎት ምልጃ',
    card1Body: 'ናብ ናይ ጸሎት ቡድናና ሕቶታት ጸሎትኩም ለኣኹ።',
    card1Cta: 'ሕቶ ሃቡ',
    card2Title: 'ቤተ ዕቁብ ስብከት',
    card2Body: 'ካብ ስብከትና ዝተሓዘ ሓያሎ መልዕክታት ርኣዩ።',
    card2Cta: 'ስብከታት ርኣዩ',
    card3Title: 'ኦንላይን ሃቡ',
    card3Body: 'ናይ ወንጌል ዝርጋሐ ዕዮ ተሓባበሩ።',
    card3Cta: 'ዕቑብ ሃቡ',

    ministriesLabel: 'ኣገልግሎታትና',
    ministriesTitle1: 'ሕይወት ዝህቡ',
    ministriesTitle2: 'ማሕበረሰባት',
    ministriesTitle3: 'ንዝኾነ ወቕቲ',
    ministriesBody: 'ኣገልግሎታትና ንዝኾነ ወለዶ ብደቀ-ምሃሮ፡ ምስጋና፡ ተግባራዊ ምሕታም ይምልከት።',
    ministriesExplore: 'ኩሎም ኣገልግሎታት ፈልጡ',
    min1Title: 'ወጻዕቲ ቤተሰብ',
    min1Body: 'ቀጻሊ ወለዶ ብእምነት እና ምምራሕ ዓቕቡ።',
    min2Title: 'ናይ ምስጋና ኪነ-ጥበባት',
    min2Body: 'ብሙዚቃ፡ ኪነ-ጥበባት ፈጠራዊ ኣምልኾ እምነት ግለጽ።',
    min3Title: 'ናይ ምልዓል ስርሓት',
    min3Body: 'ማሕበረሰብና ንምምሕዳር ናይ ኣምላኽ ፍቕሪ ካብ ዕዮ ናብ ዕዮ ኣካፍሉ።',
    min4Title: 'ንኡሳን ጉጅሌታት',
    min4Body: 'ብሕብረት ደቀ-ምሃሮ ማሕበረሰብ ሃኑ።',

    eventsLabel: 'መጻኢ ምርኢታት',
    eventsTitle1: 'ምሳና',
    eventsTitle2: 'ሓቡኑ',
    eventsAllLink: 'ኩሎም ምርኢታት',
    event1Title: 'ናይ ሰንበት ጠዋሪ ምስጋና',
    event1Time: 'ሰዓት 9:00 እና 11:00',
    event1Tag: 'ሳምንታዊ',
    event2Title: 'ናይ ኣጋማሽ ሰሙን ጽሑፍ ጽናሕ',
    event2Time: 'ምሽት 7:00',
    event2Tag: 'ሮቡዕ',
    event3Title: 'ናይ ወጻዕቲ ምሽት',
    event3Time: 'ምሽት 6:30',
    event3Tag: 'ወጻዕቲ',

    ctaLabel: 'ኣብዚ ብደሓን ምጹ',
    ctaTitle1: 'ማሕበረሰብኩም ክትረኽቡ',
    ctaTitle2: 'ድሉዋት ዶ ኣለኹም?',
    ctaBody: 'ንፈለማ ጊዜ ይኹን ብእምነት ዓሚቕ ክትከዱ — ኣብ ማራናታ ቦታ ኣለኩም።',
    ctaPlanVisit: 'ምብጻሕ ምድላው',
    ctaContact: 'ተወከሱና',

    sermonArchive: 'ቤተ ዕቁብ ስብከት',
    sermonDescription: 'ዝሓለፉ መልዕክታት ርኣዩ ምምሃር ካልኦት ሃቡ።',
    speaker: 'ሰባኺ:',
    date: 'ዕለት:',
    watchSermon: 'ስብከት ርኣዩ',
    uploadSermon: 'ሓዲሽ ስብከት ኣስፍሩ',
    sermonTitle: 'ኣርዑት ስብከት',
    sermonTags: 'ምልክታት',
    sermonVideo: 'ቪዲዮ ስብከት',
    sermonThumbnail: 'ናይ ሽፋን ምስሊ',
    sermonPhotos: 'ፎቶ ስብከት',
    uploading: 'ኣብ ምስቃል...',
    uploadSuccess: 'ስብከቱ ተሰቂሉ!',
    viewDetails: 'ዝርዝር ርኣዩ',
    viewPhotos: 'ፎቶታት ርኣዩ',
    photoGallery: 'ናይ ፎቶ ዕቑብ',

    loading: 'ኣብ ምጽዓን...',
    error: 'ጌጋ',
    retry: 'ካብ ዳሕሮ ፈትን',
    close: 'ዕጸ',
    save: 'ዕቐብ',
    cancel: 'ሰርዝ',
    submit: 'ሃብ',
    learnMore: 'ተወሳኺ ፍለጥ',
    watchLive: 'ቀጥታ ርኣዩ',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  availableLanguages: { code: Language; name: string; flag: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  // Persist selection across page navigations
  useEffect(() => {
    const saved = localStorage.getItem('maranatha-lang') as Language | null;
    if (saved && ['en', 'es', 'fr', 'nl', 'am', 'ti'].includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('maranatha-lang', lang);
  };

  const t = (key: string): string =>
    defaultTranslations[language]?.[key] ?? defaultTranslations.en[key] ?? key;

  const availableLanguages = [
    { code: 'en' as Language, name: 'English',    flag: '🇬🇧' },
    { code: 'es' as Language, name: 'Español',    flag: '🇪🇸' },
    { code: 'fr' as Language, name: 'Français',   flag: '🇫🇷' },
    { code: 'nl' as Language, name: 'Nederlands', flag: '🇳🇱' },
    { code: 'am' as Language, name: 'አማርኛ',      flag: '🇪🇹' },
    { code: 'ti' as Language, name: 'ትግርኛ',      flag: '🇪🇷' },
  ];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export { defaultTranslations };
