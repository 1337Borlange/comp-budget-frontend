'use client';

import { Expense, User } from '@/lib/types';
import React, { createContext, useContext, useReducer, useState } from 'react';

type AdminContext = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  showUserModal: boolean;
  setShowUserModal: React.Dispatch<React.SetStateAction<boolean>>;
  userExpenses: Expense[] | undefined;
  setUserExpenses: React.Dispatch<React.SetStateAction<Expense[] | undefined>>;
  selectedExpense: Expense | undefined;
  setSelectedExpense: React.Dispatch<React.SetStateAction<Expense | undefined>>;
};

const AdminContext = createContext<AdminContext>({
  user: undefined,
  setUser: (value) => null,
  userExpenses: undefined,
  setUserExpenses: (value) => null,
  selectedExpense: undefined,
  setSelectedExpense: (value) => null,
  showUserModal: false,
  setShowUserModal: (value) => null,
});

interface Props {
  children: React.ReactNode;
}
export const AdminContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [userExpenses, setUserExpenses] = useState<Expense[] | undefined>();
  const [selectedExpense, setSelectedExpense] = useState<Expense | undefined>();
  const [showUserModal, setShowUserModal] = useState(false);

  return (
    <AdminContext.Provider
      value={{
        user,
        setUser,
        userExpenses,
        setUserExpenses,
        selectedExpense,
        setSelectedExpense,
        showUserModal,
        setShowUserModal,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
