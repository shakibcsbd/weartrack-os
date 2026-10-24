'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Package, ShoppingBag, Truck, RotateCcw, Plus, Search, 
  Filter, CheckCircle, AlertCircle, ArrowUpRight, ArrowDownRight, 
  BarChart3, RefreshCw, Eye, Download, Tag, Boxes, ShieldAlert,
  ChevronRight, Calendar, Phone, MapPin, User, FolderPlus, Trash2, X,
  Lock, Mail, LogOut, ShieldCheck, KeyRound, Database
} from 'lucide-react';

// Default initial datasets for first-time load
const DEFAULT_CATEGORIES = [
  'T-Shirts', 'Shirts', 'Pants', 'Jackets', 'Panjabi', 'Hoodies'
];

const DEFAULT_PRODUCTS = [
  {
    id: 'P-101',
    name: 'Premium Drop-Shoulder T-Shirt',
    category: 'T-Shirts',
    sku: 'DST-BLK-01',
    price: 650,
    cost: 320,
    variants: {
      'S': { stock: 24, inCourier: 6, sold: 45, returned: 3 },
      'M': { stock: 48, inCourier: 14, sold: 112, returned: 7 },
      'L': { stock: 35, inCourier: 18, sold: 130, returned: 8 },
      'XL': { stock: 12, inCourier: 9, sold: 68, returned: 5 },
      'XXL': { stock: 4, inCourier: 3, sold: 22, returned: 2 },
    }
  },
  {
    id: 'P-102',
    name: 'Oxford Button-Down Cotton Shirt',
    category: 'Shirts',
    sku: 'OXF-WHT-02',
    price: 1250,
    cost: 680,
    variants: {
      'M': { stock: 28, inCourier: 8, sold: 64, returned: 4 },
      'L': { stock: 22, inCourier: 11, sold: 85, returned: 6 },
      'XL': { stock: 15, inCourier: 5, sold: 40, returned: 3 },
    }
  },
  {
    id: 'P-103',
    name: 'Relaxed Fit Stretch Chino Pants',
    category: 'Pants',
    sku: 'CHN-BEI-03',
    price: 1450,
    cost: 750,
    variants: {
      '30': { stock: 18, inCourier: 4, sold: 35, returned: 2 },
      '32': { stock: 30, inCourier: 12, sold: 78, returned: 5 },
      '34': { stock: 25, inCourier: 9, sold: 65, returned: 4 },
      '36': { stock: 8, inCourier: 3, sold: 20, returned: 1 },
    }
  },
  {
    id: 'P-104',
    name: 'Vintage Wash Denim Jacket',
    category: 'Jackets',
    sku: 'DNM-JKT-04',
    price: 2450,
    cost: 1300,
    variants: {
      'M': { stock: 14, inCourier: 5, sold: 32, returned: 3 },
      'L': { stock: 9, inCourier: 7, sold: 45, returned: 4 },
      'XL': { stock: 3, inCourier: 2, sold: 18, returned: 2 },
    }
  }
];

const DEFAULT_ORDERS = [
  {
    id: 'ORD-8901',
    customer: 'Tanvir Ahmed',
    phone: '01712-345678',
    address: 'House 14, Road 5, Dhanmondi, Dhaka',
    district: 'Dhaka',
    productId: 'P-101',
    productName: 'Premium Drop-Shoulder T-Shirt',
    size: 'L',
    qty: 2,
    totalAmount: 1300,
    courier: 'Steadfast',
    consignmentId: 'ST-902341',
    status: 'In Courier',
    date: '2026-10-19',
    qcStatus: null
  },
  {
    id: 'ORD-8902',
    customer: 'Mahmudul Hasan',
    phone: '01823-998877',
    address: 'GEC Circle, Nasirabad, Chattogram',
    district: 'Chattogram',
    productId: 'P-102',
    productName: 'Oxford Button-Down Cotton Shirt',
    size: 'M',
    qty: 1,
    totalAmount: 1250,
    courier: 'Pathao',
    consignmentId: 'PTH-667123',
    status: 'In Courier',
    date: '2026-10-19',
    qcStatus: null
  },
  {
    id: 'ORD-8903',
    customer: 'Sabbir Rahman',
    phone: '01911-223344',
    address: 'Zindabazar, Sylhet',
    district: 'Sylhet',
    productId: 'P-103',
    size: '32',
    productName: 'Relaxed Fit Stretch Chino Pants',
    qty: 1,
    totalAmount: 1450,
    courier: 'RedX',
    consignmentId: 'RDX-445129',
    status: 'Delivered',
    date: '2026-10-18',
    qcStatus: null
  },
  {
    id: 'ORD-8904',
    customer: 'Farhan Kabir',
    phone: '01678-554433',
    address: 'Kandirpar, Cumilla',
    district: 'Cumilla',
    productId: 'P-101',
    productName: 'Premium Drop-Shoulder T-Shirt',
    size: 'XL',
    qty: 1,
    totalAmount: 650,
    courier: 'Steadfast',
    consignmentId: 'ST-902348',
    status: 'Returned',
    date: '2026-10-18',
    qcStatus: 'Restocked'
  },
  {
    id: 'ORD-8905',
    customer: 'Nahid Islam',
    phone: '01521-778899',
    address: 'Chawkbazar, Barishal',
    district: 'Barishal',
    productId: 'P-104',
    productName: 'Vintage Wash Denim Jacket',
    size: 'XL',
    qty: 1,
    totalAmount: 2450,
    courier: 'Paperfly',
    consignmentId: 'PPF-881203',
    status: 'Returned',
    date: '2026-10-17',
    qcStatus: 'Pending QC'
  },
  {
    id: 'ORD-8906',
    customer: 'Rakib Hossain',
    phone: '01799-112233',
    address: 'Uttara Sector 7, Dhaka',
    district: 'Dhaka',
    productId: 'P-101',
    productName: 'Premium Drop-Shoulder T-Shirt',
    size: 'M',
    qty: 3,
    totalAmount: 1950,
    courier: 'Steadfast',
    consignmentId: 'ST-902355',
    status: 'Pending',
    date: '2026-10-19',
    qcStatus: null
  }
];

