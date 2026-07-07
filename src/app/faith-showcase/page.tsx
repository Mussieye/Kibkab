import { SpiritualImage } from "@/components/ui/spiritual-image";

export default function FaithShowcasePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <section className="text-center">
        <h1 className="font-serif text-4xl text-royal-purple mb-4">
          Faith in Focus
        </h1>
        <p className="text-lg text-charcoal/80">
          Experience the beauty and symbolism of our faith through sacred imagery
        </p>
      </section>

      <SpiritualImage 
        src="/your-jesus-image.jpg" 
        alt="Jesus with crown of thorns - Symbol of faith and sacrifice"
        className="my-8"
      />

      <section className="rounded-3xl border border-royal-purple/15 bg-gradient-to-br from-cream to-white p-8 shadow-medium">
        <h2 className="font-serif text-2xl text-royal-purple mb-4">
          The Symbolism of Faith
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-royal-purple to-burgundy flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">✝</span>
            </div>
            <div>
              <h3 className="font-semibold text-royal-purple mb-2">Crown of Thorns</h3>
              <p className="text-charcoal/70">Represents the sacrifice and suffering of Christ for humanity</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-gold to-gold-light flex items-center justify-center flex-shrink-0">
              <span className="text-royal-purple font-bold">♰</span>
            </div>
            <div>
              <h3 className="font-semibold text-royal-purple mb-2">Divine Light</h3>
              <p className="text-charcoal/70">Symbolizes the presence and glory of God in our lives</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-sage to-sage-light flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">✟</span>
            </div>
            <div>
              <h3 className="font-semibold text-royal-purple mb-2">Eternal Hope</h3>
              <p className="text-charcoal/70">Represents the promise of resurrection and eternal life</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-sky to-sky-light flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">☨</span>
            </div>
            <div>
              <h3 className="font-semibold text-royal-purple mb-2">Spiritual Peace</h3>
              <p className="text-charcoal/70">Signifies the inner peace that comes through faith</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
