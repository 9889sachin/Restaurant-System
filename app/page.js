import Link from "next/link";
import { ArrowRight, Utensils, Zap, Clock, Star } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-xl border-t-4 border-orange-500 transition duration-300 hover:scale-[1.02]">
    <Icon className="w-10 h-10 text-orange-500 mb-4 p-1.5 bg-orange-50 rounded-full" />
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const HighlightCard = ({ title, description, price, imageUrl }) => (
  <div className="rounded-2xl overflow-hidden shadow-xl bg-white transform transition duration-300 hover:shadow-2xl hover:-translate-y-1">
    <img
      src={imageUrl}
      alt={title}
      className="w-full h-48 object-cover"
    />
    <div className="p-5">
      <h4 className="text-xl font-bold text-gray-900">{title}</h4>
      <p className="text-gray-500 my-2">{description}</p>
      <div className="flex justify-between items-center mt-3">
        <span className="text-2xl font-extrabold text-orange-600">{price}</span>
        <Link
          href="/menu"
          className="text-sm font-semibold text-orange-600 hover:text-orange-700 flex items-center"
        >
          Order Now <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  </div>
);

export default function HomePageMainContent() {
  return (
    <div className="min-h-screen bg-gray-50">

      <section className="relative pt-24 pb-32 sm:pt-36 sm:pb-48 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg font-semibold text-orange-600 uppercase tracking-wider mb-3">
            Your Next Favorite Meal is Waiting 🍕
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
            Seamless Ordering. <span className="text-orange-600">Delicious Results.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-600 mb-12">
            Experience food delivery redefined. Quick, fresh, and tailored to your cravings—start your order now!
          </p>

          <div className="flex justify-center space-x-6">
            <Link
              href="/menu"
              className="inline-flex items-center justify-center rounded-xl bg-orange-600 px-10 py-4 text-lg font-semibold text-white shadow-xl hover:bg-orange-700 transition transform hover:-translate-y-1"
            >
              Start Your Order <ArrowRight className="w-5 h-5 ml-3" />
            </Link>
            <Link
              href="/reservations"
              className="hidden sm:inline-flex items-center justify-center rounded-xl border-2 border-orange-500 bg-white px-10 py-4 text-lg font-semibold text-orange-600 shadow-md hover:bg-orange-50 transition"
            >
              Book a Table
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Why Dine With Us?
          </h2>
          <p className="text-lg text-center text-gray-600 mb-12">
            We are committed to quality, speed, and unforgettable taste.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Utensils}
              title="Gourmet Quality"
              description="Our meals are crafted by professional chefs using premium, market-fresh ingredients."
            />
            <FeatureCard
              icon={Zap}
              title="Real-Time Tracking"
              description="Get instant updates and track your delivery driver from our kitchen to your door."
            />
            <FeatureCard
              icon={Clock}
              title="24/7 Support"
              description="Our dedicated customer service team is always available to help with your order or questions."
            />
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Our Chef's Specials
            </h2>
            <p className="text-lg text-gray-600">
              Highly rated and recommended by our loyal customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <HighlightCard
              title="Truffle Mushroom Pizza"
              description="A savory blend of wild mushrooms, truffle oil, and creamy mozzarella."
              price="$18.99"
              imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_MlPb7hG0mdHH1P9zXQdbnqPG_RHBff_N3g&s" // Replace with actual image URL
            />
            <HighlightCard
              title="Signature Burger"
              description="200g patty, aged cheddar, caramelized onions, and our secret sauce."
              price="$15.50"
              imageUrl="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iSCMNgAaVTLM/v1/-1x-1.webp" // Replace with actual image URL
            />
            <HighlightCard
              title="Classic Lasagna"
              description="Layers of fresh pasta, rich Bolognese sauce, and a blend of Italian cheeses."
              price="$16.99"
              imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVWLEostP3KWlE9x3cpfvFeakDgT--ldfleQ&s" // Replace with actual image URL
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Star className="w-12 h-12 text-white mx-auto mb-4" fill="white" />
            <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Taste the Difference?
            </h2>
            <p className="text-xl text-orange-100 mb-8">
                Join thousands of happy customers. Your next great meal is just a click away.
            </p>
            <Link
              href="/menu"
              className="inline-flex items-center justify-center rounded-xl bg-white px-10 py-4 text-lg font-semibold text-orange-600 shadow-2xl hover:bg-gray-100 transition"
            >
              Order Now & Get 10% Off
            </Link>
        </div>
      </section>

    </div>
  );
}