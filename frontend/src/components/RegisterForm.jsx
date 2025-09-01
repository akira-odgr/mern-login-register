const RegisterForm = ({ handleChange, handleSubmit, formData }) => {
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">
                    UserName
                </label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                    placeholder="Enter your username"
                    required
                    autoComplete="off"
                />
            </div>
            <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                    placeholder="Enter your email"
                    required
                    autoComplete="off"
                />
            </div>
            <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                    placeholder="Enter your password"
                    required
                />
            </div>
            <button className="w-full text-white bg-blue-500 p-3 rounded-md hover:bg-blue-600 fount-medium cursor-pointer mt-2">
                Register
            </button>
        </form>
    );
};

export default RegisterForm;
