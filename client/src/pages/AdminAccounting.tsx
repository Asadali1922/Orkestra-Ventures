import { useState } from "react";
import { trpc } from "../lib/trpc";

export default function AdminAccounting() {
  const [activeTab, setActiveTab] = useState<"invoices" | "transactions">("invoices");
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<any>(null);
  const [editingTransaction, setEditingTransaction] = useState<any>(null);

  const { data: invoices = [], refetch: refetchInvoices } = trpc.invoices.getAll.useQuery();
  const { data: transactions = [], refetch: refetchTransactions } = trpc.transactions.getAll.useQuery();

  const createInvoiceMutation = trpc.invoices.create.useMutation({
    onSuccess: () => {
      refetchInvoices();
      setShowInvoiceModal(false);
      setEditingInvoice(null);
    },
  });

  const updateInvoiceMutation = trpc.invoices.update.useMutation({
    onSuccess: () => {
      refetchInvoices();
      setShowInvoiceModal(false);
      setEditingInvoice(null);
    },
  });

  const deleteInvoiceMutation = trpc.invoices.delete.useMutation({
    onSuccess: () => refetchInvoices(),
  });

  const createTransactionMutation = trpc.transactions.create.useMutation({
    onSuccess: () => {
      refetchTransactions();
      setShowTransactionModal(false);
      setEditingTransaction(null);
    },
  });

  const updateTransactionMutation = trpc.transactions.update.useMutation({
    onSuccess: () => {
      refetchTransactions();
      setShowTransactionModal(false);
      setEditingTransaction(null);
    },
  });

  const deleteTransactionMutation = trpc.transactions.delete.useMutation({
    onSuccess: () => refetchTransactions(),
  });

  const handleInvoiceSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const amount = parseFloat(formData.get("amount") as string);
    const taxAmount = parseFloat(formData.get("taxAmount") as string || "0");
    const totalAmount = amount + taxAmount;

    const data = {
      invoiceNumber: formData.get("invoiceNumber") as string,
      clientName: formData.get("clientName") as string,
      clientEmail: formData.get("clientEmail") as string || undefined,
      description: formData.get("description") as string,
      amount: amount.toString(),
      currency: formData.get("currency") as string || "EGP",
      taxAmount: taxAmount.toString(),
      totalAmount: totalAmount.toString(),
      status: formData.get("status") as any || "draft",
      issueDate: formData.get("issueDate") as string,
      dueDate: formData.get("dueDate") as string,
      paidDate: formData.get("paidDate") as string || undefined,
      paymentMethod: formData.get("paymentMethod") as string || undefined,
      notes: formData.get("notes") as string || undefined,
    };

    if (editingInvoice) {
      updateInvoiceMutation.mutate({ id: editingInvoice.id, ...data });
    } else {
      createInvoiceMutation.mutate(data);
    }
  };

  const handleTransactionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      transactionNumber: formData.get("transactionNumber") as string,
      type: formData.get("type") as any,
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      amount: formData.get("amount") as string,
      currency: formData.get("currency") as string || "EGP",
      paymentMethod: formData.get("paymentMethod") as string || undefined,
      referenceNumber: formData.get("referenceNumber") as string || undefined,
      transactionDate: formData.get("transactionDate") as string,
      status: formData.get("status") as any || "completed",
      notes: formData.get("notes") as string || undefined,
    };

    if (editingTransaction) {
      updateTransactionMutation.mutate({ id: editingTransaction.id, ...data });
    } else {
      createTransactionMutation.mutate(data);
    }
  };

  const totalRevenue = invoices
    .filter((inv: any) => inv.status === "paid")
    .reduce((sum: number, inv: any) => sum + parseFloat(inv.totalAmount || "0"), 0);

  const pendingRevenue = invoices
    .filter((inv: any) => inv.status === "sent" || inv.status === "overdue")
    .reduce((sum: number, inv: any) => sum + parseFloat(inv.totalAmount || "0"), 0);

  const totalIncome = transactions
    .filter((t: any) => t.type === "income" && t.status === "completed")
    .reduce((sum: number, t: any) => sum + parseFloat(t.amount || "0"), 0);

  const totalExpenses = transactions
    .filter((t: any) => t.type === "expense" && t.status === "completed")
    .reduce((sum: number, t: any) => sum + parseFloat(t.amount || "0"), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Accounting</h1>
          <p className="text-gray-600">Manage invoices, transactions, and financial records</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Total Revenue</span>
              <span className="text-2xl">💰</span>
            </div>
            <div className="text-3xl font-bold text-green-600">
              {totalRevenue.toLocaleString()} EGP
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Pending</span>
              <span className="text-2xl">⏳</span>
            </div>
            <div className="text-3xl font-bold text-yellow-600">
              {pendingRevenue.toLocaleString()} EGP
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Total Income</span>
              <span className="text-2xl">📈</span>
            </div>
            <div className="text-3xl font-bold text-blue-600">
              {totalIncome.toLocaleString()} EGP
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Total Expenses</span>
              <span className="text-2xl">📉</span>
            </div>
            <div className="text-3xl font-bold text-red-600">
              {totalExpenses.toLocaleString()} EGP
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("invoices")}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === "invoices"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Invoices
            </button>
            <button
              onClick={() => setActiveTab("transactions")}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === "transactions"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Transactions
            </button>
          </div>

          <div className="p-6">
            {activeTab === "invoices" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Invoices</h2>
                  <button
                    onClick={() => {
                      setEditingInvoice(null);
                      setShowInvoiceModal(true);
                    }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    + Create Invoice
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Invoice #</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Client</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Due Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((invoice: any) => (
                        <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{invoice.invoiceNumber}</td>
                          <td className="py-3 px-4">
                            <div>
                              <div className="font-medium text-gray-900">{invoice.clientName}</div>
                              {invoice.clientEmail && (
                                <div className="text-sm text-gray-500">{invoice.clientEmail}</div>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-900 font-medium">
                            {parseFloat(invoice.totalAmount).toLocaleString()} {invoice.currency}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded text-sm ${
                                invoice.status === "paid"
                                  ? "bg-green-100 text-green-700"
                                  : invoice.status === "sent"
                                  ? "bg-blue-100 text-blue-700"
                                  : invoice.status === "overdue"
                                  ? "bg-red-100 text-red-700"
                                  : invoice.status === "cancelled"
                                  ? "bg-gray-100 text-gray-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {invoice.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-700">
                            {new Date(invoice.dueDate).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => {
                                setEditingInvoice(invoice);
                                setShowInvoiceModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-800 mr-3"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                if (confirm("Delete this invoice?")) {
                                  deleteInvoiceMutation.mutate({ id: invoice.id });
                                }
                              }}
                              className="text-red-600 hover:text-red-800"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "transactions" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Transactions</h2>
                  <button
                    onClick={() => {
                      setEditingTransaction(null);
                      setShowTransactionModal(true);
                    }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    + Add Transaction
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Transaction #</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction: any) => (
                        <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{transaction.transactionNumber}</td>
                          <td className="py-3 px-4 text-gray-700">
                            {new Date(transaction.transactionDate).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded text-sm ${
                                transaction.type === "income"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {transaction.type}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-700">{transaction.category}</td>
                          <td className="py-3 px-4 text-gray-900 font-medium">
                            {transaction.type === "expense" && "-"}
                            {parseFloat(transaction.amount).toLocaleString()} {transaction.currency}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded text-sm ${
                                transaction.status === "completed"
                                  ? "bg-green-100 text-green-700"
                                  : transaction.status === "pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {transaction.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => {
                                setEditingTransaction(transaction);
                                setShowTransactionModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-800 mr-3"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                if (confirm("Delete this transaction?")) {
                                  deleteTransactionMutation.mutate({ id: transaction.id });
                                }
                              }}
                              className="text-red-600 hover:text-red-800"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Invoice Modal */}
      {showInvoiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h3 className="text-2xl font-bold mb-6">
              {editingInvoice ? "Edit Invoice" : "Create Invoice"}
            </h3>
            <form onSubmit={handleInvoiceSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Invoice Number *
                  </label>
                  <input
                    type="text"
                    name="invoiceNumber"
                    defaultValue={editingInvoice?.invoiceNumber}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    defaultValue={editingInvoice?.clientName}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Client Email</label>
                <input
                  type="email"
                  name="clientEmail"
                  defaultValue={editingInvoice?.clientEmail}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  defaultValue={editingInvoice?.description}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount *</label>
                  <input
                    type="number"
                    name="amount"
                    step="0.01"
                    defaultValue={editingInvoice?.amount}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tax Amount</label>
                  <input
                    type="number"
                    name="taxAmount"
                    step="0.01"
                    defaultValue={editingInvoice?.taxAmount || "0"}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <input
                    type="text"
                    name="currency"
                    defaultValue={editingInvoice?.currency || "EGP"}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    name="status"
                    defaultValue={editingInvoice?.status || "draft"}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="sent">Sent</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <input
                    type="text"
                    name="paymentMethod"
                    defaultValue={editingInvoice?.paymentMethod}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Issue Date *
                  </label>
                  <input
                    type="date"
                    name="issueDate"
                    defaultValue={editingInvoice?.issueDate?.split("T")[0]}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Date *</label>
                  <input
                    type="date"
                    name="dueDate"
                    defaultValue={editingInvoice?.dueDate?.split("T")[0]}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Paid Date</label>
                  <input
                    type="date"
                    name="paidDate"
                    defaultValue={editingInvoice?.paidDate?.split("T")[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  name="notes"
                  defaultValue={editingInvoice?.notes}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  {editingInvoice ? "Update" : "Create"} Invoice
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowInvoiceModal(false);
                    setEditingInvoice(null);
                  }}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transaction Modal */}
      {showTransactionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
            <h3 className="text-2xl font-bold mb-6">
              {editingTransaction ? "Edit Transaction" : "Add Transaction"}
            </h3>
            <form onSubmit={handleTransactionSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transaction # *
                  </label>
                  <input
                    type="text"
                    name="transactionNumber"
                    defaultValue={editingTransaction?.transactionNumber}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                  <select
                    name="type"
                    defaultValue={editingTransaction?.type}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <input
                  type="text"
                  name="category"
                  defaultValue={editingTransaction?.category}
                  required
                  placeholder="e.g., Sales, Rent, Utilities"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  defaultValue={editingTransaction?.description}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount *</label>
                  <input
                    type="number"
                    name="amount"
                    step="0.01"
                    defaultValue={editingTransaction?.amount}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <input
                    type="text"
                    name="currency"
                    defaultValue={editingTransaction?.currency || "EGP"}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <input
                    type="text"
                    name="paymentMethod"
                    defaultValue={editingTransaction?.paymentMethod}
                    placeholder="e.g., Cash, Bank Transfer"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reference #
                  </label>
                  <input
                    type="text"
                    name="referenceNumber"
                    defaultValue={editingTransaction?.referenceNumber}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                  <input
                    type="date"
                    name="transactionDate"
                    defaultValue={editingTransaction?.transactionDate?.split("T")[0]}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    name="status"
                    defaultValue={editingTransaction?.status || "completed"}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  name="notes"
                  defaultValue={editingTransaction?.notes}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  {editingTransaction ? "Update" : "Add"} Transaction
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowTransactionModal(false);
                    setEditingTransaction(null);
                  }}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
