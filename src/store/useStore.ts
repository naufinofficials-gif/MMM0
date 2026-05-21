import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'member' | 'admin';
export type UserStatus = 'active' | 'suspended' | 'banned';

export interface User {
  id: string;
  username: string;
  password?: string; // Stored for mock auth
  role: UserRole;
  name: string;
  bankAccount: string;
  eWallet: string;
  status: UserStatus;
  referralCode: string;
  referredBy?: string;
  hasProvidedHelp: boolean;
  createdAt: number;
}

export type TransactionType = 'PH' | 'GH';
export type TransactionStatus = 'pending' | 'matched' | 'completed' | 'rejected' | 'waiting_verification';

export interface Transaction {
  id: string;
  type: TransactionType;
  userId: string;
  amount: number;
  status: TransactionStatus;
  matchedWith?: string; // ID of the matched transaction
  proofUrl?: string;
  createdAt: number;
  matchedAt?: number;
  completedAt?: number;
}

export interface AppSettings {
  siteName: string;
  phValue: number;
  ghValue: number;
  ghTimeframe: number; // in days
}

interface AppState {
  currentUser: User | null;
  users: User[];
  transactions: Transaction[];
  settings: AppSettings;
  login: (username: string, password?: string) => boolean;
  logout: () => void;
  register: (user: Partial<User>) => boolean;
  updateProfile: (userId: string, data: Partial<User>) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  createTransaction: (type: TransactionType, userId: string, amount: number) => void;
  uploadProof: (transactionId: string, proofUrl: string) => void;
  verifyTransaction: (transactionId: string, status: TransactionStatus) => void;
  updateUserStatus: (userId: string, status: UserStatus) => void;
  matchTransactions: () => void;
}

const initialSettings: AppSettings = {
  siteName: 'BantuBersama',
  phValue: 1000000,
  ghValue: 1300000,
  ghTimeframe: 15,
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      users: [
        {
          id: 'admin1',
          username: 'admin',
          password: 'password',
          role: 'admin',
          name: 'Administrator',
          bankAccount: '-',
          eWallet: '-',
          status: 'active',
          referralCode: 'ADMIN',
          hasProvidedHelp: true,
          createdAt: Date.now(),
        },
      ],
      transactions: [],
      settings: initialSettings,

      login: (username, password) => {
        const user = get().users.find((u) => u.username === username && u.password === password);
        if (user) {
          if (user.status !== 'active') {
            alert(`Akun Anda berstatus: ${user.status}`);
            return false;
          }
          set({ currentUser: user });
          return true;
        }
        return false;
      },

      logout: () => set({ currentUser: null }),

      register: (userData) => {
        const exists = get().users.some((u) => u.username === userData.username);
        if (exists) return false;

        const newUser: User = {
          id: Math.random().toString(36).substring(2, 9),
          username: userData.username!,
          password: userData.password,
          role: 'member',
          name: userData.name || '',
          bankAccount: userData.bankAccount || '',
          eWallet: userData.eWallet || '',
          status: 'active',
          referralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
          referredBy: userData.referredBy,
          hasProvidedHelp: false,
          createdAt: Date.now(),
        };

        set((state) => ({ users: [...state.users, newUser] }));
        return true;
      },

      updateProfile: (userId, data) => {
        set((state) => ({
          users: state.users.map((u) => (u.id === userId ? { ...u, ...data } : u)),
          currentUser: state.currentUser?.id === userId ? { ...state.currentUser, ...data } : state.currentUser,
        }));
      },

      updateSettings: (newSettings) => {
        set((state) => ({ settings: { ...state.settings, ...newSettings } }));
      },

      createTransaction: (type, userId, amount) => {
        const newTx: Transaction = {
          id: Math.random().toString(36).substring(2, 9),
          type,
          userId,
          amount,
          status: type === 'PH' ? 'pending' : 'waiting_verification', // PH starts pending, GH might need verification
          createdAt: Date.now(),
        };
        
        if(type === 'GH') {
           newTx.status = 'pending';
        }

        set((state) => ({ transactions: [...state.transactions, newTx] }));
        get().matchTransactions();
      },

      uploadProof: (transactionId, proofUrl) => {
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === transactionId ? { ...t, proofUrl, status: 'waiting_verification' } : t
          ),
        }));
      },

      verifyTransaction: (transactionId, status) => {
        set((state) => {
          const txs = state.transactions.map((t) => {
            if (t.id === transactionId) {
              const updatedTx = { ...t, status };
              if (status === 'completed') {
                  updatedTx.completedAt = Date.now();
              }
              return updatedTx;
            }
            return t;
          });

          // Update user's hasProvidedHelp if a PH is completed
          const tx = txs.find(t => t.id === transactionId);
          let users = state.users;
          if (tx && tx.type === 'PH' && status === 'completed') {
             users = users.map(u => u.id === tx.userId ? { ...u, hasProvidedHelp: true } : u);
          }
          
          let currentUser = state.currentUser;
          if (tx && tx.type === 'PH' && status === 'completed' && currentUser?.id === tx.userId) {
              currentUser = { ...currentUser, hasProvidedHelp: true };
          }

          return { transactions: txs, users, currentUser };
        });
      },

      updateUserStatus: (userId, status) => {
        set((state) => ({
          users: state.users.map((u) => (u.id === userId ? { ...u, status } : u)),
        }));
      },

      matchTransactions: () => {
        // Simple matching logic: Find pending PH and pending GH
        set((state) => {
          const pendingPH = state.transactions.filter((t) => t.type === 'PH' && t.status === 'pending');
          const pendingGH = state.transactions.filter((t) => t.type === 'GH' && t.status === 'pending');

          let newTxs = [...state.transactions];

          for (const gh of pendingGH) {
            const phMatch = pendingPH.find((ph) => ph.amount >= gh.amount && !ph.matchedWith);
            if (phMatch) {
              // Match them
              newTxs = newTxs.map((t) => {
                if (t.id === gh.id) return { ...t, status: 'matched', matchedWith: phMatch.id, matchedAt: Date.now() };
                if (t.id === phMatch.id) return { ...t, status: 'matched', matchedWith: gh.id, matchedAt: Date.now() };
                return t;
              });
              // Remove matched PH from pending list for this loop
              const index = pendingPH.findIndex(p => p.id === phMatch.id);
              if (index > -1) pendingPH.splice(index, 1);
            }
          }

          return { transactions: newTxs };
        });
      },
    }),
    {
      name: 'bantu-bersama-storage',
    }
  )
);
