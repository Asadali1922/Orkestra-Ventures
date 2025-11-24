import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Plus, Edit, Trash2, DollarSign, TrendingUp, TrendingDown } from "lucide-react";

export default function AdminFinancials() {
  const [activeTab, setActiveTab] = useState<"budgets" | "expenses">("budgets");
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<any>(null);
  const [editingExpense, setEditingExpense] = useState<any>(null);
  
  const { data: budgets, refetch: refetchBudgets } = trpc.budgets.getAll.useQuery();
  const { data: expenses, refetch: refetchExpenses } = trpc.expenses.getAll.useQuery();
  
  const createBudgetMutation = trpc.budgets.create.useMutation();
  const updateBudgetMutation = trpc.budgets.update.useMutation();
  const deleteBudgetMutation = trpc.budgets.delete.useMutation();
  
  const createExpenseMutation = trpc.expenses.create.useMutation();
  const updateExpenseMutation = trpc.expenses.update.useMutation();
  const deleteExpenseMutation = trpc.expenses.delete.useMutation();
  
  const [budgetFormData, setBudgetFormData] = useState({
    name: "",
    category: "operations" as any,
    allocated: "",
    spent: "0",
    fiscalYear: new Date().getFullYear(),
    status: "active" as any,
  });
  
  const [expenseFormData, setExpenseFormData] = useState({
    budgetId: undefined as number | undefined,
    category: "",
    description: "",
    amount: "",
    expenseDate: new Date().toISOString().split('T')[0],
    vendor: "",
    status: "pending" as any,
  });
  
  const handleBudgetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingBudget) {
        await updateBudgetMutation.mutateAsync({ id: editingBudget.id, ...budgetFormData });
      } else {
        await createBudgetMutation.mutateAsync(budgetFormData);
      }
      await refetchBudgets();
      resetBudgetForm();
    } catch (error) {
      console.error("Error saving budget:", error);
    }
  };
  
  const handleExpenseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingExpense) {
        await updateExpenseMutation.mutateAsync({ id: editingExpense.id, ...expenseFormData });
      } else {
        await createExpenseMutation.mutateAsync(expenseFormData);
      }
      await refetchExpenses();
      resetExpenseForm();
    } catch (error) {
      console.error("Error saving expense:", error);
    }
  };
  
  const handleDeleteBudget = async (id: number) => {
    if (confirm("Are you sure you want to delete this budget?")) {
      await deleteBudgetMutation.mutateAsync({ id });
      await refetchBudgets();
    }
  };
  
  const handleDeleteExpense = async (id: number) => {
    if (confirm("Are you sure you want to delete this expense?")) {
      await deleteExpenseMutation.mutateAsync({ id });
      await refetchExpenses();
    }
  };
  
  const handleEditBudget = (budget: any) => {
    setEditingBudget(budget);
    setBudgetFormData({
      name: budget.name,
      category: budget.category,
      allocated: budget.allocated,
      spent: budget.spent || "0",
      fiscalYear: budget.fiscalYear,
      status: budget.status || "active",
    });
    setIsBudgetModalOpen(true);
  };
  
  const handleEditExpense = (expense: any) => {
    setEditingExpense(expense);
    setExpenseFormData({
      budgetId: expense.budgetId,
      category: expense.category,
      description: expense.description,
      amount: expense.amount,
      expenseDate: new Date(expense.expenseDate).toISOString().split('T')[0],
      vendor: expense.vendor || "",
      status: expense.status || "pending",
    });
    setIsExpenseModalOpen(true);
  };
  
  const resetBudgetForm = () => {
    setBudgetFormData({
      name: "",
      category: "operations",
      allocated: "",
      spent: "0",
      fiscalYear: new Date().getFullYear(),
      status: "active",
    });
    setEditingBudget(null);
    setIsBudgetModalOpen(false);
  };
  
  const resetExpenseForm = () => {
    setExpenseFormData({
      budgetId: undefined,
      category: "",
      description: "",
      amount: "",
      expenseDate: new Date().toISOString().split('T')[0],
      vendor: "",
      status: "pending",
    });
    setEditingExpense(null);
    setIsExpenseModalOpen(false);
  };
  
  const totalAllocated = budgets?.reduce((sum, b) => sum + parseFloat(b.allocated), 0) || 0;
  const totalSpent = budgets?.reduce((sum, b) => sum + parseFloat(b.spent || "0"), 0) || 0;
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Financial Management</h1>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Allocated</p>
              <p className="text-2xl font-bold">${totalAllocated.toLocaleString()}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <DollarSign className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold">${totalSpent.toLocaleString()}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <TrendingDown className="text-red-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Remaining</p>
              <p className="text-2xl font-bold">${(totalAllocated - totalSpent).toLocaleString()}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp className="text-green-600" size={24} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b">
          <div className="flex">
            <button
              onClick={() => setActiveTab("budgets")}
              className={`px-6 py-3 font-medium ${
                activeTab === "budgets"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Budgets
            </button>
            <button
              onClick={() => setActiveTab("expenses")}
              className={`px-6 py-3 font-medium ${
                activeTab === "expenses"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Expenses
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <button
            onClick={() => activeTab === "budgets" ? setIsBudgetModalOpen(true) : setIsExpenseModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus size={20} />
            Add {activeTab === "budgets" ? "Budget" : "Expense"}
          </button>
        </div>
      </div>
      
      {/* Content */}
      {activeTab === "budgets" ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fiscal Year</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Allocated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Remaining</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {budgets?.map((budget) => {
                const allocated = parseFloat(budget.allocated);
                const spent = parseFloat(budget.spent || "0");
                const remaining = allocated - spent;
                const percentUsed = (spent / allocated) * 100;
                
                return (
                  <tr key={budget.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{budget.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">{budget.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{budget.fiscalYear}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${allocated.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm">${spent.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">{percentUsed.toFixed(1)}%</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={remaining < 0 ? "text-red-600" : "text-green-600"}>
                        ${remaining.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        budget.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}>
                        {budget.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditBudget(budget)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteBudget(budget.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {budgets?.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No budgets found
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {expenses?.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(expense.expenseDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{expense.category}</td>
                  <td className="px-6 py-4">{expense.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{expense.vendor || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    ${parseFloat(expense.amount).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      expense.status === "paid" ? "bg-green-100 text-green-800" :
                      expense.status === "approved" ? "bg-blue-100 text-blue-800" :
                      "bg-yellow-100 text-yellow-800"
                    }`}>
                      {expense.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditExpense(expense)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteExpense(expense.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {expenses?.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No expenses found
            </div>
          )}
        </div>
      )}
      
      {/* Budget Modal */}
      {isBudgetModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">
              {editingBudget ? "Edit Budget" : "Add New Budget"}
            </h2>
            <form onSubmit={handleBudgetSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Budget Name *</label>
                <input
                  type="text"
                  required
                  value={budgetFormData.name}
                  onChange={(e) => setBudgetFormData({ ...budgetFormData, name: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category *</label>
                  <select
                    value={budgetFormData.category}
                    onChange={(e) => setBudgetFormData({ ...budgetFormData, category: e.target.value as any })}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="operations">Operations</option>
                    <option value="marketing">Marketing</option>
                    <option value="programs">Programs</option>
                    <option value="hr">HR</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Fiscal Year *</label>
                  <input
                    type="number"
                    required
                    min="2020"
                    max="2100"
                    value={budgetFormData.fiscalYear}
                    onChange={(e) => setBudgetFormData({ ...budgetFormData, fiscalYear: parseInt(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Allocated Amount *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={budgetFormData.allocated}
                    onChange={(e) => setBudgetFormData({ ...budgetFormData, allocated: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Spent Amount</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={budgetFormData.spent}
                    onChange={(e) => setBudgetFormData({ ...budgetFormData, spent: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    value={budgetFormData.status}
                    onChange={(e) => setBudgetFormData({ ...budgetFormData, status: e.target.value as any })}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="active">Active</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={resetBudgetForm}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingBudget ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Expense Modal */}
      {isExpenseModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">
              {editingExpense ? "Edit Expense" : "Add New Expense"}
            </h2>
            <form onSubmit={handleExpenseSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category *</label>
                  <input
                    type="text"
                    required
                    value={expenseFormData.category}
                    onChange={(e) => setExpenseFormData({ ...expenseFormData, category: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Amount *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={expenseFormData.amount}
                    onChange={(e) => setExpenseFormData({ ...expenseFormData, amount: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description *</label>
                <textarea
                  required
                  value={expenseFormData.description}
                  onChange={(e) => setExpenseFormData({ ...expenseFormData, description: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Expense Date *</label>
                  <input
                    type="date"
                    required
                    value={expenseFormData.expenseDate}
                    onChange={(e) => setExpenseFormData({ ...expenseFormData, expenseDate: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Vendor</label>
                  <input
                    type="text"
                    value={expenseFormData.vendor}
                    onChange={(e) => setExpenseFormData({ ...expenseFormData, vendor: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={expenseFormData.status}
                  onChange={(e) => setExpenseFormData({ ...expenseFormData, status: e.target.value as any })}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
              
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={resetExpenseForm}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingExpense ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
