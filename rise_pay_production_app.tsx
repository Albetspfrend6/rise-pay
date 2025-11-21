import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, BookOpen, Target, Brain, Send, Home, Plus, Trophy, Flame, Star, Gift, Users, Bell, Settings, Check, X, Crown, Zap, Award, BarChart3, GraduationCap, Coins, Lock, Sparkles, ChevronRight, Clock, CheckCircle, Loader } from 'lucide-react';

const RisePayEnhanced = () => {
  const GEMINI_API_KEY = 'AIzaSyBPCQUVCym4i9gHaOut4rCh3_0jhtpOJlk';
  const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(true);
  const [authMode, setAuthMode] = useState('login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', dob: '', phone: '' });
  const [balance, setBalance] = useState(0);
  const [riseCoins, setRiseCoins] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [friends, setFriends] = useState([]);
  const [dailyChallenges, setDailyChallenges] = useState([]);
  const [learningCourses, setLearningCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [showBirthdayReward, setShowBirthdayReward] = useState(false);
  const [birthdayRewardClaimed, setBirthdayRewardClaimed] = useState(false);
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [addMoneyAmount, setAddMoneyAmount] = useState('');
  const [showSendMoney, setShowSendMoney] = useState(false);
  const [sendMoneyData, setSendMoneyData] = useState({ recipient: '', amount: '' });
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({ name: '', target: '', icon: '🎯' });
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('purple');
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [userStats, setUserStats] = useState({
    level: 1,
    xp: 0,
    nextLevelXp: 1000,
    streak: 0,
    lastLoginDate: null,
    joinDate: new Date().toISOString(),
    coursesCompleted: 0,
    achievementsUnlocked: 0
  });

  useEffect(() => {
    const courses = [
      {
        id: 1,
        title: 'Budgeting Basics',
        icon: '💰',
        color: 'from-green-500 to-emerald-500',
        progress: 0,
        totalLessons: 3,
        completedLessons: 0,
        xpReward: 300,
        lessons: [
          { id: 1, title: '50/30/20 Rule', duration: '2 min', completed: false, xp: 100 },
          { id: 2, title: 'Tracking Expenses', duration: '3 min', completed: false, xp: 100 },
          { id: 3, title: 'Emergency Fund', duration: '2 min', completed: false, xp: 100 }
        ],
        quiz: [
          { q: 'What % goes to needs in 50/30/20?', options: ['30%', '50%', '20%', '40%'], correct: 1 },
          { q: 'Emergency fund months?', options: ['1-2', '3-6', '12', '24'], correct: 1 }
        ]
      },
      {
        id: 2,
        title: 'UPI Mastery',
        icon: '💳',
        color: 'from-blue-500 to-cyan-500',
        progress: 0,
        totalLessons: 3,
        completedLessons: 0,
        xpReward: 300,
        lessons: [
          { id: 1, title: 'What is UPI?', duration: '2 min', completed: false, xp: 100 },
          { id: 2, title: 'UPI Safety', duration: '3 min', completed: false, xp: 100 },
          { id: 3, title: 'Advanced UPI', duration: '2 min', completed: false, xp: 100 }
        ],
        quiz: [
          { q: 'UPI stands for?', options: ['United Pay', 'Unified Payments Interface', 'Universal', 'Ultimate'], correct: 1 }
        ]
      },
      {
        id: 3,
        title: 'Investment 101',
        icon: '📈',
        color: 'from-purple-500 to-pink-500',
        progress: 0,
        totalLessons: 3,
        completedLessons: 0,
        xpReward: 450,
        lessons: [
          { id: 1, title: 'Why Invest?', duration: '3 min', completed: false, xp: 150 },
          { id: 2, title: 'Mutual Funds', duration: '3 min', completed: false, xp: 150 },
          { id: 3, title: 'SIP Strategy', duration: '2 min', completed: false, xp: 150 }
        ],
        quiz: [
          { q: 'Best for beginners?', options: ['Lump sum', 'SIP', 'Trading', 'Crypto'], correct: 1 }
        ]
      },
      {
        id: 4,
        title: 'Credit Score',
        icon: '⭐',
        color: 'from-yellow-400 to-orange-500',
        progress: 0,
        totalLessons: 3,
        completedLessons: 0,
        xpReward: 360,
        lessons: [
          { id: 1, title: 'What is Credit?', duration: '2 min', completed: false, xp: 120 },
          { id: 2, title: 'Building Credit', duration: '3 min', completed: false, xp: 120 },
          { id: 3, title: 'Credit Cards', duration: '2 min', completed: false, xp: 120 }
        ],
        quiz: [
          { q: 'Perfect score range?', options: ['300-500', '500-700', '700-900', '900+'], correct: 2 }
        ]
      },
      {
        id: 5,
        title: 'Tax Essentials',
        icon: '📊',
        color: 'from-red-500 to-pink-500',
        progress: 0,
        totalLessons: 3,
        completedLessons: 0,
        xpReward: 390,
        lessons: [
          { id: 1, title: 'Income Tax', duration: '3 min', completed: false, xp: 130 },
          { id: 2, title: 'Tax Saving', duration: '3 min', completed: false, xp: 130 },
          { id: 3, title: 'ITR Filing', duration: '2 min', completed: false, xp: 130 }
        ],
        quiz: [
          { q: 'Section 80C limit?', options: ['₹1L', '₹1.5L', '₹2L', '₹2.5L'], correct: 1 }
        ]
      }
    ];
    setLearningCourses(courses);
  }, []);

  useEffect(() => {
    const challenges = [
      { id: 1, title: 'Save ₹100 today', reward: 50, progress: 0, target: 100, icon: '💰', completed: false, type: 'save' },
      { id: 2, title: 'Complete 1 lesson', reward: 100, progress: 0, target: 1, icon: '📚', completed: false, type: 'learn' },
      { id: 3, title: 'No spending 24h', reward: 75, progress: 0, target: 1, icon: '🚫', completed: false, type: 'save' },
      { id: 4, title: 'Add to goal', reward: 80, progress: 0, target: 500, icon: '🎯', completed: false, type: 'goal' },
      { id: 5, title: 'Refer a friend', reward: 200, progress: 0, target: 1, icon: '👥', completed: false, type: 'social' }
    ];
    setDailyChallenges(challenges);
  }, []);

  const isBirthday = () => {
    if (!user || !user.dob) return false;
    const today = new Date();
    const birthDate = new Date(user.dob);
    return today.getMonth() === birthDate.getMonth() && today.getDate() === birthDate.getDate();
  };

  useEffect(() => {
    if (user && isBirthday() && !birthdayRewardClaimed) {
      setTimeout(() => setShowBirthdayReward(true), 2000);
    }
  }, [user, birthdayRewardClaimed]);

  const addXP = (amount, reason) => {
    setUserStats(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 1000) + 1;
      const leveledUp = newLevel > prev.level;
      
      if (leveledUp) {
        setRiseCoins(c => c + newLevel * 100);
        alert(`🎉 Level ${newLevel}! +${newLevel * 100} RiseCoins! ${reason || ''}`);
      }
      
      return { ...prev, xp: newXP, level: newLevel, nextLevelXp: newLevel * 1000 };
    });
  };

  const addRiseCoins = (amount, reason) => {
    setRiseCoins(prev => prev + amount);
  };

  const handleSignup = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.dob || !formData.phone) {
      alert('Please fill all fields!');
      return;
    }

    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      dob: formData.dob,
      phone: formData.phone,
      joinDate: new Date().toISOString()
    };

    localStorage.setItem('risepay_user', JSON.stringify(newUser));
    setUser(newUser);
    setShowAuth(false);
    setBalance(1000);
    setRiseCoins(500);
    addXP(100, 'Welcome!');
    
    const welcomeTxn = {
      id: Date.now(),
      type: 'income',
      amount: 1000,
      category: 'Welcome Bonus',
      date: new Date().toISOString(),
      icon: '🎉'
    };
    setTransactions([welcomeTxn]);
    
    alert('🎉 ₹1000 + 500 RiseCoins bonus!');
  };

  const handleLogin = () => {
    const storedUser = localStorage.getItem('risepay_user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.email === formData.email) {
        setUser(userData);
        setShowAuth(false);
        
        const storedBalance = localStorage.getItem(`risepay_balance_${userData.id}`);
        const storedTransactions = localStorage.getItem(`risepay_transactions_${userData.id}`);
        const storedGoals = localStorage.getItem(`risepay_goals_${userData.id}`);
        const storedStats = localStorage.getItem(`risepay_stats_${userData.id}`);
        const storedCoins = localStorage.getItem(`risepay_coins_${userData.id}`);
        const storedChatHistory = localStorage.getItem(`risepay_chat_${userData.id}`);
        
        if (storedBalance) setBalance(JSON.parse(storedBalance));
        if (storedTransactions) setTransactions(JSON.parse(storedTransactions));
        if (storedGoals) setGoals(JSON.parse(storedGoals));
        if (storedStats) setUserStats(JSON.parse(storedStats));
        if (storedCoins) setRiseCoins(JSON.parse(storedCoins));
        if (storedChatHistory) setChatHistory(JSON.parse(storedChatHistory));
      } else {
        alert('Invalid credentials!');
      }
    } else {
      alert('No account found!');
    }
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem(`risepay_balance_${user.id}`, JSON.stringify(balance));
      localStorage.setItem(`risepay_transactions_${user.id}`, JSON.stringify(transactions));
      localStorage.setItem(`risepay_goals_${user.id}`, JSON.stringify(goals));
      localStorage.setItem(`risepay_stats_${user.id}`, JSON.stringify(userStats));
      localStorage.setItem(`risepay_coins_${user.id}`, JSON.stringify(riseCoins));
      localStorage.setItem(`risepay_chat_${user.id}`, JSON.stringify(chatHistory));
    }
  }, [balance, transactions, goals, userStats, riseCoins, chatHistory, user]);

  const claimBirthdayReward = () => {
    setBalance(prev => prev + 1000);
    setRiseCoins(prev => prev + 1000);
    
    const bdayTxn = {
      id: Date.now(),
      type: 'income',
      amount: 1000,
      category: '🎂 Birthday',
      date: new Date().toISOString(),
      icon: '🎉'
    };
    setTransactions(prev => [bdayTxn, ...prev]);
    
    setBirthdayRewardClaimed(true);
    setShowBirthdayReward(false);
    addXP(500, 'Happy Birthday!');
  };

  const handleAddMoney = () => {
    const amount = parseFloat(addMoneyAmount);
    if (!amount || amount <= 0) return;

    setBalance(prev => prev + amount);
    const txn = {
      id: Date.now(),
      type: 'income',
      amount: amount,
      category: 'Added Money',
      date: new Date().toISOString(),
      icon: '💰'
    };
    setTransactions(prev => [txn, ...prev]);
    setShowAddMoney(false);
    setAddMoneyAmount('');
    addXP(50, '');
    addRiseCoins(Math.floor(amount / 10), '');
  };

  const handleSendMoney = () => {
    const amount = parseFloat(sendMoneyData.amount);
    if (!sendMoneyData.recipient || !amount || amount <= 0 || amount > balance) return;

    setBalance(prev => prev - amount);
    const txn = {
      id: Date.now(),
      type: 'expense',
      amount: -amount,
      category: `To ${sendMoneyData.recipient}`,
      date: new Date().toISOString(),
      icon: '📤'
    };
    setTransactions(prev => [txn, ...prev]);
    setShowSendMoney(false);
    setSendMoneyData({ recipient: '', amount: '' });
    addXP(30, '');
  };

  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.target) return;

    const goal = {
      id: Date.now(),
      name: newGoal.name,
      target: parseFloat(newGoal.target),
      current: 0,
      icon: newGoal.icon,
      color: ['from-purple-500 to-pink-500', 'from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500'][Math.floor(Math.random() * 3)]
    };
    
    setGoals(prev => [...prev, goal]);
    setShowAddGoal(false);
    setNewGoal({ name: '', target: '', icon: '🎯' });
    addXP(100, '');
    addRiseCoins(50, '');
  };

  const addToGoal = (goalId) => {
    const amount = prompt('Amount:');
    const numAmount = parseFloat(amount);
    
    if (!numAmount || numAmount <= 0 || numAmount > balance) return;

    setBalance(prev => prev - numAmount);
    setGoals(prev => prev.map(g => 
      g.id === goalId ? { ...g, current: g.current + numAmount } : g
    ));
    
    const txn = {
      id: Date.now(),
      type: 'expense',
      amount: -numAmount,
      category: 'Goal',
      date: new Date().toISOString(),
      icon: '🎯'
    };
    setTransactions(prev => [txn, ...prev]);
    addXP(75, '');
    addRiseCoins(Math.floor(numAmount / 20), '');
  };

  const completeLesson = (courseId, lessonId) => {
    setLearningCourses(prev => prev.map(course => {
      if (course.id === courseId) {
        const updatedLessons = course.lessons.map(lesson => 
          lesson.id === lessonId ? { ...lesson, completed: true } : lesson
        );
        const completedCount = updatedLessons.filter(l => l.completed).length;
        const progress = (completedCount / updatedLessons.length) * 100;
        
        const lesson = course.lessons.find(l => l.id === lessonId);
        addXP(lesson.xp, 'Lesson done!');
        addRiseCoins(lesson.xp / 2, '');
        
        return { ...course, lessons: updatedLessons, progress, completedLessons: completedCount };
      }
      return course;
    }));
    
    setCurrentLesson(null);
  };

  const submitQuiz = () => {
    const course = currentCourse;
    let correct = 0;
    
    course.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) correct++;
    });
    
    const percentage = (correct / course.quiz.length) * 100;
    
    if (percentage >= 60) {
      addXP(500, `Course done! ${percentage}%`);
      addRiseCoins(250, '');
      setUserStats(prev => ({ ...prev, coursesCompleted: prev.coursesCompleted + 1 }));
      alert(`🎉 ${percentage}%! +500 XP`);
    } else {
      alert(`${percentage}%. Need 60%`);
    }
    
    setShowQuiz(false);
    setQuizAnswers({});
    setCurrentCourse(null);
  };

  const sendAIMessage = async () => {
    if (!aiMessage.trim()) return;
    
    const userMsg = { type: 'user', text: aiMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatHistory(prev => [...prev, userMsg]);
    setAiMessage('');
    setIsAIThinking(true);

    try {
      const userContext = `
User Profile:
- Name: ${user?.name}
- Level: ${userStats.level}
- XP: ${userStats.xp}/${userStats.nextLevelXp}
- Streak: ${userStats.streak} days
- Balance: ₹${balance.toLocaleString()}
- RiseCoins: ${riseCoins}
- Goals: ${goals.length} (${goals.map(g => `${g.name}: ${Math.round((g.current/g.target)*100)}%`).join(', ')})
- Courses Completed: ${userStats.coursesCompleted}/5
- Recent Transactions: ${transactions.slice(0, 3).map(t => `${t.category}: ₹${t.amount}`).join(', ')}

You are RiseMentor AI, a friendly and encouraging financial coach for youth in India. Give personalized, actionable advice based on the user's data. Keep responses conversational, brief (2-3 sentences), and use emojis. Focus on practical tips for saving, budgeting, and financial growth.`;

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${userContext}\n\nUser Question: ${aiMessage}`
            }]
          }]
        })
      });

      const data = await response.json();
      
      let aiResponseText = 'Sorry, I had trouble understanding that. Try asking about your balance, goals, or learning progress!';
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
        aiResponseText = data.candidates[0].content.parts[0].text;
      }

      const aiMsg = { 
        type: 'ai', 
        text: aiResponseText, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      
      setChatHistory(prev => [...prev, aiMsg]);
      
    } catch (error) {
      console.error('AI Error:', error);
      const errorMsg = { 
        type: 'ai', 
        text: '🤖 Oops! I had a connection issue. Try again in a moment!', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      setChatHistory(prev => [...prev, errorMsg]);
    } finally {
      setIsAIThinking(false);
    }
  };

  const themes = {
    purple: 'from-purple-600 via-pink-600 to-purple-700',
    blue: 'from-blue-600 via-cyan-600 to-blue-700',
    green: 'from-green-600 via-emerald-600 to-green-700',
    orange: 'from-orange-600 via-red-600 to-orange-700'
  };

  if (showAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl mx-auto mb-4 flex items-center justify-center animate-pulse">
              <Wallet size={40} className="text-white" />
            </div>
            <h1 className="text-white font-bold text-4xl mb-2">RisePay</h1>
            <p className="text-gray-400">AI-Powered Financial OS</p>
            <div className="mt-3 inline-flex items-center space-x-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2">
              <Sparkles size={16} className="text-purple-400" />
              <span className="text-purple-300 text-sm font-semibold">Powered by Gemini AI</span>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <div className="flex space-x-2 mb-6">
              <button onClick={() => setAuthMode('login')} className={`flex-1 py-3 rounded-xl font-semibold ${authMode === 'login' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-white/5 text-gray-400'}`}>
                Login
              </button>
              <button onClick={() => setAuthMode('signup')} className={`flex-1 py-3 rounded-xl font-semibold ${authMode === 'signup' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-white/5 text-gray-400'}`}>
                Sign Up
              </button>
            </div>

            <div className="space-y-4">
              {authMode === 'signup' && (
                <>
                  <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/10 text-white rounded-xl px-4 py-3" />
                  <input type="date" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} className="w-full bg-white/10 text-white rounded-xl px-4 py-3" />
                  <input type="tel" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-white/10 text-white rounded-xl px-4 py-3" />
                </>
              )}
              <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white/10 text-white rounded-xl px-4 py-3" />
              <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full bg-white/10 text-white rounded-xl px-4 py-3" />
              <button onClick={authMode === 'signup' ? handleSignup : handleLogin} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-xl">
                {authMode === 'signup' ? 'Create Account' : 'Login'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <div className="max-w-md mx-auto min-h-screen relative pb-24">
        
        {currentView === 'home' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-gray-400 text-sm">Welcome,</p>
                <h2 className="text-white font-bold text-2xl">{user?.name}</h2>
              </div>
              <div className="flex space-x-2">
                {isPremium && <Crown size={24} className="text-yellow-400" />}
                <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Bell size={20} className="text-white" />
                </button>
              </div>
            </div>

            <div className={`bg-gradient-to-br ${themes[selectedTheme]} rounded-3xl p-6 mb-6`}>
              <p className="text-white/80 text-sm mb-2">Balance</p>
              <h1 className="text-white font-bold text-4xl mb-2">₹{balance.toLocaleString()}</h1>
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center space-x-1 bg-white/20 rounded-full px-3 py-1">
                  <Coins size={16} className="text-yellow-300" />
                  <span className="text-white text-sm font-semibold">{riseCoins}</span>
                </div>
                <div className="flex items-center space-x-1 bg-white/20 rounded-full px-3 py-1">
                  <Trophy size={16} className="text-yellow-300" />
                  <span className="text-white text-sm font-semibold">Lv{userStats.level}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setShowAddMoney(true)} className="bg-white text-purple-600 rounded-xl py-3 font-semibold flex items-center justify-center space-x-2">
                  <Plus size={20} />
                  <span>Add</span>
                </button>
                <button onClick={() => setShowSendMoney(true)} className="bg-white/20 text-white rounded-xl py-3 font-semibold flex items-center justify-center space-x-2">
                  <Send size={20} />
                  <span>Send</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-2xl">
                <Trophy size={20} className="mb-2 text-white" />
                <p className="text-white text-2xl font-bold">{userStats.level}</p>
                <p className="text-white/80 text-xs">Level</p>
              </div>
              <div className="bg-gradient-to-br from-red-400 to-pink-500 p-4 rounded-2xl">
                <Flame size={20} className="mb-2 text-white" />
                <p className="text-white text-2xl font-bold">{userStats.streak}</p>
                <p className="text-white/80 text-xs">Streak</p>
              </div>
              <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-4 rounded-2xl">
                <TrendingUp size={20} className="mb-2 text-white" />
                <p className="text-white text-2xl font-bold">{userStats.xp}</p>
                <p className="text-white/80 text-xs">XP</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-5 mb-6 border border-purple-500/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                    <Brain size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold flex items-center space-x-2">
                      <span>RiseMentor AI</span>
                      <Sparkles size={16} className="text-yellow-400" />
                    </h4>
                    <p className="text-gray-400 text-xs">Powered by Gemini</p>
                  </div>
                </div>
                <button onClick={() => setShowAIChat(true)} className="bg-purple-500 text-white rounded-full px-4 py-2 text-sm font-semibold">
                  Chat
                </button>
              </div>
              <p className="text-gray-300 text-sm">
                💡 Ask me anything about finance, budgeting, or investing. I'm here to help you grow!
              </p>
            </div>

            <div className="bg-white/5 rounded-3xl p-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-lg">Daily Challenges</h3>
                <Zap size={20} className="text-yellow-400" />
              </div>
              <div className="space-y-3">
                {dailyChallenges.slice(0, 3).map(challenge => (
                  <div key={challenge.id} className="bg-white/5 rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{challenge.icon}</span>
                      <div>
                        <p className="text-white text-sm font-medium">{challenge.title}</p>
                        <p className="text-gray-400 text-xs">+{challenge.reward} coins</p>
                      </div>
                    </div>
                    {challenge.completed ? (
                      <CheckCircle size={20} className="text-green-400" />
                    ) : (
                      <Clock size={20} className="text-gray-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-white font-bold text-lg mb-4">Recent</h3>
              <div className="space-y-2">
                {transactions.slice(0, 5).map(txn => (
                  <div key={txn.id} className="bg-white/5 rounded-xl p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{txn.icon}</span>
                      <div>
                        <p className="text-white font-medium">{txn.category}</p>
                        <p className="text-gray-400 text-sm">{new Date(txn.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <span className={`font-bold ${txn.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                      {txn.type === 'income' ? '+' : ''}{txn.amount}
                    </span>
                  </div>
                ))}
                {transactions.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <p>No transactions yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {currentView === 'learn' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-white font-bold text-2xl">RiseLearn</h2>
                <p className="text-gray-400 text-sm">Master financial skills</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl px-4 py-2">
                <p className="text-white text-xs">Courses</p>
                <p className="text-white font-bold">{userStats.coursesCompleted}/5</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 rounded-3xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white/80 text-sm">Level Progress</p>
                  <h3 className="text-white font-bold text-2xl">Level {userStats.level}</h3>
                </div>
                <GraduationCap size={48} className="text-white/60" />
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                <div className="h-full bg-white rounded-full" style={{width: `${(userStats.xp / userStats.nextLevelXp) * 100}%`}}></div>
              </div>
              <p className="text-white/80 text-sm">{userStats.xp}/{userStats.nextLevelXp} XP</p>
            </div>

            <div className="space-y-4">
              {learningCourses.map(course => (
                <div key={course.id} className="bg-white/5 rounded-3xl p-5 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${course.color} rounded-2xl flex items-center justify-center text-3xl`}>
                        {course.icon}
                      </div>
                      <div>
                        <h3 className="text-white font-bold">{course.title}</h3>
                        <p className="text-gray-400 text-sm">{course.totalLessons} lessons • {course.xpReward} XP</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-white font-bold text-xl">{Math.round(course.progress)}%</span>
                    </div>
                  </div>
                  
                  {course.progress > 0 && (
                    <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                      <div className={`h-full bg-gradient-to-r ${course.color} rounded-full`} style={{width: `${course.progress}%`}}></div>
                    </div>
                  )}

                  <div className="space-y-2 mb-4">
                    {course.lessons.map(lesson => (
                      <div key={lesson.id} className="bg-white/5 rounded-xl p-3 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {lesson.completed ? (
                            <CheckCircle size={20} className="text-green-400" />
                          ) : (
                            <Clock size={20} className="text-gray-400" />
                          )}
                          <div>
                            <p className="text-white text-sm font-medium">{lesson.title}</p>
                            <p className="text-gray-400 text-xs">{lesson.duration}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => {
                            setCurrentCourse(course);
                            setCurrentLesson(lesson);
                          }}
                          disabled={lesson.completed}
                          className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                            lesson.completed 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-purple-500 text-white'
                          }`}
                        >
                          {lesson.completed ? 'Done' : 'Start'}
                        </button>
                      </div>
                    ))}
                  </div>

                  {course.progress === 100 ? (
                    <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-3 flex items-center justify-center space-x-2">
                      <CheckCircle size={20} className="text-green-400" />
                      <span className="text-green-400 font-semibold">Completed!</span>
                    </div>
                  ) : course.progress > 0 ? (
                    <button 
                      onClick={() => setCurrentCourse(course)}
                      className={`w-full bg-gradient-to-r ${course.color} text-white font-semibold py-3 rounded-xl`}
                    >
                      Continue Course
                    </button>
                  ) : (
                    <button 
                      onClick={() => setCurrentCourse(course)}
                      className="w-full bg-white/10 text-white font-semibold py-3 rounded-xl"
                    >
                      Start Course
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === 'goals' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white font-bold text-2xl">Goals</h2>
              <button onClick={() => setShowAddGoal(true)} className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-12 h-12 flex items-center justify-center">
                <Plus size={24} className="text-white" />
              </button>
            </div>

            <div className="space-y-4">
              {goals.map(goal => {
                const progress = (goal.current / goal.target) * 100;
                return (
                  <div key={goal.id} className="bg-white/5 rounded-3xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-16 h-16 bg-gradient-to-r ${goal.color} rounded-2xl flex items-center justify-center text-3xl`}>
                          {goal.icon}
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg">{goal.name}</h3>
                          <p className="text-gray-400 text-sm">₹{goal.current} / ₹{goal.target}</p>
                        </div>
                      </div>
                      <span className="text-white font-bold text-2xl">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3 mb-4">
                      <div className={`h-full bg-gradient-to-r ${goal.color} rounded-full`} style={{width: `${Math.min(progress, 100)}%`}}></div>
                    </div>
                    <button onClick={() => addToGoal(goal.id)} className={`w-full bg-gradient-to-r ${goal.color} text-white font-semibold py-3 rounded-xl flex items-center justify-center space-x-2`}>
                      <Plus size={20} />
                      <span>Add Money</span>
                    </button>
                  </div>
                );
              })}
              {goals.length === 0 && (
                <div className="text-center py-12">
                  <Target size={64} className="text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">No goals yet</p>
                  <button onClick={() => setShowAddGoal(true)} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold">
                    Create Goal
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {currentView === 'profile' && (
          <div className="p-6">
            <div className={`bg-gradient-to-br ${themes[selectedTheme]} rounded-3xl p-6 mb-6 text-center`}>
              <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                👤
              </div>
              <h2 className="text-white font-bold text-2xl mb-2">{user?.name}</h2>
              <p className="text-white/80 text-sm mb-4">{user?.email}</p>
              {isPremium && (
                <div className="bg-yellow-400/20 border border-yellow-400/30 rounded-full px-4 py-2 inline-flex items-center space-x-2 mb-4">
                  <Crown size={16} className="text-yellow-400" />
                  <span className="text-yellow-400 font-semibold text-sm">Premium Member</span>
                </div>
              )}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/10 rounded-xl p-3">
                  <p className="text-white font-bold text-xl">{userStats.level}</p>
                  <p className="text-white/80 text-xs">Level</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3">
                  <p className="text-white font-bold text-xl">{riseCoins}</p>
                  <p className="text-white/80 text-xs">Coins</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3">
                  <p className="text-white font-bold text-xl">{userStats.streak}</p>
                  <p className="text-white/80 text-xs">Streak</p>
                </div>
              </div>
            </div>

            {!isPremium && (
              <button onClick={() => setShowPremiumModal(true)} className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-4 rounded-2xl mb-6 flex items-center justify-center space-x-2">
                <Crown size={24} />
                <span>Upgrade to Premium</span>
              </button>
            )}

            <div className="mb-6">
              <h3 className="text-white font-semibold mb-3">Choose Theme</h3>
              <div className="grid grid-cols-4 gap-3">
                {Object.entries(themes).map(([name, gradient]) => (
                  <button
                    key={name}
                    onClick={() => setSelectedTheme(name)}
                    className={`aspect-square bg-gradient-to-br ${gradient} rounded-2xl relative ${selectedTheme === name ? 'ring-4 ring-white' : ''}`}
                  >
                    {selectedTheme === name && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Check size={32} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => {
              localStorage.clear();
              setShowAuth(true);
              setUser(null);
            }} className="w-full bg-red-500/20 border border-red-500/30 text-red-400 font-semibold py-4 rounded-2xl">
              Logout
            </button>
          </div>
        )}

        {showBirthdayReward && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 rounded-3xl p-8 max-w-sm w-full text-center">
              <div className="text-6xl mb-4">🎂</div>
              <h2 className="text-white font-bold text-3xl mb-2">Happy Birthday!</h2>
              <p className="text-white/90 mb-6">₹1000 + 1000 RiseCoins!</p>
              <button onClick={claimBirthdayReward} className="w-full bg-white text-purple-600 font-bold py-4 rounded-xl mb-3">
                Claim Reward 🎉
              </button>
            </div>
          </div>
        )}

        {showAddMoney && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 max-w-sm w-full border border-white/20">
              <h3 className="text-white font-bold text-xl mb-4">Add Money</h3>
              <input
                type="number"
                placeholder="Amount"
                value={addMoneyAmount}
                onChange={(e) => setAddMoneyAmount(e.target.value)}
                className="w-full bg-white/10 text-white rounded-xl px-4 py-3 mb-4 outline-none"
              />
              <div className="flex space-x-3">
                <button onClick={() => setShowAddMoney(false)} className="flex-1 bg-white/10 text-white py-3 rounded-xl font-semibold">
                  Cancel
                </button>
                <button onClick={handleAddMoney} className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold">
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {showSendMoney && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 max-w-sm w-full border border-white/20">
              <h3 className="text-white font-bold text-xl mb-4">Send Money</h3>
              <input
                type="text"
                placeholder="Recipient"
                value={sendMoneyData.recipient}
                onChange={(e) => setSendMoneyData({...sendMoneyData, recipient: e.target.value})}
                className="w-full bg-white/10 text-white rounded-xl px-4 py-3 mb-3 outline-none"
              />
              <input
                type="number"
                placeholder="Amount"
                value={sendMoneyData.amount}
                onChange={(e) => setSendMoneyData({...sendMoneyData, amount: e.target.value})}
                className="w-full bg-white/10 text-white rounded-xl px-4 py-3 mb-4 outline-none"
              />
              <div className="flex space-x-3">
                <button onClick={() => setShowSendMoney(false)} className="flex-1 bg-white/10 text-white py-3 rounded-xl font-semibold">
                  Cancel
                </button>
                <button onClick={handleSendMoney} className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold">
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {showAddGoal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 max-w-sm w-full border border-white/20">
              <h3 className="text-white font-bold text-xl mb-4">Create Goal</h3>
              <input
                type="text"
                placeholder="Goal name"
                value={newGoal.name}
                onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                className="w-full bg-white/10 text-white rounded-xl px-4 py-3 mb-3 outline-none"
              />
              <input
                type="number"
                placeholder="Target amount"
                value={newGoal.target}
                onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                className="w-full bg-white/10 text-white rounded-xl px-4 py-3 mb-3 outline-none"
              />
              <div className="grid grid-cols-5 gap-2 mb-4">
                {['🎮', '🎓', '💻', '✈️', '🏠', '🚗', '📱', '⚽', '🎸', '💍'].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setNewGoal({...newGoal, icon: emoji})}
                    className={`text-3xl p-3 rounded-xl ${newGoal.icon === emoji ? 'bg-purple-500' : 'bg-white/5'}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              <div className="flex space-x-3">
                <button onClick={() => setShowAddGoal(false)} className="flex-1 bg-white/10 text-white py-3 rounded-xl font-semibold">
                  Cancel
                </button>
                <button onClick={handleAddGoal} className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold">
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        {showAIChat && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 max-w-md w-full border border-white/20 max-h-[80vh] flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                    <Brain size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold flex items-center space-x-2">
                      <span>RiseMentor AI</span>
                      <Sparkles size={16} className="text-yellow-400" />
                    </h3>
                    <p className="text-gray-400 text-xs">Powered by Gemini</p>
                  </div>
                </div>
                <button onClick={() => setShowAIChat(false)} className="text-gray-400">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                {chatHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <Brain size={48} className="text-purple-500 mx-auto mb-3" />
                    <p className="text-white font-semibold mb-2">Hi! I'm your AI mentor!</p>
                    <p className="text-gray-400 text-sm mb-4">Ask me about:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {['💰 Balance', '🎯 Goals', '📚 Learning', '📊 Budget'].map(q => (
                        <button
                          key={q}
                          onClick={() => {
                            setAiMessage(q.split(' ')[1]);
                            setTimeout(() => sendAIMessage(), 100);
                          }}
                          className="bg-white/5 text-white rounded-xl p-2 text-sm hover:bg-white/10"
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
                        msg.type === 'user' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-white/10 text-white'
                      }`}>
                        <p className="text-sm whitespace-pre-line">{msg.text}</p>
                        <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                      </div>
                    </div>
                  ))
                )}
                {isAIThinking && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 rounded-2xl p-3 flex items-center space-x-2">
                      <Loader size={16} className="text-purple-400 animate-spin" />
                      <span className="text-white text-sm">Thinking...</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
                <input
                  type="text"
                  value={aiMessage}
                  onChange={(e) => setAiMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !isAIThinking && sendAIMessage()}
                  placeholder="Ask anything..."
                  disabled={isAIThinking}
                  className="flex-1 bg-white/10 text-white rounded-full px-4 py-3 outline-none disabled:opacity-50"
                />
                <button 
                  onClick={sendAIMessage} 
                  disabled={isAIThinking}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-12 h-12 flex items-center justify-center disabled:opacity-50"
                >
                  {isAIThinking ? <Loader size={20} className="text-white animate-spin" /> : <Send size={20} className="text-white" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {currentLesson && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 max-w-md w-full border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-bold text-xl">{currentLesson.title}</h3>
                <button onClick={() => setCurrentLesson(null)} className="text-gray-400">
                  <X size={24} />
                </button>
              </div>
              <div className="mb-6">
                <div className="w-full aspect-video bg-white/5 rounded-2xl flex items-center justify-center mb-4">
                  <BookOpen size={64} className="text-purple-400" />
                </div>
                <p className="text-white mb-4">
                  This is a {currentLesson.duration} lesson about {currentLesson.title.toLowerCase()}.
                  Complete it to earn {currentLesson.xp} XP!
                </p>
                <p className="text-gray-400 text-sm">
                  In a full version, this would be an interactive video lesson with quizzes and animations.
                </p>
              </div>
              <button 
                onClick={() => completeLesson(currentCourse.id, currentLesson.id)}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-xl"
              >
                Complete Lesson (+{currentLesson.xp} XP)
              </button>
            </div>
          </div>
        )}

        {showPremiumModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-8 max-w-sm w-full text-center">
              <Crown size={64} className="text-white mx-auto mb-4" />
              <h2 className="text-white font-bold text-3xl mb-2">Go Premium!</h2>
              <p className="text-white/90 mb-6">Unlock exclusive features</p>
              <ul className="text-left text-white mb-6 space-y-2">
                <li className="flex items-center space-x-2">
                  <Check size={20} />
                  <span>Custom themes</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check size={20} />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check size={20} />
                  <span>Priority AI mentor</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check size={20} />
                  <span>Exclusive badges</span>
                </li>
              </ul>
              <div className="bg-white rounded-2xl p-4 mb-4">
                <p className="text-gray-600 text-sm">Premium</p>
                <p className="text-gray-900 font-bold text-4xl">₹99<span className="text-lg">/mo</span></p>
              </div>
              <button onClick={() => {
                setIsPremium(true);
                setShowPremiumModal(false);
                alert('🎉 Premium activated! (Demo)');
              }} className="w-full bg-white text-orange-600 font-bold py-4 rounded-xl mb-3">
                Upgrade Now
              </button>
              <button onClick={() => setShowPremiumModal(false)} className="text-white/80 text-sm">
                Maybe Later
              </button>
            </div>
          </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 backdrop-blur-xl border-t border-white/10 z-40">
          <div className="max-w-md mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              {[
                { id: 'home', icon: Home, label: 'Home' },
                { id: 'learn', icon: BookOpen, label: 'Learn' },
                { id: 'ai', icon: Brain, label: 'AI' },
                { id: 'goals', icon: Target, label: 'Goals' },
                { id: 'profile', icon: Users, label: 'Profile' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'ai') {
                      setShowAIChat(true);
                    } else {
                      setCurrentView(item.id);
                    }
                  }}
                  className={`flex flex-col items-center space-y-1 transition-all ${
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

export default RisePayEnhanced;