// Helper functions for safe LocalStorage persistence
const getStorageItem = (key, fallback) => {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setStorageItem = (key, value) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // Ignore quota or private browsing errors
  }
};

export default function App() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    name: 'Shakib Rahman (Admin)',
    email: 'admin@weartrack.com',
    role: 'Store Owner'
  });
  const [loginEmail, setLoginEmail] = useState('admin@weartrack.com');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Navigation tabs
  const [activeTab, setActiveTab] = useState('inventory');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Dynamic Persistent State with localStorage
  const [categories, setCategories] = useState(() => getStorageItem('weartrack_categories', DEFAULT_CATEGORIES));
  const [products, setProducts] = useState(() => getStorageItem('weartrack_products', DEFAULT_PRODUCTS));
  const [orders, setOrders] = useState(() => getStorageItem('weartrack_orders', DEFAULT_ORDERS));

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCatInput, setNewCatInput] = useState('');

  // Sync to localStorage whenever data changes
  useEffect(() => {
    setStorageItem('weartrack_categories', categories);
  }, [categories]);

  useEffect(() => {
    setStorageItem('weartrack_products', products);
  }, [products]);

  useEffect(() => {
    setStorageItem('weartrack_orders', orders);
  }, [orders]);

  // Modal States
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [selectedProductForRestock, setSelectedProductForRestock] = useState(null);

  // New Order Form State
  const [newOrder, setNewOrder] = useState({
    customer: '',
    phone: '',
    address: '',
    district: 'Dhaka',
    productId: products[0]?.id || 'P-101',
    size: 'M',
    qty: 1,
    courier: 'Steadfast'
  });

  // Restock Form State
  const [restockSize, setRestockSize] = useState('M');
  const [restockQty, setRestockQty] = useState(10);

  // New Product Form State
  const [newProdName, setNewProdName] = useState('');
  const [newProdCat, setNewProdCat] = useState('T-Shirts');
  const [newProdSku, setNewProdSku] = useState('');
  const [newProdPrice, setNewProdPrice] = useState(700);
  const [newProdCost, setNewProdCost] = useState(350);
  const [newProdSizes, setNewProdSizes] = useState({ 'S': 10, 'M': 20, 'L': 20, 'XL': 10 });
  const [inlineNewCatOpen, setInlineNewCatOpen] = useState(false);
  const [inlineNewCatName, setInlineNewCatName] = useState('');

  // Notification Toast State
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Login Handler
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    if (!loginEmail || !loginPassword) {
      setLoginError('ইমেইল ও পাসওয়ার্ড প্রদান করুন');
      return;
    }

    if (loginEmail === 'admin@weartrack.com' && loginPassword === 'admin123') {
      setIsAuthenticated(true);
      setCurrentUser({
        name: 'Shakib Rahman (Admin)',
        email: loginEmail,
        role: 'Brand Owner'
      });
      showToast('সফলভাবে লগইন হয়েছে! স্বাগতম WearTrack OS-এ।');
    } else if (loginPassword.length >= 6) {
      setIsAuthenticated(true);
      setCurrentUser({
        name: loginEmail.split('@')[0],
        email: loginEmail,
        role: 'Admin User'
      });
      showToast('সফলভাবে লগইন হয়েছে!');
    } else {
      setLoginError('ভুল ইমেইল বা পাসওয়ার্ড! ডেমো: admin@weartrack.com / admin123');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    showToast('সফলভাবে লগআউট করা হয়েছে।');
  };

  // Category Handlers
  const handleAddCategory = (catName) => {
    const trimmed = catName.trim();
    if (!trimmed) return;
    if (categories.some(c => c.toLowerCase() === trimmed.toLowerCase())) {
      showToast(`ক্যাটাগরি "${trimmed}" ইতিমধ্যে তালিকায় আছে!`);
      return;
    }
    const updated = [...categories, trimmed];
    setCategories(updated);
    showToast(`নতুন ক্যাটাগরি "${trimmed}" সফলভাবে যোগ করা হয়েছে!`);
    return trimmed;
  };

  const handleDeleteCategory = (catToDelete) => {
    const updated = categories.filter(c => c !== catToDelete);
    setCategories(updated);
    if (selectedCategory === catToDelete) setSelectedCategory('all');
    if (newProdCat === catToDelete) setNewProdCat(updated[0] || 'General');
    showToast(`ক্যাটাগরি "${catToDelete}" মুছে ফেলা হয়েছে!`);
  };

  // Product Delete / Remove Handler
  const handleDeleteProduct = (productId) => {
    const prod = products.find(p => p.id === productId);
    const prodName = prod ? prod.name : 'প্রোডাক্ট';
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToast(`"${prodName}" সফলভাবে রিমুভ / ডিলিট করা হয়েছে (ডেটা সেভ হয়েছে)!`);
  };

  // Reset to Factory Default Data
  const handleResetDefaults = () => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem('weartrack_products');
        window.localStorage.removeItem('weartrack_categories');
        window.localStorage.removeItem('weartrack_orders');
      } catch (e) {}
    }
    setProducts(DEFAULT_PRODUCTS);
    setCategories(DEFAULT_CATEGORIES);
    setOrders(DEFAULT_ORDERS);
    showToast('ডেমো ডেটা সফলভাবে রিস্টোর করা হয়েছে!');
  };

  // Aggregated Stats
  const stats = useMemo(() => {
    let totalStockPcs = 0;
    let totalInCourierPcs = 0;
    let totalSoldPcs = 0;
    let totalReturnedPcs = 0;

    products.forEach(p => {
      Object.values(p.variants).forEach(v => {
        totalStockPcs += v.stock;
        totalInCourierPcs += v.inCourier;
        totalSoldPcs += v.sold;
        totalReturnedPcs += v.returned;
      });
    });

    const today = '2026-10-19';
    const todaysOrders = orders.filter(o => o.date === today);
    const todaySalesAmount = todaysOrders
      .filter(o => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + o.totalAmount, 0);
    const todayPieces = todaysOrders
      .filter(o => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + o.qty, 0);

    const activeInCourierOrders = orders.filter(o => o.status === 'In Courier');
    const returnedOrders = orders.filter(o => o.status === 'Returned');

    const totalOrdersCount = orders.length;
    const returnRate = totalOrdersCount > 0 
      ? ((returnedOrders.length / totalOrdersCount) * 100).toFixed(1)
      : '0.0';

    return {
      totalStockPcs,
      totalInCourierPcs,
      totalSoldPcs,
      totalReturnedPcs,
      todaySalesAmount,
      todayPieces,
      activeInCourierOrdersCount: activeInCourierOrders.length,
      returnedOrdersCount: returnedOrders.length,
      returnRate
    };
  }, [products, orders]);

  // Handle Dispatch Order to Courier
  const handleDispatchOrder = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (!order || order.status === 'In Courier') return;

    const prod = products.find(p => p.id === order.productId);
    if (prod && prod.variants[order.size]) {
      const currentAvail = prod.variants[order.size].stock;
      if (currentAvail < order.qty) {
        showToast(`সতর্কতা: ${prod.name} (Size: ${order.size}) এর পর্যাপ্ত স্টক নেই!`);
        return;
      }

      setProducts(prev => prev.map(p => {
        if (p.id === order.productId) {
          const variant = p.variants[order.size];
          return {
            ...p,
            variants: {
              ...p.variants,
              [order.size]: {
                ...variant,
                stock: Math.max(0, variant.stock - order.qty),
                inCourier: variant.inCourier + order.qty
              }
            }
          };
        }
        return p;
      }));
    }

    const dummyConsignment = `${order.courier.slice(0, 2).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;

    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: 'In Courier',
          consignmentId: o.consignmentId || dummyConsignment
        };
      }
      return o;
    }));

    showToast(`অর্ডার #${orderId} কুরিয়ারে ডেসপ্যাচ করা হয়েছে (সেভ সম্পন্ন)!`);
  };

  // Handle Mark as Delivered
  const handleDeliverOrder = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    if (order.status === 'In Courier') {
      setProducts(prev => prev.map(p => {
        if (p.id === order.productId && p.variants[order.size]) {
          const v = p.variants[order.size];
          return {
            ...p,
            variants: {
              ...p.variants,
              [order.size]: {
                ...v,
                inCourier: Math.max(0, v.inCourier - order.qty),
                sold: v.sold + order.qty
              }
            }
          };
        }
        return p;
      }));
    }

    setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, status: 'Delivered' } : o)));
    showToast(`অর্ডার #${orderId} সফলভাবে ডেলিভার্ড হিসেবে মার্ক করা হয়েছে!`);
  };

  // Handle Mark as Returned from Courier
  const handleReturnOrder = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    if (order.status === 'In Courier') {
      setProducts(prev => prev.map(p => {
        if (p.id === order.productId && p.variants[order.size]) {
          const v = p.variants[order.size];
          return {
            ...p,
            variants: {
              ...p.variants,
              [order.size]: {
                ...v,
                inCourier: Math.max(0, v.inCourier - order.qty),
                returned: v.returned + order.qty
              }
            }
          };
        }
        return p;
      }));
    }

    setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, status: 'Returned', qcStatus: 'Pending QC' } : o)));
    showToast(`পার্সেল #${orderId} রিটার্ন হিসেবে এন্ট্রি হয়েছে (QC অপেক্ষমাণ)`);
  };

  // Return QC Resolution (Restock vs Damaged)
  const handleResolveReturnQC = (orderId, resolution) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    if (resolution === 'Restocked') {
      setProducts(prev => prev.map(p => {
        if (p.id === order.productId && p.variants[order.size]) {
          const v = p.variants[order.size];
          return {
            ...p,
            variants: {
              ...p.variants,
              [order.size]: {
                ...v,
                stock: v.stock + order.qty
              }
            }
          };
        }
        return p;
      }));
      showToast(`সাইজ ${order.size} প্রোডাক্ট ইনভেন্টরি স্টকে ফেরত যোগ করা হয়েছে!`);
    } else {
      showToast(`প্রোডাক্টটি ড্যামেজ হিসেবে নথিভুক্ত করা হয়েছে (স্টকে যোগ হয়নি)।`);
    }

    setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, qcStatus: resolution } : o)));
  };

  // Handle Create New Order
  const handleCreateOrderSubmit = (e) => {
    e.preventDefault();
    const prod = products.find(p => p.id === newOrder.productId);
    if (!prod) return;

    const total = prod.price * Number(newOrder.qty);
    const newId = `ORD-${Math.floor(8900 + orders.length + 1)}`;

    const createdOrder = {
      id: newId,
      customer: newOrder.customer || 'Customer',
      phone: newOrder.phone || '017XXXXXXXX',
      address: newOrder.address || 'Dhaka',
      district: newOrder.district,
      productId: prod.id,
      productName: prod.name,
      size: newOrder.size,
      qty: Number(newOrder.qty),
      totalAmount: total,
      courier: newOrder.courier,
      consignmentId: null,
      status: 'Pending',
      date: '2026-10-19',
      qcStatus: null
    };

    setOrders([createdOrder, ...orders]);
    setShowNewOrderModal(false);
    showToast(`নতুন অর্ডার #${newId} তৈরি ও সেভ করা হয়েছে!`);
  };

  // Handle Restock Submit
  const handleRestockSubmit = (e) => {
    e.preventDefault();
    if (!selectedProductForRestock) return;

    setProducts(prev => prev.map(p => {
      if (p.id === selectedProductForRestock.id) {
        const currentV = p.variants[restockSize] || { stock: 0, inCourier: 0, sold: 0, returned: 0 };
        return {
          ...p,
          variants: {
            ...p.variants,
            [restockSize]: {
              ...currentV,
              stock: currentV.stock + Number(restockQty)
            }
          }
        };
      }
      return p;
    }));

    setShowRestockModal(false);
    showToast(`${selectedProductForRestock.name} এর সাইজ [${restockSize}] এ +${restockQty} পিস স্টক আপডেট হয়েছে!`);
  };

  // Handle Create Product Submit
  const handleCreateProductSubmit = (e) => {
    e.preventDefault();
    const formattedVariants = {};
    Object.keys(newProdSizes).forEach(sz => {
      formattedVariants[sz] = {
        stock: Number(newProdSizes[sz]),
        inCourier: 0,
        sold: 0,
        returned: 0
      };
    });

    let finalCategory = newProdCat;
    if (inlineNewCatOpen && inlineNewCatName.trim()) {
      handleAddCategory(inlineNewCatName);
      finalCategory = inlineNewCatName.trim();
    }

    const newProd = {
      id: `P-${100 + products.length + 1}`,
      name: newProdName || 'New Apparel Item',
      category: finalCategory,
      sku: newProdSku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      price: Number(newProdPrice),
      cost: Number(newProdCost),
      variants: formattedVariants
    };

    setProducts([newProd, ...products]);
    setShowNewProductModal(false);
    setInlineNewCatOpen(false);
    setInlineNewCatName('');
    showToast(`নতুন প্রোডাক্ট "${newProd.name}" সফলভাবে যুক্ত ও সেভ হয়েছে!`);
  };

  // Export CSV
  const handleExportCSV = () => {
    let csv = "Product Name,Category,SKU,Size,Available Stock,In Courier,Sold,Returned\n";
    products.forEach(p => {
      Object.keys(p.variants).forEach(sz => {
        const v = p.variants[sz];
        csv += `"${p.name}","${p.category}","${p.sku}","${sz}",${v.stock},${v.inCourier},${v.sold},${v.returned}\n`;
      });
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `clothing_stock_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("স্টক রিপোর্ট CSV ডাউনলোড সম্পন্ন হয়েছে!");
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [products, searchTerm, selectedCategory]);

  // LOGIN SCREEN (If not authenticated)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex items-center justify-center p-4">
        {toastMessage && (
          <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white px-5 py-3 rounded-lg shadow-2xl flex items-center gap-3 transition-all">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        )}

        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto mb-4 shadow-xl shadow-indigo-600/30">
              <Boxes className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">WearTrack Pro</h2>
            <p className="text-sm text-slate-400 mt-1">ক্লোথিং ব্র্যান্ড ইনভেন্টরি ও কুরিয়ার ম্যানেজমেন্ট</p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>নিরাপদ অ্যাডমিন পোর্টাল (Secure Login)</span>
            </div>
          </div>

          {loginError && (
            <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">ইমেইল অ্যাড্রেস</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="admin@weartrack.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 pl-10 pr-4 py-2.5 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">পাসওয়ার্ড</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 pl-10 pr-4 py-2.5 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0"
                />
                <span>লগইন তথ্য মনে রাখুন</span>
              </label>
              <button
                type="button"
                onClick={() => {
                  setLoginEmail('admin@weartrack.com');
                  setLoginPassword('admin123');
                  showToast('ডেমো তথ্য পূরণ করা হয়েছে!');
                }}
                className="text-indigo-400 hover:text-indigo-300 font-medium"
              >
                ডেমো তথ্য দিন
              </button>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              লগইন করুন (Sign In)
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
            <p className="text-[11px] text-slate-500">
              ডিফল্ট ডেমো ক্রেডেনশিয়াল: <code className="text-slate-400 bg-slate-950 px-1 py-0.5 rounded">admin@weartrack.com</code> / <code className="text-slate-400 bg-slate-950 px-1 py-0.5 rounded">admin123</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // MAIN DASHBOARD (When Authenticated)
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white px-5 py-3 rounded-lg shadow-2xl flex items-center gap-3 transition-all">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 sticky top-0 z-30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
            <Boxes className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              WearTrack Pro
              <span className="text-xs bg-indigo-500/20 text-indigo-400 font-semibold px-2 py-0.5 rounded-full border border-indigo-500/30">
                Next.js Apparel OS
              </span>
            </h1>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <span>ক্লোথিং ব্র্যান্ড সাইজ ও কুরিয়ার ট্র্যাকিং সিস্টেম</span>
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                <Database className="w-3 h-3" /> অটো-সেভ সক্রিয়
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-sm font-medium transition"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">CSV রিপোর্ট</span>
          </button>
          
          {/* Direct Category Management Button in Header */}
          <button
            onClick={() => setShowCategoryModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-indigo-300 rounded-lg text-sm font-medium border border-indigo-500/30 transition"
          >
            <FolderPlus className="w-4 h-4 text-indigo-400" />
            <span>+ ক্যাটাগরি ({categories.length})</span>
          </button>

          <button
            onClick={() => setShowNewProductModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium shadow-md shadow-emerald-600/30 transition"
          >
            <Tag className="w-4 h-4" />
            <span>+ নতুন প্রোডাক্ট</span>
          </button>

          <button
            onClick={() => setShowNewOrderModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium shadow-md shadow-indigo-600/30 transition"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন অর্ডার</span>
          </button>

          {/* User Profile & Logout Button */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs font-bold text-white">{currentUser.name}</span>
              <span className="text-[10px] text-indigo-400 font-medium">{currentUser.role}</span>
            </div>
            <button
              onClick={handleLogout}
              title="লগআউট করুন"
              className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-lg text-sm font-medium transition flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline text-xs">লগআউট</span>
            </button>
          </div>
        </div>
      </header>

      {/* Top Metric Cards */}
      <div className="p-6 pb-2 grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Available Stock */}
        <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">হাতে থাকা মোট স্টক</p>
            <h3 className="text-2xl font-bold text-white mt-1">{stats.totalStockPcs} <span className="text-sm font-normal text-slate-400">পিস</span></h3>
            <span className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
              <CheckCircle className="w-3.5 h-3.5" /> সেল করার জন্য প্রস্তুত
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* Daily Sales */}
        <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">আজকের মোট সেলস</p>
            <h3 className="text-2xl font-bold text-emerald-400 mt-1">৳ {stats.todaySalesAmount.toLocaleString()}</h3>
            <span className="text-xs text-slate-300 flex items-center gap-1 mt-1">
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" /> {stats.todayPieces} পিস অর্ডার হয়েছে
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* In Courier Transit */}
        <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">কুরিয়ারে আছে (In-Transit)</p>
            <h3 className="text-2xl font-bold text-amber-400 mt-1">{stats.totalInCourierPcs} <span className="text-sm font-normal text-slate-400">পিস</span></h3>
            <span className="text-xs text-amber-300/80 flex items-center gap-1 mt-1">
              <Truck className="w-3.5 h-3.5" /> {stats.activeInCourierOrdersCount} টি পার্সেল চলছে
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Truck className="w-6 h-6" />
          </div>
        </div>

        {/* Returns */}
        <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">রিটার্ন ও ফেরত</p>
            <h3 className="text-2xl font-bold text-rose-400 mt-1">{stats.totalReturnedPcs} <span className="text-sm font-normal text-slate-400">পিস</span></h3>
            <span className="text-xs text-rose-300/80 flex items-center gap-1 mt-1">
              <RotateCcw className="w-3.5 h-3.5" /> রিটার্ন রেট: {stats.returnRate}%
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
            <RotateCcw className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="px-6 pt-4">
        <div className="flex border-b border-slate-700 space-x-6 overflow-x-auto text-sm font-medium">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`pb-3 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'inventory'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Boxes className="w-4 h-4" />
            সাইজ-ভিত্তিক স্টক ইনভেন্টরি ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            দৈনিক অর্ডার ও সেলস ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('courier')}
            className={`pb-3 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'courier'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Truck className="w-4 h-4" />
            কুরিয়ার পাইপলাইন ({orders.filter(o => o.status === 'In Courier').length})
          </button>

          <button
            onClick={() => setActiveTab('returns')}
            className={`pb-3 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'returns'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            রিটার্ন ও কিউসি (QC) ({orders.filter(o => o.status === 'Returned').length})
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="p-6 flex-1">
        {/* TAB 1: INVENTORY (Size-wise Stock) */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            {/* Filters & Dynamic Category Bar */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700/60">
              <div className="relative w-full lg:w-72">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="প্রোডাক্ট নাম বা SKU দিয়ে খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 pl-9 pr-4 py-2 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Category Pills + Add Category Button */}
              <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto py-1">
                <span className="text-xs text-slate-400 font-medium whitespace-nowrap">ক্যাটাগরি:</span>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    selectedCategory === 'all' 
                      ? 'bg-indigo-600 text-white shadow-sm' 
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  সবগুলো ({products.length})
                </button>
                {categories.map(cat => {
                  const count = products.filter(p => p.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition flex items-center gap-1.5 ${
                        selectedCategory === cat 
                          ? 'bg-indigo-600 text-white shadow-sm' 
                          : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        selectedCategory === cat ? 'bg-indigo-800 text-indigo-100' : 'bg-slate-700 text-slate-400'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}

                <button
                  onClick={() => setShowCategoryModal(true)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border border-indigo-500/30 transition whitespace-nowrap ml-1 shadow-sm"
                  title="নতুন ক্যাটাগরি তৈরি করুন"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ ক্যাটাগরি</span>
                </button>
              </div>
            </div>

            {/* Products Size Matrix Cards */}
            <div className="grid grid-cols-1 gap-5">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 bg-slate-800/40 border border-slate-700 rounded-xl">
                  <Boxes className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                  <p className="text-slate-300 font-medium">কোনো প্রোডাক্ট পাওয়া যায়নি</p>
                  <p className="text-xs text-slate-500 mt-1">নতুন প্রোডাক্ট যোগ করুন অথবা ফিল্টার পরিবর্তন করুন</p>
                </div>
              ) : (
                filteredProducts.map(product => {
                  const totalStock = Object.values(product.variants).reduce((s, v) => s + v.stock, 0);
                  const totalInCourier = Object.values(product.variants).reduce((s, v) => s + v.inCourier, 0);
                  const totalSold = Object.values(product.variants).reduce((s, v) => s + v.sold, 0);
                  const totalReturned = Object.values(product.variants).reduce((s, v) => s + v.returned, 0);

                  return (
                    <div key={product.id} className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-sm">
                      {/* Header Row with Delete Button */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-700/80 gap-3">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-mono bg-slate-700 text-slate-300 px-2 py-0.5 rounded">
                              {product.sku}
                            </span>
                            <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                              {product.category}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-white mt-1">{product.name}</h3>
                        </div>

                        <div className="flex items-center gap-3 text-sm">
                          <div className="text-right">
                            <p className="text-xs text-slate-400">মূল্য / খরচ</p>
                            <p className="font-semibold text-emerald-400">৳ {product.price} <span className="text-xs text-slate-500 font-normal">(৳{product.cost})</span></p>
                          </div>
                          <button
                            onClick={() => {
                              setSelectedProductForRestock(product);
                              setRestockSize(Object.keys(product.variants)[0] || 'M');
                              setShowRestockModal(true);
                            }}
                            className="px-3 py-1.5 bg-indigo-600/80 hover:bg-indigo-600 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition"
                          >
                            <Plus className="w-3.5 h-3.5" /> স্টক রিফিল
                          </button>
                          
                          {/* Delete / Remove Product Button */}
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            title="এই প্রোডাক্টটি ডিলিট করুন"
                            className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Size-wise Grid */}
                      <div className="mt-4">
                        <p className="text-xs font-medium text-slate-400 mb-2">সাইজ অনুযায়ী বিস্তারিত পরিসংখ্যান (Size-wise Breakdown):</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                          {Object.entries(product.variants).map(([size, v]) => (
                            <div 
                              key={size} 
                              className={`p-3 rounded-lg border ${
                                v.stock <= 5 
                                  ? 'bg-rose-950/20 border-rose-800/60' 
                                  : 'bg-slate-900/60 border-slate-700/70'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded">
                                  সাইজ: {size}
                                </span>
                                {v.stock <= 5 && (
                                  <span className="text-[10px] text-rose-400 font-medium">লো স্টক!</span>
                                )}
                              </div>

                              <div className="mt-2.5 space-y-1 text-xs">
                                <div className="flex justify-between items-center text-slate-300">
                                  <span>হাতে স্টক:</span>
                                  <span className="font-bold text-white text-sm">{v.stock} pcs</span>
                                </div>
                                <div className="flex justify-between items-center text-amber-400">
                                  <span>কুরিয়ারে:</span>
                                  <span className="font-medium">{v.inCourier} pcs</span>
                                </div>
                                <div className="flex justify-between items-center text-emerald-400">
                                  <span>বিক্রি হয়েছে:</span>
                                  <span className="font-medium">{v.sold} pcs</span>
                                </div>
                                <div className="flex justify-between items-center text-rose-400">
                                  <span>ফেরত:</span>
                                  <span className="font-medium">{v.returned} pcs</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Product Summary Footer */}
                      <div className="mt-4 pt-3 border-t border-slate-700/60 flex flex-wrap items-center justify-between text-xs text-slate-400">
                        <div className="flex items-center gap-4">
                          <span>মোট রেডি স্টক: <strong className="text-white">{totalStock} pcs</strong></span>
                          <span>বর্তমানে কুরিয়ারে: <strong className="text-amber-400">{totalInCourier} pcs</strong></span>
                          <span>লাইফটাইম সেলস: <strong className="text-emerald-400">{totalSold} pcs</strong></span>
                          <span>মোট রিটার্ন: <strong className="text-rose-400">{totalReturned} pcs</strong></span>
                        </div>
                        <span className="text-slate-500">আইডি: {product.id}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS (Daily Sales) */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white">দৈনিক অর্ডার ও সেলস ট্র্যাকার</h3>
                <p className="text-xs text-slate-400">আজকের তারিখ: ১৯ অক্টোবর, ২০২৬ | প্রতিদিনের অর্ডার সরাসরি কুরিয়ারে পাঠান</p>
              </div>
              <button
                onClick={() => setShowNewOrderModal(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> দ্রুত অর্ডার এন্ট্রি
              </button>
            </div>

            {/* Orders Table */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-700/60 text-xs uppercase text-slate-400 border-b border-slate-700">
                    <tr>
                      <th className="px-4 py-3">অর্ডার আইডি</th>
                      <th className="px-4 py-3">কাস্টমার ও ঠিকানা</th>
                      <th className="px-4 py-3">প্রোডাক্ট ও সাইজ</th>
                      <th className="px-4 py-3">পরিমাণ ও মূল্য</th>
                      <th className="px-4 py-3">কুরিয়ার ও কনসাইনমেন্ট</th>
                      <th className="px-4 py-3">স্ট্যাটাস</th>
                      <th className="px-4 py-3 text-right">একশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    {orders.map(order => (
                      <tr key={order.id} className="hover:bg-slate-700/30 transition">
                        <td className="px-4 py-3 font-mono font-medium text-white text-xs">
                          {order.id}
                          <div className="text-[10px] text-slate-400 font-sans">{order.date}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-white flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-slate-400" /> {order.customer}
                          </div>
                          <div className="text-xs text-slate-400 flex items-center gap-1">
                            <Phone className="w-3 h-3 text-slate-500" /> {order.phone}
                          </div>
                          <div className="text-xs text-slate-500 truncate max-w-xs flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-500" /> {order.address}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-slate-200">{order.productName}</div>
                          <div className="text-xs text-indigo-400 font-semibold mt-0.5">
                            সাইজ: <span className="bg-indigo-900/60 px-1.5 py-0.5 rounded text-white">{order.size}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-bold text-emerald-400">৳ {order.totalAmount}</div>
                          <div className="text-xs text-slate-400">{order.qty} পিস</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                            {order.courier}
                          </span>
                          {order.consignmentId ? (
                            <div className="text-xs font-mono text-indigo-300 mt-1">{order.consignmentId}</div>
                          ) : (
                            <div className="text-[11px] text-slate-500 italic mt-0.5">এখনো বুকিং হয়নি</div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-medium inline-flex items-center gap-1 ${
                            order.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                            order.status === 'In Courier' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' :
                            order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                            'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                          }`}>
                            {order.status === 'In Courier' && <Truck className="w-3 h-3" />}
                            {order.status === 'Delivered' && <CheckCircle className="w-3 h-3" />}
                            {order.status === 'Returned' && <RotateCcw className="w-3 h-3" />}
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          {order.status === 'Pending' && (
                            <button
                              onClick={() => handleDispatchOrder(order.id)}
                              className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-medium transition"
                            >
                              কুরিয়ারে পাঠান
                            </button>
                          )}
                          {order.status === 'In Courier' && (
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleDeliverOrder(order.id)}
                                title="ডেলিভার্ড মার্ক করুন"
                                className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs transition"
                              >
                                Delivered
                              </button>
                              <button
                                onClick={() => handleReturnOrder(order.id)}
                                title="রিটার্ন মার্ক করুন"
                                className="px-2 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded text-xs transition"
                              >
                                Return
                              </button>
                            </div>
                          )}
                          {order.status === 'Delivered' && (
                            <span className="text-xs text-emerald-400 font-medium">সম্পন্ন</span>
                          )}
                          {order.status === 'Returned' && (
                            <span className="text-xs text-rose-400 font-medium">{order.qcStatus || 'QC Pending'}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COURIER PIPELINE */}
        {activeTab === 'courier' && (
          <div className="space-y-4">
            <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Truck className="w-5 h-5 text-amber-400" />
                  কুরিয়ারে চলমান পার্সেলসমূহ (In-Transit Pipeline)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Steadfast, Pathao ও RedX এ থাকা সব পার্সেলের লাইভ মনিটরিং
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">মোট পার্সেল:</span>
                <span className="ml-2 font-bold text-amber-400 text-base">
                  {orders.filter(o => o.status === 'In Courier').length} টি
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {orders.filter(o => o.status === 'In Courier').map(order => (
                <div key={order.id} className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <div>
                      <span className="text-xs font-mono text-indigo-300 font-bold">{order.id}</span>
                      <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        {order.courier}
                      </span>
                    </div>
                    <span className="text-xs font-mono bg-slate-900 px-2 py-0.5 rounded text-slate-300 border border-slate-700">
                      CID: {order.consignmentId}
                    </span>
                  </div>

                  <div className="py-3 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">প্রোডাক্ট:</span>
                      <span className="text-white font-medium">{order.productName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">সাইজ ও পরিমাণ:</span>
                      <span className="text-indigo-300 font-bold">সাইজ: {order.size} ({order.qty} পিস)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">কাস্টমার ও জেলা:</span>
                      <span className="text-slate-200">{order.customer} ({order.district})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">ক্যাশ অন ডেলিভারি (COD):</span>
                      <span className="text-emerald-400 font-bold">৳ {order.totalAmount}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-700 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-500">ডেসপ্যাচ: {order.date}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDeliverOrder(order.id)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium flex items-center gap-1 transition"
                      >
                        <CheckCircle className="w-3.5 h-3.5" /> কুরিয়ার ডেলিভার্ড
                      </button>
                      <button
                        onClick={() => handleReturnOrder(order.id)}
                        className="px-3 py-1.5 bg-rose-600/80 hover:bg-rose-600 text-white rounded-lg text-xs font-medium flex items-center gap-1 transition"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> পার্সেল রিটার্ন
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: RETURNS & QC MANAGEMENT */}
        {activeTab === 'returns' && (
          <div className="space-y-4">
            <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-rose-400" />
                  রিটার্ন পার্সেল রিকনসিলিয়েশন ও কোয়ালিটি চেক (QC)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  কুরিয়ার থেকে ফেরত আসা পার্সেল চেক করে ভালো থাকলে আবার সাইজ স্টকে যোগ করুন
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">মোট রিটার্ন:</span>
                <span className="ml-2 font-bold text-rose-400 text-base">
                  {orders.filter(o => o.status === 'Returned').length} টি
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {orders.filter(o => o.status === 'Returned').map(order => (
                <div key={order.id} className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-white">{order.id}</span>
                      <span className="text-xs bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded">
                        {order.courier} Returned
                      </span>
                      <span className="text-xs text-slate-400">({order.consignmentId})</span>
                    </div>

                    <div className="mt-2 text-sm text-slate-200">
                      <strong>{order.productName}</strong> — সাইজ: <span className="text-indigo-400 font-bold">{order.size}</span> ({order.qty} পিস)
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      কাস্টমার: {order.customer} ({order.phone}) • তারিখ: {order.date}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {order.qcStatus === 'Pending QC' ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleResolveReturnQC(order.id, 'Restocked')}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> ভালো (স্টকে ফেরত নিন)
                        </button>
                        <button
                          onClick={() => handleResolveReturnQC(order.id, 'Damaged')}
                          className="px-3 py-1.5 bg-rose-700 hover:bg-rose-600 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition"
                        >
                          <ShieldAlert className="w-3.5 h-3.5" /> ড্যামেজ / নষ্ট
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                          order.qcStatus === 'Restocked' 
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}>
                          {order.qcStatus === 'Restocked' ? 'স্টকে যুক্ত হয়েছে (Restocked)' : 'ড্যামেজ নথিভুক্ত (Damaged)'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* MODAL 0: DEDICATED CATEGORY MANAGEMENT MODAL */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-white text-base">ক্যাটাগরি ম্যানেজমেন্ট</h3>
              </div>
              <button 
                onClick={() => setShowCategoryModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newCatInput.trim()) {
                    handleAddCategory(newCatInput);
                    setNewCatInput('');
                  }
                }}
                className="space-y-2"
              >
                <label className="text-xs text-slate-300 font-medium block">
                  নতুন ক্যাটাগরির নাম লিখুন:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="যেমন: Polo, Activewear, Panjabi..."
                    value={newCatInput}
                    onChange={(e) => setNewCatInput(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-700 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold shadow-md shadow-indigo-600/30 transition flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> যোগ করুন
                  </button>
                </div>
              </form>

              <div className="pt-3 border-t border-slate-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-slate-400">বিদ্যমান ক্যাটাগরি তালিকা ({categories.length}):</span>
                </div>
                <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                  {categories.map(cat => {
                    const linkedProductsCount = products.filter(p => p.category === cat).length;
                    return (
                      <div 
                        key={cat} 
                        className="bg-slate-900 border border-slate-700/80 px-3 py-2.5 rounded-lg flex items-center justify-between text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <Tag className="w-3.5 h-3.5 text-indigo-400" />
                          <span className="font-medium text-white">{cat}</span>
                          <span className="text-[11px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
                            {linkedProductsCount} টি প্রোডাক্ট
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteCategory(cat)}
                          title="ক্যাটাগরি মুছুন"
                          className="text-slate-500 hover:text-rose-400 p-1 rounded transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center border-t border-slate-700/60 mt-3">
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="text-xs text-slate-500 hover:text-rose-400 transition"
                  title="সব ডেটা ডিফল্ট অবস্থায় রিস্টোর করুন"
                >
                  ডেমো ডেটা রিসেট
                </button>
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: NEW ORDER */}
      {showNewOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
              <h3 className="font-bold text-white text-base">নতুন অর্ডার এন্ট্রি করুন</h3>
              <button 
                onClick={() => setShowNewOrderModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateOrderSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">কাস্টমারের নাম</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: সাকিব হাসান"
                    value={newOrder.customer}
                    onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">মোবাইল নম্বর</label>
                  <input
                    type="text"
                    required
                    placeholder="017XXXXXXXX"
                    value={newOrder.phone}
                    onChange={(e) => setNewOrder({ ...newOrder, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">ঠিকানা ও জেলা</label>
                <input
                  type="text"
                  required
                  placeholder="বাসা নং, রোড, থানা, জেলা"
                  value={newOrder.address}
                  onChange={(e) => setNewOrder({ ...newOrder, address: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">প্রোডাক্ট সিলেক্ট করুন</label>
                <select
                  value={newOrder.productId}
                  onChange={(e) => {
                    const pid = e.target.value;
                    const p = products.find(x => x.id === pid);
                    const firstSize = p ? Object.keys(p.variants)[0] : 'M';
                    setNewOrder({ ...newOrder, productId: pid, size: firstSize });
                  }}
                  className="w-full bg-slate-900 border border-slate-700 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} (৳{p.price})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">সাইজ (Size)</label>
                  <select
                    value={newOrder.size}
                    onChange={(e) => setNewOrder({ ...newOrder, size: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                  >
                    {products.find(p => p.id === newOrder.productId) && 
                      Object.keys(products.find(p => p.id === newOrder.productId).variants).map(sz => (
                        <option key={sz} value={sz}>{sz}</option>
                      ))
                    }
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">পরিমাণ (Pcs)</label>
                  <input
                    type="number"
                    min="1"
                    value={newOrder.qty}
                    onChange={(e) => setNewOrder({ ...newOrder, qty: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">কুরিয়ার নির্বাচন করুন</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Steadfast', 'Pathao', 'RedX'].map(c => (
                    <button
                      type="button"
                      key={c}
                      onClick={() => setNewOrder({ ...newOrder, courier: c })}
                      className={`py-2 px-3 text-xs font-semibold rounded-lg border transition ${
                        newOrder.courier === c 
                          ? 'bg-indigo-600 border-indigo-500 text-white' 
                          : 'bg-slate-900 border-slate-700 text-slate-300'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewOrderModal(false)}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold shadow-lg shadow-indigo-600/30"
                >
                  অর্ডার সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: RESTOCK / ADD LOT */}
      {showRestockModal && selectedProductForRestock && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-base">স্টক রিফিল / নতুন লট যোগ</h3>
                <p className="text-xs text-slate-400">{selectedProductForRestock.name}</p>
              </div>
              <button 
                onClick={() => setShowRestockModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRestockSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-xs text-slate-300 block mb-1">কোন সাইজে স্টক বাড়াবেন?</label>
                <select
                  value={restockSize}
                  onChange={(e) => setRestockSize(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  {Object.keys(selectedProductForRestock.variants).map(sz => (
                    <option key={sz} value={sz}>
                      সাইজ: {sz} (বর্তমান হাতে স্টক: {selectedProductForRestock.variants[sz].stock} pcs)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">কত পিস যোগ করবেন? (Quantity)</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={restockQty}
                  onChange={(e) => setRestockQty(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-700 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowRestockModal(false)}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-semibold shadow-lg shadow-emerald-600/30"
                >
                  স্টকে যুক্ত করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD NEW PRODUCT */}
      {showNewProductModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
              <h3 className="font-bold text-white text-base">নতুন পোশাক / প্রোডাক্ট যোগ করুন</h3>
              <button 
                onClick={() => setShowNewProductModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProductSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-xs text-slate-300 block mb-1">প্রোডাক্টের নাম</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: Heavyweight Oversized Hoodie"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs text-slate-300">ক্যাটাগরি</label>
                    <button
                      type="button"
                      onClick={() => setInlineNewCatOpen(!inlineNewCatOpen)}
                      className="text-[11px] text-indigo-400 hover:underline"
                    >
                      {inlineNewCatOpen ? 'তালিকায় ফেরত' : '+ নতুন লিখুন'}
                    </button>
                  </div>
                  
                  {inlineNewCatOpen ? (
                    <input
                      type="text"
                      placeholder="ক্যাটাগরির নাম লিখুন..."
                      value={inlineNewCatName}
                      onChange={(e) => setInlineNewCatName(e.target.value)}
                      className="w-full bg-slate-900 border border-indigo-500 px-3 py-2 rounded-lg text-sm text-white focus:outline-none"
                    />
                  ) : (
                    <select
                      value={newProdCat}
                      onChange={(e) => setNewProdCat(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                    >
                      {categories.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  )}
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">SKU কোড</label>
                  <input
                    type="text"
                    placeholder="HOD-BLK-05"
                    value={newProdSku}
                    onChange={(e) => setNewProdSku(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">বিক্রয় মূল্য (Selling Price ৳)</label>
                  <input
                    type="number"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">উৎপাদন খরচ (Cost Price ৳)</label>
                  <input
                    type="number"
                    value={newProdCost}
                    onChange={(e) => setNewProdCost(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-2">প্রাথমিক সাইজ-ভিত্তিক স্টক (Initial Stock)</label>
                <div className="grid grid-cols-4 gap-2">
                  {['S', 'M', 'L', 'XL'].map(sz => (
                    <div key={sz} className="bg-slate-900 p-2 rounded-lg border border-slate-700 text-center">
                      <span className="text-xs font-bold text-indigo-400 block mb-1">{sz}</span>
                      <input
                        type="number"
                        min="0"
                        value={newProdSizes[sz] || 0}
                        onChange={(e) => setNewProdSizes({ ...newProdSizes, [sz]: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 px-2 py-1 rounded text-center text-xs text-white"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewProductModal(false)}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold shadow-lg shadow-indigo-600/30"
                >
                  প্রোডাক্ট তৈরি করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
