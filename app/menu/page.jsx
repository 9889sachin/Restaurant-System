"use client";
import { useEffect, useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { Search, Utensils, Loader2, PlusCircle } from "lucide-react";

const DUMMY_MENU = [
  { _id: '1', name: 'Margherita Pizza', description: 'Classic tomato and mozzarella.', price: 499.00, category: 'Pizza', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1j96PcBeCX3HZlF9BMRBFrhE5994SRqYqmQ&s' },
  { _id: '2', name: 'Truffle Pasta', description: 'Creamy sauce with black truffle shavings.', price: 650.00, category: 'Pasta', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf3j-xDku4kh6GuK_-n3JB7JH6ZLFNol1hXA&s' },
  { _id: '3', name: 'Cheeseburger', description: 'All-beef patty, cheddar, lettuce, and secret sauce.', price: 350.00, category: 'Burgers', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyPlGmDDZtiV2xNp_rfqXVecjavV8Ue74hbQ&s' },
  { _id: '4', name: 'Veggie Burger', description: 'Homemade veggie patty with fresh avocado.', price: 320.00, category: 'Burgers', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN1E5aY2fWSsGlqeuDw1P3j9Sv8Lg8xDBnhA&s' },
  { _id: '5', name: 'Pepperoni Pizza', description: 'Spicy pepperoni and extra cheese.', price: 599.00, category: 'Pizza', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBCWdojj6FjUrEBZIqQqUFK8WAwjawxj0r4A&s' },
  { _id: '6', name: 'Fettuccine Alfredo', description: 'Rich parmesan cream sauce.', price: 480.00, category: 'Pasta', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgsb6KX14KpLNVpg9gYX39CVQLvpyy_SLPAQ&s' },
  { _id: '7', name: 'Truffle Mushroom Pizza', description: 'A savory blend of wild mushrooms, truffle oil, and creamy mozzarella.', price: 699.00, category: 'Pizza', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_MlPb7hG0mdHH1P9zXQdbnqPG_RHBff_N3g&s' },
  { _id: '9', name: 'Classic Lasagna', description: 'Layers of fresh pasta, rich Bolognese sauce, and a blend of Italian cheeses.', price: 699.00, category: 'Pasta', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVWLEostP3KWlE9x3cpfvFeakDgT--ldfleQ&s' },
];


export default function MenuPage() {
    const { data: session, status } = useSession(); 
    const isAuthenticated = status === 'authenticated';
    
    const [localOrders, setLocalOrders] = useState([]);

    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch("/api/menu")
            .then(res => res.json())
            .then(data => {
                setMenu(data.length ? data : DUMMY_MENU);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setMenu(DUMMY_MENU);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (status === 'authenticated' && session?.user?.email) {
            const userEmailKey = session.user.email;
            const orders = JSON.parse(localStorage.getItem(`orders_${userEmailKey}`)) || [];
            setLocalOrders(orders);
        } else if (status === 'unauthenticated') {
            setLocalOrders([]);
        }
    }, [status, session]);

    const categories = useMemo(() => {
        const allCategories = menu.map(item => item.category);
        return ['All', ...new Set(allCategories)];
    }, [menu]);

    const filteredMenu = useMemo(() => {
        return menu.filter(item => {
            const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;
            const searchMatch =
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase());
            return categoryMatch && searchMatch;
        });
    }, [menu, selectedCategory, searchTerm]);

    const handleAdd = (item) => {
        if (!isAuthenticated) {
            alert("Please login to add items to your orders.");
            return;
        }

        const userEmailKey = session.user.email;
        const currentUserOrders = JSON.parse(localStorage.getItem(`orders_${userEmailKey}`)) || [];

        if (currentUserOrders.some(o => o._id === item._id)) {
             alert(`${item.name} is already in your order list!`);
             return;
        }

        const updatedOrders = [...currentUserOrders, item];
        localStorage.setItem(`orders_${userEmailKey}`, JSON.stringify(updatedOrders));

        window.location.href = '/orders'; 
    };

    if (loading || status === 'loading') {
        return (
            <div className="flex justify-center items-center h-96">
                <Loader2 className="w-8 h-8 text-orange-600 animate-spin mr-3" />
                <p className="text-xl text-gray-600">Loading delicious food...</p>
            </div>
        );
    }

    return (
        <div className="py-8">
            <div className="text-center mb-10">
                <h1 className="text-5xl font-extrabold text-gray-900 mb-2">
                    What's Cooking? <Utensils className="inline-block w-8 h-8 text-orange-600 ml-2" />
                </h1>
                <p className="text-xl text-gray-500">Find your meal by category or search anything on the menu.</p>
            </div>
            <div className=" mb-10 p-4 bg-white">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" /> 
                        <input
                            type="text"
                            placeholder="Search dish or ingredient..."
                            className="w-full border border-gray-300 pl-11 pr-10 py-3 rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap justify-center sm:justify-end gap-2 p-1.5 bg-orange-50 rounded-xl">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 text-sm font-semibold rounded-lg transition transform hover:scale-105 ${
                                    selectedCategory === cat
                                        ? 'bg-orange-600 text-white shadow-lg'
                                        : 'bg-transparent text-gray-700 hover:bg-white hover:text-orange-600'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredMenu.length > 0 ? (
                    filteredMenu.map((item) => {
                        const isAdded = localOrders.some(o => o._id === item._id);
                        
                        return (
                            <div
                                key={item._id}
                                className="bg-white rounded-xl shadow-xl overflow-hidden transform transition duration-300 hover:shadow-2xl hover:-translate-y-1"
                            >
                                <img
                                    src={item.image || 'https://via.placeholder.com/400x250?text=No+Image'}
                                    alt={item.name}
                                    className="w-full h-48 object-cover"
                                    loading="lazy"
                                />
                                <div className="p-5">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full mb-1 inline-block">
                                        {item.category}
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                                    <p className="text-gray-500 text-sm h-10 overflow-hidden line-clamp-2">{item.description}</p>

                                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                                        <p className="text-2xl font-extrabold text-orange-600">₹{item.price.toFixed(2)}</p>
                                        <button
                                            className={`flex items-center px-4 py-2 rounded-full font-medium text-sm transition ${
                                                isAdded
                                                    ? "bg-gray-400 text-white cursor-not-allowed" 
                                                    : "bg-orange-600 text-white hover:bg-orange-700"
                                            }`}
                                            disabled={isAdded || !isAuthenticated} 
                                            onClick={() => handleAdd(item)}
                                        >
                                            <PlusCircle className="w-4 h-4 mr-1" />
                                            {isAdded ? "Added" : "Add"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="col-span-full text-center py-10">
                        <h3 className="text-2xl text-gray-600">
                            No items found in "{selectedCategory}" matching "{searchTerm}". 😔
                        </h3>
                    </div>
                )}
            </div>
        </div>
    );
}