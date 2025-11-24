import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Plus, Edit, Trash2, Mail, Phone, Briefcase } from "lucide-react";

export default function AdminMentors() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMentor, setEditingMentor] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  
  const { data: mentors, refetch } = trpc.mentors.getAll.useQuery();
  const createMutation = trpc.mentors.create.useMutation();
  const updateMutation = trpc.mentors.update.useMutation();
  const deleteMutation = trpc.mentors.delete.useMutation();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    expertise: "",
    bio: "",
    status: "active" as any,
    sessionsCompleted: 0,
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMentor) {
        await updateMutation.mutateAsync({ id: editingMentor.id, ...formData });
      } else {
        await createMutation.mutateAsync(formData);
      }
      await refetch();
      resetForm();
    } catch (error) {
      console.error("Error saving mentor:", error);
    }
  };
  
  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this mentor?")) {
      await deleteMutation.mutateAsync({ id });
      await refetch();
    }
  };
  
  const handleEdit = (mentor: any) => {
    setEditingMentor(mentor);
    setFormData({
      firstName: mentor.firstName,
      lastName: mentor.lastName,
      email: mentor.email,
      phone: mentor.phone || "",
      company: mentor.company || "",
      expertise: mentor.expertise || "",
      bio: mentor.bio || "",
      status: mentor.status || "active",
      sessionsCompleted: mentor.sessionsCompleted || 0,
    });
    setIsModalOpen(true);
  };
  
  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      expertise: "",
      bio: "",
      status: "active",
      sessionsCompleted: 0,
    });
    setEditingMentor(null);
    setIsModalOpen(false);
  };
  
  const filteredMentors = mentors?.filter((mentor) => {
    if (statusFilter === "all") return true;
    return mentor.status === statusFilter;
  });
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mentor Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={20} />
          Add Mentor
        </button>
      </div>
      
      {/* Filter */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="all">All Mentors</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      
      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors?.map((mentor) => (
          <div key={mentor.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">
                  {mentor.firstName} {mentor.lastName}
                </h3>
                {mentor.company && (
                  <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                    <Briefcase size={14} />
                    {mentor.company}
                  </p>
                )}
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                mentor.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
              }`}>
                {mentor.status}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail size={14} />
                <a href={`mailto:${mentor.email}`} className="hover:text-blue-600">
                  {mentor.email}
                </a>
              </div>
              {mentor.phone && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={14} />
                  <span>{mentor.phone}</span>
                </div>
              )}
            </div>
            
            {mentor.expertise && (
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-500 mb-1">Expertise</p>
                <p className="text-sm text-gray-700 line-clamp-2">{mentor.expertise}</p>
              </div>
            )}
            
            <div className="text-sm text-gray-600 mb-4">
              <span className="font-medium">{mentor.sessionsCompleted || 0}</span> sessions completed
            </div>
            
            <div className="flex gap-2 pt-4 border-t">
              <button
                onClick={() => handleEdit(mentor)}
                className="flex-1 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <Edit size={16} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(mentor.id)}
                className="flex-1 text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredMentors?.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No mentors found</p>
          <p className="text-sm">Add mentors to your network</p>
        </div>
      )}
      
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingMentor ? "Edit Mentor" : "Add New Mentor"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Expertise</label>
                <input
                  type="text"
                  value={formData.expertise}
                  onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="e.g., Product Development, Marketing, Finance"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  rows={4}
                  placeholder="Brief biography..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Sessions Completed</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.sessionsCompleted}
                    onChange={(e) => setFormData({ ...formData, sessionsCompleted: parseInt(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
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
                  {editingMentor ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
