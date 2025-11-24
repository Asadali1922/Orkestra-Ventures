import { useState } from "react";
import { trpc } from "../lib/trpc";

export default function AdminHR() {
  const [activeTab, setActiveTab] = useState<"employees" | "attendance">("employees");
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<any>(null);
  const [editingAttendance, setEditingAttendance] = useState<any>(null);

  const { data: employees = [], refetch: refetchEmployees } = trpc.employees.getAll.useQuery();
  const { data: attendance = [], refetch: refetchAttendance } = trpc.attendance.getAll.useQuery();

  const createEmployeeMutation = trpc.employees.create.useMutation({
    onSuccess: () => {
      refetchEmployees();
      setShowEmployeeModal(false);
      setEditingEmployee(null);
    },
  });

  const updateEmployeeMutation = trpc.employees.update.useMutation({
    onSuccess: () => {
      refetchEmployees();
      setShowEmployeeModal(false);
      setEditingEmployee(null);
    },
  });

  const deleteEmployeeMutation = trpc.employees.delete.useMutation({
    onSuccess: () => refetchEmployees(),
  });

  const createAttendanceMutation = trpc.attendance.create.useMutation({
    onSuccess: () => {
      refetchAttendance();
      setShowAttendanceModal(false);
      setEditingAttendance(null);
    },
  });

  const updateAttendanceMutation = trpc.attendance.update.useMutation({
    onSuccess: () => {
      refetchAttendance();
      setShowAttendanceModal(false);
      setEditingAttendance(null);
    },
  });

  const deleteAttendanceMutation = trpc.attendance.delete.useMutation({
    onSuccess: () => refetchAttendance(),
  });

  const handleEmployeeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      employeeId: formData.get("employeeId") as string,
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string || undefined,
      position: formData.get("position") as string,
      department: formData.get("department") as any,
      employmentType: formData.get("employmentType") as any,
      salary: formData.get("salary") as string || undefined,
      currency: formData.get("currency") as string || "EGP",
      hireDate: formData.get("hireDate") as string,
      endDate: formData.get("endDate") as string || undefined,
      status: formData.get("status") as any || "active",
      address: formData.get("address") as string || undefined,
      emergencyContact: formData.get("emergencyContact") as string || undefined,
      emergencyPhone: formData.get("emergencyPhone") as string || undefined,
      notes: formData.get("notes") as string || undefined,
    };

    if (editingEmployee) {
      updateEmployeeMutation.mutate({ id: editingEmployee.id, ...data });
    } else {
      createEmployeeMutation.mutate(data);
    }
  };

  const handleAttendanceSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      employeeId: parseInt(formData.get("employeeId") as string),
      date: formData.get("date") as string,
      checkIn: formData.get("checkIn") as string || undefined,
      checkOut: formData.get("checkOut") as string || undefined,
      status: formData.get("status") as any,
      leaveType: formData.get("leaveType") as any || undefined,
      notes: formData.get("notes") as string || undefined,
    };

    if (editingAttendance) {
      updateAttendanceMutation.mutate({ id: editingAttendance.id, ...data });
    } else {
      createAttendanceMutation.mutate(data);
    }
  };

  const activeEmployees = employees.filter((e: any) => e.status === "active").length;
  const totalSalary = employees
    .filter((e: any) => e.status === "active" && e.salary)
    .reduce((sum: number, e: any) => sum + parseFloat(e.salary || "0"), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">HR Management</h1>
          <p className="text-gray-600">Manage employees, attendance, and payroll</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Total Employees</span>
              <span className="text-2xl">👥</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{employees.length}</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Active</span>
              <span className="text-2xl">✅</span>
            </div>
            <div className="text-3xl font-bold text-green-600">{activeEmployees}</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Total Payroll</span>
              <span className="text-2xl">💰</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {totalSalary.toLocaleString()} EGP
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Attendance Records</span>
              <span className="text-2xl">📅</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{attendance.length}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("employees")}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === "employees"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Employees
            </button>
            <button
              onClick={() => setActiveTab("attendance")}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === "attendance"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Attendance
            </button>
          </div>

          <div className="p-6">
            {activeTab === "employees" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Employees</h2>
                  <button
                    onClick={() => {
                      setEditingEmployee(null);
                      setShowEmployeeModal(true);
                    }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    + Add Employee
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Position</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Department</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((employee: any) => (
                        <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-gray-900">{employee.employeeId}</td>
                          <td className="py-3 px-4">
                            <div>
                              <div className="font-medium text-gray-900">{employee.fullName}</div>
                              <div className="text-sm text-gray-500">{employee.email}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-700">{employee.position}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                              {employee.department}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-700">{employee.employmentType}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded text-sm ${
                                employee.status === "active"
                                  ? "bg-green-100 text-green-700"
                                  : employee.status === "on-leave"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {employee.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => {
                                setEditingEmployee(employee);
                                setShowEmployeeModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-800 mr-3"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                if (confirm("Delete this employee?")) {
                                  deleteEmployeeMutation.mutate({ id: employee.id });
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

            {activeTab === "attendance" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Attendance Records</h2>
                  <button
                    onClick={() => {
                      setEditingAttendance(null);
                      setShowAttendanceModal(true);
                    }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    + Record Attendance
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Employee</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Check In</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Check Out</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendance.map((record: any) => {
                        const employee = employees.find((e: any) => e.id === record.employeeId);
                        return (
                          <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 text-gray-900">
                              {new Date(record.date).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4 text-gray-700">
                              {employee?.fullName || `Employee #${record.employeeId}`}
                            </td>
                            <td className="py-3 px-4 text-gray-700">{record.checkIn || "-"}</td>
                            <td className="py-3 px-4 text-gray-700">{record.checkOut || "-"}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-1 rounded text-sm ${
                                  record.status === "present"
                                    ? "bg-green-100 text-green-700"
                                    : record.status === "late"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : record.status === "leave"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {record.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => {
                                  setEditingAttendance(record);
                                  setShowAttendanceModal(true);
                                }}
                                className="text-blue-600 hover:text-blue-800 mr-3"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm("Delete this record?")) {
                                    deleteAttendanceMutation.mutate({ id: record.id });
                                  }
                                }}
                                className="text-red-600 hover:text-red-800"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Employee Modal */}
      {showEmployeeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h3 className="text-2xl font-bold mb-6">
              {editingEmployee ? "Edit Employee" : "Add Employee"}
            </h3>
            <form onSubmit={handleEmployeeSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employee ID *
                  </label>
                  <input
                    type="text"
                    name="employeeId"
                    defaultValue={editingEmployee?.employeeId}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    defaultValue={editingEmployee?.fullName}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={editingEmployee?.email}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    defaultValue={editingEmployee?.phone}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position *
                  </label>
                  <input
                    type="text"
                    name="position"
                    defaultValue={editingEmployee?.position}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department *
                  </label>
                  <select
                    name="department"
                    defaultValue={editingEmployee?.department}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="management">Management</option>
                    <option value="operations">Operations</option>
                    <option value="marketing">Marketing</option>
                    <option value="technology">Technology</option>
                    <option value="finance">Finance</option>
                    <option value="hr">HR</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employment Type *
                  </label>
                  <select
                    name="employmentType"
                    defaultValue={editingEmployee?.employmentType}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="intern">Intern</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    name="status"
                    defaultValue={editingEmployee?.status || "active"}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="on-leave">On Leave</option>
                    <option value="terminated">Terminated</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
                  <input
                    type="number"
                    name="salary"
                    step="0.01"
                    defaultValue={editingEmployee?.salary}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <input
                    type="text"
                    name="currency"
                    defaultValue={editingEmployee?.currency || "EGP"}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hire Date *
                  </label>
                  <input
                    type="date"
                    name="hireDate"
                    defaultValue={editingEmployee?.hireDate?.split("T")[0]}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    defaultValue={editingEmployee?.endDate?.split("T")[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  name="address"
                  defaultValue={editingEmployee?.address}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Contact
                  </label>
                  <input
                    type="text"
                    name="emergencyContact"
                    defaultValue={editingEmployee?.emergencyContact}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Phone
                  </label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    defaultValue={editingEmployee?.emergencyPhone}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  name="notes"
                  defaultValue={editingEmployee?.notes}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  {editingEmployee ? "Update" : "Create"} Employee
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEmployeeModal(false);
                    setEditingEmployee(null);
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

      {/* Attendance Modal */}
      {showAttendanceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <h3 className="text-2xl font-bold mb-6">
              {editingAttendance ? "Edit Attendance" : "Record Attendance"}
            </h3>
            <form onSubmit={handleAttendanceSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee *
                </label>
                <select
                  name="employeeId"
                  defaultValue={editingAttendance?.employeeId}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select employee</option>
                  {employees.map((emp: any) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.fullName} ({emp.employeeId})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                <input
                  type="date"
                  name="date"
                  defaultValue={editingAttendance?.date?.split("T")[0]}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Check In</label>
                  <input
                    type="time"
                    name="checkIn"
                    defaultValue={editingAttendance?.checkIn}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Check Out</label>
                  <input
                    type="time"
                    name="checkOut"
                    defaultValue={editingAttendance?.checkOut}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                <select
                  name="status"
                  defaultValue={editingAttendance?.status}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="late">Late</option>
                  <option value="half-day">Half Day</option>
                  <option value="leave">Leave</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Leave Type</label>
                <select
                  name="leaveType"
                  defaultValue={editingAttendance?.leaveType}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">None</option>
                  <option value="sick">Sick Leave</option>
                  <option value="vacation">Vacation</option>
                  <option value="personal">Personal</option>
                  <option value="unpaid">Unpaid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  name="notes"
                  defaultValue={editingAttendance?.notes}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  {editingAttendance ? "Update" : "Record"} Attendance
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAttendanceModal(false);
                    setEditingAttendance(null);
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
