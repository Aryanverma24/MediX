import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiUserPlus, FiSearch, FiChevronLeft, FiChevronRight, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';
import API from '../../utils/api';
import { motion } from 'framer-motion';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const [selectedRole, setSelectedRole] = useState('all');
    const itemsPerPage = 10;

    const { user: currentUser } = useAuth();
    const navigate = useNavigate();

    const checkActive = (endDate) => {
       
        const targetDate = new Date(endDate);
        const today = new Date();

        const diffM = targetDate - today ;
        const diffDays = diffM / (1000*60*60*24);

        return diffDays >= 0 && diffDays <= 21;
    }


    useEffect(() => {
        if (currentUser && currentUser.role !== 'admin') {
            toast.error('You are not authorized to access this page');
            navigate('/');
        }
    }, [currentUser, navigate]);

    useEffect(() => {
        if (currentUser?.role === 'admin') {
            fetchUsers();
        }
    }, [currentUser, currentPage, searchTerm, selectedRole]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await API.get('/user/getAllUsers', {
                params: {
                    page: currentPage,
                    limit: itemsPerPage,
                    search: searchTerm,
                    role: selectedRole !== 'all' ? selectedRole : undefined,
                },
            });
            
            if (!response?.data) {
                throw new Error('Invalid response from server');
            }

            if (response.data.data && Array.isArray(response.data.data)) {
                setUsers(response.data.data);
                setTotalUsers(response.data.total || response.data.data.length);
                setTotalPages(Math.ceil((response.data.total || response.data.data.length) / itemsPerPage));
            } else {
                setUsers([]);
                setTotalUsers(0);
                setTotalPages(1);
            }
        } catch (error) {
            toast.error('Failed to load users');
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            try {
                await API.delete(`/user/deleteUser/${userId}`);
                toast.success('User deleted successfully');
                fetchUsers();
            } catch (error) {
                toast.error('Failed to delete user');
            }
        }
    };

    const handleEditUser = (userId) => navigate(`/admin/users/edit/${userId}`);
    const handleAddUser = () => navigate('/admin/users/add');

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
    };

    const formatDate = (dateString) =>
        new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });

    const getRoleBadge = (role) => {
        const roles = {
            admin: 'bg-red-100 text-red-700 border border-red-200',
            user: 'bg-green-100 text-green-700 border border-green-200',
            moderator: 'bg-blue-100 text-blue-700 border border-blue-200',
        };

        return (
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${roles[role] || 'bg-gray-100 text-gray-600'}`}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
            </span>
        );
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="p-4 sm:p-6 min-h-screen min-w-full transition-all duration-300 bg-gradient-to-br from-green-50 via-cream-50 to-white text-gray-800 overflow-x-hidden">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center mb-8 w-full"
            >
                <div className="w-full max-w-4xl mx-auto px-4">
                    <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-400">
                        User Management System
                    </h2>
                    <p className="text-gray-600 mt-2">Control access and view registered users in the core system.</p>
                </div>
                <motion.button
                    onClick={handleAddUser}
                    className="mt-4 md:mt-0 flex items-center justify-center px-6 py-2.5 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-300 transform hover:scale-105 border border-green-400 shadow-sm hover:shadow-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <FiUserPlus className="mr-2 w-5 h-5" />
                    Add New User
                </motion.button>
            </motion.div>

           <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="bg-white/90 w-full backdrop-blur-sm rounded-xl shadow-sm border border-green-100 overflow-hidden">
                <div className="p-5 border-b border-green-100">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                        <form onSubmit={handleSearch} className="flex-1">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiSearch className="text-cyan-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search by name or email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2.5 w-full bg-white border border-green-200 rounded-xl text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-green-300 focus:border-green-300 transition-all"
                                />
                            </div>
                        </form>
                        <div className="flex items-center space-x-4">
                            <label className="text-sm text-gray-600">Filter Role:</label>
                            <select
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                className="border border-green-200 bg-white rounded-xl px-3 py-2 text-gray-700 focus:ring-2 focus:ring-green-300 focus:border-green-300 transition-all"
                            >
                                <option value="all">All Roles</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                                <option value="moderator">Moderator</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto w-full">
                    {loading ? (
                        <div className="p-10 text-center text-gray-600">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-400 border-t-green-100 mx-auto"></div>
                            <p className="mt-4 text-lg">Initializing Data Stream...</p>
                        </div>
                    ) : users.length === 0 ? (
                        <div className="p-10 text-center text-gray-600">
                            <p className="text-xl">No user records found matching criteria.</p>
                        </div>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200 w-full">
                            <thead className="bg-gray-800/50 border-b border-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-cyan-400 uppercase tracking-wider">Email</th>
                                    <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                        Role
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-cyan-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-cyan-400 uppercase tracking-wider">Joined</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-cyan-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <motion.tbody 
                                className="divide-y divide-gray-700"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {users?.map((user, index) => (
                                    <motion.tr 
                                        key={user._id} 
                                        className="hover:bg-gray-700/50 transition duration-150"
                                        variants={itemVariants}
                                        custom={index}
                                    >
                                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 overflow-hidden text-ellipsis max-w-[200px] sm:max-w-none">
                                            <span className="block truncate">{user.email}</span>
                                        </td>
                                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">{getRoleBadge(user.role)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {/* Assuming a boolean 'isActive' property exists */}
                                            {checkActive(user?.subscription?.endDate) ? (
                                                <span className="flex items-center text-lime-400 font-medium">
                                                    <FiCheckCircle className="mr-1.5 w-4 h-4" /> Active
                                                </span>
                                            ) : (
                                                <span className="flex items-center text-red-400 font-medium">
                                                    <FiXCircle className="mr-1.5 w-4 h-4" /> Inactive
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 overflow-hidden text-ellipsis max-w-[150px] sm:max-w-none">{formatDate(user.createdAt)}</td>
                                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-3">
                                                <motion.button
                                                    onClick={() => handleEditUser(user._id)}
                                                    className="px-3 py-1 text-sm text-gray-600 rounded-lg hover:bg-green-100 transition-colors"
                                                    title="Edit user"
                                                    whileHover={{ scale: 1.1, boxShadow: "0 0 10px rgba(0, 255, 255, 0.5)" }}
                                                >
                                                    <FiEdit2 className="h-5 w-5" />
                                                </motion.button>
                                                {user._id !== currentUser?._id && currentUser?.role === "admin" && (
                                                    <motion.button
                                                        onClick={() => handleDeleteUser(user._id)}
                                                        className="px-3 py-1 text-sm text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                                        title="Delete user"
                                                        whileHover={{ scale: 1.1, boxShadow: "0 0 10px rgba(255, 0, 0, 0.5)" }}
                                                    >
                                                        <FiTrash2 className="h-5 w-5" />
                                                    </motion.button>
                                                )}
                                            </div>
                                        </td>
                                        
                                    </motion.tr>
                                ))}
                            </motion.tbody>
                        </table>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between px-3 sm:px-6 py-3 bg-gray-50 text-xs text-gray-500 gap-4">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-600 bg-gray-700 hover:bg-gray-600 disabled:opacity-40"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-600 bg-gray-700 hover:bg-gray-600 disabled:opacity-40"
                            >
                                Next
                            </button>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <p className="text-sm text-gray-600">
                                Showing <span className="font-semibold text-white">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                                <span className="font-semibold text-white">{Math.min(currentPage * itemsPerPage, totalUsers)}</span> of{' '}
                                <span className="font-semibold text-white">{totalUsers}</span> records
                            </p>
                            <nav className="relative z-0 inline-flex rounded-md shadow-lg -space-x-px" aria-label="Pagination">
                                <motion.button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center px-2 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-600 bg-gray-700 hover:bg-gray-600 disabled:opacity-40"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <FiChevronLeft className="h-5 w-5" />
                                </motion.button>
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) pageNum = i + 1;
                                    else if (currentPage <= 3) pageNum = i + 1;
                                    else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                                    else pageNum = currentPage - 2 + i;
                                    
                                    if (pageNum < 1 || pageNum > totalPages) return null;

                                    const isActive = currentPage === pageNum;

                                    return (
                                        <motion.button
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-semibold transition-colors ${
                                                isActive
                                                    ? 'z-10 bg-cyan-700/70 border-cyan-500 text-white shadow-md shadow-cyan-500/30'
                                                    : 'bg-gray-700/50 border-gray-700 text-gray-300 hover:bg-gray-600/70'
                                            }`}
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            {pageNum}
                                        </motion.button>
                                    );
                                })}
                                <motion.button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-700 bg-gray-700/50 text-gray-300 hover:bg-gray-600/70 disabled:opacity-40 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <FiChevronRight className="h-5 w-5" />
                                </motion.button>
                            </nav>
                        </div>
                    </div>
                )}
            </div>
           </div>
        </div>
    );
};

export default AllUsers;