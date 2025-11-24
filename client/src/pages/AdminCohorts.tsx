import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Plus, Edit, Trash2, Users, Calendar } from "lucide-react";

export default function AdminCohorts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCohort, setEditingCohort] = useState<any>(null);
  
  const { data: cohorts, refetch } = trpc.cohorts.getAll.useQuery();
  const createMutation = trpc.cohorts.create.useMutation();
  const updateMutation = trpc.cohorts.update.useMutation();
  const deleteMutation = trpc.cohorts.delete.useMutation();
  
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    startDate: "",
    endDate: "",
    capacity: 20,
    enrolled: 0,
    status: "planning" as any,
    location: "",
    description: "",
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCohort) {
        await updateMutation.mutateAsync({ id: editingCohort.id, ...formData });
      } else {
        await createMutation.mutateAsync(formData);
      }
      await refetch();
      resetForm();
    } catch (error) {
      console.error("Error saving cohort:", error);
    }
  };
  
  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this cohort?")) {
      await deleteMutation.mutateAsync({ id });
      await refetch();
    }
  };
  
  const handleEdit = (cohort: any) => {
    setEditingCohort(cohort);
    setFormData({
      name: cohort.name,
      code: cohort.code,
      startDate: new Date(cohort.startDate).toISOString().split('T')[0],
      endDate: new Date(cohort.endDate).toISOString().split('T')[0],
      capacity: cohort.capacity,
      enrolled: cohort.enrolled || 0,
      status: cohort.status || "planning",
      location: cohort.location || "",
      description: cohort.description || "",
    });
    setIsModalOpen(true);
  };
  
  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      startDate: "",
      endDate: "",
      capacity: 20,
      enrolled: 0,
      status: "planning",
      location: "",
      description: "",
    });
    setEditingCohort(null);
    setIsModalOpen(false);
  };
  
  const statusColors: Record<string, string> = {
    planning: "bg-gray-100 text-gray-800",
    recruiting: "bg-blue-100 text-blue-800",
    active: "bg-green-100 text-green-800",
    completed: "bg-purple-100 text-purple-800",
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Cohort Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={20} />
          Add Cohort
        </button>
      </div>
      
      {/* Cohorts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cohorts?.map((cohort) => (
          <div key={cohort.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{cohort.name}</h3>
                <p className="text-sm text-gray-500">{cohort.code}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[cohort.status || "planning"]}`}>
                {cohort.status}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar size={16} />
                <span>
                  {new Date(cohort.startDate).toLocaleDateString()} - {new Date(cohort.endDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users size={16} />
                <span>
                  {cohort.enrolled || 0} / {cohort.capacity} enrolled
                </span>
              </div>
              {cohort.location && (
                <p className="text-sm text-gray-600">📍 {cohort.location}</p>
              )}
            </div>
            
            {cohort.description && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{cohort.description}</p>
            )}
            
            <div className="flex gap-2 pt-4 border-t">
              <button
                onClick={() => handleEdit(cohort)}
                className="flex-1 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <Edit size={16} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(cohort.id)}
                className="flex-1 text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {cohorts?.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No cohorts yet</p>
          <p className="text-sm">Create your first cohort to get started</p>
        </div>
      )}
      
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingCohort ? "Edit Cohort" : "Add New Cohort"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Cohort Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="e.g., Q2 2026 Cohort"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="e.g., C2026Q2"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Capacity *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Enrolled</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.enrolled}
                    onChange={(e) => setFormData({ ...formData, enrolled: parseInt(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="planning">Planning</option>
                    <option value="recruiting">Recruiting</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="e.g., Abu Dhabi, UAE"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  rows={4}
                  placeholder="Brief description of the cohort..."
                />
              </div>
              
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingCohort ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
