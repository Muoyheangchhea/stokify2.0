import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaBirthdayCake,
  FaTransgender,
  FaWeight,
  FaRuler,
  FaHeartbeat,
  FaShieldAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaExclamationCircle,
  FaCheckCircle,
  FaInfoCircle,
  FaUserMd,
  FaUserFriends,
  FaBell,
  FaLanguage,
  FaMapMarkerAlt,
  FaCamera,
  FaTrash,
} from "react-icons/fa";
import "../styles/Profile.css";

const Alert = ({ type, message, onClose }) => {
  const icons = {
    success: <FaCheckCircle />,
    error: <FaExclamationCircle />,
    info: <FaInfoCircle />,
  };
  return (
    <div className={`profile-alert ${type}`}>
      <span className="alert-icon">{icons[type]}</span>
      <span>{message}</span>
      <button className="alert-close" onClick={onClose}>
        <FaTimes />
      </button>
    </div>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [alert, setAlert] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    bloodType: "",
    height: "",
    weight: "",
    emergencyContact: "",
    address: "",
    language: "English",
    notifications: true,
    picture: "",
  });
  const [originalData, setOriginalData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [pictureFile, setPictureFile] = useState(null);
  const [picturePreview, setPicturePreview] = useState(null);
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef(null);

  // Helper function to get proxied image URL
  const getProxiedImageUrl = (originalUrl) => {
    if (!originalUrl) return "";

    // Use wsrv.nl (formerly images.weserv.nl) - a free image proxy service
    if (
      originalUrl.includes("googleusercontent.com") ||
      originalUrl.includes("google.com")
    ) {
      // Add cache busting and size optimization
      return `https://wsrv.nl/?url=${encodeURIComponent(originalUrl)}&w=100&h=100&fit=cover&a=attention&we&output=webp`;
    }
    return originalUrl;
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchUserProfile();
  }, [isAuthenticated, navigate]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);

      // Fetch from your API
      const response = await fetch(
        `http://localhost:5000/api/users/${user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();

      setProfileData(data);
      setOriginalData(data);
      setPicturePreview(data.picture);
      setImageError(false);
    } catch (error) {
      console.error("Fetch error:", error);
      // Fallback to mock data if API fails
      const mockProfile = {
        name: user?.name || "John Doe",
        email: user?.email || "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        dateOfBirth: "1985-06-15",
        gender: "male",
        bloodType: "O+",
        height: "175",
        weight: "70",
        emergencyContact: "+1 (555) 987-6543",
        address: "123 Health St, Wellness City, HC 12345",
        language: "English",
        notifications: true,
        picture: user?.picture || "",
      };

      setProfileData(mockProfile);
      setOriginalData(mockProfile);
      setPicturePreview(mockProfile.picture);
      setImageError(false);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (limit to 2MB for better performance)
      if (file.size > 2 * 1024 * 1024) {
        setAlert({
          type: "error",
          message: "Image size should be less than 2MB",
        });
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        setAlert({
          type: "error",
          message: "Please upload an image file",
        });
        return;
      }

      setPictureFile(file);
      setImageError(false);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageError = () => {
    console.error("Image failed to load:", picturePreview);
    setImageError(true);
    setPicturePreview(null);
  };

  const handleRemovePicture = () => {
    setPictureFile(null);
    setPicturePreview(null);
    setImageError(false);
    setProfileData((prev) => ({ ...prev, picture: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!profileData.name.trim()) newErrors.name = "Name is required";
    if (!profileData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(profileData.email))
      newErrors.email = "Please enter a valid email address";
    if (profileData.phone && !/^[\d\s\-+()]+$/.test(profileData.phone))
      newErrors.phone = "Please enter a valid phone number";
    if (
      profileData.height &&
      (isNaN(profileData.height) || profileData.height <= 0)
    )
      newErrors.height = "Please enter a valid height";
    if (
      profileData.weight &&
      (isNaN(profileData.weight) || profileData.weight <= 0)
    )
      newErrors.weight = "Please enter a valid weight";
    return newErrors;
  };

  const handleEdit = () => {
    setOriginalData({ ...profileData });
    setPicturePreview(profileData.picture);
    setImageError(false);
    setEditing(true);
    setErrors({});
  };

  const handleCancel = () => {
    setProfileData({ ...originalData });
    setPicturePreview(originalData.picture);
    setImageError(false);
    setPictureFile(null);
    setEditing(false);
    setErrors({});
    setAlert(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleEnable2FA = () => {
    console.log("Enable 2FA clicked");
    alert("2FA setup will be available soon!");
  };
  const handleSave = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setAlert(null);

    try {
      let pictureUrl = profileData.picture;

      // Upload new picture if selected
      if (pictureFile) {
        const formData = new FormData();
        formData.append("profilePicture", pictureFile);

        const uploadResponse = await fetch(
          "http://localhost:5000/api/users/upload-picture",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
          },
        );

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload picture");
        }

        const uploadData = await uploadResponse.json();
        pictureUrl = uploadData.imageUrl;
      }

      const updatedProfile = {
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone || null,
        dateOfBirth: profileData.dateOfBirth || null,
        gender: profileData.gender || null,
        bloodType: profileData.bloodType || null,
        height: profileData.height ? parseFloat(profileData.height) : null,
        weight: profileData.weight ? parseFloat(profileData.weight) : null,
        emergencyContact: profileData.emergencyContact || null,
        address: profileData.address || null,
        language: profileData.language,
        notifications: profileData.notifications,
        picture: pictureUrl,
      };

      // Save to database
      const response = await fetch(
        `http://localhost:5000/api/users/${user?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedProfile),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      const data = await response.json();

      setOriginalData(data);
      setProfileData(data);
      setEditing(false);
      setPictureFile(null);
      setImageError(false);

      // Update user in context and localStorage
      const updatedUser = {
        ...user,
        name: data.name,
        email: data.email,
        picture: data.picture,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Update auth context if updateUser function exists
      if (updateUser) {
        updateUser(updatedUser);
      }

      setAlert({
        type: "success",
        message: "Profile updated successfully!",
      });
    } catch (error) {
      console.error("Save error:", error);
      setAlert({
        type: "error",
        message: error.message || "Failed to save profile. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    ) {
      try {
        setIsLoading(true);

        // Delete from database
        await fetch(`http://localhost:5000/api/users/${user?.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        logout();
        navigate("/");
      } catch (error) {
        setAlert({
          type: "error",
          message: "Failed to delete account. Please try again.",
        });
        setIsLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-pulse">
          <div className="pulse-ring"></div>
          <div className="pulse-ring delay-1"></div>
          <div className="pulse-ring delay-2"></div>
        </div>
        <p>Loading your profile…</p>
      </div>
    );
  }

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: <FaUser /> },
    { id: "health", label: "Health", icon: <FaHeartbeat /> },
    { id: "security", label: "Security", icon: <FaShieldAlt /> },
    { id: "preferences", label: "Preferences", icon: <FaLanguage /> },
  ];

  return (
    <div className="profile-page">
      {/* Decorative background blobs */}
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>
      <div className="bg-blob blob-3"></div>

      <div className="profile-shell">
        {/* Sidebar */}
        <aside className="profile-sidebar">
          <div className="avatar-section">
            <div className="avatar-wrap">
              <div className="avatar-ring"></div>

              {/* Show image if preview exists and no error */}
              {picturePreview && !imageError ? (
                <img
                  src={getProxiedImageUrl(picturePreview)}
                  alt={profileData.name}
                  className="avatar-image"
                  onError={handleImageError}
                />
              ) : (
                <div className="avatar-circle">
                  {getInitials(profileData.name)}
                </div>
              )}

              {/* Professional camera button - only visible when editing */}
              {editing && (
                <div className="avatar-edit-overlay">
                  <button
                    type="button"
                    className="avatar-edit-btn"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                    title="Change photo"
                  >
                    <FaCamera />
                  </button>
                </div>
              )}

              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePictureChange}
                accept="image/*"
                style={{ display: "none" }}
              />
            </div>
          </div>

          <div className="sidebar-identity">
            <h2>{profileData.name}</h2>
            <p>{profileData.email}</p>
            <span className="role-badge">
              {user?.role === "caregiver" ? (
                <>
                  <FaUserMd />
                  &nbsp;Caregiver
                </>
              ) : (
                <>
                  <FaUserFriends />
                  &nbsp;Patient
                </>
              )}
            </span>
          </div>

          {!editing && (
            <button className="edit-fab" onClick={handleEdit}>
              <FaEdit />
              <span>Edit Profile</span>
            </button>
          )}

          <nav className="sidebar-nav">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`nav-item ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="nav-icon">{tab.icon}</span>
                <span className="nav-label">{tab.label}</span>
                {activeTab === tab.id && (
                  <span className="nav-active-dot"></span>
                )}
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="stats-row">
              <div className="stat-chip">
                <span className="stat-val">{profileData.bloodType || "—"}</span>
                <span className="stat-key">Blood</span>
              </div>
              <div className="stat-chip">
                <span className="stat-val">
                  {profileData.height ? `${profileData.height}cm` : "—"}
                </span>
                <span className="stat-key">Height</span>
              </div>
              <div className="stat-chip">
                <span className="stat-val">
                  {profileData.weight ? `${profileData.weight}kg` : "—"}
                </span>
                <span className="stat-key">Weight</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="profile-main">
          {alert && (
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          )}

          <div className="main-header">
            <div className="header-left">
              <h1 className="section-title">
                {tabs.find((t) => t.id === activeTab)?.label}
              </h1>
              <p className="section-sub">
                {activeTab === "profile" && "Manage your personal details"}
                {activeTab === "health" && "Your medical & physical info"}
                {activeTab === "security" && "Account protection settings"}
                {activeTab === "preferences" && "Customize your experience"}
              </p>
            </div>
            {editing && (
              <div className="header-actions">
                <button
                  className="btn-secondary"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  <FaTimes /> Cancel
                </button>
                <button
                  className="btn-primary"
                  onClick={handleSave}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="spinner-xs" /> Saving…
                    </>
                  ) : (
                    <>
                      <FaSave /> Save Changes
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="content-area">
            {/* ── PROFILE TAB ── */}
            {activeTab === "profile" && (
              <>
                <div className="card-section">
                  <div className="card-label">Personal Information</div>
                  <div className="field-grid">
                    <Field
                      icon={<FaUser />}
                      label="Full Name"
                      error={errors.name}
                    >
                      <input
                        type="text"
                        name="name"
                        value={profileData.name || ""} // Add || ''
                        onChange={handleChange}
                        disabled={!editing || isLoading}
                        className={errors.name ? "error" : ""}
                        placeholder="Your name"
                      />
                    </Field>

                    <Field
                      icon={<FaEnvelope />}
                      label="Email"
                      error={errors.email}
                    >
                      <input
                        type="email"
                        name="email"
                        value={profileData.email || ""} // Add || ''
                        onChange={handleChange}
                        disabled={!editing || isLoading}
                        className={errors.email ? "error" : ""}
                        placeholder="you@email.com"
                      />
                    </Field>

                    <Field
                      icon={<FaPhone />}
                      label="Phone"
                      error={errors.phone}
                    >
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone || ""} // Add || ''
                        onChange={handleChange}
                        disabled={!editing || isLoading}
                        className={errors.phone ? "error" : ""}
                        placeholder="+1 (555) 000-0000"
                      />
                    </Field>

                    <Field icon={<FaBirthdayCake />} label="Date of Birth">
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={profileData.dateOfBirth || ""} // Add || ''
                        onChange={handleChange}
                        disabled={!editing || isLoading}
                      />
                    </Field>

                    <Field icon={<FaTransgender />} label="Gender">
                      <select
                        name="gender"
                        value={profileData.gender || ""} // Add || ''
                        onChange={handleChange}
                        disabled={!editing || isLoading}
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not">Prefer not to say</option>
                      </select>
                    </Field>

                    <Field icon={<FaMapMarkerAlt />} label="Address">
                      <input
                        type="text"
                        name="address"
                        value={profileData.address || ""} // Add || ''
                        onChange={handleChange}
                        disabled={!editing || isLoading}
                        placeholder="Street, City, ZIP"
                      />
                    </Field>
                  </div>
                </div>

                <div className="card-section">
                  <div className="card-label">Emergency Contact</div>
                  <div className="field-grid cols-1">
                    <Field icon={<FaPhone />} label="Emergency Phone">
                      <input
                        type="tel"
                        name="emergencyContact"
                        value={profileData.emergencyContact || ""} // Add || ''
                        onChange={handleChange}
                        disabled={!editing || isLoading}
                        placeholder="Emergency contact number"
                      />
                    </Field>
                  </div>
                </div>
              </>
            )}

            {/* ── HEALTH TAB ── */}
            {activeTab === "health" && (
              <div className="card-section">
                <div className="card-label">Medical Information</div>
                <div className="field-grid cols-3">
                  <Field icon={<FaHeartbeat />} label="Blood Type">
                    <select
                      name="bloodType"
                      value={profileData.bloodType || ""} // Add || ''
                      onChange={handleChange}
                      disabled={!editing || isLoading}
                    >
                      <option value="">Select blood type</option>
                      {[
                        "A+",
                        "A-",
                        "B+",
                        "B-",
                        "AB+",
                        "AB-",
                        "O+",
                        "O-",
                        "unknown",
                      ].map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field
                    icon={<FaRuler />}
                    label="Height (cm)"
                    error={errors.height}
                  >
                    <input
                      type="number"
                      name="height"
                      value={profileData.height}
                      onChange={handleChange}
                      disabled={!editing || isLoading}
                      className={errors.height ? "error" : ""}
                      placeholder="175"
                    />
                  </Field>
                  <Field
                    icon={<FaWeight />}
                    label="Weight (kg)"
                    error={errors.weight}
                  >
                    <input
                      type="number"
                      name="weight"
                      value={profileData.weight}
                      onChange={handleChange}
                      disabled={!editing || isLoading}
                      className={errors.weight ? "error" : ""}
                      placeholder="70"
                    />
                  </Field>
                </div>

                <div className="vitals-display">
                  <VitalCard
                    label="Blood Type"
                    value={profileData.bloodType || "—"}
                    color="rose"
                    icon="🩸"
                  />
                  <VitalCard
                    label="Height"
                    value={
                      profileData.height ? `${profileData.height} cm` : "—"
                    }
                    color="blue"
                    icon="📏"
                  />
                  <VitalCard
                    label="Weight"
                    value={
                      profileData.weight ? `${profileData.weight} kg` : "—"
                    }
                    color="green"
                    icon="⚖️"
                  />
                  <VitalCard
                    label="BMI"
                    value={
                      profileData.height && profileData.weight
                        ? (
                            profileData.weight /
                            Math.pow(profileData.height / 100, 2)
                          ).toFixed(1)
                        : "—"
                    }
                    color="amber"
                    icon="📊"
                  />
                </div>
              </div>
            )}

            {/* ── SECURITY TAB ── */}
            {activeTab === "security" && (
              <>
                <div className="card-section">
                  <div className="card-label">Account Security</div>
                  <div className="security-list">
                    <SecurityRow
                      title="Change Password"
                      desc="Update your password regularly to stay protected"
                      action={
                        <button
                          className="sec-btn"
                          onClick={() => navigate("/change-password")}
                        >
                          Change
                        </button>
                      }
                    />
                    <SecurityRow
                      title="Two-Factor Authentication"
                      desc="Add an extra layer of security to your account"
                      action={
                        <button className="sec-btn" onClick={handleEnable2FA}>
                          Enable
                        </button>
                      }
                    />
                    <SecurityRow
                      title="Delete Account"
                      desc="Permanently delete your account and all data"
                      danger
                      action={
                        <button
                          className="sec-btn danger"
                          onClick={handleDeleteAccount}
                          disabled={isLoading}
                        >
                          Delete
                        </button>
                      }
                    />
                  </div>
                </div>
                <div className="card-section">
                  <div className="card-label">Recent Login Activity</div>
                  <div className="history-list">
                    {[
                      {
                        device: "Chrome on Windows",
                        loc: "New York, USA",
                        time: "2 hours ago",
                      },
                      {
                        device: "Safari on iPhone",
                        loc: "New York, USA",
                        time: "Yesterday",
                      },
                      {
                        device: "Firefox on Mac",
                        loc: "New York, USA",
                        time: "3 days ago",
                      },
                    ].map((item, i) => (
                      <div className="history-row" key={i}>
                        <div className="history-icon">🖥️</div>
                        <div className="history-info">
                          <span className="history-device">{item.device}</span>
                          <span className="history-loc">📍 {item.loc}</span>
                        </div>
                        <span className="history-time">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ── PREFERENCES TAB ── */}
            {activeTab === "preferences" && (
              <div className="card-section">
                <div className="card-label">Preferences</div>
                <div className="pref-list">
                  <div className="pref-row">
                    <div className="pref-info">
                      <FaLanguage className="pref-icon" />
                      <div>
                        <h4>Language</h4>
                        <p>Interface display language</p>
                      </div>
                    </div>
                    <select
                      name="language"
                      value={profileData.language}
                      onChange={handleChange}
                      disabled={!editing || isLoading}
                      className="pref-select"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Chinese">Chinese</option>
                    </select>
                  </div>
                  <div className="pref-row">
                    <div className="pref-info">
                      <FaBell className="pref-icon" />
                      <div>
                        <h4>Notifications</h4>
                        <p>Email and push alerts</p>
                      </div>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        name="notifications"
                        checked={profileData.notifications}
                        onChange={handleChange}
                        disabled={!editing || isLoading}
                      />
                      <span className="toggle-track">
                        <span className="toggle-thumb"></span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

// Small helper components
const Field = ({ icon, label, error, children }) => (
  <div className={`field-group ${error ? "has-error" : ""}`}>
    <label>
      <span className="ficon">{icon}</span>
      {label}
    </label>
    {children}
    {error && <span className="field-error">{error}</span>}
  </div>
);

const VitalCard = ({ label, value, color, icon }) => (
  <div className={`vital-card vital-${color}`}>
    <span className="vital-emoji">{icon}</span>
    <span className="vital-val">{value}</span>
    <span className="vital-label">{label}</span>
  </div>
);

const SecurityRow = ({ title, desc, action, danger }) => (
  <div className={`sec-row ${danger ? "danger" : ""}`}>
    <div>
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
    {action}
  </div>
);

export default Profile;
