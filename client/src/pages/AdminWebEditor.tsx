import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Plus, Edit, Trash2, Eye, Globe } from "lucide-react";

export default function AdminWebEditor() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<any>(null);
  
  const { data: pages, refetch } = trpc.webPages.getAll.useQuery();
  const createMutation = trpc.webPages.create.useMutation();
  const updateMutation = trpc.webPages.update.useMutation();
  const deleteMutation = trpc.webPages.delete.useMutation();
  
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    content: "",
    status: "draft" as any,
    updatedBy: "admin",
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPage) {
        await updateMutation.mutateAsync({ id: editingPage.id, ...formData });
      } else {
        await createMutation.mutateAsync(formData);
      }
      await refetch();
      resetForm();
    } catch (error) {
      console.error("Error saving page:", error);
    }
  };
  
  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this page?")) {
      await deleteMutation.mutateAsync({ id });
      await refetch();
    }
  };
  
  const handleEdit = (page: any) => {
    setEditingPage(page);
    setFormData({
      slug: page.slug,
      title: page.title,
      content: page.content,
      status: page.status || "draft",
      updatedBy: "admin",
    });
    setIsModalOpen(true);
  };
  
  const resetForm = () => {
    setFormData({
      slug: "",
      title: "",
      content: "",
      status: "draft",
      updatedBy: "admin",
    });
    setEditingPage(null);
    setIsModalOpen(false);
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Web Content Editor</h1>
          <p className="text-gray-600 mt-1">Manage website pages and content</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={20} />
          Add Page
        </button>
      </div>
      
      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages?.map((page) => (
          <div key={page.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <Globe size={20} className="text-gray-400" />
                <div>
                  <h3 className="text-lg font-bold">{page.title}</h3>
                  <p className="text-sm text-gray-500">/{page.slug}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                page.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
              }`}>
                {page.status}
              </span>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 line-clamp-3">
                {page.content.substring(0, 150)}...
              </p>
            </div>
            
            <div className="text-xs text-gray-500 mb-4">
              <p>Updated: {new Date(page.updatedAt).toLocaleDateString()}</p>
              {page.updatedBy && <p>By: {page.updatedBy}</p>}
            </div>
            
            <div className="flex gap-2 pt-4 border-t">
              <button
                onClick={() => handleEdit(page)}
                className="flex-1 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <Edit size={16} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(page.id)}
                className="flex-1 text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {pages?.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Globe size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="text-lg">No pages yet</p>
          <p className="text-sm">Create your first page to get started</p>
        </div>
      )}
      
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingPage ? "Edit Page" : "Add New Page"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Page Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="e.g., About Us"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="e.g., about-us"
                  />
                  <p className="text-xs text-gray-500 mt-1">Will be accessible at: /{formData.slug}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Page Content *</label>
                <textarea
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 font-mono text-sm"
                  rows={20}
                  placeholder="Enter HTML or Markdown content..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Supports HTML and Markdown. Use standard HTML tags for formatting.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Updated By</label>
                  <input
                    type="text"
                    value={formData.updatedBy}
                    onChange={(e) => setFormData({ ...formData, updatedBy: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Quick Tips:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Use heading tags: &lt;h1&gt;, &lt;h2&gt;, &lt;h3&gt;</li>
                  <li>• Add paragraphs with &lt;p&gt; tags</li>
                  <li>• Create links: &lt;a href="url"&gt;text&lt;/a&gt;</li>
                  <li>• Add images: &lt;img src="url" alt="description" /&gt;</li>
                  <li>• Use &lt;div&gt; and classes for layout</li>
                </ul>
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
                  {editingPage ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
