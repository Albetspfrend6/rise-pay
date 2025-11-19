import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, BookOpen, Target, Brain, Send, ChevronRight, Award, Zap, Flame, Smile, DollarSign, Home, Plus, ArrowUpRight, ArrowDownLeft, Trophy, Gift, Sparkles, Star, Check, X, CreditCard, Bell, Settings, Users, Lock } from 'lucide-react';

const RisePayMVP = () => {
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(true);
  const [authMode, setAuthMode] = useState('login');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
    phone: ''
  });

  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [showBirthdayReward, setShowBirthdayReward] = useState(false);
  const [birthdayRewardClaimed, setBirthdayRewardClaimed] = useState(false);
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [addMoneyAmount, setAddMoneyAmount] = useState('');
  const [showSendMoney, setShowSendMoney] = useState(false);
  const [sendMoneyData, setSendMoneyData] = useState({ recipient: '', amount: '' });
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({ name: '', target: '', icon: '🎯' });
  const [userStats, setUserStats] = useState({
    level: 1,
    xp: 0,
    nextLevelXp: 1000,
    streak: 0,
    lastLoginDate: null,
    joinDate: new Date().toISOString()
  });

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
        alert(`🎉 Level Up! You're now Level ${newLevel}! ${reason || ''}`);
      }
      
      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        nextLevelXp: newLevel * 1000
      };
    });
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
    addXP(100, 'Welcome to RisePay!');
    
    const welcomeTxn = {
      id: Date.now(),
      type: 'income',
      amount: 1000,
      category: 'Welcome Bonus',
      date: new Date().toISOString(),
      icon: '🎉'
    };
    setTransactions([welcomeTxn]);
    
    alert('🎉 Welcome! You got ₹1000 welcome bonus!');
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
        const storedBirthdayClaim = localStorage.getItem(`risepay_birthday_${userData.id}_${new Date().getFullYear()}`);
        
        if (storedBalance) setBalance(JSON.parse(storedBalance));
        if (storedTransactions) setTransactions(JSON.parse(storedTransactions));
        if (storedGoals) setGoals(JSON.parse(storedGoals));
        if (storedStats) setUserStats(JSON.parse(storedStats));
        if (storedBirthdayClaim) setBirthdayRewardClaimed(true);
      } else {
        alert('Invalid credentials!');
      }
    } else {
      alert('No account found! Please sign up.');
    }
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem(`risepay_balance_${user.id}`, JSON.stringify(balance));
      localStorage.setItem(`risepay_transactions_${user.id}`, JSON.stringify(transactions));
      localStorage.setItem(`risepay_goals_${user.id}`, JSON.stringify(goals));
      localStorage.setItem(`risepay_stats_${user.id}`, JSON.stringify(userStats));
    }
  }, [balance, transactions, goals, userStats, user]);

  const claimBirthdayReward = () => {
    const rewardAmount = 1000;
    setBalance(prev => prev + rewardAmount);
    
    const bdayTxn = {
      id: Date.now(),
      type: 'income',
      amount: rewardAmount,
      category: '🎂 Birthday Reward',
      date: new Date().toISOString(),
      icon: '🎉'
    };
    setTransactions(prev => [bdayTxn, ...prev]);
    
    setBirthdayRewardClaimed(true);
    localStorage.setItem(`risepay_birthday_${user.id}_${new Date().getFullYear()}`, 'claimed');
    setShowBirthdayReward(false);
    addXP(500, 'Happy Birthday! 🎂');
    
    alert('🎉 Happy Birthday! You received ₹1000! 🎂');
  };

  const handleAddMoney = () => {
    const amount = parseFloat(addMoneyAmount);
    if (!amount || amount <= 0) {
      alert('Enter valid amount!');
      return;
    }

    setBalance(prev => prev + amount);
    const txn = {
      id: Date.now(),
      type: 'income',
      amount: amount,
      category: 'Added to Wallet',
      date: new Date().toISOString(),
      icon: '💰'
    };
    setTransactions(prev => [txn, ...prev]);
    setShowAddMoney(false);
    setAddMoneyAmount('');
    addXP(50, 'Money Added!');
  };

  const handleSendMoney = () => {
    const amount = parseFloat(sendMoneyData.amount);
    if (!sendMoneyData.recipient || !amount || amount <= 0) {
      alert('Enter valid details!');
      return;
    }
    if (amount > balance) {
      alert('Insufficient balance!');
      return;
    }

    setBalance(prev => prev - amount);
    const txn = {
      id: Date.now(),
      type: 'expense',
      amount: -amount,
      category: `Sent to ${sendMoneyData.recipient}`,
      date: new Date().toISOString(),
      icon: '📤'
    };
    setTransactions(prev => [txn, ...prev]);
    setShowSendMoney(false);
    setSendMoneyData({ recipient: '', amount: '' });
    addXP(30, 'Money Sent!');
  };

  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.target) {
      alert('Fill all fields!');
      return;
    }

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
    addXP(100, 'Goal Created!');
  };

  const addToGoal = (goalId) => {
    const amount = prompt('Enter amount to add:');
    const numAmount = parseFloat(amount);
    
    if (!numAmount || numAmount <= 0) return;
    if (numAmount > balance) {
      alert('Insufficient balance!');
      return;
    }

    setBalance(prev => prev - numAmount);
    setGoals(prev => prev.map(g => 
      g.id === goalId ? { ...g, current: g.current + numAmount } : g
    ));
    
    const txn = {
      id: Date.now(),
      type: 'expense',
      amount: -numAmount,
      category: 'Saved for Goal',
      date: new Date().toISOString(),
      icon: '🎯'
    };
    setTransactions(prev => [txn, ...prev]);
    addXP(75, 'Saved towards goal!');
  };

  const sendAIMessage = () => {
    if (!aiMessage.trim()) return;
    
    const userMsg = { type: 'user', text: aiMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    
    let aiResponse = "I'm here to help with your finances! Try asking about budgeting, saving, or your goals.";
    const lowerMsg = aiMessage.toLowerCase();
    
    if (lowerMsg.includes('balance') || lowerMsg.includes('money')) {
      aiResponse = `You currently have ₹${balance.toLocaleString()} in your wallet. ${balance > 5000 ? 'Great savings! 🎉' : 'Try to save more this month! 💪'}`;
    } else if (lowerMsg.includes('save') || lowerMsg.includes('goal')) {
      aiResponse = `You have ${goals.length} active goals. ${goals.length > 0 ? `Focus on "${goals[0].name}" - you're ${Math.round((goals[0].current/goals[0].target)*100)}% there!` : 'Create your first goal to start saving! 🎯'}`;
    } else if (lowerMsg.includes('level') || lowerMsg.includes('xp')) {
      aiResponse = `You're Level ${userStats.level} with ${userStats.xp} XP! Need ${userStats.nextLevelXp - userStats.xp} more XP to level up. Keep saving and learning! 🚀`;
    }
    
    const aiMsg = { type: 'ai', text: aiResponse, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    
    setChatHistory([...chatHistory, userMsg, aiMsg]);
    setAiMessage('');
  };

  if (showAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl mx-auto mb-4 flex items-center justify-center">
              <Wallet size={40} className="text-white" />
            </div>
            <h1 className="text-white font-bold text-3xl mb-2">RisePay MVP</h1>
            <p className="text-gray-400">Your financial journey starts here</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <div className="flex space-x-2 mb-6">
              <button
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                  authMode === 'login'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-white/5 text-gray-400'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setAuthMode('signup')}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                  authMode === 'signup'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-white/5 text-gray-400'
                }`}
              >
                Sign Up
              </button>
            </div>

            <div className="space-y-4">
              {authMode === 'signup' && (
                <>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/10 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="date"
                    placeholder="Date of Birth"
                    value={formData.dob}
                    onChange={(e) => setFormData({...formData, dob: e.target.value})}
                    className="w-full bg-white/10 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-white/10 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </>
              )}
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white/10 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-white/10 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={authMode === 'signup' ? handleSignup : handleLogin}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-xl hover:scale-105 transition-transform"
              >
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
                <p className="text-gray-400 text-sm">Welcome back,</p>
                <h2 className="text-white font-bold text-2xl">{user?.name}</h2>
              </div>
              <div className="flex space-x-2">
                <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Bell size={20} className="text-white" />
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 rounded-3xl p-6 mb-6">
              <p className="text-white/80 text-sm mb-2">Total Balance</p>
              <h1 className="text-white font-bold text-4xl mb-6">₹{balance.toLocaleString()}</h1>
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
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-2xl text-white">
                <Trophy size={20} className="mb-2" />
                <p className="text-2xl font-bold">{userStats.level}</p>
                <p className="text-xs">Level</p>
              </div>
              <div className="bg-gradient-to-br from-red-400 to-pink-500 p-4 rounded-2xl text-white">
                <Flame size={20} className="mb-2" />
                <p className="text-2xl font-bold">{userStats.streak}</p>
                <p className="text-xs">Streak</p>
              </div>
              <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-4 rounded-2xl text-white">
                <TrendingUp size={20} className="mb-2" />
                <p className="text-2xl font-bold">{userStats.xp}</p>
                <p className="text-xs">XP</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-white font-bold text-lg mb-4">Recent Activity</h3>
              <div className="space-y-2">
                {transactions.slice(0, 5).map((txn) => (
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

        {currentView === 'goals' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white font-bold text-2xl">Your Goals</h2>
              <button onClick={() => setShowAddGoal(true)} className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-12 h-12 flex items-center justify-center">
                <Plus size={24} className="text-white" />
              </button>
            </div>

            <div className="space-y-4">
              {goals.map((goal) => {
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
                    Create First Goal
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {currentView === 'profile' && (
          <div className="p-6">
            <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 rounded-3xl p-6 mb-6 text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                👤
              </div>
              <h2 className="text-white font-bold text-2xl mb-2">{user?.name}</h2>
              <p className="text-white/80 text-sm mb-4">{user?.email}</p>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/10 rounded-xl p-3">
                  <p className="text-white font-bold text-xl">{userStats.level}</p>
                  <p className="text-white/80 text-xs">Level</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3">
                  <p className="text-white font-bold text-xl">{userStats.xp}</p>
                  <p className="text-white/80 text-xs">XP</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3">
                  <p className="text-white font-bold text-xl">{userStats.streak}</p>
                  <p className="text-white/80 text-xs">Streak</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-white/5 rounded-2xl p-4">
                <p className="text-gray-400 text-sm">Phone</p>
                <p className="text-white font-semibold">{user?.phone}</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-4">
                <p className="text-gray-400 text-sm">Date of Birth</p>
                <p className="text-white font-semibold">{user?.dob ? new Date(user.dob).toLocaleDateString() : 'Not set'}</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-4">
                <p className="text-gray-400 text-sm">Member Since</p>
                <p className="text-white font-semibold">{user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'Today'}</p>
              </div>
            </div>

            <button onClick={() => {
              localStorage.clear();
              setShowAuth(true);
              setUser(null);
            }} className="w-full mt-6 bg-red-500/20 border border-red-500/30 text-red-400 font-semibold py-4 rounded-2xl">
              Logout
            </button>
          </div>
        )}

        {showBirthdayReward && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 rounded-3xl p-8 max-w-sm w-full text-center">
              <div className="text-6xl mb-4">🎂</div>
              <h2 className="text-white font-bold text-3xl mb-2">Happy Birthday!</h2>
              <p className="text-white/90 mb-6">You've earned ₹1000 as your birthday reward!</p>
              <button onClick={claimBirthdayReward} className="w-full bg-white text-purple-600 font-bold py-4 rounded-xl mb-3">
                Claim Reward 🎉
              </button>
              <button onClick={() => setShowBirthdayReward(false)} className="text-white/80 text-sm">
                Maybe Later
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
                placeholder="Enter amount"
                value={addMoneyAmount}
                onChange={(e) => setAddMoneyAmount(e.target.value)}
                className="w-full bg-white/10 text-white rounded-xl px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-purple-500"
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
                placeholder="Recipient name/phone"
                value={sendMoneyData.recipient}
                onChange={(e) => setSendMoneyData({...sendMoneyData, recipient: e.target.value})}
                className="w-full bg-white/10 text-white rounded-xl px-4 py-3 mb-3 outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="number"
                placeholder="Amount"
                value={sendMoneyData.amount}
                onChange={(e) => setSendMoneyData({...sendMoneyData, amount: e.target.value})}
                className="w-full bg-white/10 text-white rounded-xl px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-purple-500"
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
                placeholder="Goal name (e.g., Gaming Setup)"
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
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Brain size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">RiseMentor AI</h3>
                    <p className="text-gray-400 text-xs">Your finance coach</p>
                  </div>
                </div>
                <button onClick={() => setShowAIChat(false)} className="text-gray-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                {chatHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <Brain size={48} className="text-purple-500 mx-auto mb-3" />
                    <p className="text-white font-semibold mb-2">Ask me anything!</p>
                    <p className="text-gray-400 text-sm">Try: balance, goals, level, save</p>
                  </div>
                ) : (
                  chatHistory.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-2xl p-3 ${
                        msg.type === 'user' 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                          : 'bg-white/10 text-white'
                      }`}>
                        <p className="text-sm">{msg.text}</p>
                        <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex space-x-3">
                <input
                  type="text"
                  value={aiMessage}
                  onChange={(e) => setAiMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendAIMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-white/10 text-white rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={sendAIMessage}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-12 h-12 flex items-center justify-center"
                >
                  <Send size={20} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 backdrop-blur-xl border-t border-white/10 z-40">
          <div className="max-w-md mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              {[
                { id: 'home', icon: Home, label: 'Home' },
                { id: 'goals', icon: Target, label: 'Goals' },
                { id: 'ai', icon: Brain, label: 'AI' },
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

export default RisePayMVP;
