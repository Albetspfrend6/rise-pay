import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, BookOpen, Target, Brain, Send, Home, Plus, Trophy, Flame, Users, Bell, X, Sparkles, ChevronRight, CheckCircle, Loader, ArrowRight, Lock, Star, Coins, Calendar, DollarSign, Eye, EyeOff } from 'lucide-react';

const RisePay = () => {
  const GEMINI_API_KEY = 'Secret';
  const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  // Core State
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(true);
  const [authMode, setAuthMode] = useState('signup');
  const [authError, setAuthError] = useState('');
  
  // Form Data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
    phone: ''
  });

  // App Data
  const [balance, setBalance] = useState(0);
  const [riseCoins, setRiseCoins] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [userStats, setUserStats] = useState({
    level: 1,
    xp: 0,
    nextLevelXp: 1000,
    streak: 0,
    coursesCompleted: 0
  });

  // Courses with REAL content
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Budgeting Basics',
      icon: '💰',
      color: 'bg-gradient-to-br from-emerald-500 to-green-600',
      locked: false,
      currentLesson: 0,
      completed: false,
      lessons: [
        {
          title: 'What is Budgeting?',
          content: 'Budgeting is planning how to spend your money wisely. The 50/30/20 rule: 50% for needs (food, rent), 30% for wants (entertainment), 20% for savings. Start by tracking where your money goes each month.',
          xp: 100
        },
        {
          title: 'Track Your Expenses',
          content: 'Write down every expense for 30 days. Categorize: Food, Transport, Entertainment, Bills. This shows your spending patterns. Most people are shocked by small daily expenses that add up to thousands monthly.',
          xp: 100
        },
        {
          title: 'Emergency Fund',
          content: 'Save 3-6 months of expenses in a separate account. This protects you from job loss, medical emergencies, or unexpected costs. Start small: ₹500/month grows to ₹6,000 in a year.',
          xp: 150
        }
      ],
      quiz: [
        {
          question: 'In 50/30/20 rule, what % is for savings?',
          options: ['10%', '20%', '30%', '50%'],
          correct: 1
        },
        {
          question: 'Emergency fund should cover how many months?',
          options: ['1-2', '3-6', '12', '24'],
          correct: 1
        }
      ]
    },
    {
      id: 2,
      title: 'Smart Investing',
      icon: '📈',
      color: 'bg-gradient-to-br from-purple-500 to-pink-600',
      locked: true,
      currentLesson: 0,
      completed: false,
      lessons: [
        {
          title: 'Why Invest?',
          content: 'Money in savings account loses value due to inflation (5-7% yearly). Investing beats inflation. ₹10,000 at 12% returns becomes ₹31,000 in 10 years. Start early, compound interest is powerful.',
          xp: 150
        },
        {
          title: 'SIP Strategy',
          content: 'Systematic Investment Plan: Invest fixed amount monthly (₹500, ₹1000). Rupee cost averaging: Buy more when prices are low, less when high. Removes emotion from investing. Best for beginners.',
          xp: 150
        },
        {
          title: 'Index Funds 101',
          content: 'Index funds track market (Nifty 50, Sensex). Low fees (0.1% vs 2% for active funds). Historical 12-15% returns. Diversified across 50 companies. Safest long-term investment for beginners.',
          xp: 150
        }
      ],
      quiz: [
        {
          question: 'Best investment strategy for beginners?',
          options: ['Lump sum', 'SIP', 'Day trading', 'Crypto only'],
          correct: 1
        }
      ]
    },
    {
      id: 3,
      title: 'Credit Card Smart Use',
      icon: '💳',
      color: 'bg-gradient-to-br from-blue-500 to-cyan-600',
      locked: true,
      currentLesson: 0,
      completed: false,
      lessons: [
        {
          title: 'Credit Score Basics',
          content: 'Credit score (300-900) shows your financial trustworthiness. 750+ is excellent. Based on: payment history (35%), credit utilization (30%), credit history length (15%), credit mix (10%), new credit (10%).',
          xp: 150
        },
        {
          title: 'Using Credit Cards Right',
          content: 'Never spend more than you have. Pay full bill monthly - NEVER minimum due. Use <30% of credit limit. Set autopay to avoid late fees. Grace period: 20-50 days interest-free if paid on time.',
          xp: 150
        },
        {
          title: 'Credit Card Rewards',
          content: 'Cashback cards: 1-5% back on purchases. Travel cards: Air miles, lounge access. Fuel cards: Save on petrol. Pay bills via credit card for rewards, then immediately pay off. Free money if used right!',
          xp: 150
        }
      ],
      quiz: [
        {
          question: 'Good credit utilization ratio is below?',
          options: ['90%', '50%', '30%', '10%'],
          correct: 2
        }
      ]
    }
  ]);

  // Daily Challenges
  const [dailyChallenges, setDailyChallenges] = useState([
    { id: 1, title: 'Save ₹100 today', reward: 50, completed: false, icon: '💰', progress: 0, target: 100 },
    { id: 2, title: 'Complete 1 lesson', reward: 100, completed: false, icon: '📚', progress: 0, target: 1 },
    { id: 3, title: 'Check your balance', reward: 25, completed: false, icon: '👁️', progress: 0, target: 1 },
    { id: 4, title: 'Add to a goal', reward: 75, completed: false, icon: '🎯', progress: 0, target: 1 },
  ]);

  // Achievements System
  const [achievements, setAchievements] = useState([
    { id: 1, name: 'First Step', desc: 'Complete first lesson', icon: '🎓', unlocked: false },
    { id: 2, name: 'Money Master', desc: 'Reach ₹10,000 balance', icon: '💰', unlocked: false },
    { id: 3, name: 'Goal Getter', desc: 'Create 3 goals', icon: '🎯', unlocked: false },
    { id: 4, name: 'Level 5', desc: 'Reach level 5', icon: '⭐', unlocked: false },
    { id: 5, name: 'Streak King', desc: '7 day streak', icon: '🔥', unlocked: false },
    { id: 6, name: 'Course Graduate', desc: 'Complete all courses', icon: '👨‍🎓', unlocked: false },
  ]);

  // Spending Analytics
  const [spendingData, setSpendingData] = useState({
    categories: {
      'Food': { amount: 0, color: 'bg-red-500', icon: '🍔' },
      'Transport': { amount: 0, color: 'bg-blue-500', icon: '🚗' },
      'Entertainment': { amount: 0, color: 'bg-purple-500', icon: '🎮' },
      'Shopping': { amount: 0, color: 'bg-pink-500', icon: '🛍️' },
      'Bills': { amount: 0, color: 'bg-yellow-500', icon: '💡' },
      'Others': { amount: 0, color: 'bg-gray-500', icon: '📦' }
    }
  });

  // Modals
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [addAmount, setAddAmount] = useState('');
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({ name: '', target: '', icon: '🎯' });
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showBirthdayReward, setShowBirthdayReward] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Load user data on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('risepay_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setShowAuth(false);
      loadUserData(userData.id);
    }
  }, []);

  // Save user data whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`risepay_balance_${user.id}`, JSON.stringify(balance));
      localStorage.setItem(`risepay_coins_${user.id}`, JSON.stringify(riseCoins));
      localStorage.setItem(`risepay_transactions_${user.id}`, JSON.stringify(transactions));
      localStorage.setItem(`risepay_goals_${user.id}`, JSON.stringify(goals));
      localStorage.setItem(`risepay_stats_${user.id}`, JSON.stringify(userStats));
      localStorage.setItem(`risepay_courses_${user.id}`, JSON.stringify(courses));
      localStorage.setItem(`risepay_chat_${user.id}`, JSON.stringify(chatHistory));
    }
  }, [balance, riseCoins, transactions, goals, userStats, courses, chatHistory, user]);

  const loadUserData = (userId) => {
    const savedBalance = localStorage.getItem(`risepay_balance_${userId}`);
    const savedCoins = localStorage.getItem(`risepay_coins_${userId}`);
    const savedTransactions = localStorage.getItem(`risepay_transactions_${userId}`);
    const savedGoals = localStorage.getItem(`risepay_goals_${userId}`);
    const savedStats = localStorage.getItem(`risepay_stats_${userId}`);
    const savedCourses = localStorage.getItem(`risepay_courses_${userId}`);
    const savedChat = localStorage.getItem(`risepay_chat_${userId}`);

    if (savedBalance) setBalance(JSON.parse(savedBalance));
    if (savedCoins) setRiseCoins(JSON.parse(savedCoins));
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
    if (savedGoals) setGoals(JSON.parse(savedGoals));
    if (savedStats) setUserStats(JSON.parse(savedStats));
    if (savedCourses) setCourses(JSON.parse(savedCourses));
    if (savedChat) setChatHistory(JSON.parse(savedChat));
  };

  const handleSignup = () => {
    setAuthError('');
    
    if (!formData.name || !formData.email || !formData.password || !formData.dob || !formData.phone) {
      setAuthError('Please fill all fields');
      return;
    }

    if (formData.password.length < 6) {
      setAuthError('Password must be at least 6 characters');
      return;
    }

    const existingUser = localStorage.getItem('risepay_user');
    if (existingUser) {
      const userData = JSON.parse(existingUser);
      if (userData.email === formData.email) {
        setAuthError('Email already registered. Please login.');
        setAuthMode('login');
        return;
      }
    }

    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      dob: formData.dob,
      phone: formData.phone,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem('risepay_user', JSON.stringify(newUser));
    setUser(newUser);
    setShowAuth(false);
    
    // Welcome bonus
    setBalance(1000);
    setRiseCoins(500);
    setUserStats(prev => ({ ...prev, xp: 100 }));
    
    const welcomeTxn = {
      id: Date.now(),
      type: 'credit',
      amount: 1000,
      category: 'Welcome Bonus',
      date: new Date().toISOString(),
      icon: '🎉'
    };
    setTransactions([welcomeTxn]);
  };

  const handleLogin = () => {
    setAuthError('');
    
    if (!formData.email || !formData.password) {
      setAuthError('Please enter email and password');
      return;
    }

    const savedUser = localStorage.getItem('risepay_user');
    if (!savedUser) {
      setAuthError('No account found. Please sign up.');
      return;
    }

    const userData = JSON.parse(savedUser);
    if (userData.email !== formData.email) {
      setAuthError('Invalid email or password');
      return;
    }

    setUser(userData);
    setShowAuth(false);
    loadUserData(userData.id);
  };

  const handleLogout = () => {
    setUser(null);
    setShowAuth(true);
    setCurrentView('home');
    setFormData({ name: '', email: '', password: '', dob: '', phone: '' });
  };

  const addXP = (amount) => {
    setUserStats(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 1000) + 1;
      
      if (newLevel > prev.level) {
        setRiseCoins(c => c + newLevel * 100);
        setTimeout(() => alert(`🎉 Level Up! Now Level ${newLevel}! +${newLevel * 100} RiseCoins!`), 100);
      }
      
      return { ...prev, xp: newXP, level: newLevel };
    });
  };

  const handleAddMoney = () => {
    const amount = parseFloat(addAmount);
    if (!amount || amount <= 0) return;

    setBalance(prev => prev + amount);
    setTransactions(prev => [{
      id: Date.now(),
      type: 'credit',
      amount: amount,
      category: 'Added Funds',
      date: new Date().toISOString(),
      icon: '💰'
    }, ...prev]);
    
    addXP(50);
    setRiseCoins(prev => prev + Math.floor(amount / 10));
    setShowAddMoney(false);
    setAddAmount('');
  };

  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.target) return;

    setGoals(prev => [...prev, {
      id: Date.now(),
      name: newGoal.name,
      target: parseFloat(newGoal.target),
      current: 0,
      icon: newGoal.icon,
      createdAt: new Date().toISOString()
    }]);
    
    addXP(100);
    setRiseCoins(prev => prev + 50);
    setShowAddGoal(false);
    setNewGoal({ name: '', target: '', icon: '🎯' });
  };

  const completeLesson = () => {
    if (!currentCourse || currentLesson === null) return;

    const lesson = currentCourse.lessons[currentLesson];
    addXP(lesson.xp);
    setRiseCoins(prev => prev + Math.floor(lesson.xp / 2));

    setCourses(prev => prev.map(course => {
      if (course.id === currentCourse.id) {
        const nextLesson = currentLesson + 1;
        if (nextLesson >= course.lessons.length) {
          // Course completed, show quiz
          setShowQuiz(true);
          setCurrentLesson(null);
          return course;
        }
        return { ...course, currentLesson: nextLesson };
      }
      return course;
    }));

    setCurrentLesson(null);
  };

  const submitQuiz = () => {
    let correct = 0;
    currentCourse.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) correct++;
    });

    const score = (correct / currentCourse.quiz.length) * 100;
    
    if (score >= 60) {
      setCourses(prev => prev.map(course => {
        if (course.id === currentCourse.id) {
          // Unlock next course
          const nextCourseIndex = courses.findIndex(c => c.id === course.id) + 1;
          if (nextCourseIndex < courses.length) {
            courses[nextCourseIndex].locked = false;
          }
          return { ...course, completed: true };
        }
        return course;
      }));

      addXP(500);
      setRiseCoins(prev => prev + 250);
      setUserStats(prev => ({ ...prev, coursesCompleted: prev.coursesCompleted + 1 }));
      alert(`🎉 Course Completed! Score: ${score}%\n+500 XP +250 RiseCoins`);
    } else {
      alert(`Score: ${score}%. Need 60% to pass. Try again!`);
    }

    setShowQuiz(false);
    setQuizAnswers({});
    setCurrentCourse(null);
  };

  const sendAIMessage = async () => {
    if (!aiMessage.trim() || isAIThinking) return;
    
    const userMsg = { 
      type: 'user', 
      text: aiMessage, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    
    setChatHistory(prev => [...prev, userMsg]);
    setAiMessage('');
    setIsAIThinking(true);

    try {
      const context = `You are RiseMentor, an expert financial advisor for Indian youth (ages 15-25). 

User Profile:
- Name: ${user?.name}
- Level: ${userStats.level}, XP: ${userStats.xp}
- Balance: ₹${balance.toLocaleString()}, RiseCoins: ${riseCoins}
- Goals: ${goals.length} active (${goals.map(g => g.name).join(', ')})
- Courses completed: ${userStats.coursesCompleted}/2

Guidelines:
1. For FINANCE questions: Give specific, actionable advice for Indian context (UPI, SIP, Nifty, tax)
2. For GENERAL questions: Politely redirect to finance: "I'm your financial mentor! Ask me about budgeting, investing, or saving. But since you asked..."
3. Keep answers brief (2-3 sentences), friendly, use emojis
4. Reference their actual data when relevant
5. Be encouraging and practical

User asks: ${aiMessage}`;

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: context }] }]
        })
      });

      const data = await response.json();
      
      let aiText = "Sorry, I'm having trouble connecting. Try again!";
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        aiText = data.candidates[0].content.parts[0].text;
      }

      setChatHistory(prev => [...prev, { 
        type: 'ai', 
        text: aiText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      
    } catch (error) {
      setChatHistory(prev => [...prev, { 
        type: 'ai', 
        text: '🤖 Connection error. Check your internet!',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsAIThinking(false);
    }
  };

  // Auth Screen
  if (showAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl mx-auto mb-4 flex items-center justify-center">
              <Wallet size={40} className="text-white" />
            </div>
            <h1 className="text-white font-bold text-4xl mb-2">RisePay</h1>
            <p className="text-gray-400 text-sm">Your Financial Growth Partner</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => { setAuthMode('signup'); setAuthError(''); }}
                className={`flex-1 py-3 rounded-xl font-semibold transition ${
                  authMode === 'signup' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'bg-white/5 text-gray-400'
                }`}
              >
                Sign Up
              </button>
              <button
                onClick={() => { setAuthMode('login'); setAuthError(''); }}
                className={`flex-1 py-3 rounded-xl font-semibold transition ${
                  authMode === 'login' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'bg-white/5 text-gray-400'
                }`}
              >
                Login
              </button>
            </div>

            {authError && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 mb-4">
                <p className="text-red-200 text-sm">{authError}</p>
              </div>
            )}

            <div className="space-y-3">
              {authMode === 'signup' && (
                <>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/10 text-white placeholder-gray-400 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({...formData, dob: e.target.value})}
                    className="w-full bg-white/10 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-white/10 text-white placeholder-gray-400 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </>
              )}
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white/10 text-white placeholder-gray-400 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-white/10 text-white placeholder-gray-400 rounded-xl px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <button
                onClick={authMode === 'signup' ? handleSignup : handleLogin}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-xl hover:shadow-lg transition"
              >
                {authMode === 'signup' ? 'Create Account' : 'Login'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main App
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-md mx-auto min-h-screen pb-20">
        
        {/* Home View */}
        {currentView === 'home' && (
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">Welcome back</p>
                <h2 className="text-white font-bold text-2xl">{user?.name}</h2>
              </div>
              <button onClick={handleLogout} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <Bell size={20} className="text-white" />
              </button>
            </div>

            {/* Balance Card */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-6 shadow-2xl">
              <p className="text-white/80 text-sm mb-2">Total Balance</p>
              <h1 className="text-white font-bold text-4xl mb-4">₹{balance.toLocaleString()}</h1>
              <div className="flex gap-2 mb-4">
                <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
                  <Coins size={16} className="text-yellow-300" />
                  <span className="text-white text-sm font-semibold">{riseCoins}</span>
                </div>
                <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
                  <Trophy size={16} className="text-yellow-300" />
                  <span className="text-white text-sm font-semibold">Level {userStats.level}</span>
                </div>
              </div>
              <button
                onClick={() => setShowAddMoney(true)}
                className="w-full bg-white text-purple-600 font-semibold py-3 rounded-xl hover:shadow-lg transition"
              >
                Add Money
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                <Trophy size={20} className="text-yellow-400 mb-2" />
                <p className="text-white text-2xl font-bold">{userStats.level}</p>
                <p className="text-gray-400 text-xs">Level</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                <Flame size={20} className="text-orange-400 mb-2" />
                <p className="text-white text-2xl font-bold">{userStats.streak}</p>
                <p className="text-gray-400 text-xs">Streak</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                <TrendingUp size={20} className="text-green-400 mb-2" />
                <p className="text-white text-2xl font-bold">{userStats.xp}</p>
                <p className="text-gray-400 text-xs">XP</p>
              </div>
            </div>

            {/* AI Mentor Card */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl p-5 border border-purple-500/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Brain size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold flex items-center gap-2">
                      RiseMentor AI
                      <Sparkles size={14} className="text-yellow-400" />
                    </h4>
                    <p className="text-gray-400 text-xs">Powered by Gemini</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAIChat(true)}
                  className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-purple-600 transition"
                >
                  Chat
                </button>
              </div>
              <p className="text-gray-300 text-sm">
                💡 Ask me anything about budgeting, investing, or financial planning!
              </p>
            </div>

            {/* Recent Transactions */}
            <div>
              <h3 className="text-white font-bold text-lg mb-3">Recent Activity</h3>
              <div className="space-y-2">
                {transactions.slice(0, 5).map(txn => (
                  <div key={txn.id} className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{txn.icon}</span>
                      <div>
                        <p className="text-white font-medium">{txn.category}</p>
                        <p className="text-gray-400 text-xs">{new Date(txn.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <span className={`font-bold ${txn.type === 'credit' ? 'text-green-400' : 'text-red-400'}`}>
                      {txn.type === 'credit' ? '+' : '-'}₹{txn.amount}
                    </span>
                  </div>
                ))}
                {transactions.length === 0 && (
                  <p className="text-center text-gray-400 py-8">No transactions yet</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Learn View */}
        {currentView === 'learn' && (
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-white font-bold text-2xl">RiseLearn</h2>
                <p className="text-gray-400 text-sm">Master financial skills</p>
              </div>
            </div>

            {/* Progress Card */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-white/80 text-sm">Your Progress</p>
                  <h3 className="text-white font-bold text-3xl">Level {userStats.level}</h3>
                </div>
                <BookOpen size={48} className="text-white/60" />
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                <div className="h-full bg-white rounded-full transition-all" style={{width: `${(userStats.xp / userStats.nextLevelXp) * 100}%`}}></div>
              </div>
              <p className="text-white/80 text-sm">{userStats.xp} / {userStats.nextLevelXp} XP</p>
            </div>

            {/* Courses */}
            <div className="space-y-4">
              {courses.map(course => (
                <div key={course.id} className={`${course.color} rounded-2xl p-5 ${course.locked ? 'opacity-60' : ''}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{course.icon}</span>
                      <div>
                        <h3 className="text-white font-bold">{course.title}</h3>
                        <p className="text-white/80 text-sm">{course.lessons.length} lessons</p>
                      </div>
                    </div>
                    {course.locked && <Lock size={24} className="text-white/80" />}
                    {course.completed && <CheckCircle size={24} className="text-white" />}
                  </div>
                  
                  {!course.locked && !course.completed && (
                    <div className="space-y-2 mb-3">
                      {course.lessons.map((lesson, idx) => (
                        <div key={idx} className={`flex items-center justify-between bg-white/10 rounded-lg p-3 ${idx > course.currentLesson ? 'opacity-50' : ''}`}>
                          <div className="flex items-center gap-2">
                            {idx < course.currentLesson ? (
                              <CheckCircle size={16} className="text-green-300" />
                            ) : idx === course.currentLesson ? (
                              <div className="w-4 h-4 bg-white rounded-full"></div>
                            ) : (
                              <Lock size={16} className="text-white/50" />
                            )}
                            <span className="text-white text-sm">{lesson.title}</span>
                          </div>
                          <span className="text-white/60 text-xs">{lesson.xp} XP</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => {
                      if (!course.locked && !course.completed) {
                        setCurrentCourse(course);
                        setCurrentLesson(course.currentLesson);
                      }
                    }}
                    disabled={course.locked || course.completed}
                    className={`w-full py-3 rounded-xl font-semibold transition ${
                      course.locked || course.completed
                        ? 'bg-white/20 text-white/60 cursor-not-allowed'
                        : 'bg-white text-purple-600 hover:shadow-lg'
                    }`}
                  >
                    {course.locked ? 'Locked' : course.completed ? 'Completed ✓' : 'Continue Learning'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Goals View */}
        {currentView === 'goals' && (
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-white font-bold text-2xl">My Goals</h2>
              <button
                onClick={() => setShowAddGoal(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-12 h-12 flex items-center justify-center hover:shadow-lg transition"
              >
                <Plus size={24} className="text-white" />
              </button>
            </div>

            <div className="space-y-4">
              {goals.map(goal => {
                const progress = (goal.current / goal.target) * 100;
                return (
                  <div key={goal.id} className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{goal.icon}</span>
                        <div>
                          <h3 className="text-white font-bold">{goal.name}</h3>
                          <p className="text-gray-400 text-sm">₹{goal.current.toLocaleString()} / ₹{goal.target.toLocaleString()}</p>
                        </div>
                      </div>
                      <span className="text-white font-bold text-2xl">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3 mb-3">
                      <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all" style={{width: `${Math.min(progress, 100)}%`}}></div>
                    </div>
                    <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded-xl hover:shadow-lg transition">
                      Add Money
                    </button>
                  </div>
                );
              })}
              {goals.length === 0 && (
                <div className="text-center py-12">
                  <Target size={64} className="text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">No goals yet</p>
                  <button
                    onClick={() => setShowAddGoal(true)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition"
                  >
                    Create Your First Goal
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Profile View */}
        {currentView === 'profile' && (
          <div className="p-6 space-y-6">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                👤
              </div>
              <h2 className="text-white font-bold text-2xl mb-1">{user?.name}</h2>
              <p className="text-white/80 text-sm mb-4">{user?.email}</p>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/20 rounded-xl p-3">
                  <p className="text-white font-bold text-xl">{userStats.level}</p>
                  <p className="text-white/80 text-xs">Level</p>
                </div>
                <div className="bg-white/20 rounded-xl p-3">
                  <p className="text-white font-bold text-xl">{riseCoins}</p>
                  <p className="text-white/80 text-xs">Coins</p>
                </div>
                <div className="bg-white/20 rounded-xl p-3">
                  <p className="text-white font-bold text-xl">{userStats.coursesCompleted}</p>
                  <p className="text-white/80 text-xs">Courses</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full bg-red-500/20 border border-red-500/50 text-red-300 font-semibold py-4 rounded-2xl hover:bg-red-500/30 transition"
            >
              Logout
            </button>
          </div>
        )}

        {/* Add Money Modal */}
        {showAddMoney && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 max-w-sm w-full border border-white/20">
              <h3 className="text-white font-bold text-xl mb-4">Add Money</h3>
              <input
                type="number"
                placeholder="Enter amount"
                value={addAmount}
                onChange={(e) => setAddAmount(e.target.value)}
                className="w-full bg-white/10 text-white rounded-xl px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => { setShowAddMoney(false); setAddAmount(''); }}
                  className="flex-1 bg-white/10 text-white py-3 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddMoney}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Goal Modal */}
        {showAddGoal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 max-w-sm w-full border border-white/20">
              <h3 className="text-white font-bold text-xl mb-4">Create Goal</h3>
              <input
                type="text"
                placeholder="Goal name"
                value={newGoal.name}
                onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                className="w-full bg-white/10 text-white rounded-xl px-4 py-3 mb-3 outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="number"
                placeholder="Target amount"
                value={newGoal.target}
                onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                className="w-full bg-white/10 text-white rounded-xl px-4 py-3 mb-3 outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="grid grid-cols-5 gap-2 mb-4">
                {['🎮', '🎓', '💻', '✈️', '🏠', '🚗', '📱', '⚽', '🎸', '💍'].map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => setNewGoal({...newGoal, icon: emoji})}
                    className={`text-3xl p-3 rounded-xl ${newGoal.icon === emoji ? 'bg-purple-500' : 'bg-white/5'}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => { setShowAddGoal(false); setNewGoal({ name: '', target: '', icon: '🎯' }); }}
                  className="flex-1 bg-white/10 text-white py-3 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddGoal}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lesson Modal */}
        {currentLesson !== null && currentCourse && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 max-w-md w-full border border-white/20">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-bold text-xl">{currentCourse.lessons[currentLesson].title}</h3>
                <button onClick={() => setCurrentLesson(null)} className="text-gray-400">
                  <X size={24} />
                </button>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 mb-4">
                <p className="text-white leading-relaxed">{currentCourse.lessons[currentLesson].content}</p>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400 text-sm">Lesson {currentLesson + 1} of {currentCourse.lessons.length}</span>
                <span className="text-purple-400 text-sm font-semibold">+{currentCourse.lessons[currentLesson].xp} XP</span>
              </div>
              <button
                onClick={completeLesson}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-xl hover:shadow-lg transition"
              >
                Complete Lesson
              </button>
            </div>
          </div>
        )}

        {/* Quiz Modal */}
        {showQuiz && currentCourse && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 max-w-md w-full border border-white/20">
              <h3 className="text-white font-bold text-2xl mb-2">Course Quiz</h3>
              <p className="text-gray-400 text-sm mb-6">Answer at least 60% correctly to pass</p>
              
              <div className="space-y-4 mb-6">
                {currentCourse.quiz.map((q, qIdx) => (
                  <div key={qIdx} className="bg-white/5 rounded-xl p-4">
                    <p className="text-white font-semibold mb-3">{q.question}</p>
                    <div className="space-y-2">
                      {q.options.map((option, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => setQuizAnswers({...quizAnswers, [qIdx]: oIdx})}
                          className={`w-full text-left px-4 py-2 rounded-lg transition ${
                            quizAnswers[qIdx] === oIdx
                              ? 'bg-purple-500 text-white'
                              : 'bg-white/10 text-gray-300 hover:bg-white/20'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={submitQuiz}
                disabled={Object.keys(quizAnswers).length !== currentCourse.quiz.length}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition"
              >
                Submit Quiz
              </button>
            </div>
          </div>
        )}

        {/* AI Chat Modal */}
        {showAIChat && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 max-w-md w-full border border-white/20 max-h-[80vh] flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Brain size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">RiseMentor AI</h3>
                    <p className="text-gray-400 text-xs">Your financial guide</p>
                  </div>
                </div>
                <button onClick={() => setShowAIChat(false)} className="text-gray-400">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                {chatHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <Brain size={48} className="text-purple-400 mx-auto mb-3" />
                    <p className="text-white font-semibold mb-2">Ask me anything!</p>
                    <p className="text-gray-400 text-sm mb-4">Try these:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {['Budget tips', 'Save money', 'Invest how', 'My progress'].map(q => (
                        <button
                          key={q}
                          onClick={() => { setAiMessage(q); setTimeout(sendAIMessage, 100); }}
                          className="bg-white/5 text-white rounded-xl p-2 text-sm hover:bg-white/10 transition"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  chatHistory.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-2xl p-3 ${
                        msg.type === 'user' 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                          : 'bg-white/10 text-white'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                        <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                      </div>
                    </div>
                  ))
                )}
                {isAIThinking && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 rounded-2xl p-3 flex items-center gap-2">
                      <Loader size={16} className="text-purple-400 animate-spin" />
                      <span className="text-white text-sm">Thinking...</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  value={aiMessage}
                  onChange={(e) => setAiMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !isAIThinking && sendAIMessage()}
                  placeholder="Ask me anything..."
                  disabled={isAIThinking}
                  className="flex-1 bg-white/10 text-white rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                />
                <button
                  onClick={sendAIMessage}
                  disabled={isAIThinking}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-12 h-12 flex items-center justify-center disabled:opacity-50 hover:shadow-lg transition"
                >
                  {isAIThinking ? <Loader size={20} className="text-white animate-spin" /> : <Send size={20} className="text-white" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-white/10 z-40">
          <div className="max-w-md mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              {[
                { id: 'home', icon: Home, label: 'Home' },
                { id: 'learn', icon: BookOpen, label: 'Learn' },
                { id: 'goals', icon: Target, label: 'Goals' },
                { id: 'profile', icon: Users, label: 'Profile' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`flex flex-col items-center gap-1 transition ${
                    currentView === item.id ? 'text-purple-400 scale-110' : 'text-gray-400'
                  }`}
                >
                  <item.icon size={24} />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RisePay;
