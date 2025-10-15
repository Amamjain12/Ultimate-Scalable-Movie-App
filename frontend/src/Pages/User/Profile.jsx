import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../component/Loader";
import { useProfileMutation } from "../../redux/api/users";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo.username || "");
      setEmail(userInfo.email || "");
    }
  }, [userInfo]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
        setPassword("");
        setConfirmPassword("");
      } catch (err) {
        toast.error(err?.data?.message || err?.error || "Update failed");
      }
    }
  };

  return (
    <div className="pl-[10rem] pr-[15rem] py-10 min-h-screen">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8 text-white">
          Update Profile
        </h2>

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="block text-white mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              className="p-3 rounded w-full bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-teal-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-white mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Enter email"
              className="p-3 rounded w-full bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-teal-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-white mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="p-3 rounded w-full bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-teal-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-white mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="p-3 rounded w-full bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-teal-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loadingUpdateProfile}
              className="bg-teal-500 w-full font-bold text-white py-3 px-4 rounded hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingUpdateProfile ? "Updating..." : "Update"}
            </button>
          </div>

          {loadingUpdateProfile && <Loader />}
        </form>
      </div>
    </div>
  );
};

export default Profile;
